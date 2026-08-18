import { useState, useEffect, useCallback } from 'react';
import { UserPlus, Search, Users, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Tabs from '../../components/ui/Tabs';
import { ConfirmModal } from '../../components/ui/Modal';

import UsersStats from '../../components/users/UsersStats';
import UsersTable from '../../components/users/UsersTable';
import UserFormModal from '../../components/users/UserFormModal';
import UserActivityDrawer from '../../components/users/UserActivityDrawer';
import PermissionMatrix from '../../components/users/PermissionMatrix';
import InviteLink from '../../components/users/InviteLink';

import {
  getUsers, getUsersStats, deleteUser, updateUserStatus,
} from '../../api/usersApi';
import { useDebounce } from '../../hooks/useDebounce';
import { ROLES } from '../../data/usersData';

const TABS = [
  { value: 'users',       label: 'Users',       icon: Users        },
  { value: 'permissions', label: 'Permissions', icon: ShieldCheck  },
];

export default function UsersList() {
  const [tab, setTab]         = useState('users');
  const [users, setUsers]     = useState([]);
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch]   = useState('');
  const [roleFilter, setRoleFilter]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [formOpen, setFormOpen]     = useState(false);
  const [editing, setEditing]       = useState(null);
  const [activityUser, setActivityUser] = useState(null);
  const [deleting, setDeleting]     = useState(null);
  const [suspending, setSuspending] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [list, s] = await Promise.all([
        getUsers({ search: debouncedSearch, role: roleFilter, status: statusFilter }),
        getUsersStats(),
      ]);
      setUsers(list);
      setStats(s);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, roleFilter, statusFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleInvite = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (user) => {
    if (user.isYou) {
      toast.error('You cannot edit yourself here');
      return;
    }
    setEditing(user);
    setFormOpen(true);
  };

  const handleDelete = (user) => setDeleting(user);
  const handleSuspend = (user) => setSuspending(user);

  const handleActivate = async (user) => {
    try {
      await updateUserStatus(user.id, 'active');
      toast.success(`${user.name} reactivated`);
      fetch();
    } catch {
      toast.error('Failed');
    }
  };

  const confirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteUser(deleting.id);
      toast.success('User deleted');
      setDeleting(null);
      fetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  const confirmSuspend = async () => {
    setConfirmLoading(true);
    try {
      await updateUserStatus(suspending.id, 'suspended');
      toast.success(`${suspending.name} suspended`);
      setSuspending(null);
      fetch();
    } catch {
      toast.error('Failed');
    } finally {
      setConfirmLoading(false);
    }
  };

  const ROLE_OPTIONS = ROLES.map((r) => ({ value: r.id, label: `${r.icon} ${r.label}` }));

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage team members, roles & permissions"
        actions={
          tab === 'users' && (
            <Button icon={UserPlus} onClick={handleInvite}>
              Invite User
            </Button>
          )
        }
      />

      {tab === 'users' && stats && (
        <div className="mb-6">
          <UsersStats stats={stats} />
        </div>
      )}

      <Card className="mb-6 overflow-hidden">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </Card>

      {/* ── USERS TAB ── */}
      {tab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main */}
          <div>
            <Card>
              <CardBody className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                  <div className="flex-1 max-w-md">
                    <Input
                      icon={Search}
                      placeholder="Search by name or email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 lg:ml-auto">
                    <Select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      options={ROLE_OPTIONS}
                      placeholder="All roles"
                      className="w-36"
                    />
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      options={[
                        { value: 'active',    label: 'Active'    },
                        { value: 'pending',   label: 'Pending'   },
                        { value: 'inactive',  label: 'Inactive'  },
                        { value: 'suspended', label: 'Suspended' },
                      ]}
                      placeholder="All statuses"
                      className="w-36"
                    />
                  </div>
                </div>
              </CardBody>

              <UsersTable
                users={users}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSuspend={handleSuspend}
                onActivate={handleActivate}
                onViewActivity={setActivityUser}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <InviteLink />

            <Card>
              <CardBody>
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">
                  Roles Overview
                </h3>
                <div className="space-y-2">
                  {ROLES.map((r) => {
                    const count = stats?.[r.id] || 0;
                    return (
                      <div key={r.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{r.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{r.label}</p>
                            <p className="text-[11px] text-gray-500">{r.description}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-indigo-500 tabular-nums">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      )}

      {/* ── PERMISSIONS TAB ── */}
      {tab === 'permissions' && <PermissionMatrix />}

      {/* Modals */}
      <UserFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        user={editing}
        onSuccess={fetch}
      />

      <UserActivityDrawer
        isOpen={!!activityUser}
        user={activityUser}
        onClose={() => setActivityUser(null)}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={`Delete ${deleting?.name}?`}
        description="This user will lose all access permanently. This cannot be undone."
        confirmText="Delete User"
        variant="danger"
        loading={confirmLoading}
      />

      <ConfirmModal
        isOpen={!!suspending}
        onClose={() => setSuspending(null)}
        onConfirm={confirmSuspend}
        title={`Suspend ${suspending?.name}?`}
        description="They will not be able to sign in until reactivated."
        confirmText="Suspend User"
        variant="danger"
        loading={confirmLoading}
      />
    </div>
  );
}