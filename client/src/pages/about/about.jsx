const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10 container mx-auto">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          We are committed to connecting patients with the
          best healthcare providers. Our platform makes it
          easier than ever to find and book appointments
          with trusted doctors and hospitals.
        </p>

        {/* Section Cards */} 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To simplify the healthcare journey for
              patients by providing an intuitive platform to
              search, book, and manage medical appointments
              with ease.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To create a healthier world where everyone has
              access to quality medical care at their
              fingertips.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Values
            </h2>
            <ul className="list-none space-y-2 text-gray-600">
              <li>🌟 Patient First</li>
              <li>🌟 Transparency</li>
              <li>🌟 Innovation</li>
              <li>🌟 Trust</li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform is built with your convenience in
            mind. From advanced filtering options to
            seamless booking processes, we are committed to
            enhancing your healthcare experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
