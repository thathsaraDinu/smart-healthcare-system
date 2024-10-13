import { useAuthStore } from '@/store/auth-store';

function SuperDashboard() {
  const fullName = useAuthStore((state) => state.fullName);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>Welcome, {fullName}</h2>
    </>
  );
}

export default SuperDashboard;
