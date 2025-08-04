import { Autocomplete } from '@/components/ui/autocomplete';
import { GUJARATI_CITIES } from '@/data/cities';
import { MapPin } from 'lucide-react';

interface City {
  id: number;
  name: string;
  code: string;
  state: string;
  isActive: boolean;
}

interface CitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  isDestination?: boolean;
  excludeCity?: string;
}

const getCityImage = (cityName: string) => {
  // Simple mapping of cities to placeholder images
  const cityImages: { [key: string]: string } = {
    'Ahmedabad': 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=60&fit=crop',
    'Surat': 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=60&fit=crop',
    'Vadodara': 'https://images.unsplash.com/photo-1469474968028-56623f02e425?w=100&h=60&fit=crop',
    'Rajkot': 'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=100&h=60&fit=crop',
    'Anand': 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=100&h=60&fit=crop'
  };
  
  return cityImages[cityName] || 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=60&fit=crop';
};

const CitySearch = ({ value, onChange, placeholder, className, isDestination = false, excludeCity }: CitySearchProps) => {
  const filteredCities = GUJARATI_CITIES.filter(city => 
    excludeCity ? city.name !== excludeCity : true
  );

  const enhancedCities = filteredCities.map(city => ({
    ...city,
    image: getCityImage(city.name)
  }));

  return (
    <Autocomplete
      options={enhancedCities}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={<MapPin className={`h-4 w-4 ${isDestination ? 'text-secondary' : 'text-primary'}`} />}
      className={className}
      renderOption={(option) => (
        <div className="flex items-center gap-3 p-2">
          <img 
            src={option.image} 
            alt={option.name}
            className="w-12 h-8 object-cover rounded"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=60&fit=crop';
            }}
          />
          <div>
            <div className="font-medium">{option.name}</div>
            <div className="text-sm text-gray-500">{option.state}</div>
          </div>
        </div>
      )}
    />
  );
};

export default CitySearch;