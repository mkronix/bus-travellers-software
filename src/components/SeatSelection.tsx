
import { useState } from 'react';
import { ArrowLeft, User, UserX, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Seat {
  id: string;
  row: number;
  column: number;
  type: 'window' | 'aisle' | 'middle';
  status: 'available' | 'booked' | 'selected' | 'blocked';
  gender?: 'male' | 'female';
  price: number;
}

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState(2);

  // Generate seat layout for a 2x2 bus configuration
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = 12;
    const seatPrices = { front: 500, middle: 450, back: 400 };

    for (let row = 1; row <= rows; row++) {
      // Left side seats (A, B)
      seats.push({
        id: `${row}A`,
        row,
        column: 1,
        type: 'window',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: row <= 3 ? seatPrices.front : row <= 8 ? seatPrices.middle : seatPrices.back,
        gender: Math.random() > 0.5 ? 'male' : 'female'
      });

      seats.push({
        id: `${row}B`,
        row,
        column: 2,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: row <= 3 ? seatPrices.front : row <= 8 ? seatPrices.middle : seatPrices.back,
        gender: Math.random() > 0.5 ? 'male' : 'female'
      });

      // Right side seats (C, D)
      seats.push({
        id: `${row}C`,
        row,
        column: 3,
        type: 'aisle',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: row <= 3 ? seatPrices.front : row <= 8 ? seatPrices.middle : seatPrices.back,
        gender: Math.random() > 0.5 ? 'male' : 'female'
      });

      seats.push({
        id: `${row}D`,
        row,
        column: 4,
        type: 'window',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: row <= 3 ? seatPrices.front : row <= 8 ? seatPrices.middle : seatPrices.back,
        gender: Math.random() > 0.5 ? 'male' : 'female'
      });
    }

    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStyle = (seat: Seat) => {
    const baseClasses = "w-12 h-12 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-200 text-sm font-medium";
    
    if (seat.status === 'booked') {
      return `${baseClasses} bg-gray-300 border-gray-400 cursor-not-allowed text-gray-600`;
    }
    
    if (selectedSeats.includes(seat.id)) {
      return `${baseClasses} bg-warmBrown-500 border-warmBrown-600 text-white shadow-lg scale-105`;
    }
    
    if (seat.status === 'available') {
      const priceStyle = seat.price >= 500 ? 'bg-green-100 border-green-300 text-green-800' : 
                        seat.price >= 450 ? 'bg-blue-100 border-blue-300 text-blue-800' : 
                        'bg-orange-100 border-orange-300 text-orange-800';
      return `${baseClasses} ${priceStyle} hover:scale-105 hover:shadow-md`;
    }
    
    return baseClasses;
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const availableSeats = seats.filter(seat => seat.status === 'available').length;
  const bookedSeats = seats.filter(seat => seat.status === 'booked').length;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-warmBrown-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-browning-900">Select Seats</h1>
              <p className="text-browning-700">Rajkot → Ahmedabad • Rajkot Express • AC Sleeper</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Choose Your Seats</span>
                  <Badge variant="outline" className="text-sm">
                    {selectedSeats.length} / {passengers} selected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-cream-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                    <span className="text-sm">Available (₹500)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                    <span className="text-sm">Available (₹450)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
                    <span className="text-sm">Available (₹400)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-warmBrown-500 border-2 border-warmBrown-600 rounded"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded"></div>
                    <span className="text-sm">Booked</span>
                  </div>
                </div>

                {/* Driver Section */}
                <div className="flex justify-end mb-4">
                  <div className="bg-warmBrown-200 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-browning-900">Driver</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-2">
                  {Array.from({ length: 12 }, (_, rowIndex) => {
                    const rowSeats = seats.filter(seat => seat.row === rowIndex + 1);
                    return (
                      <div key={rowIndex + 1} className="flex justify-center gap-8">
                        {/* Left side */}
                        <div className="flex gap-2">
                          {rowSeats.slice(0, 2).map(seat => (
                            <div
                              key={seat.id}
                              className={getSeatStyle(seat)}
                              onClick={() => handleSeatClick(seat.id)}
                            >
                              {seat.status === 'booked' ? (
                                <UserX className="h-4 w-4" />
                              ) : selectedSeats.includes(seat.id) ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <span>{seat.id}</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Aisle */}
                        <div className="w-8"></div>

                        {/* Right side */}
                        <div className="flex gap-2">
                          {rowSeats.slice(2, 4).map(seat => (
                            <div
                              key={seat.id}
                              className={getSeatStyle(seat)}
                              onClick={() => handleSeatClick(seat.id)}
                            >
                              {seat.status === 'booked' ? (
                                <UserX className="h-4 w-4" />
                              ) : selectedSeats.includes(seat.id) ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <span>{seat.id}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Trip Details */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-browning-700">Route:</span>
                  <span className="font-medium">Rajkot → Ahmedabad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Date:</span>
                  <span className="font-medium">15 Dec 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Departure:</span>
                  <span className="font-medium">06:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Bus Type:</span>
                  <span className="font-medium">AC Sleeper</span>
                </div>
              </CardContent>
            </Card>

            {/* Seat Status */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Seat Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{availableSeats}</p>
                    <p className="text-sm text-browning-700">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{bookedSeats}</p>
                    <p className="text-sm text-browning-700">Booked</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Seats & Price */}
            {selectedSeats.length > 0 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Selected Seats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seatId => {
                        const seat = seats.find(s => s.id === seatId);
                        return (
                          <Badge key={seatId} variant="secondary" className="flex items-center gap-1">
                            {seatId}
                            {seat?.type === 'window' && <Crown className="h-3 w-3" />}
                            <span>₹{seat?.price}</span>
                          </Badge>
                        );
                      })}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Total Amount:</span>
                        <span className="text-2xl font-bold text-warmBrown-600">₹{getTotalPrice()}</span>
                      </div>
                      
                      <Button 
                        className="btn-primary w-full"
                        disabled={selectedSeats.length !== passengers}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Continue to Passenger Details
                      </Button>
                      
                      {selectedSeats.length < passengers && (
                        <p className="text-sm text-browning-600 text-center mt-2">
                          Please select {passengers - selectedSeats.length} more seat(s)
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
