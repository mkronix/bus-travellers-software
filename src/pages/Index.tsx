
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CitySearch from '@/components/CitySearch';
import { DatePicker } from '@/components/ui/date-picker';
import { useDialog } from '@/contexts/DialogContext';
import Header from '@/components/Header';
import { ArrowUpDown, Search, Star, Shield, Clock, Users } from 'lucide-react';

interface SearchData {
  from: string;
  to: string;
  date: Date;
}

const Index = () => {
  const navigate = useNavigate();
  const { showAlert } = useDialog();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSearch = () => {
    if (!from.trim()) {
      showAlert('Missing Information', 'Please select your departure city.');
      return;
    }
    if (!to.trim()) {
      showAlert('Missing Information', 'Please select your destination city.');
      return;
    }
    if (from.toLowerCase() === to.toLowerCase()) {
      showAlert('Invalid Route', 'Departure and destination cities cannot be the same.');
      return;
    }

    const searchData: SearchData = { from: from.trim(), to: to.trim(), date };
    navigate('/search-results', { state: { searchData } });
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'GPS tracking and verified drivers for your safety'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: '4.8/5 rating from thousands of happy customers'
    },
    {
      icon: Clock,
      title: 'On Time',
      description: '98% on-time performance with real-time updates'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round the clock customer support for assistance'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Book Your Journey with
              <span className="text-primary block">Rajdhani Bus Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience comfortable and reliable bus travel across India with our premium fleet and exceptional service.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* From City */}
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <CitySearch
                    placeholder="Departure city"
                    value={from}
                    onChange={setFrom}
                  />
                </div>

                {/* Swap Button */}
                <div className="md:col-span-1 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapCities}
                    className="rounded-full border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* To City */}
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <CitySearch
                    placeholder="Destination city"
                    value={to}
                    onChange={setTo}
                  />
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date
                  </label>
                  <DatePicker date={date} onDateChange={setDate} className="w-full" />
                </div>

                {/* Search Button */}
                <div className="md:col-span-1">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    size="lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
