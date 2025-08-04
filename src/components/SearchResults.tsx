
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, MapPin, Users, Wifi, Coffee, Snowflake } from 'lucide-react';

interface Bus {
  id: string;
  operatorName: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  amenities: string[];
  rating: number;
  route: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [sortBy, setSortBy] = useState('price');
  const [filterByType, setFilterByType] = useState('all');

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  // Mock bus data - In real app, this would come from API
  useEffect(() => {
    const mockBuses: Bus[] = [
      {
        id: '1',
        operatorName: 'Rajdhani Express',
        busType: 'AC Sleeper',
        departureTime: '22:00',
        arrivalTime: '06:00',
        duration: '8h 0m',
        price: 800,
        seatsAvailable: 12,
        amenities: ['AC', 'WiFi', 'Charging Port', 'Water Bottle'],
        rating: 4.5,
        route: `${from} → ${to}`
      },
      {
        id: '2',
        operatorName: 'Rajdhani Deluxe',
        busType: 'Non-AC Sleeper',
        departureTime: '21:30',
        arrivalTime: '05:30',
        duration: '8h 0m',
        price: 600,
        seatsAvailable: 8,
        amenities: ['Charging Port', 'Water Bottle', 'Blanket'],
        rating: 4.2,
        route: `${from} → ${to}`
      },
      {
        id: '3',
        operatorName: 'Rajdhani Premium',
        busType: 'AC Sleeper',
        departureTime: '20:00',
        arrivalTime: '04:00',
        duration: '8h 0m',
        price: 1000,
        seatsAvailable: 5,
        amenities: ['AC', 'WiFi', 'Charging Port', 'Meals', 'Entertainment'],
        rating: 4.8,
        route: `${from} → ${to}`
      },
      {
        id: '4',
        operatorName: 'Rajdhani Economy',
        busType: 'Non-AC Sleeper',
        departureTime: '23:00',
        arrivalTime: '07:00',
        duration: '8h 0m',
        price: 500,
        seatsAvailable: 15,
        amenities: ['Charging Port', 'Water Bottle'],
        rating: 4.0,
        route: `${from} → ${to}`
      }
    ];
    setBuses(mockBuses);
  }, [from, to]);

  const handleSelectBus = (busId: string) => {
    const selectedBus = buses.find(bus => bus.id === busId);
    if (selectedBus) {
      navigate('/seat-selection', {
        state: {
          bus: selectedBus,
          from,
          to,
          date
        }
      });
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-4 w-4" />;
      case 'AC':
        return <Snowflake className="h-4 w-4" />;
      case 'Meals':
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const sortedAndFilteredBuses = buses
    .filter(bus => {
      if (filterByType === 'all') return true;
      return bus.busType.toLowerCase().includes(filterByType);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-primary"
            >
              ← Back to Search
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              {from} → {to} • {date}
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterByType} onValueChange={setFilterByType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ac">AC Buses</SelectItem>
              <SelectItem value="non-ac">Non-AC Buses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {sortedAndFilteredBuses.map((bus) => (
            <Card key={bus.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Bus Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {bus.operatorName}
                      </h3>
                      <Badge variant={bus.busType.includes('AC') ? 'default' : 'secondary'}>
                        {bus.busType}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">{bus.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {bus.departureTime} - {bus.arrivalTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{bus.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {bus.seatsAvailable} seats available
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {bus.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                          {getAmenityIcon(amenity)}
                          <span className="text-xs text-gray-600">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Select */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{bus.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    
                    <Button
                      onClick={() => handleSelectBus(bus.id)}
                      className="w-full lg:w-auto bg-primary hover:bg-primary/90"
                      disabled={bus.seatsAvailable === 0}
                    >
                      {bus.seatsAvailable === 0 ? 'Sold Out' : 'Select Seats'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAndFilteredBuses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search for a different route.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
