
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Autocomplete } from '@/components/ui/autocomplete';
import { cities } from '@/data/cities';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();

  const cityOptions = cities.map(city => ({
    value: city.name,
    label: city.name,
    image: city.image
  }));

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate) {
      return;
    }

    const searchParams = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: format(departureDate, 'yyyy-MM-dd')
    });

    navigate(`/search-results?${searchParams.toString()}`);
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Rajdhani Bus Service</h1>
            </div>
            <nav className="flex items-center space-x-6">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/my-bookings')}
                    className="text-gray-700 hover:text-primary"
                  >
                    My Bookings
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/profile')}
                    className="text-gray-700 hover:text-primary"
                  >
                    Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:text-primary"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Bus Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Travel comfortably with Rajdhani Bus Service. Safe, reliable, and affordable transportation across Gujarat and Maharashtra.
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* From City */}
              <div className="lg:col-span-4 space-y-2">
                <Label htmlFor="from" className="text-sm font-medium text-gray-700">
                  From
                </Label>
                <Autocomplete
                  options={cityOptions}
                  value={fromCity}
                  onValueChange={setFromCity}
                  placeholder="Select departure city"
                  className="w-full"
                />
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCities}
                  className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              {/* To City */}
              <div className="lg:col-span-4 space-y-2">
                <Label htmlFor="to" className="text-sm font-medium text-gray-700">
                  To
                </Label>
                <Autocomplete
                  options={cityOptions}
                  value={toCity}
                  onValueChange={setToCity}
                  placeholder="Select destination city"
                  className="w-full"
                />
              </div>

              {/* Date */}
              <div className="lg:col-span-2 space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Departure Date
                </Label>
                <DatePicker
                  date={departureDate}
                  onDateChange={setDepartureDate}
                  className="w-full"
                />
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                  disabled={!fromCity || !toCity || !departureDate}
                >
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Network</h3>
            <p className="text-gray-600">
              Connecting major cities across Gujarat and Maharashtra with reliable service.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book your tickets online in just a few clicks with instant confirmation.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚌</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comfortable Travel</h3>
            <p className="text-gray-600">
              Modern buses with AC and non-AC options for a comfortable journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
