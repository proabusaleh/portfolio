import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { ROLES } from '../../data/usersData';
import { inviteUser, updateUser } from '../../api/usersApi';

const ROLE_OPTIONS = ROLES.map((r) => ({ value: r.id, label: `${r.icon} ${r.label}` }));

export default function UserFormModal({ isOpen, onClose, user, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'viewer' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(user ? { name: user.name || '', email: user.email || '', role: user.role || 'viewer' } : { name: '', email: '', role: 'viewer' });
    }
  }, [isOpen, user]);

  const isEdit = !!user?.id;

  const handleSubmit = async () => {
    if (!form.email) { toast.error('Email required'); return; }
    setLoading(true);
    try {
      if (isEdit) {
        await updateUser(user.id, form);
        toast.success('User updated');
      } else {
        await inviteUser(form);
        toast.success('Invitation sent');
      }
      onSuccess?.();
      onClose();
    } catch { toast.error('Failed'); }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit User' : 'Invite User'} size="md">
      <div className="p-6 space-y-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@example.com" disabled={isEdit} />
        <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} options={ROLE_OPTIONS} />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>
            {isEdit ? 'Update' : 'Send Invite'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
