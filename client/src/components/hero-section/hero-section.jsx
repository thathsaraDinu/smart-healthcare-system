import { useAuthStore } from '@/store/auth-store';
import {
  FaUserMd,
  FaArrowRight,
  FaStethoscope,
  FaHospital,
  FaAmbulance,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HeroSection({fullName}) {

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-br from-blue-50 to-white">
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80"
          alt="Medical facility"
          className="w-full h-full object-cover md:rounded-l-[80px] shadow-2xl"
        />
        <div className="absolute inset-0 bg-blue-900/20 md:rounded-l-[80px]"></div>
      </div>
      <div className="relative z-10 w-full py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl relative bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl md:rounded-none">
            <div className="flex items-cen  ter space-x-2 mb-6">
              <FaStethoscope className="text-blue-600 text-xl md:text-2xl" />
              <span className="text-blue-600 font-semibold text-sm md:text-base">
                Leading Healthcare Provider in UK
              </span>
            </div>
            {fullName ? (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome,{' '}
                <span className="text-blue-600">
                  {fullName}
                </span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health, <br />
                <span className="text-blue-600">
                  Our Priority
                </span>
              </h1>
            )}

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Experience world-class healthcare with Smart
              Medix. Book appointments, track your health
              records, and connect with expert doctors all
              in one place.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to={'/appointments'}
                className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-700 flex items-center justify-center text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Book Appointment{' '}
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-6">
              <div className="flex items-center space-x-2">
                <FaHospital className="text-blue-600 text-lg md:text-xl" />
                <span className="text-gray-700 text-sm md:text-base">
                  10+ Facilities
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserMd className="text-blue-600 text-lg md:text-xl" />
                <span className="text-gray-700 text-sm md:text-base">
                  100+ Doctors
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaAmbulance className="text-blue-600 text-lg md:text-xl" />
                <span className="text-gray-700 text-sm md:text-base">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
