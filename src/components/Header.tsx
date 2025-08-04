
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, BookOpen, Settings, BarChart3 } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { userRole, isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isRegularUser = userRole === 'user' || (!userRole && user);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Rajdhani</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Show "My Bookings" only for regular users */}
                {isRegularUser && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-700 hover:text-primary"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Bookings
                  </Button>
                )}

                {/* Show "Dashboard" for admins and agents */}
                {isAdmin && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/dashboard')}
                    className="text-gray-700 hover:text-primary"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-white">
                          {getUserInitials(user.user_metadata?.full_name || user.email || 'U')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      {userRole && (
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          Role: {userRole}
                        </p>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    
                    {isRegularUser && (
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>My Bookings</span>
                      </DropdownMenuItem>
                    )}
                    
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-primary"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
