import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PATHS } from './routes';

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return children;
}