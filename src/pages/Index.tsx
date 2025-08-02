import { useState } from 'react';
import { Bus, MapPin, Users, Star, Clock, Wifi, Coffee, Shield, Phone, Mail, ArrowRight, Zap, Award, HeartHandshake, Calendar, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Autocomplete } from '@/components/ui/autocomplete';
import { DatePicker } from '@/components/ui/date-picker';
import { GUJARATI_CITIES } from '@/data/cities';
import toast from 'react-hot-toast';

const Index = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: undefined as Date | undefined,
    passengers: 1
  });

  const [showPassengerForm, setShowPassengerForm] = useState(false);

  const handleContinueBooking = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      toast.error('🚌 Please fill all search fields');
      return;
    }
    if (searchData.from === searchData.to) {
      toast.error('🔄 From and To cities cannot be the same');
      return;
    }
    setShowPassengerForm(true);
  };

  const featuredRoutes = [
    {
      id: 1,
      operator: "Rajdhani Travels",
      route: "Ahmedabad → Surat",
      departureTime: "06:30 AM",
      arrivalTime: "10:30 AM",
      duration: "4h 00m",
      price: 280,
      rating: 4.8,
      reviews: 156,
      amenities: ["AC", "WiFi", "Charging Port", "Water"],
      seats: 18
    },
    {
      id: 2,
      operator: "Rajdhani Travels",
      route: "Mehsana → Ahmedabad",
      departureTime: "08:15 AM",
      arrivalTime: "10:45 AM",
      duration: "2h 30m",
      price: 120,
      rating: 4.6,
      reviews: 89,
      amenities: ["AC", "Music System", "Water"],
      seats: 22
    },
    {
      id: 3,
      operator: "Rajdhani Travels",
      route: "Palanpur → Anand",
      departureTime: "07:00 AM",
      arrivalTime: "11:30 AM",
      duration: "4h 30m",
      price: 200,
      rating: 4.7,
      reviews: 134,
      amenities: ["AC", "WiFi", "Charging Port", "Snacks"],
      seats: 15
    }
  ];

  const popularRoutes = [
    { from: "Ahmedabad", to: "Surat", price: "₹280" },
    { from: "Mehsana", to: "Ahmedabad", price: "₹120" },
    { from: "Palanpur", to: "Anand", price: "₹200" },
    { from: "Bharuch", to: "Navsari", price: "₹150" }
  ];

  if (showPassengerForm) {
    return <PassengerInformationForm searchData={searchData} onBack={() => setShowPassengerForm(false)} />;
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
                  onChange={(value) => setSearchData({...searchData, from: value})}
                  placeholder="From City"
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                />
                
                <Autocomplete
                  options={GUJARATI_CITIES.filter(city => city.name !== searchData.from)}
                  value={searchData.to}
                  onChange={(value) => setSearchData({...searchData, to: value})}
                  placeholder="To City"
                  icon={<MapPin className="h-4 w-4 text-secondary" />}
                />
                
                <DatePicker
                  selected={searchData.date}
                  onSelect={(date) => setSearchData({...searchData, date})}
                  placeholder="Select Journey Date"
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">Passengers:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({...searchData, passengers: Math.max(1, searchData.passengers - 1)})}
                      disabled={searchData.passengers <= 1}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="font-semibold text-lg px-4">{searchData.passengers}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchData({...searchData, passengers: Math.min(6, searchData.passengers + 1)})}
                      disabled={searchData.passengers >= 6}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                  onClick={handleContinueBooking}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Continue Booking
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              Popular Routes
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {popularRoutes.map((route, index) => (
                <Badge
                  key={index}
                  className="bg-white/20 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-white/30 transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                >
                  <ArrowRight className="h-3 w-3" />
                  {route.from} → {route.to} from {route.price}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-secondary" />
              <span className="text-secondary font-semibold">FEATURED ROUTES</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Best Bus Routes</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Comfortable journeys with modern amenities and professional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoutes.map((bus) => (
              <Card key={bus.id} className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Bus className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-gray-900">{bus.operator}</h3>
                      </div>
                      <p className="text-gray-700 flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-secondary" />
                        {bus.route}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{bus.rating}</span>
                      <span className="text-xs text-gray-600">({bus.reviews})</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{bus.departureTime}</p>
                      <p className="text-xs text-gray-600">Departure</p>
                    </div>
                    <div className="flex-1 text-center">
                      <Clock className="h-4 w-4 text-secondary mx-auto mb-1" />
                      <p className="text-sm text-gray-700">{bus.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{bus.arrivalTime}</p>
                      <p className="text-xs text-gray-600">Arrival</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bus.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                        {amenity === "AC" && <Coffee className="h-3 w-3 text-primary" />}
                        {amenity === "WiFi" && <Wifi className="h-3 w-3 text-secondary" />}
                        {amenity === "Charging Port" && <Zap className="h-3 w-3 text-primary" />}
                        {amenity === "Water" && <Shield className="h-3 w-3 text-secondary" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{bus.price}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {bus.seats} seats left
                      </p>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

// Passenger Information Form Component
const PassengerInformationForm = ({ searchData, onBack }: { searchData: any; onBack: () => void }) => {
  const [passengers, setPassengers] = useState(
    Array.from({ length: searchData.passengers }, (_, index) => ({
      id: index + 1,
      name: '',
      age: '',
      mobile: '',
      email: ''
    }))
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassenger = (passenger: any, index: number) => {
    const newErrors: Record<string, string> = {};

    if (!passenger.name || passenger.name.length < 2) {
      newErrors[`name-${index}`] = 'Name must be at least 2 characters';
    }

    if (!passenger.age || parseInt(passenger.age) < 1 || parseInt(passenger.age) > 120) {
      newErrors[`age-${index}`] = 'Age must be between 1-120';
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!passenger.mobile || !mobileRegex.test(passenger.mobile)) {
      newErrors[`mobile-${index}`] = 'Please enter a valid Indian mobile number';
    }

    if (passenger.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      newErrors[`email-${index}`] = 'Please enter a valid email';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    let allErrors: Record<string, string> = {};

    passengers.forEach((passenger, index) => {
      const passengerErrors = validatePassenger(passenger, index);
      allErrors = { ...allErrors, ...passengerErrors };
    });

    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      toast.success('✅ Passenger details validated! Proceeding to seat selection...');
      // Navigate to seat selection
    } else {
      toast.error('❌ Please fix the errors in passenger details');
    }
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);

    // Clear error for this field
    const errorKey = `${field}-${index}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Passenger Information</h1>
              <p className="text-gray-700">{searchData.from} → {searchData.to} • {searchData.date?.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Enter Passenger Details</h2>
            </div>
            <p className="text-gray-600">Please provide information for all {searchData.passengers} passenger(s)</p>
          </div>

          <div className="space-y-6">
            {passengers.map((passenger, index) => (
              <Card key={passenger.id} className="bg-white border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Passenger {index + 1}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={passenger.name}
                          onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                          placeholder="Enter full name"
                          className={`w-full h-12 pl-10 pr-4 border-2 rounded-xl transition-colors ${
                            errors[`name-${index}`] ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                          }`}
                        />
                      </div>
                      {errors[`name-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`name-${index}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="number"
                          value={passenger.age}
                          onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                          placeholder="Enter age"
                          min="1"
                          max="120"
                          className={`w-full h-12 pl-10 pr-4 border-2 rounded-xl transition-colors ${
                            errors[`age-${index}`] ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                          }`}
                        />
                      </div>
                      {errors[`age-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`age-${index}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={passenger.mobile}
                          onChange={(e) => updatePassenger(index, 'mobile', e.target.value)}
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          className={`w-full h-12 pl-10 pr-4 border-2 rounded-xl transition-colors ${
                            errors[`mobile-${index}`] ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                          }`}
                        />
                      </div>
                      {errors[`mobile-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`mobile-${index}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          value={passenger.email}
                          onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                          placeholder="Enter email address"
                          className={`w-full h-12 pl-10 pr-4 border-2 rounded-xl transition-colors ${
                            errors[`email-${index}`] ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                          }`}
                        />
                      </div>
                      {errors[`email-${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`email-${index}`]}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={onBack} className="px-8">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back
            </Button>
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Continue to Seat Selection
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
