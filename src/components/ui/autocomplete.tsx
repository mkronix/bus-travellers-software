import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: { name: string }) => {
    onChange(option.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative group">
        {icon && (
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
            animate={{
              scale: isOpen ? 1.1 : 1,
              color: isOpen ? "#6366f1" : "#6b7280"
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 border-2 border-gray-200 rounded-xl bg-white",
            "focus:border-primary focus:ring-0 focus:ring-primary/20",
            "transition-all duration-300 text-base",
            "hover:border-gray-300 hover:shadow-sm",
            icon ? "pl-12" : "pl-4",
            "pr-12 group-hover:shadow-md"
          )}
          autoComplete="off"
        />

        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          animate={{
            rotate: isOpen ? 180 : 0,
            color: isOpen ? "#6366f1" : "#6b7280"
          }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-hidden backdrop-blur-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredOptions.length > 0 ? (
              <div className="overflow-y-auto max-h-60 p-1">
                {filteredOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    ref={el => optionsRef.current[index] = el!}
                    className={cn(
                      "flex items-center px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5",
                      "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10",
                      highlightedIndex === index && "bg-gradient-to-r from-primary/20 to-secondary/20 shadow-sm",
                      "group/option"
                    )}
                    onClick={() => handleOptionClick(option)}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 group-hover/option:from-primary/20 group-hover/option:to-secondary/20 transition-all"
                      whileHover={{ rotate: 5 }}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 group-hover/option:text-primary transition-colors">
                        {option.name}
                      </div>
                      <div className="text-sm text-gray-500 group-hover/option:text-gray-600 transition-colors">
                        Gujarat, India
                      </div>
                    </div>
                    {option.code && (
                      <motion.div
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-mono group-hover/option:bg-primary/10 group-hover/option:text-primary transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {option.code}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex items-center px-4 py-6 text-gray-500 justify-center"
                variants={itemVariants}
              >
                <div className="text-center">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="font-medium">No cities found</div>
                  <div className="text-sm text-gray-400">Try a different search term</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};