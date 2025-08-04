
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users } from 'lucide-react';

interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  type: 'lower' | 'upper';
  position: 'left' | 'right';
}

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, from, to, date } = location.state || {};

  if (!bus) {
    navigate('/');
    return null;
  }

  // Mock seat layout - 40 seats (20 lower, 20 upper)
  const [seats, setSeats] = useState<Seat[]>(() => {
    const seatLayout: Seat[] = [];
    const totalSeats = 40;
    const occupiedSeats = new Set(['L1', 'L3', 'L8', 'U2', 'U7', 'U12']); // Mock occupied seats
    
    for (let i = 1; i <= totalSeats / 2; i++) {
      // Lower seats
      const lowerSeatNumber = `L${i}`;
      seatLayout.push({
        id: lowerSeatNumber,
        number: lowerSeatNumber,
        isAvailable: !occupiedSeats.has(lowerSeatNumber),
        isSelected: false,
        type: 'lower',
        position: i % 2 === 1 ? 'left' : 'right'
      });
      
      // Upper seats
      const upperSeatNumber = `U${i}`;
      seatLayout.push({
        id: upperSeatNumber,
        number: upperSeatNumber,
        isAvailable: !occupiedSeats.has(upperSeatNumber),
        isSelected: false,
        type: 'upper',
        position: i % 2 === 1 ? 'left' : 'right'
      });
    }
    
    return seatLayout;
  });

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalPrice = selectedSeats.length * bus.price;

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.id === seatId && seat.isAvailable) {
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      })
    );
  };

  const handleContinueBooking = () => {
    if (selectedSeats.length === 0) return;
    
    navigate('/passenger-form', {
      state: {
        bus,
        selectedSeats,
        from,
        to,
        date,
        totalPrice
      }
    });
  };

  const getSeatClassName = (seat: Seat) => {
    let baseClass = 'w-8 h-12 border-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium';
    
    if (!seat.isAvailable) {
      return `${baseClass} bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed`;
    }
    
    if (seat.isSelected) {
      return `${baseClass} bg-green-500 border-green-600 text-white`;
    }
    
    return `${baseClass} bg-white border-gray-300 text-gray-700 hover:border-primary hover:bg-primary/10`;
  };

  const lowerSeats = seats.filter(seat => seat.type === 'lower');
  const upperSeats = seats.filter(seat => seat.type === 'upper');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-primary"
            >
              ← Back to Results
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Select Seats</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Select Your Seats</span>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 border-2 border-green-600 rounded"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-6">
                  {/* Driver Section */}
                  <div className="mb-6">
                    <div className="w-12 h-8 bg-gray-400 rounded-lg mx-auto mb-2"></div>
                    <div className="text-center text-sm text-gray-600">Driver</div>
                  </div>

                  {/* Upper Berth */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Upper Berth</h3>
                    <div className="grid grid-cols-10 gap-2">
                      {upperSeats.map((seat, index) => (
                        <div key={seat.id} className="relative">
                          <button
                            className={getSeatClassName(seat)}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={!seat.isAvailable}
                          >
                            {seat.number}
                          </button>
                          {(index + 1) % 2 === 0 && index < upperSeats.length - 1 && (
                            <div className="w-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lower Berth */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Lower Berth</h3>
                    <div className="grid grid-cols-10 gap-2">
                      {lowerSeats.map((seat, index) => (
                        <div key={seat.id} className="relative">
                          <button
                            className={getSeatClassName(seat)}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={!seat.isAvailable}
                          >
                            {seat.number}
                          </button>
                          {(index + 1) % 2 === 0 && index < lowerSeats.length - 1 && (
                            <div className="w-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trip Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{from} → {to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{date} • {bus.departureTime}</span>
                  </div>
                </div>

                {/* Bus Details */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">{bus.operatorName}</h4>
                  <Badge variant={bus.busType.includes('AC') ? 'default' : 'secondary'} className="mb-2">
                    {bus.busType}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    Duration: {bus.duration}
                  </div>
                </div>

                {/* Selected Seats */}
                {selectedSeats.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <Badge key={seat.id} variant="outline">
                          {seat.number}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                {selectedSeats.length > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {selectedSeats.length} × ₹{bus.price}
                      </span>
                      <span className="text-sm">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <Button
                  onClick={handleContinueBooking}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continue Booking ({selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
