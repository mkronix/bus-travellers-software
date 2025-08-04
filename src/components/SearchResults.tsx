import { Badge } from '@/components/ui/badge';
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
import { useState } from 'react';

interface BusResult {
  id: number;
  operator: string;
  busType: 'AC' | 'Non-AC';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  amenities: string[];
  seats: number;
  boardingPoints: string[];
  droppingPoints: string[];
}

interface SearchResultsProps {
  searchData: {
    from: string;
    to: string;
    date: Date | undefined;
    passengers: number;
  };
  onBusSelect: (bus: BusResult) => void;
  onBackToSearch: () => void;
}

const SearchResults = ({ searchData, onBusSelect, onBackToSearch }: SearchResultsProps) => {
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const busResults: BusResult[] = [
    {
      id: 1,
      operator: "Rajdhani Express",
      busType: "AC",
      departureTime: "06:30",
      arrivalTime: "14:30",
      duration: "8h 00m",
      price: 1450,
      rating: 4.5,
      reviews: 128,
      amenities: ["AC", "WiFi", "Charging Port", "Blanket", "Water Bottle"],
      seats: 25,
      boardingPoints: ["Railway Station", "Bus Stand", "Mall Road"],
      droppingPoints: ["SG Highway", "Iscon Circle", "Bopal"]
    },
    {
      id: 2,
      operator: "Gujarat Express",
      busType: "Non-AC",
      departureTime: "22:15",
      arrivalTime: "06:45",
      duration: "8h 30m",
      price: 950,
      rating: 4.0,
      reviews: 89,
      amenities: ["Fan", "Charging Port", "Music System", "Water Bottle"],
      seats: 18,
      boardingPoints: ["Central Bus Station", "Ring Road"],
      droppingPoints: ["Paldi", "Vastrapur", "Prahlad Nagar"]
    },
    {
      id: 3,
      operator: "Royal Travels",
      busType: "AC",
      departureTime: "14:45",
      arrivalTime: "21:15",
      duration: "6h 30m",
      price: 750,
      rating: 4.2,
      reviews: 67,
      amenities: ["AC", "WiFi", "Snacks", "Music System"],
      seats: 32,
      boardingPoints: ["Bus Terminal", "City Center"],
      droppingPoints: ["Main Station", "Market Square"]
    },
    {
      id: 4,
      operator: "Budget Express",
      busType: "Non-AC",
      departureTime: "09:00",
      arrivalTime: "16:30",
      duration: "7h 30m",
      price: 450,
      rating: 3.8,
      reviews: 45,
      amenities: ["Fan", "Music System", "Water Bottle"],
      seats: 40,
      boardingPoints: ["Old Bus Stand", "Railway Station"],
      droppingPoints: ["Central Square", "Bus Depot"]
    }
  ];

  const handleBusSelect = (bus: BusResult) => {
    console.log('SearchResults: Bus selected:', bus);
    onBusSelect(bus);
  };

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

  // Sort buses
  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return parseFloat(a.duration) - parseFloat(b.duration);
      case 'rating':
        return b.rating - a.rating;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-3 w-3" />;
      case 'AC':
        return <Wind className="h-3 w-3" />;
      case 'Fan':
        return <Wind className="h-3 w-3" />;
      case 'Charging Port':
        return <Zap className="h-3 w-3" />;
      case 'Music System':
        return <Music className="h-3 w-3" />;
      case 'Snacks':
        return <Utensils className="h-3 w-3" />;
      case 'Water Bottle':
        return <Coffee className="h-3 w-3" />;
      case 'Blanket':
        return <Shield className="h-3 w-3" />;
      default:
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  const getBusTypeColor = (busType: string) => {
    if (busType.includes('AC')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <motion.div
        className="bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 md:py-4 sticky top-0 z-40 shadow-sm"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <motion.button
              onClick={onBackToSearch}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </motion.button>
            <div className="flex-1 min-w-0">
              <motion.h1
                className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {searchData.from} → {searchData.to}
              </motion.h1>
              <motion.p
                className="text-gray-700 text-xs md:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {searchData.date?.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })} • {sortedBuses.length} buses found
              </motion.p>
            </div>
          </div>

          {/* Filters and Sort */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex gap-2 md:gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 md:w-48 bg-white border-2 hover:border-primary/30 focus:border-primary rounded-xl h-10 md:h-12 text-xs md:text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="flex-1 md:w-48 bg-white border-2 hover:border-primary/30 focus:border-primary rounded-xl h-10 md:h-12 text-xs md:text-sm">
                  <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buses</SelectItem>
                  <SelectItem value="ac">AC Only</SelectItem>
                  <SelectItem value="nonac">Non-AC Only</SelectItem>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                  <SelectItem value="seater">Seater</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <motion.button
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-medium text-sm"
              onClick={() => setShowFilters(!showFilters)}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4" />
              Quick Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Mobile Quick Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden p-3 bg-gray-50 rounded-xl"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'ac', label: 'AC' },
                      { key: 'nonac', label: 'Non-AC' },
                      { key: 'sleeper', label: 'Sleeper' },
                      { key: 'seater', label: 'Seater' }
                    ].map((filter) => (
                      <motion.button
                        key={filter.key}
                        className={`px-3 py-2 bg-white rounded-lg text-sm font-medium border transition-colors ${filterBy === filter.key
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'hover:border-primary/30'
                          }`}
                        onClick={() => setFilterBy(filter.key)}
                        whileTap={{ scale: 0.95 }}
                      >
                        {filter.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Bus Results */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 lg:py-8">
        <motion.div
          className="space-y-3 md:space-y-4 lg:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedBuses.map((bus, index) => (
            <motion.div
              key={bus.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-3 md:p-4 lg:p-6">
                  {/* Mobile Layout */}
                  <div className="block lg:hidden">
                    {/* Bus Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Bus className="h-4 w-4 text-primary flex-shrink-0" />
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{bus.operator}</h3>
                          {bus.rating >= 4.0 && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              <Award className="h-2 w-2 mr-1" />
                              Top
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getBusTypeColor(bus.busType)}`}>
                            {bus.busType}
                          </Badge>
                          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg">
                            <Star className="h-3 w-3 text-green-600 fill-current" />
                            <span className="text-xs font-semibold text-green-800">{bus.rating}</span>
                            <span className="text-xs text-green-600">({bus.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-xs text-gray-500">₹</span>
                          <span className="text-xl md:text-2xl font-bold text-gray-900">{bus.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3 text-green-600" />
                          <span className="text-green-600 font-medium">{bus.seats} left</span>
                        </div>
                      </div>
                    </div>

                    {/* Time Section */}
                    <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{bus.departureTime}</p>
                        <p className="text-xs text-gray-600">{searchData.from}</p>
                      </div>
                      <div className="flex-1 text-center px-2">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <div className="h-0.5 bg-gradient-to-r from-primary to-secondary flex-1 mx-2"></div>
                          <Clock className="h-3 w-3 text-secondary" />
                          <div className="h-0.5 bg-gradient-to-r from-secondary to-primary flex-1 mx-2"></div>
                          <div className="h-1.5 w-1.5 bg-secondary rounded-full"></div>
                        </div>
                        <p className="text-xs text-gray-700 font-medium">{bus.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{bus.arrivalTime}</p>
                        <p className="text-xs text-gray-600">{searchData.to}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {bus.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs flex items-center gap-1 bg-blue-50 border-blue-200 text-blue-800"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </Badge>
                      ))}
                      {bus.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{bus.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Select Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg w-full py-2.5 rounded-xl font-semibold text-sm"
                        onClick={() => handleBusSelect(bus)}
                      >
                        Select Seats
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="grid grid-cols-4 gap-6">
                      {/* Bus Info */}
                      <div className="col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Bus className="h-5 w-5 text-primary" />
                              <h3 className="text-xl font-semibold text-gray-900">{bus.operator}</h3>
                              {bus.rating >= 4.0 && (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <Award className="h-3 w-3 mr-1" />
                                  Top Rated
                                </Badge>
                              )}
                            </div>
                            <Badge className={`text-sm ${getBusTypeColor(bus.busType)} mb-2`}>
                              {bus.busType}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg">
                            <Star className="h-4 w-4 text-green-600 fill-current" />
                            <span className="text-sm font-semibold text-green-800">{bus.rating}</span>
                            <span className="text-xs text-green-600">({bus.reviews})</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.map((amenity, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Badge
                                variant="outline"
                                className="text-xs flex items-center gap-1 bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"
                              >
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Time & Duration */}
                      <div className="flex items-center justify-center">
                        <div className="text-center w-full">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900">{bus.departureTime}</p>
                              <p className="text-sm text-gray-600">{searchData.from}</p>
                            </div>

                            <div className="text-center px-2">
                              <div className="flex items-center justify-center mb-1">
                                <div className="h-2 w-2 bg-primary rounded-full"></div>
                                <div className="h-0.5 bg-gradient-to-r from-primary to-secondary flex-1 mx-2 w-16"></div>
                                <Clock className="h-4 w-4 text-secondary" />
                                <div className="h-0.5 bg-gradient-to-r from-secondary to-primary flex-1 mx-2 w-16"></div>
                                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                              </div>
                              <p className="text-sm text-gray-700 font-medium">{bus.duration}</p>
                            </div>

                            <div className="text-center">
                              <p className="text-2xl font-bold text-gray-900">{bus.arrivalTime}</p>
                              <p className="text-sm text-gray-600">{searchData.to}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Booking */}
                      <div className="flex flex-col items-end justify-center">
                        <div className="text-right mb-4">
                          <div className="flex items-baseline justify-end gap-1 mb-1">
                            <span className="text-xs text-gray-500">₹</span>
                            <span className="text-3xl font-bold text-gray-900">{bus.price}</span>
                          </div>
                          <div className="flex items-center justify-end gap-1 text-sm">
                            <Users className="h-3 w-3 text-green-600" />
                            <span className="text-green-600 font-medium">{bus.seats} seats left</span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg px-6 py-2.5 rounded-xl font-semibold"
                            onClick={() => handleBusSelect(bus)}
                          >
                            Select Seats
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Boarding & Dropping Points */}
                    <motion.div
                      className="mt-6 pt-6 border-t border-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <MapPin className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Boarding Points</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bus.boardingPoints.map((point, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
                                >
                                  {point}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <MapPin className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Dropping Points</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bus.droppingPoints.map((point, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100"
                                >
                                  {point}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results State */}
        {sortedBuses.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Button
              onClick={onBackToSearch}
              variant="outline"
              className="border-2 hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
