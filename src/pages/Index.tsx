
import { useState } from 'react';
import { Bus, Calendar, MapPin, Search, Users, Star, Clock, Wifi, Coffee, Shield, Phone, Mail, ArrowRight, Zap, Award, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Autocomplete } from '@/components/ui/autocomplete';
import { GUJARATI_CITIES } from '@/data/cities';
import toast from 'react-hot-toast';

const Index = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const handleSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      toast.error('🚌 Please fill all search fields');
      return;
    }
    if (searchData.from === searchData.to) {
      toast.error('🔄 From and To cities cannot be the same');
      return;
    }
    toast.success('🔍 Searching buses...');
    // Navigate to search results
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bus className="h-8 w-8 icon-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rajdhani-secondary rounded-full animate-pulse-soft"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-gradient">Rajdhani Travels</span>
                <p className="text-sm text-gray-600">Your Trusted Travel Partner</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-rajdhani-primary transition-colors duration-200 flex items-center gap-1">
                <Bus className="h-4 w-4" />
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-rajdhani-primary transition-colors duration-200 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                My Bookings
              </a>
              <a href="#" className="text-gray-700 hover:text-rajdhani-primary transition-colors duration-200 flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Contact
              </a>
              <Button className="btn-primary">
                <Users className="h-4 w-4" />
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-yellow-400" />
              <span className="text-white/90 font-medium">Gujarat's Most Trusted Travel Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-rajdhani-secondary">Perfect Journey</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Safe, comfortable, and affordable bus travel across Gujarat. Experience the difference with Rajdhani Travels.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm card-shadow">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Autocomplete
                  options={GUJARATI_CITIES}
                  value={searchData.from}
                  onChange={(value) => setSearchData({...searchData, from: value})}
                  placeholder="From City"
                  icon={<MapPin className="h-5 w-5 icon-primary" />}
                />
                
                <Autocomplete
                  options={GUJARATI_CITIES.filter(city => city.name !== searchData.from)}
                  value={searchData.to}
                  onChange={(value) => setSearchData({...searchData, to: value})}
                  placeholder="To City"
                  icon={<MapPin className="h-5 w-5 icon-secondary" />}
                />
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 icon-primary" />
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    className="input-field pl-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <Button className="btn-primary w-full h-12" onClick={handleSearch}>
                  <Search className="h-5 w-5" />
                  Search Buses
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-rajdhani-secondary" />
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
              <Star className="h-6 w-6 icon-secondary" />
              <span className="text-rajdhani-secondary font-semibold">FEATURED ROUTES</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Best Bus Routes</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Comfortable journeys with modern amenities and professional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoutes.map((bus) => (
              <Card key={bus.id} className="bg-white card-shadow hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Bus className="h-5 w-5 icon-primary" />
                        <h3 className="text-lg font-semibold text-gray-900">{bus.operator}</h3>
                      </div>
                      <p className="text-gray-700 flex items-center gap-1">
                        <MapPin className="h-4 w-4 icon-secondary" />
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
                      <Clock className="h-4 w-4 icon-secondary mx-auto mb-1" />
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
                        {amenity === "AC" && <Coffee className="h-3 w-3 icon-primary" />}
                        {amenity === "WiFi" && <Wifi className="h-3 w-3 icon-secondary" />}
                        {amenity === "Charging Port" && <Zap className="h-3 w-3 icon-primary" />}
                        {amenity === "Water" && <Shield className="h-3 w-3 icon-secondary" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-rajdhani-primary">₹{bus.price}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {bus.seats} seats left
                      </p>
                    </div>
                    <Button className="btn-primary">
                      <Calendar className="h-4 w-4" />
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
              <HeartHandshake className="h-6 w-6 icon-primary" />
              <span className="text-rajdhani-primary font-semibold">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Excellence with Rajdhani Travels</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Your comfort and safety are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-rajdhani-primary to-rajdhani-primaryLight w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-700">Quick and hassle-free bus booking with instant confirmation</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-rajdhani-secondary to-rajdhani-secondaryLight w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe Journey</h3>
              <p className="text-gray-700">Well-maintained buses with experienced drivers for your safety</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-rajdhani-primary to-rajdhani-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
                <Bus className="h-8 w-8 text-rajdhani-secondary" />
                <div>
                  <span className="text-2xl font-bold text-white">Rajdhani Travels</span>
                  <p className="text-sm text-gray-400">Travel with Trust</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">Your reliable partner for comfortable and safe bus travel across Gujarat.</p>
              <div className="flex items-center gap-2 text-rajdhani-secondary">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">+91 98765 43210</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rajdhani-secondary" />
                Popular Routes
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Ahmedabad → Surat</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Mehsana → Ahmedabad</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Palanpur → Anand</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Bharuch → Navsari</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-rajdhani-secondary" />
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-rajdhani-secondary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-rajdhani-secondary" />
                Contact Info
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-rajdhani-secondary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rajdhani-secondary" />
                  <span>info@rajdhanitravels.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-rajdhani-secondary" />
                  <span>Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4 text-rajdhani-secondary" />
              &copy; 2024 Rajdhani Travels. All rights reserved.
              <HeartHandshake className="h-4 w-4 text-rajdhani-secondary" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
