import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bus,
  CheckCircle,
  ChevronDown,
  Clock,
  Coffee,
  Filter,
  MapPin,
  Music,
  Shield,
  Star,
  Users,
  Utensils,
  Wifi,
  Wind,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';

interface BusResult {
  id: number;
  operator: string;
  busType: 'AC' | 'Non-AC';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  rating: number;
  reviews: number;
  amenities: string[];
  route: string;
}

interface SearchData {
  from: string;
  to: string;
  date: Date;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state?.searchData as SearchData;
  const [sortBy, setSortBy] = useState('departure');
  const [filterBy, setFilterBy] = useState('all');

  // Redirect to home if no search data
  if (!searchData) {
    navigate('/');
    return null;
  }

  const busResults: BusResult[] = [
    {
      id: 1,
      operator: "Rajdhani Express",
      busType: "AC",
      departureTime: "06:30",
      arrivalTime: "14:30",
      duration: "8h 00m",
      price: 850,
      seatsAvailable: 12,
      rating: 4.5,
      reviews: 234,
      amenities: ['wifi', 'charging', 'entertainment', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 2,
      operator: "Royal Cruiser",
      busType: "Non-AC",
      departureTime: "07:00",
      arrivalTime: "16:00",
      duration: "9h 00m",
      price: 600,
      seatsAvailable: 20,
      rating: 4.2,
      reviews: 189,
      amenities: ['charging', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 3,
      operator: "City Liner",
      busType: "AC",
      departureTime: "08:00",
      arrivalTime: "15:00",
      duration: "7h 00m",
      price: 900,
      seatsAvailable: 8,
      rating: 4.7,
      reviews: 312,
      amenities: ['wifi', 'charging', 'entertainment', 'snacks', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 4,
      operator: "Green Travels",
      busType: "AC",
      departureTime: "09:00",
      arrivalTime: "17:00",
      duration: "8h 00m",
      price: 800,
      seatsAvailable: 15,
      rating: 4.3,
      reviews: 201,
      amenities: ['wifi', 'charging', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 5,
      operator: "Orange Tours",
      busType: "Non-AC",
      departureTime: "10:00",
      arrivalTime: "19:00",
      duration: "9h 00m",
      price: 550,
      seatsAvailable: 25,
      rating: 4.0,
      reviews: 156,
      amenities: ['charging', 'blanket'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 6,
      operator: "Blue Bird",
      busType: "AC",
      departureTime: "11:00",
      arrivalTime: "18:00",
      duration: "7h 00m",
      price: 950,
      seatsAvailable: 10,
      rating: 4.8,
      reviews: 356,
      amenities: ['wifi', 'charging', 'entertainment', 'snacks', 'blanket', 'pillow', 'meals'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 7,
      operator: "Red Bus Co.",
      busType: "AC",
      departureTime: "12:00",
      arrivalTime: "20:00",
      duration: "8h 00m",
      price: 820,
      seatsAvailable: 18,
      rating: 4.4,
      reviews: 211,
      amenities: ['wifi', 'charging', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 8,
      operator: "Yellow Lines",
      busType: "Non-AC",
      departureTime: "13:00",
      arrivalTime: "22:00",
      duration: "9h 00m",
      price: 580,
      seatsAvailable: 22,
      rating: 4.1,
      reviews: 178,
      amenities: ['charging', 'blanket'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 9,
      operator: "Purple Rides",
      busType: "AC",
      departureTime: "14:00",
      arrivalTime: "21:00",
      duration: "7h 00m",
      price: 920,
      seatsAvailable: 9,
      rating: 4.6,
      reviews: 301,
      amenities: ['wifi', 'charging', 'entertainment', 'snacks', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    },
    {
      id: 10,
      operator: "Silver Streak",
      busType: "AC",
      departureTime: "15:00",
      arrivalTime: "23:00",
      duration: "8h 00m",
      price: 880,
      seatsAvailable: 14,
      rating: 4.5,
      reviews: 245,
      amenities: ['wifi', 'charging', 'blanket', 'pillow'],
      route: `${searchData.from} → ${searchData.to}`
    }
  ];

  const filteredBuses = busResults.filter(bus => {
    switch (filterBy) {
      case 'ac':
        return bus.busType.includes('AC');
      case 'nonac':
        return bus.busType.includes('Non-AC');
      default:
        return true;
    }
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filters = [
    { key: 'all', label: 'All Buses', icon: Bus },
    { key: 'ac', label: 'AC', icon: Wind },
    { key: 'nonac', label: 'Non-AC', icon: Bus }
  ];

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      wifi: Wifi,
      charging: Zap,
      entertainment: Music,
      snacks: Coffee,
      blanket: Shield,
      pillow: Award,
      meals: Utensils,
      reading: CheckCircle
    };
    return icons[amenity] || CheckCircle;
  };

  const handleSelectBus = (bus: BusResult) => {
    navigate('/seat-selection', {
      state: {
        selectedBus: bus,
        searchData
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchData.from} → {searchData.to}
            </h1>
            <p className="text-gray-600">
              {searchData.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Bus Type
                    </label>
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <motion.button
                          key={filter.key}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            filterBy === filter.key
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                          }`}
                          onClick={() => setFilterBy(filter.key)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <filter.icon className="h-4 w-4" />
                          {filter.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="departure">Departure Time</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {sortedBuses.length} buses found
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {sortedBuses.map((bus) => (
                  <motion.div
                    key={bus.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                          {/* Bus Info */}
                          <div className="lg:col-span-3">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {bus.operator}
                            </h3>
                            <p className="text-sm text-gray-600">{bus.busType}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{bus.rating}</span>
                              <span className="text-xs text-gray-500">({bus.reviews})</span>
                            </div>
                          </div>

                          {/* Timing */}
                          <div className="lg:col-span-3">
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">
                                  {bus.departureTime}
                                </p>
                                <p className="text-sm text-gray-600">{searchData.from}</p>
                              </div>
                              <div className="flex-1 mx-4">
                                <div className="flex items-center justify-center">
                                  <div className="flex-1 h-px bg-gray-300"></div>
                                  <div className="px-3 text-xs text-gray-600 bg-gray-50 rounded-full">
                                    {bus.duration}
                                  </div>
                                  <div className="flex-1 h-px bg-gray-300"></div>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">
                                  {bus.arrivalTime}
                                </p>
                                <p className="text-sm text-gray-600">{searchData.to}</p>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="lg:col-span-3">
                            <div className="flex flex-wrap gap-2">
                              {bus.amenities.slice(0, 4).map((amenity, index) => {
                                const IconComponent = getAmenityIcon(amenity);
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
                                  >
                                    <IconComponent className="h-3 w-3 text-gray-600" />
                                    <span className="text-xs text-gray-600 capitalize">
                                      {amenity}
                                    </span>
                                  </div>
                                );
                              })}
                              {bus.amenities.length > 4 && (
                                <span className="text-xs text-gray-500">
                                  +{bus.amenities.length - 4} more
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {bus.seatsAvailable} seats available
                            </p>
                          </div>

                          {/* Price & Select */}
                          <div className="lg:col-span-3 text-right">
                            <div className="mb-3">
                              <p className="text-2xl font-bold text-gray-900">
                                ₹{bus.price.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">per person</p>
                            </div>
                            <Button
                              onClick={() => handleSelectBus(bus)}
                              className="w-full bg-primary hover:bg-primary/90 text-white"
                            >
                              Select Seats
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {sortedBuses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No buses found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
