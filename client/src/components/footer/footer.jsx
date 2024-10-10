import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="dark bg-gray-900 text-gray-200 py-6">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()}. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="https://github.com/ShanelkaPramuditha/smart-healthcare-system"
            className="text-gray-400 hover:text-gray-100 transition-colors"
            target="_blank"
          >
            <FaGithub className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
