
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PassengerForm from './PassengerForm';

const PassengerFormWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If no state is passed, redirect back to search
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  const { selectedBus, selectedSeat, searchData } = location.state;

  const handleBackToSeat = () => {
    navigate('/seat-selection', {
      state: {
        bus: selectedBus,
        from: searchData.from,
        to: searchData.to,
        date: searchData.date
      }
    });
  };

  return (
    <PassengerForm
      selectedBus={selectedBus}
      selectedSeat={selectedSeat}
      searchData={searchData}
      onBackToSeat={handleBackToSeat}
    />
  );
};

export default PassengerFormWrapper;
