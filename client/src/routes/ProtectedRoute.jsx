import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';

const ProtectedRoute = ({ element, roles }) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-32 h-32" />
      </div>
    );
  }

  return isAuthenticated && roles.includes(role) ? (
    element
  ) : !isAuthenticated && roles.length === 0 ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

// Prop types
ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};
