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

//admin pages
const AllAppointments = lazy(
  () =>
    import(
      '@/pages/dashboard/admin-dashboard/all-appointments'
    ),
);
const AllPatients = lazy(
  () =>
    import(
      '@/pages/dashboard/admin-dashboard/all-patients'
    ),
);
const AllDoctors = lazy(
  () =>
    import('@/pages/dashboard/admin-dashboard/all-doctors'),
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
const PaymentDetails = lazy(
  () => import('@/pages/user/profile/paymentDetails'),
);
const PaidAppointments = lazy(
  () => import('@/pages/user/profile/paidAppointment'),
);
const AppointmentsCalendar = lazy(
  () => import('@/pages/user/profile/appointmentsCalendar'),
);
const Patients = lazy(
  () => import('@/pages/dashboard/medical_staff/user'),
);
const MedicalHistoryStaff = lazy(
  () =>
    import('@/pages/dashboard/medical_staff/user-update'),
);

// Appointments Pages
const Appointments = lazy(
  () => import('@/pages/appointments/appointments'),
);
const MyAppointments = lazy(
  () => import('@/pages/appointments/myAppointments'),
);
const ChannelingDetails = lazy(
  () => import('@/pages/appointments/channelingDetails'),
);
const AppointmentForm = lazy(
  () => import('@/pages/appointments/appointmentForm'),
);

const AppointmentUpdateForm = lazy(
  () =>
    import('@/pages/appointments/appointmentUpdateForm'),
);

//payment pages
const Payment = lazy(
  () => import('@/pages/payment/PaymentPage'),
);

// layout
const Layout = lazy(() => import('@/layout'));
const ProfileLayout = lazy(
  () => import('@/pages/user/profile-layout'),
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner className="w-20 h-20" />
  </div>
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
      {
        path: '/appointments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Appointments />
          </Suspense>
        ),
      },
      {
        path: '/payment',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<Payment />}
              roles={[USER_ROLES.USER]}
            />
          </Suspense>
        ),
      },
      {
        path: '/channel/:doctorId',
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
            <ProtectedRoute
              element={<MyAppointments />}
              roles={[USER_ROLES.USER]}
            />
          </Suspense>
        ),
      },
      {
        path: '/appointmentform',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<AppointmentForm />}
              roles={[USER_ROLES.USER]}
            />
          </Suspense>
        ),
      },
      {
        path: '/appointmentupdate',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<AppointmentUpdateForm />}
              roles={[USER_ROLES.USER]}
            />
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
      // admin Layout
      {
        path: 'all-appointments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<AllAppointments />}
              roles={[USER_ROLES.ADMIN]}
            />
          </Suspense>
        ),
      },
      {
        path: 'all-patients',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<AllPatients />}
              roles={[USER_ROLES.ADMIN]}
            />
          </Suspense>
        ),
      },
      {
        path: 'all-doctors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<AllDoctors />}
              roles={[USER_ROLES.ADMIN]}
            />
          </Suspense>
        ),
      },
      // medical staff Layout
      {
        path: 'patients',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<Patients />}
              roles={[USER_ROLES.MEDICAL_STAFF]}
            />
          </Suspense>
        ),
      },
      {
        path: 'patients/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute
              element={<MedicalHistoryStaff />}
              roles={[USER_ROLES.MEDICAL_STAFF]}
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
          {
            path: 'paidappointments',
            element: (
              <Suspense fallback={<PageLoader />}>
                <PaidAppointments />
              </Suspense>
            ),
          },
          {
            path: 'paymentdetails',
            element: (
              <Suspense fallback={<PageLoader />}>
                <PaymentDetails />
              </Suspense>
            ),
          },
          {
            path: 'appointments',
            element: (
              <Suspense fallback={<PageLoader />}>
                <AppointmentsCalendar />
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
