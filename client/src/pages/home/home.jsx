import HeroSection from '@/components/hero-section/hero-section';
import { useAuthStore } from '@/store/auth-store';
import {
  FaCalendarAlt,
  FaClipboardList,
  FaUserMd,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const fullName = useAuthStore((state) => state.fullName);
  return (
    <div>
      <HeroSection fullName={fullName} />
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Smart Medix?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions
              with a focus on patient comfort and
              convenience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FaCalendarAlt className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Easy Scheduling
              </h3>
              <p className="text-gray-600">
                Book appointments online with your preferred
                doctors at your convenience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FaClipboardList className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Digital Records
              </h3>
              <p className="text-gray-600">
                Access and manage your medical records
                securely from anywhere.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FaUserMd className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Expert Doctors
              </h3>
              <p className="text-gray-600">
                Connect with experienced healthcare
                professionals across various specialties.
              </p>
            </div>
          </div>
        </div>
      </section>
      {!fullName && (
        <section className="bg-blue-600 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Ready to Take Control of Your Health?
            </h2>
            <Link to={'/login'} className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Get Started Today
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
export default Home;
