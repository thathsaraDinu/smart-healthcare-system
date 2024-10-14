import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import RootRoute from '@/routes/RootRoute';
import { USER_ROLES } from '@/constants';
import MyAppointments from '@/pages/appointments/myAppointments';
import AppointmentForm from '@/pages/appointments/appointmentForm';

const LoadingSpinner = lazy(() =>
  import('@/components/ui/spinner').then((module) => ({
    default: module.LoadingSpinner,
  })),
);

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
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
const Profile = lazy(() => import('@/pages/user/profile'));

const Appointment = lazy(
  () => import('@/pages/appointments/appointments'),
);
const ChannelingDetails = lazy(
  () => import('@/pages/appointments/channelingDetails'),
);

// layout
const Layout = lazy(() => import('@/layout'));

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
      {
        path: '/appointments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Appointment />
          </Suspense>
        ),
      },
      {
        path: '/channel',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChannelingDetails />
          </Suspense>
        ),
      },
      {
        path: '/myappointments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MyAppointments />
          </Suspense>
        ),
      },
      {
        path: '/appointmentform',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AppointmentForm />
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
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<Profile />}
              roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
            />
          </Suspense>
        ),
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
