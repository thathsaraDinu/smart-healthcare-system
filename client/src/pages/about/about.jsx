import {
  FaAward,
  FaUsers,
  FaBuilding,
  FaBullseye,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[400px] flex items-center">
        <div className="absolute inset-0 z-0 ">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
            alt="Medical team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Smart Medix
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            At Smart Medix, we are revolutionizing
            healthcare with cutting-edge technology and a
            patient-centric approach. Our commitment to
            innovation, excellence, and compassionate care
            ensures that every individual receives the best
            possible health solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Smart Medix, our mission is to provide
                accessible, high-quality healthcare services
                to all our patients. We strive to combine
                cutting-edge technology with compassionate
                care to ensure the best possible health
                outcomes for our community.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where healthcare is
                seamlessly integrated with technology,
                making it more accessible, efficient, and
                patient-centered. Smart Medix aims to be at
                the forefront of this healthcare revolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                2+
              </div>
              <div className="text-blue-100">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                10+
              </div>
              <div className="text-blue-100">
                Patients Served
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                5+
              </div>
              <div className="text-blue-100">
                Expert Doctors
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                98%
              </div>
              <div className="text-blue-100">
                Patient Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaAward className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                Striving for the highest standards in
                healthcare delivery
              </p>
            </div>
            <div className="text-center">
              <FaUsers className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Compassion
              </h3>
              <p className="text-gray-600">
                Treating every patient with care and
                understanding
              </p>
            </div>
            <div className="text-center">
              <FaBuilding className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Embracing new technologies and methods
              </p>
            </div>
            <div className="text-center">
              <FaBullseye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                Maintaining the highest ethical standards
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
