
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Coffee, Filter, MapPin, Shield, Star, Wifi } from 'lucide-react';
import { useState } from 'react';

interface BusResult {
  id: number;
  operator: string;
  busType: string;
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

const SearchResults = () => {
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');

  const busResults: BusResult[] = [
    {
      id: 1,
      operator: "Rajdhani Express",
      busType: "AC Sleeper",
      departureTime: "04:30",
      arrivalTime: "9:30",
      duration: "14h 00m",
      price: 1450,
      rating: 4.5,
      reviews: 128,
      amenities: ["AC", "WiFi", "Charging Port", "Blanket"],
      seats: 25,
      boardingPoints: ["Railway Station", "Bus Stand", "Mall Road"],
      droppingPoints: ["SG Highway", "Iscon Circle", "Bopal"]
    },
    {
      id: 2,
      operator: "Rajdhani Express",
      busType: "Non-AC Seater",
      departureTime: "08:15",
      arrivalTime: "10:45",
      duration: "15h 30m",
      price: 1550,
      rating: 4.2,
      reviews: 89,
      amenities: ["Charging Port", "Music System"],
      seats: 12,
      boardingPoints: ["Central Bus Station", "Ring Road"],
      droppingPoints: ["Paldi", "Vastrapur", "Prahlad Nagar"]
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="h-3 w-3" />;
      case 'AC':
        return <Coffee className="h-3 w-3" />;
      default:
        return <Shield className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Results Header */}
      <div className="bg-white border-b border-warmBrown-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-browning-900">Rajkot → Ahmedabad</h1>
              <p className="text-browning-700">Today, 15 Dec • {busResults.length} buses found</p>
            </div>

            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
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
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {busResults.map((bus) => (
            <Card key={bus.id} className="bg-white card-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Bus Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-browning-900">{bus.operator}</h3>
                        <p className="text-browning-700">{bus.busType}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{bus.rating}</span>
                        <span className="text-xs text-browning-600">({bus.reviews})</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2">
                      {bus.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Time & Duration */}
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-browning-900">{bus.departureTime}</p>
                          <p className="text-sm text-browning-600">Rajkot</p>
                        </div>

                        <div className="flex-1 text-center">
                          <Clock className="h-4 w-4 text-warmBrown-500 mx-auto mb-1" />
                          <p className="text-sm text-browning-700">{bus.duration}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-browning-900">{bus.arrivalTime}</p>
                          <p className="text-sm text-browning-600">Ahmedabad</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Booking */}
                  <div className="flex flex-col items-end justify-center">
                    <div className="text-right mb-4">
                      <p className="text-3xl font-bold text-browning-900">₹{bus.price}</p>
                      <p className="text-sm text-browning-600">{bus.seats} seats left</p>
                    </div>
                    <Button className="btn-primary w-full lg:w-auto">
                      View Seats
                    </Button>
                  </div>
                </div>

                {/* Boarding & Dropping Points */}
                <div className="mt-6 pt-6 border-t border-warmBrown-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-warmBrown-500" />
                        <span className="font-medium text-browning-900">Boarding Points</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bus.boardingPoints.map((point, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-warmBrown-500" />
                        <span className="font-medium text-browning-900">Dropping Points</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bus.droppingPoints.map((point, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
