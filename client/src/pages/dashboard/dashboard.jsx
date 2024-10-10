import { useAuthStore } from '@/store/auth-store';

function Dashboard() {
  const fullName = useAuthStore((state) => state.fullName);

  return (
    <>
      <h1>Dashboard</h1>

      <h2>User Details</h2>
      <div>Owner: {fullName}</div>
    </>
  );
}

export default Dashboard;
