
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface City {
  name: string;
  state: string;
  image: string;
}

const cities: City[] = [
  { name: 'Mumbai', state: 'Maharashtra', image: 'photo-1473091534298-04dcbce3278c' },
  { name: 'Delhi', state: 'Delhi', image: 'photo-1460925895917-afdab827c52f' },
  { name: 'Bangalore', state: 'Karnataka', image: 'photo-1487058792275-0ad4aaf24ca7' },
  { name: 'Pune', state: 'Maharashtra', image: 'photo-1483058712412-4245e9b90334' },
  { name: 'Hyderabad', state: 'Telangana', image: 'photo-1488590528505-98d2b5aba04b' },
  { name: 'Chennai', state: 'Tamil Nadu', image: 'photo-1473091534298-04dcbce3278c' },
  { name: 'Kolkata', state: 'West Bengal', image: 'photo-1460925895917-afdab827c52f' },
  { name: 'Ahmedabad', state: 'Gujarat', image: 'photo-1487058792275-0ad4aaf24ca7' },
  { name: 'Surat', state: 'Gujarat', image: 'photo-1483058712412-4245e9b90334' },
  { name: 'Jaipur', state: 'Rajasthan', image: 'photo-1488590528505-98d2b5aba04b' }
];

interface CitySearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CitySearch: React.FC<CitySearchProps> = ({
  placeholder,
  value,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    if (inputValue.length > 0) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        city.state.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleCitySelect = (city: City) => {
    onChange(city.name);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (value.length > 0) {
              handleInputChange(value);
            }
          }}
          className="pl-10"
        />
      </div>

      {isOpen && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCitySelect(city)}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={`https://images.unsplash.com/${city.image}?auto=format&fit=crop&w=40&h=40`}
                  alt={city.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkwyNiAxOEgxNEwyMCAyNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg==';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 truncate">{city.name}</p>
                    <p className="text-sm text-gray-500 truncate">{city.state}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
