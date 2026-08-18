import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import { useAuth } from '../../hooks/useAuth';
import { PATHS } from '../../router/routes';

/* ─── Validation schema ────────────────────────────────────── */
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to redirect after login (default: dashboard)
  const from = location.state?.from?.pathname || PATHS.DASHBOARD;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:    'admin@portfolio.com',
      password: 'admin123',
      remember: true,
    },
  });

  const remember = watch('remember');

  const onSubmit = async (data) => {
    setLoading(true);
    const success = await login(data);
    setLoading(false);
    if (success) navigate(from, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to your admin dashboard"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Demo credentials note */}
        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs">
          <p className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
            🔑 Demo Credentials
          </p>
          <p className="text-indigo-700 dark:text-indigo-400">
            <strong>Admin:</strong> admin@portfolio.com / admin123
          </p>
          <p className="text-indigo-700 dark:text-indigo-400">
            <strong>Editor:</strong> editor@portfolio.com / editor123
          </p>
        </div>

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Password */}
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          {...register('password')}
        />

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={!!remember}
            onChange={(e) => setValue('remember', e.target.checked)}
          />
          <Link
            to={PATHS.FORGOT_PASSWORD}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          iconRight={loading ? undefined : ArrowRight}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-gray-50 dark:bg-gray-950 px-3 text-gray-500">
              OR
            </span>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact admin
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}