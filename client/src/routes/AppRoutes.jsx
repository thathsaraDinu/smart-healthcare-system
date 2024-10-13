import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import RootRoute from '@/routes/RootRoute';
import { USER_ROLES } from '@/constants';

const LoadingSpinner = lazy(() =>
  import('@/components/ui/spinner').then((module) => ({
    default: module.LoadingSpinner,
  })),
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner className="w-32 h-32" />
  </div>
);

// Private Route
const ProtectedRoute = lazy(
  () => import('@/routes/ProtectedRoute'),
);

// Auth Pages
const Register = lazy(
  () => import('@/pages/user/register'),
);
const Login = lazy(() => import('@/pages/user/login'));

// Profile Pages
const Profile = lazy(() => import('@/pages/user/profile'));
const MedicalHistory = lazy(
  () => import('@/pages/user/profile/medical-history'),
);
const Treatments = lazy(
  () => import('@/pages/user/profile/treatments'),
);

// layout
const Layout = lazy(() => import('@/layout'));
const ProfileLayout = lazy(
  () => import('@/pages/user/profile-layout'),
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RootRoute />
          </Suspense>
        ),
      },

      // Auth Routes
      {
        path: 'register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<Register />}
              roles={[]}
            />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<Login />}
              roles={[]}
            />
          </Suspense>
        ),
      },

      // Profile Layout
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<ProfileLayout />}
              roles={[USER_ROLES.USER]}
            />
          </Suspense>
        ),
        path: 'profile',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<PageLoader />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: 'history',
            element: (
              <Suspense fallback={<PageLoader />}>
                <MedicalHistory />
              </Suspense>
            ),
          },
          {
            path: 'treatments',
            element: (
              <Suspense fallback={<PageLoader />}>
                <Treatments />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // 404 Not Found Route
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
