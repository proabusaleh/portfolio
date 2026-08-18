import { useAuthStore } from '../store/authStore';
import * as authApi from '../api/authApi';
import { toast } from 'sonner';

export function useAuth() {
  const { user, token, isAuthenticated, login: setLogin, logout: setLogout } = useAuthStore();

  const login = async ({ email, password }) => {
    try {
      const { user, token } = await authApi.login({ email, password });
      setLogin(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    } catch (err) {
      const msg = err.response?.data?.errors?.email?.[0]
        || err.response?.data?.message
        || 'Login failed';
      toast.error(msg);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logoutApi();
    } catch { /* even if server fails, log out locally */ }
    setLogout();
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email) => {
    try {
      await authApi.forgotPassword({ email });
      toast.success('Reset link sent! Check your email.');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
      return false;
    }
  };

  return { user, token, isAuthenticated, login, logout, forgotPassword };
}
