
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    id: 1,
    title: 'Easy Bus Booking',
    description: 'Book your bus tickets in just a few clicks with our user-friendly interface.',
    image: '/placeholder.svg',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Real-time Tracking',
    description: 'Track your bus in real-time and get notifications about delays or changes.',
    image: '/placeholder.svg',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 3,
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-grade security for safe transactions.',
    image: '/placeholder.svg',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 4,
    title: 'Smart Suggestions',
    description: 'Get personalized route suggestions based on your travel history.',
    image: '/placeholder.svg',
    gradient: 'from-purple-500 to-pink-600',
  },
];

const FeatureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-black/20" />
      
      {/* iPhone-style frame */}
      <div className="relative h-full w-full p-8">
        <div className="mx-auto h-full max-w-sm">
          {/* Phone frame */}
          <div className="relative h-full w-full rounded-[3rem] bg-black p-2 shadow-2xl">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white">
              {/* Notch */}
              <div className="absolute left-1/2 top-2 z-10 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />
              
              {/* Content */}
              <div className="relative h-full w-full pt-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${features[currentSlide].gradient} opacity-90`} />
                
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                  <div className="mb-8 h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <img
                      src={features[currentSlide].image}
                      alt={features[currentSlide].title}
                      className="h-16 w-16 object-contain opacity-80"
                    />
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold">
                    {features[currentSlide].title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed opacity-90">
                    {features[currentSlide].description}
                  </p>
                  
                  {/* Dots indicator */}
                  <div className="mt-8 flex gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FeatureSlider;
