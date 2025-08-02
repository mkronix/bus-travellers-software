
import { useState } from 'react';
import { Bus, Calendar, MapPin, Search, Users, Star, Clock, Wifi, Coffee, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const featuredBuses = [
    {
      id: 1,
      operator: "Rajkot Express",
      route: "Rajkot → Ahmedabad",
      departureTime: "06:30 AM",
      arrivalTime: "11:30 AM",
      duration: "5h 00m",
      price: 450,
      rating: 4.5,
      reviews: 128,
      amenities: ["AC", "WiFi", "Charging Port"],
      seats: 25
    },
    {
      id: 2,
      operator: "Gujarat Travels",
      route: "Surat → Mumbai",
      departureTime: "10:15 PM",
      arrivalTime: "06:45 AM",
      duration: "8h 30m",
      price: 680,
      rating: 4.3,
      reviews: 89,
      amenities: ["Sleeper", "AC", "Blanket"],
      seats: 12
    },
    {
      id: 3,
      operator: "Shrinath Travels",
      route: "Vadodara → Pune",
      departureTime: "08:00 AM",
      arrivalTime: "02:30 PM",
      duration: "6h 30m",
      price: 520,
      rating: 4.7,
      reviews: 156,
      amenities: ["AC", "TV", "Snacks"],
      seats: 8
    }
  ];

  const popularRoutes = [
    { from: "Rajkot", to: "Ahmedabad", price: "₹450" },
    { from: "Surat", to: "Mumbai", price: "₹680" },
    { from: "Vadodara", to: "Pune", price: "₹520" },
    { from: "Gandhinagar", to: "Delhi", price: "₹1200" }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warmBrown-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-warmBrown-500" />
              <span className="text-2xl font-bold text-browning-900">BusBooking</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-browning-800 hover:text-warmBrown-500 transition-colors">Home</a>
              <a href="#" className="text-browning-800 hover:text-warmBrown-500 transition-colors">My Bookings</a>
              <a href="#" className="text-browning-800 hover:text-warmBrown-500 transition-colors">Help</a>
              <Button className="btn-primary">Login</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warmBrown-100 to-cream-200 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-browning-900 mb-4">
              Book Your <span className="text-warmBrown-500">Journey</span>
            </h1>
            <p className="text-xl text-browning-700 max-w-2xl mx-auto">
              Find and book bus tickets easily. Travel comfortably with trusted operators across India.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm card-shadow">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-warmBrown-500" />
                  <Input
                    placeholder="From City"
                    value={searchData.from}
                    onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                    className="pl-10 input-field"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-warmBrown-500" />
                  <Input
                    placeholder="To City"
                    value={searchData.to}
                    onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                    className="pl-10 input-field"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-warmBrown-500" />
                  <Input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                    className="pl-10 input-field"
                  />
                </div>
                
                <Button className="btn-primary w-full h-12">
                  <Search className="h-5 w-5 mr-2" />
                  Search Buses
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-browning-900 text-center mb-6">Popular Routes</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {popularRoutes.map((route, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white text-browning-800 px-4 py-2 rounded-full cursor-pointer hover:bg-warmBrown-100 transition-colors"
                >
                  {route.from} → {route.to} from {route.price}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Buses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-browning-900 mb-4">Featured Bus Routes</h2>
            <p className="text-browning-700 max-w-2xl mx-auto">
              Popular bus routes with great amenities and trusted operators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBuses.map((bus) => (
              <Card key={bus.id} className="bg-white card-shadow hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-browning-900">{bus.operator}</h3>
                      <p className="text-browning-700">{bus.route}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{bus.rating}</span>
                      <span className="text-xs text-browning-600">({bus.reviews})</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-semibold text-browning-900">{bus.departureTime}</p>
                        <p className="text-xs text-browning-600">Departure</p>
                      </div>
                      <div className="flex-1 text-center">
                        <Clock className="h-4 w-4 text-warmBrown-500 mx-auto mb-1" />
                        <p className="text-sm text-browning-700">{bus.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-browning-900">{bus.arrivalTime}</p>
                        <p className="text-xs text-browning-600">Arrival</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bus.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity === "AC" && <Coffee className="h-3 w-3 mr-1" />}
                        {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                        {amenity === "Charging Port" && <Shield className="h-3 w-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-browning-900">₹{bus.price}</p>
                      <p className="text-sm text-browning-600">{bus.seats} seats left</p>
                    </div>
                    <Button className="btn-primary">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-warmBrown-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-browning-900 mb-4">Why Choose BusBooking?</h2>
            <p className="text-browning-700 max-w-2xl mx-auto">
              Experience hassle-free bus booking with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-warmBrown-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-browning-900 mb-2">Easy Search</h3>
              <p className="text-browning-700">Find buses quickly with our intuitive search interface</p>
            </div>

            <div className="text-center">
              <div className="bg-warmBrown-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-browning-900 mb-2">Safe & Secure</h3>
              <p className="text-browning-700">Your booking and payment information is always protected</p>
            </div>

            <div className="text-center">
              <div className="bg-warmBrown-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-browning-900 mb-2">24/7 Support</h3>
              <p className="text-browning-700">Get help whenever you need it with our round-the-clock support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-browning-900 text-cream-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bus className="h-8 w-8 text-warmBrown-500" />
                <span className="text-2xl font-bold">BusBooking</span>
              </div>
              <p className="text-cream-200">Your trusted partner for comfortable and safe bus travel across India.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-cream-200">
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-cream-200">
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Book Ticket</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Cancel Ticket</a></li>
                <li><a href="#" className="hover:text-warmBrown-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-cream-200">
                <p>📞 +91 98765 43210</p>
                <p>✉️ support@busbooking.com</p>
                <p>📍 123 Travel Street, Gujarat, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-warmBrown-800 mt-8 pt-8 text-center text-cream-300">
            <p>&copy; 2024 BusBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
