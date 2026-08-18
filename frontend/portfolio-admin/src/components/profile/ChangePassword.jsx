import { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { changePassword } from '../../api/profileApi';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { toast } from 'sonner';

export default function ChangePassword() {
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const strength = getPasswordStrength(form.newPassword);

  const handleSave = async () => {
    if (!form.currentPassword || !form.newPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setSaving(true);
    try {
      await changePassword({
        current_password: form.currentPassword,
        new_password: form.newPassword,
        new_password_confirmation: form.confirmPassword,
      });
      toast.success('Password updated successfully');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      // Error handled by axios interceptor
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm shadow-amber-500/20">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          Change Password
        </h3>
        <p className="text-xs text-gray-500 mt-1 ml-10">Ensure your account stays secure with a strong password</p>
      </div>

      <div className="p-5 space-y-4">
        <div className="relative">
          <Input
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            value={form.currentPassword}
            onChange={(e) => update('currentPassword', e.target.value)}
            icon={Lock}
            placeholder="Enter current password"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showNew ? 'text' : 'password'}
            value={form.newPassword}
            onChange={(e) => update('newPassword', e.target.value)}
            icon={Lock}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Strength Bar */}
        {form.newPassword && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors"
                  style={{
                    background: i < strength.level
                      ? strength.color
                      : '#e5e7eb',
                  }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            icon={Lock}
            placeholder="Confirm new password"
            error={form.confirmPassword && form.newPassword !== form.confirmPassword ? 'Passwords do not match' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex justify-end">
        <Button onClick={handleSave} loading={saving} icon={saving ? Loader2 : Lock}>
          {saving ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </motion.div>
  );
}

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '', color: '#e5e7eb' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const levels = [
    { level: 1, label: 'Weak', color: '#ef4444' },
    { level: 2, label: 'Fair', color: '#f59e0b' },
    { level: 3, label: 'Good', color: '#3b82f6' },
    { level: 4, label: 'Strong', color: '#22c55e' },
  ];
  return levels[Math.min(score, 4) - 1] || levels[0];
}
