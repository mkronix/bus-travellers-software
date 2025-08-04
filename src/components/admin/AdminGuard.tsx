import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: 'superadmin' | 'agent';
  requiredPermission?: string;
}

const AdminGuard = ({ children, requiredRole, requiredPermission }: AdminGuardProps) => {
  const { user, loading: authLoading } = useAuth();
  const { userRole, hasPermission, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate('/login');
        return;
      }

      // Check role requirement
      if (requiredRole) {
        if (requiredRole === 'superadmin' && userRole !== 'superadmin') {
          navigate('/profile');
          return;
        }
        if (requiredRole === 'agent' && userRole !== 'superadmin' && userRole !== 'agent') {
          navigate('/profile');
          return;
        }
      }

      // Check permission requirement
      if (requiredPermission && !hasPermission(requiredPermission)) {
        navigate('/profile');
        return;
      }
    }
  }, [user, userRole, authLoading, adminLoading, navigate, requiredRole, requiredPermission, hasPermission]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  // Check role requirement
  if (requiredRole) {
    if (requiredRole === 'superadmin' && userRole !== 'superadmin') {
      return null; // Will redirect to dashboard
    }
    if (requiredRole === 'agent' && userRole !== 'superadmin' && userRole !== 'agent') {
      return null; // Will redirect to dashboard
    }
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null; // Will redirect to dashboard
  }

  return <>{children}</>;
};

export default AdminGuard;