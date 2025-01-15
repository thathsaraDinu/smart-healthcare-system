import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 md:max-w-[calc(100vw/2)]">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="text-blue-500 text-2xl font-extrabold">
                  Smart
                </div>
                <div className="text-blue-900 text-2xl font-extrabold">
                  Medix
                </div>
              </div>
            </Link>
            <div className="mt-4 text-gray-500">
              Health care refers to the efforts that medical
              professionals make to restore our physical and
              mental well-being. The term also includes the
              provision of services to maintain emotional
              well-being. We call people and organizations
              that provide these services SmartMedix
              providers.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Overview
              </h2>
              <ul className="text-gray-500 font-medium gap-2 flex flex-col">
                <li>
                  <a href="#" className="hover:underline">
                    Medicines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    healthcare Devices
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    health Progress
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Company
              </h2>
              <ul className="text-gray-500 font-medium gap-2 flex flex-col">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:underline"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Explore
              </h2>
              <ul className="text-gray-500 font-medium gap-2 flex flex-col">
                <li>
                  <a href="#" className="hover:underline">
                    Blogs and Feeds
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cookies Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Part */}
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center0">
            © 2024{' '}
            <a
              href="https://github.com/ShanelkaPramuditha/smart-healthcare-system"
              className="hover:underline"
            >
              Smart Medix
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Facebook */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
            >
              <FaFacebook className="w-4 h-4" />
              <span className="sr-only">Facebook</span>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 ms-5"
            >
              <FaInstagram className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
            {/* Twitter */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 ms-5"
            >
              <FaTwitter className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
