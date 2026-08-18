import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Palette } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { APP_CONFIG } from '../../lib/constants';

const FEATURES = [
  { icon: Zap,         title: 'Lightning Fast',    desc: 'Optimized for speed' },
  { icon: ShieldCheck, title: 'Secure by Default', desc: 'JWT + role-based auth' },
  { icon: Palette,     title: 'Fully Customizable', desc: 'Dark mode + themes' },
  { icon: Sparkles,    title: 'Modern UX',         desc: 'Delightful animations' },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">

      {/* ── LEFT: Branding side ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/10"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold">{APP_CONFIG.name}</span>
          </motion.div>

          {/* Hero */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl font-bold mb-3 leading-tight">
                Manage Your Portfolio
                <br />
                With Ease. 🚀
              </h2>
              <p className="text-white/80 text-lg">
                A powerful admin dashboard for WordPress & Flutter developers.
              </p>
            </motion.div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <f.icon className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-white/60"
          >
            © {new Date().getFullYear()} {APP_CONFIG.author}. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* ── RIGHT: Form side ── */}
      <div className="flex-1 flex flex-col">
        {/* Theme toggle at top */}
        <div className="flex justify-end p-6">
          <ThemeToggle />
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold">{APP_CONFIG.name}</span>
            </div>

            {/* Title */}
            {title && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                {subtitle && (
                  <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
                )}
              </div>
            )}

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}