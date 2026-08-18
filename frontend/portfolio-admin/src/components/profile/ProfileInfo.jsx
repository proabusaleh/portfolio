import { useState } from 'react';
import { Camera, Save, User, Mail, MapPin, Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { updateProfile } from '../../api/profileApi';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { toast } from 'sonner';

export default function ProfileInfo() {
  const { user, updateUser } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Full-stack developer passionate about building beautiful web experiences.',
    location: user?.location || 'Dubai, UAE',
    website: user?.website || 'https://yoursite.com',
    role: user?.role || 'admin',
  });

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProfile({
        name: form.name,
        email: form.email,
        bio: form.bio,
        location: form.location,
        website: form.website,
      });
      updateUser({ ...user, ...res.user, role: res.role || user.role });
      toast.success('Profile updated successfully');
    } catch {
      // Error handled by axios interceptor
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 shadow-lg">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{form.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition group-hover:scale-110">
              <Camera className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h3 className="font-bold text-lg">{form.name}</h3>
            <p className="text-sm text-gray-500">{form.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 capitalize">
                <User className="w-3 h-3" /> {form.role}
              </span>
              {form.location && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" /> {form.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <User className="w-4 h-4 text-white" />
            </div>
            Personal Information
          </h3>
          <p className="text-xs text-gray-500 mt-1 ml-10">Update your personal details and public profile</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              icon={User}
              placeholder="Your full name"
            />
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              icon={Mail}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 text-sm rounded-lg transition-all bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              icon={MapPin}
              placeholder="City, Country"
            />
            <Input
              label="Website"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
              icon={Globe}
              placeholder="https://yoursite.com"
            />
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <Button onClick={handleSave} loading={saving} icon={saving ? Loader2 : Save}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
