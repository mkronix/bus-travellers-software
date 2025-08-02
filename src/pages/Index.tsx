
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Autocomplete } from '@/components/ui/autocomplete';
import { GUJARATI_CITIES } from '@/data/cities';
import { ArrowRight, Award, Bus, Calendar, HeartHandshake, Mail, MapPin, Phone, Shield, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SearchResults from '@/components/SearchResults';
import SeatSelection from '@/components/SeatSelection';
import PassengerForm from '@/components/PassengerForm';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'search' | 'results' | 'seat' | 'passenger'>('search');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: undefined as Date | undefined,
    passengers: 1
  });
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  const handleContinueBooking = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      toast.error('🚌 Please fill all search fields');
      return;
    }
    if (searchData.from === searchData.to) {
      toast.error('🔄 From and To cities cannot be the same');
      return;
    }
    setCurrentStep('results');
  };

  const handleBusSelection = (bus: any) => {
    setSelectedBus(bus);
    setCurrentStep('seat');
  };

  const handleSeatSelection = (seatId: string) => {
    setSelectedSeat(seatId);
    setCurrentStep('passenger');
  };

  const handleBackToSearch = () => {
    setCurrentStep('search');
    setSelectedBus(null);
    setSelectedSeat('');
  };

  const handleBackToResults = () => {
    setCurrentStep('results');
    setSelectedSeat('');
  };

  const handleBackToSeat = () => {
    setCurrentStep('seat');
  };

  // Show different components based on current step
  if (currentStep === 'results') {
    return <SearchResults 
      searchData={searchData} 
      onBusSelect={handleBusSelection}
      onBackToSearch={handleBackToSearch}
    />;
  }

  if (currentStep === 'seat') {
    return <SeatSelection 
      selectedBus={selectedBus}
      searchData={searchData}
      onSeatSelect={handleSeatSelection}
      onBackToResults={handleBackToResults}
    />;
  }

  if (currentStep === 'passenger') {
    return <PassengerForm 
      selectedBus={selectedBus}
      selectedSeat={selectedSeat}
      searchData={searchData}
      onBackToSeat={handleBackToSeat}
    />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bus className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">Rajdhani Travels</span>
                <p className="text-sm text-gray-600">Your Trusted Travel Partner</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                <Bus className="h-4 w-4" />
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                My Bookings
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors duration-200 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Contact
              </a>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Users className="h-4 w-4 mr-2" />
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-secondary" />
              <span className="text-white/90 font-medium">Gujarat's Most Trusted Travel Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-secondary">Perfect Journey</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Safe, comfortable, and affordable bus travel across Gujarat. Experience the difference with Rajdhani Travels.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Autocomplete
                  options={GUJARATI_CITIES}
                  value={searchData.from}
                  onChange={(value) => setSearchData({ ...searchData, from: value })}
                  placeholder="From City"
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                />

                <Autocomplete
                  options={GUJARATI_CITIES.filter(city => city.name !== searchData.from)}
                  value={searchData.to}
                  onChange={(value) => setSearchData({ ...searchData, to: value })}
                  placeholder="To City"
                  icon={<MapPin className="h-4 w-4 text-secondary" />}
                />

                <DatePicker
                  selected={searchData.date}
                  onSelect={(date) => setSearchData({ ...searchData, date })}
                  placeholder="Select Journey Date"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-3 text-lg"
                  onClick={handleContinueBooking}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Continue Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Excellence with Rajdhani Travels</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Your comfort and safety are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary to-primary/80 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-700">Quick and hassle-free bus booking with instant confirmation</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-secondary to-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe Journey</h3>
              <p className="text-gray-700">Well-maintained buses with experienced drivers for your safety</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-700">Round-the-clock customer support for all your travel needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bus className="h-8 w-8 text-secondary" />
                <div>
                  <span className="text-2xl font-bold text-white">Rajdhani Travels</span>
                  <p className="text-sm text-gray-400">Travel with Trust</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">Your reliable partner for comfortable and safe bus travel across Gujarat.</p>
              <div className="flex items-center gap-2 text-secondary">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">+91 98765 43210</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                Popular Routes
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-secondary transition-colors">Ahmedabad → Surat</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Mehsana → Ahmedabad</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Palanpur → Anand</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Bharuch → Navsari</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                Contact Info
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary" />
                  <span>info@rajdhanitravels.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4 text-secondary" />
              &copy; 2024 Rajdhani Travels. All rights reserved.
              <HeartHandshake className="h-4 w-4 text-secondary" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
