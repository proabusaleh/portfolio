import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PATHS } from './routes';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 🚀 Real auth guard (bypass disabled)
  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATHS.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  // Role-based access check
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return children;
}