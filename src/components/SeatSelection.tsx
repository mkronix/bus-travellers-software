
import { useState } from 'react';
import { ArrowLeft, User, UserX, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Seat {
  id: string;
  row: number;
  position: 'left' | 'right-1' | 'right-2';
  level: 'upper' | 'lower';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

interface SeatSelectionProps {
  selectedBus: any;
  searchData: any;
  onSeatSelect: (seatId: string) => void;
  onBackToResults: () => void;
}

const SeatSelection = ({ selectedBus, searchData, onSeatSelect, onBackToResults }: SeatSelectionProps) => {
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  // Generate sleeper bus seat layout - 12 rows
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = 12;

    for (let row = 1; row <= rows; row++) {
      // Left side - 1 sofa seat (upper and lower)
      seats.push({
        id: `${row}L-U`,
        row,
        position: 'left',
        level: 'upper',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });

      seats.push({
        id: `${row}L-L`,
        row,
        position: 'left',
        level: 'lower',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });

      // Right side - 2 sofa seats (upper and lower each)
      seats.push({
        id: `${row}R1-U`,
        row,
        position: 'right-1',
        level: 'upper',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });

      seats.push({
        id: `${row}R1-L`,
        row,
        position: 'right-1',
        level: 'lower',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });

      seats.push({
        id: `${row}R2-U`,
        row,
        position: 'right-2',
        level: 'upper',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });

      seats.push({
        id: `${row}R2-L`,
        row,
        position: 'right-2',
        level: 'lower',
        status: Math.random() > 0.7 ? 'booked' : 'available',
        price: selectedBus?.price || 1450,
      });
    }

    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    if (selectedSeat === seatId) {
      setSelectedSeat('');
    } else {
      setSelectedSeat(seatId);
    }
  };

  const getSeatStyle = (seat: Seat) => {
    const baseClasses = "w-16 h-8 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 text-xs font-medium relative";
    
    if (seat.status === 'booked') {
      return `${baseClasses} bg-gray-300 border-gray-400 cursor-not-allowed text-gray-600`;
    }
    
    if (selectedSeat === seat.id) {
      return `${baseClasses} bg-primary border-primary text-white shadow-lg scale-105`;
    }
    
    if (seat.status === 'available') {
      return `${baseClasses} bg-green-100 border-green-300 text-green-800 hover:scale-105 hover:shadow-md`;
    }
    
    return baseClasses;
  };

  const availableSeats = seats.filter(seat => seat.status === 'available').length;
  const bookedSeats = seats.filter(seat => seat.status === 'booked').length;
  const selectedSeatDetails = seats.find(s => s.id === selectedSeat);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBackToResults} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Select Your Seat</h1>
              <p className="text-gray-700">{searchData.from} → {searchData.to} • {selectedBus?.operator} • {selectedBus?.busType}</p>
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
                  <span>Choose Your Seat</span>
                  <Badge variant="outline" className="text-sm">
                    {selectedSeat ? '1 seat selected' : 'No seat selected'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-green-100 border-2 border-green-300 rounded"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-primary border-2 border-primary rounded"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-gray-300 border-2 border-gray-400 rounded"></div>
                    <span className="text-sm">Booked</span>
                  </div>
                </div>

                {/* Driver Section */}
                <div className="flex justify-end mb-4">
                  <div className="bg-primary/20 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Driver</span>
                  </div>
                </div>

                {/* Seat Grid - Sleeper Layout */}
                <div className="space-y-3">
                  {Array.from({ length: 12 }, (_, rowIndex) => {
                    const rowSeats = seats.filter(seat => seat.row === rowIndex + 1);
                    const leftSeats = rowSeats.filter(s => s.position === 'left');
                    const right1Seats = rowSeats.filter(s => s.position === 'right-1');
                    const right2Seats = rowSeats.filter(s => s.position === 'right-2');
                    
                    return (
                      <div key={rowIndex + 1} className="flex justify-center gap-8 items-center">
                        {/* Left side - 1 sofa seat */}
                        <div className="flex flex-col gap-1">
                          <div className="text-xs text-center text-gray-500 mb-1">Row {rowIndex + 1}</div>
                          {leftSeats.map(seat => (
                            <div
                              key={seat.id}
                              className={getSeatStyle(seat)}
                              onClick={() => handleSeatClick(seat.id)}
                              title={`${seat.id} - ${seat.level} - ₹${seat.price}`}
                            >
                              {seat.status === 'booked' ? (
                                <UserX className="h-3 w-3" />
                              ) : selectedSeat === seat.id ? (
                                <User className="h-3 w-3" />
                              ) : (
                                <Bed className="h-3 w-3" />
                              )}
                              <span className="absolute -bottom-4 text-xs">
                                {seat.level === 'upper' ? 'U' : 'L'}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Aisle */}
                        <div className="w-12 text-center text-xs text-gray-400">
                          Aisle
                        </div>

                        {/* Right side - 2 sofa seats */}
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1">
                            {right1Seats.map(seat => (
                              <div
                                key={seat.id}
                                className={getSeatStyle(seat)}
                                onClick={() => handleSeatClick(seat.id)}
                                title={`${seat.id} - ${seat.level} - ₹${seat.price}`}
                              >
                                {seat.status === 'booked' ? (
                                  <UserX className="h-3 w-3" />
                                ) : selectedSeat === seat.id ? (
                                  <User className="h-3 w-3" />
                                ) : (
                                  <Bed className="h-3 w-3" />
                                )}
                                <span className="absolute -bottom-4 text-xs">
                                  {seat.level === 'upper' ? 'U' : 'L'}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            {right2Seats.map(seat => (
                              <div
                                key={seat.id}
                                className={getSeatStyle(seat)}
                                onClick={() => handleSeatClick(seat.id)}
                                title={`${seat.id} - ${seat.level} - ₹${seat.price}`}
                              >
                                {seat.status === 'booked' ? (
                                  <UserX className="h-3 w-3" />
                                ) : selectedSeat === seat.id ? (
                                  <User className="h-3 w-3" />
                                ) : (
                                  <Bed className="h-3 w-3" />
                                )}
                                <span className="absolute -bottom-4 text-xs">
                                  {seat.level === 'upper' ? 'U' : 'L'}
                                </span>
                              </div>
                            ))}
                          </div>
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
                  <span className="text-gray-700">Route:</span>
                  <span className="font-medium">{searchData.from} → {searchData.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Date:</span>
                  <span className="font-medium">{searchData.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Departure:</span>
                  <span className="font-medium">{selectedBus?.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Bus Type:</span>
                  <span className="font-medium">{selectedBus?.busType}</span>
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
                    <p className="text-sm text-gray-700">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{bookedSeats}</p>
                    <p className="text-sm text-gray-700">Booked</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Seat & Price */}
            {selectedSeat && selectedSeatDetails && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Selected Seat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Seat {selectedSeat}</span>
                      <Badge variant="secondary">{selectedSeatDetails.level} Berth</Badge>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Total Amount:</span>
                        <span className="text-2xl font-bold text-primary">₹{selectedSeatDetails.price}</span>
                      </div>
                      
                      <Button 
                        className="bg-primary text-white hover:bg-primary/90 w-full"
                        onClick={() => onSeatSelect(selectedSeat)}
                      >
                        Continue to Passenger Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!selectedSeat && (
              <Card className="bg-gray-50">
                <CardContent className="text-center py-8">
                  <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Please select a seat to continue</p>
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
