
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import PassengerForm from '@/components/PassengerForm';
import Header from '@/components/Header';

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedBus, searchData, selectedSeats } = location.state || {};

  // Redirect if no data
  if (!selectedBus || !searchData || !selectedSeats) {
    navigate('/');
    return null;
  }

  const handleBackToSeat = () => {
    navigate('/seat-selection', {
      state: { selectedBus, searchData }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={handleBackToSeat}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Seat Selection
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Passenger Details</h1>
            <p className="text-gray-600">
              {selectedBus.operator} - {searchData.from} → {searchData.to}
            </p>
          </div>
        </div>

        <PassengerForm
          selectedBus={selectedBus}
          selectedSeat={selectedSeats}
          searchData={searchData}
          onBackToSeat={handleBackToSeat}
        />
      </div>
    </div>
  );
};

export default PassengerDetails;
