import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { PATHS } from '../../router/routes';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }) => {
    setLoading(true);
    const success = await forgotPassword(email);
    setLoading(false);
    if (success) setSent(true);
  };

  return (
    <AuthLayout
      title={sent ? 'Check your email 📧' : 'Forgot Password?'}
      subtitle={
        sent
          ? "We've sent password reset instructions to your email."
          : 'Enter your email to receive a reset link'
      }
    >
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If an account exists with that email, you'll receive reset instructions shortly.
          </p>
          <Link to={PATHS.LOGIN}>
            <Button variant="outline" fullWidth icon={ArrowLeft}>
              Back to Sign In
            </Button>
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" size="lg" fullWidth loading={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <Link
            to={PATHS.LOGIN}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}