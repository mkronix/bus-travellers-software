import { Button } from '@/components/ui/button';
import { Bus, Calendar, Menu, X, Users, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { userRole, isAdmin, loading } = useAdmin();

  const getNavigationItems = () => {
    const items = [
      { icon: Bus, label: "Home", href: "/" },
    ];

    if (user && !loading) {
      // Show "My Bookings" only for regular users (not admin/agent)
      if (!isAdmin) {
        items.push({ icon: Calendar, label: "My Bookings", href: "/my-bookings" });
      }
      
      // Show "Dashboard" for admin and agent
      if (isAdmin) {
        items.push({ icon: Settings, label: "Dashboard", href: "/admin/dashboard" });
      }
    }

    return items;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const navigationItems = getNavigationItems();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <Bus className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Rajdhani Travels
                </span>
                <p className="text-xs md:text-sm text-gray-600">Your Trusted Travel Partner</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-gray-700 hover:text-primary transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.user_metadata?.full_name || user.email}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button asChild>
                  <Link to="/login" className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300">
                    <Users className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-gray-100"
            >
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {user ? (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600 px-3 py-2">
                      Welcome, {user.user_metadata?.full_name || user.email}
                    </p>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Users className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;