import { useEffect, useState } from 'react';
import {
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  User,
  Calendar,
  Award,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '@/api/user.api';
import avatar from '@/assets/avatar/default.png';
import { Link } from 'react-router-dom';

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    specialization: '',
    status: 'inactive',
    gender: '',
    createdAt: '',
    mobile: '',
    email: '',
    hospitalDetails: [],
    education: [],
    awards: [],
  });
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        setIsLoading(true);
        const data = await getDoctorById(id);
        setDoctorData(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchDoctorData();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="bg-blue-600 h-32 sm:h-48"></div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : doctorData && doctorData.user ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-24">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
                  <img
                    src={avatar}
                    alt="Doctor profile"
                    className="rounded-full h-24 w-24 sm:h-36 sm:w-36 object-cover border-4 border-white shadow-lg mx-auto sm:mx-0"
                  />
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {doctorData.user.fullName ||
                        'Doctor Name'}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start text-blue-600 mt-2">
                      <Stethoscope
                        size={20}
                        className="mr-2"
                      />
                      <span className="font-medium">
                        {doctorData.user.specialization ||
                          'Specialization'}{' '}
                        Specialist
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-center sm:justify-start text-gray-600">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          doctorData.user.status ===
                          'active'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="capitalize">
                        {doctorData.user.status ||
                          'inactive'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-center sm:justify-start text-gray-600">
                      <User size={16} className="mr-2" />
                      <span className="capitalize">
                        {doctorData.user.gender || 'N/A'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-center sm:justify-start text-gray-600">
                      <Calendar
                        size={16}
                        className="mr-2"
                      />
                      <span>
                        Joined{' '}
                        {doctorData.user.createdAt
                          ? new Date(
                              doctorData.user.createdAt,
                            ).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center sm:block">
                  <Link
                  to={`/channel/${doctorData.user._id}`}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors ${
                      doctorData.user.status === 'active'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={
                      doctorData.user.status !== 'active'
                    }
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                      <span className="break-all">
                        {doctorData.user.mobile || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                      <span className="break-all">
                        {doctorData.user.email || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Details */}
              {doctorData.user.hospitalDetails?.length >
                0 && (
                <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Hospital Details
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {doctorData.user.hospitalDetails?.map(
                      (hospital, index) => (
                        <div
                          key={hospital._id || index}
                          className="bg-blue-50 p-4 sm:p-6 rounded-lg"
                        >
                          <div className="flex items-start">
                            <Building2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                            <div className="ml-4 w-full min-w-0">
                              <h3 className="font-medium text-gray-900 break-words">
                                {hospital.hospital ||
                                  'Hospital Name'}
                              </h3>
                              <div className="flex items-center mt-2 text-gray-600">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span className="break-words">
                                  {hospital.location ||
                                    'Location'}
                                </span>
                              </div>
                              <div className="mt-3">
                                <div className="flex items-center text-gray-600 mb-2">
                                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="font-medium">
                                    Available Times:
                                  </span>
                                </div>
                                <div className="space-y-2 ml-6">
                                  {hospital.arrivalTimes?.map(
                                    (time, idx) => (
                                      <div
                                        key={idx}
                                        className="flex justify-between text-sm text-gray-600 border-b border-blue-100 pb-1"
                                      >
                                        <span className="font-medium">
                                          {time.dayOfWeek ||
                                            'Day'}
                                        </span>
                                        <span>
                                          {time.time ||
                                            'Time'}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mt-3 pt-2 border-t border-blue-100">
                                Booking Fee: Rs.{' '}
                                {hospital.bookingFee ||
                                  'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Education & Awards */}
              <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Education & Awards
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Education
                    </h3>
                    <div className="space-y-4">
                      {doctorData.user.education?.map(
                        (edu, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 p-4 rounded-lg"
                          >
                            <div className="flex items-start">
                              <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                              <div className="ml-3 min-w-0">
                                <h4 className="font-medium text-gray-900 break-words">
                                  {edu.degree || 'Degree'}
                                </h4>
                                <p className="text-gray-600 break-words">
                                  {edu.university ||
                                    'University'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {edu.year || 'Year'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Awards */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Awards & Recognition
                    </h3>
                    <div className="space-y-4">
                      {doctorData.user.awards?.map(
                        (award, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 p-4 rounded-lg"
                          >
                            <div className="flex items-start">
                              <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                              <div className="ml-3 min-w-0">
                                <h4 className="font-medium text-gray-900 break-words">
                                  {award.title ||
                                    'Award Title'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {award.year || 'Year'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DoctorProfile;
