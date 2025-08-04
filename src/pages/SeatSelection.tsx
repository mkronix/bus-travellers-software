
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SeatSelection from '@/components/SeatSelection';
import Header from '@/components/Header';

const SeatSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedBus, searchData } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Redirect if no data
  if (!selectedBus || !searchData) {
    navigate('/');
    return null;
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    navigate('/passenger-details', {
      state: {
        selectedBus,
        searchData,
        selectedSeats
      }
    });
  };

  const totalAmount = selectedSeats.length * selectedBus.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
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
            <h1 className="text-2xl font-bold text-gray-900">Select Seats</h1>
            <p className="text-gray-600">
              {selectedBus.operator} - {searchData.from} → {searchData.to}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <SeatSelection
              selectedSeats={selectedSeats}
              onSeatSelect={setSelectedSeats}
            />
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{searchData.from} → {searchData.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {searchData.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus:</span>
                    <span className="font-medium">{selectedBus.operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-medium">{selectedBus.departureTime}</span>
                  </div>
                  {selectedSeats.length > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Selected Seats:</span>
                        <span className="font-medium">{selectedSeats.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span className="font-medium">{selectedSeats.length}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                {selectedSeats.length === 0 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Please select at least one seat to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
