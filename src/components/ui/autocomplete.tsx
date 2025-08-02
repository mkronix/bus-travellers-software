
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
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
  icon = <MapPin className="h-5 w-5 icon-primary" />,
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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
            "input-field",
            icon ? "pl-10" : "pl-4",
            "pr-10"
          )}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              onClick={() => handleOptionClick(option)}
            >
              <MapPin className="h-4 w-4 icon-primary mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{option.name}</div>
                {option.code && (
                  <div className="text-sm text-gray-500">{option.code}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredOptions.length === 0 && value && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center px-4 py-3 text-gray-500">
            <Search className="h-4 w-4 mr-3" />
            <span>No cities found</span>
          </div>
        </div>
      )}
    </div>
  );
};
