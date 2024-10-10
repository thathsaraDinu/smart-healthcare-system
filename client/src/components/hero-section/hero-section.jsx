import { useState, useEffect } from 'react';
import HeroImg1 from '../../assets/hero/hero1.jpg';
import HeroImg2 from '../../assets/hero/hero2.jpg';
import HeroImg3 from '../../assets/hero/hero3.jpg';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const heroImages = [HeroImg1, HeroImg2, HeroImg3];
  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );

  const fullName = useAuthStore((state) => state.fullName);

  const navigate = useNavigate();

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % heroImages.length,
      );
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [heroImages.length]);

  return (
    <div className="relative container py-11 lg:py-11">
      {/* Grid */}
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div className="lg:col-span-3">
          {!isLoggedIn && (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Welcome to HealthCare
            </h1>
          )}
          {isLoggedIn && (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hi {fullName}, Welcome back!
            </h1>
          )}
          <p className="mt-3 text-xl text-muted-foreground">
            Get better experience with Us!
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            We provide the best healthcare services for you.
            Our services are designed to help you feel
            better and live a healthier life. Click below to
            learn more.
          </p>
          <Button
            onClick={() => {
              navigate('#');
            }}
            className="mt-6"
          >
            Click Here
          </Button>
        </div>
        {/* End Col */}
        <div className="lg:col-span-4 mt-10 lg:mt-0 relative">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-xl w-full h-48 sm:h-64 md:h-80 lg:h-96">
            {/* Images with sliding effect */}
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-full h-full object-cover flex-shrink-0"
                  alt={`Hero Image ${index + 1}`}
                />
              ))}
            </div>

            {/* Image Changer Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    currentImageIndex === index
                      ? 'bg-white'
                      : 'bg-gray-400'
                  }`}
                  onClick={() =>
                    setCurrentImageIndex(index)
                  }
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}
