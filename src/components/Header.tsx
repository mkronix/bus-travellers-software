
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { userRole } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Rajdhani Bus Service</h1>
          </div>
          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                {userRole === 'user' && (
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
                )}
                {(userRole === 'agent' || userRole === 'superadmin') && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin/dashboard')}
                    className="text-gray-700 hover:text-primary"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-primary"
                >
                  Sign Out
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
  );
};

export default Header;
