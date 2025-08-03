import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bus, MapPin, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Easy Bus Booking',
    description: 'Book your bus tickets in just a few clicks with our user-friendly interface.',
    icon: Bus,
    gradient: 'from-[#4E4884] to-[#6B5FAE]',
    bgPattern: 'from-[#4E4884]/10 to-[#93b618]/10',
  },
  {
    id: 2,
    title: 'Real-time Tracking',
    description: 'Track your bus in real-time and get notifications about delays or changes.',
    icon: MapPin,
    gradient: 'from-[#93b618] to-[#A8C733]',
    bgPattern: 'from-[#93b618]/10 to-[#4E4884]/10',
  },
  {
    id: 3,
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-grade security for safe transactions.',
    icon: Shield,
    gradient: 'from-[#6B5FAE] to-[#93b618]',
    bgPattern: 'from-[#6B5FAE]/10 to-[#A8C733]/10',
  },
  {
    id: 4,
    title: 'Smart Suggestions',
    description: 'Get personalized route suggestions based on your travel history.',
    icon: Sparkles,
    gradient: 'from-[#A8C733] to-[#4E4884]',
    bgPattern: 'from-[#A8C733]/10 to-[#6B5FAE]/10',
  },
];

const FeatureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const CurrentIcon = features[currentSlide].icon;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#4E4884]/20 to-[#93b618]/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-gradient-to-br from-[#93b618]/20 to-[#6B5FAE]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-[#A8C733]/20 to-[#4E4884]/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Phone frame */}
      <div className="relative h-full w-full p-8">
        <div className="mx-auto h-full max-w-sm">
          <div className="relative h-full w-full rounded-[3rem] bg-gradient-to-b from-white to-gray-50 p-3 shadow-2xl ring-1 ring-gray-200/50">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-white shadow-inner ring-1 ring-gray-100">
              {/* Notch */}
              <div className="absolute left-1/2 top-3 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-gray-800 shadow-sm" />

              {/* Content */}
              <div className="relative h-full w-full pt-10">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${features[currentSlide].bgPattern} transition-all duration-700 ease-out`} />

                {/* Animated background shapes */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${features[currentSlide].gradient} opacity-10 rounded-full transition-all duration-1000 ease-out transform rotate-12`}></div>
                  <div className={`absolute -bottom-32 -left-16 w-80 h-80 bg-gradient-to-tr ${features[currentSlide].gradient} opacity-5 rounded-full transition-all duration-1000 ease-out`}></div>
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
                  {/* Icon container with bouncy animation */}
                  <div className={`mb-8 h-28 w-28 rounded-3xl bg-gradient-to-br ${features[currentSlide].gradient} shadow-lg flex items-center justify-center transform transition-all duration-500 ease-out hover:scale-105`}>
                    <div className="h-20 w-20 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-inner">
                      <CurrentIcon className="h-10 w-10 text-[#4E4884] animate-pulse" />
                    </div>
                  </div>

                  {/* Title with slide-in animation */}
                  <h3 className="mb-4 text-2xl font-bold text-[#3D3A6B] transition-all duration-500 ease-out transform">
                    {features[currentSlide].title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-600 max-w-xs transition-all duration-500 ease-out">
                    {features[currentSlide].description}
                  </p>

                  {/* Enhanced dots indicator */}
                  <div className="mt-8 flex gap-3">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide
                          ? `bg-gradient-to-r ${features[currentSlide].gradient} w-8 shadow-md`
                          : 'bg-gray-300 w-3 hover:bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Trust badge */}
                  <div className="mt-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#4E4884]/20 shadow-sm">
                    <span className="text-xs font-medium text-[#4E4884]">Trusted by 10,000+ users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className={`h-full bg-gradient-to-r ${features[currentSlide].gradient} rounded-full transition-all duration-5000 ease-linear`}
          style={{ width: `${((currentSlide + 1) / features.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default FeatureSlider;