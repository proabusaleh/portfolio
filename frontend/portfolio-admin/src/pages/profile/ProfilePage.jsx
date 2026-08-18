import { useState } from 'react';
import { User, Lock, Activity } from 'lucide-react';
import Tabs from '../../components/ui/Tabs';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ChangePassword from '../../components/profile/ChangePassword';
import ProfileActivity from '../../components/profile/ProfileActivity';

const TABS = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'password', label: 'Password', icon: Lock },
  { value: 'activity', label: 'Activity', icon: Activity },
];

export default function ProfilePage() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      <div>
        {tab === 'profile' && <ProfileInfo />}
        {tab === 'password' && <ChangePassword />}
        {tab === 'activity' && <ProfileActivity />}
      </div>
    </div>
  );
}
