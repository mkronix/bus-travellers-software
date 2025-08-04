import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { GUJARATI_CITIES } from '@/data/cities';
import CitySearch from '@/components/CitySearch';
import Header from '@/components/Header';
import { useDialog } from '@/contexts/DialogContext';
import {
  ArrowRight,
  Award,
  Bus,
  Calendar,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserPlus,
  Users,
  Star,
  Clock,
  Wifi,
  Coffee,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from '@/components/SearchResults';
import SeatSelection from '@/components/SeatSelection';
import PassengerForm from '@/components/PassengerForm';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'search' | 'results' | 'seat' | 'passenger'>('search');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: undefined as Date | undefined,
    passengers: 1
  });
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { showAlert } = useDialog();

  const handleContinueBooking = async () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      await showAlert('🚌 Please fill all search fields', 'Missing Information');
      return;
    }
    if (searchData.from === searchData.to) {
      await showAlert('🔄 From and To cities cannot be the same', 'Invalid Selection');
      return;
    }
    setCurrentStep('results');
  };

  const handleBusSelection = (bus: any) => {
    setSelectedBus(bus);
    setCurrentStep('seat');
  };

  const handleSeatSelection = (seatId: string) => {
    setSelectedSeat(seatId);
    setCurrentStep('passenger');
  };

  const handleBackToSearch = () => {
    setCurrentStep('search');
    setSelectedBus(null);
    setSelectedSeat('');
  };

  const handleBackToResults = () => {
    setCurrentStep('results');
    setSelectedSeat('');
  };

  const handleBackToSeat = () => {
    setCurrentStep('seat');
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  // Show different components based on current step
  if (currentStep === 'results') {
    return <SearchResults
      searchData={searchData}
      onBusSelect={handleBusSelection}
      onBackToSearch={handleBackToSearch}
    />;
  }

  if (currentStep === 'seat') {
    return <SeatSelection
      selectedBus={selectedBus}
      searchData={searchData}
      onSeatSelect={handleSeatSelection}
      onBackToSearch={handleBackToResults}
    />;
  }

  if (currentStep === 'passenger') {
    return <PassengerForm
      selectedBus={selectedBus}
      selectedSeat={selectedSeat}
      searchData={searchData}
      onBackToSeat={handleBackToSeat}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-16 md:py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-white"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-8 md:mb-12"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="flex justify-center items-center gap-2 mb-4"
              variants={fadeInUp}
            >
              <Award className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              <span className="text-white/90 font-medium text-sm md:text-base">Gujarat's Most Trusted Travel Service</span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
              variants={fadeInUp}
            >
              Book Your{' '}
              <motion.span
                className="text-secondary"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Perfect Journey
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              Safe, comfortable, and affordable bus travel across Gujarat. Experience the difference with Rajdhani Travels.
            </motion.p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
          >
            <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {/* From and To Cities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <CitySearch
                        value={searchData.from}
                        onChange={(value) => setSearchData({ ...searchData, from: value })}
                        placeholder="From City"
                        className="w-full"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <CitySearch
                        value={searchData.to}
                        onChange={(value) => setSearchData({ ...searchData, to: value })}
                        placeholder="To City"
                        className="w-full"
                        isDestination={true}
                        excludeCity={searchData.from}
                      />
                    </motion.div>
                  </div>

                  {/* Date Picker */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <DatePicker
                      selected={searchData.date}
                      onSelect={(date) => setSearchData({ ...searchData, date })}
                      placeholder="Select Journey Date"
                      className="w-full"
                    />
                  </motion.div>

                  {/* Search Button */}
                  <motion.div
                    className="flex justify-center mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-300"
                      onClick={handleContinueBooking}
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Search Buses
                    </Button>
                  </motion.div>
                </div>

                {/* Quick Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[
                    { icon: Bus, label: "50+ Buses", color: "text-primary" },
                    { icon: MapPin, label: "20+ Cities", color: "text-secondary" },
                    { icon: Users, label: "10K+ Happy Customers", color: "text-primary" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-1`} />
                      <p className="text-xs md:text-sm font-semibold text-gray-700">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold text-sm md:text-base">WHY CHOOSE US</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experience Excellence with Rajdhani Travels
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
              Your comfort and safety are our top priorities
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: UserPlus,
                title: "Easy Booking",
                description: "Quick and hassle-free bus booking with instant confirmation",
                gradient: "from-primary to-primary/80",
                delay: 0
              },
              {
                icon: Shield,
                title: "Safe Journey",
                description: "Well-maintained buses with experienced drivers for your safety",
                gradient: "from-secondary to-secondary/80",
                delay: 0.2
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your travel needs",
                gradient: "from-primary to-secondary",
                delay: 0.4
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group cursor-pointer"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features */}
          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl md:rounded-3xl p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[
                  { icon: Wifi, label: "Free WiFi" },
                  { icon: Coffee, label: "Refreshments" },
                  { icon: Clock, label: "On-Time" },
                  { icon: Star, label: "Rated 4.8/5" }
                ].map((amenity, index) => (
                  <motion.div
                    key={amenity.label}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <amenity.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2" />
                    <span className="text-xs md:text-sm font-medium text-gray-700">{amenity.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:col-span-1">
              <motion.div
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Bus className="h-8 w-8 text-secondary" />
                <div>
                  <span className="text-xl md:text-2xl font-bold text-white">Rajdhani Travels</span>
                  <p className="text-xs md:text-sm text-gray-400">Travel with Trust</p>
                </div>
              </motion.div>
              <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                Your reliable partner for comfortable and safe bus travel across Gujarat.
              </p>
              <motion.div
                className="flex items-center gap-2 text-secondary"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-4 w-4" />
                <span className="font-semibold">+91 98765 43210</span>
              </motion.div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4 text-secondary" />
                Popular Routes
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                {[
                  "Ahmedabad → Surat",
                  "Mehsana → Ahmedabad",
                  "Palanpur → Anand",
                  "Bharuch → Navsari"
                ].map((route, index) => (
                  <motion.li
                    key={route}
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="hover:text-secondary transition-colors">
                      {route}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <Users className="h-4 w-4 text-secondary" />
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                {[
                  "About Us",
                  "Contact Us",
                  "Terms & Conditions",
                  "Privacy Policy"
                ].map((link, index) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="hover:text-secondary transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <Mail className="h-4 w-4 text-secondary" />
                Contact Info
              </h4>
              <div className="space-y-3 text-gray-300 text-sm md:text-base">
                {[
                  { icon: Phone, text: "+91 98765 43210" },
                  { icon: Mail, text: "info@rajdhanitravels.com" },
                  { icon: MapPin, text: "Gujarat, India" }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <contact.icon className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span>{contact.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="flex items-center justify-center gap-2 text-sm md:text-base">
              <Award className="h-4 w-4 text-secondary" />
              &copy; 2024 Rajdhani Travels. All rights reserved.
              <HeartHandshake className="h-4 w-4 text-secondary" />
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;