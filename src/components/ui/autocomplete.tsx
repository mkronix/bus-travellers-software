
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface AutocompleteProps {
  options: Array<{ id: number; name: string; code?: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  icon = <MapPin className="h-4 w-4 text-primary" />,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: { name: string }) => {
    onChange(option.name);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            {icon}
          </div>
        )}
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 border-2 border-gray-200 rounded-xl bg-white",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-all duration-200 text-base",
            icon ? "pl-12" : "pl-4",
            "pr-4"
          )}
          autoComplete="off"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
              onClick={() => handleOptionClick(option)}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{option.name}</div>
                <div className="text-sm text-gray-500">Gujarat, India</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredOptions.length === 0 && value && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="flex items-center px-4 py-3 text-gray-500">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <Search className="h-4 w-4" />
            </div>
            <span>No cities found</span>
          </div>
        </div>
      )}
    </div>
  );
};
