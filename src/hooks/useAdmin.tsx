import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

type UserRole = 'superadmin' | 'agent' | 'user';

interface AdminContextType {
  userRole: UserRole | null;
  permissions: Record<string, boolean>;
  hasPermission: (module: string) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  checkRole: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const checkRole = async () => {
    if (!user) {
      setUserRole(null);
      setPermissions({});
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role, permissions')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no role found, default to 'user'
        setUserRole('user');
        setPermissions({});
      } else {
        setUserRole(data.role);
        setPermissions((data.permissions as Record<string, boolean>) || {});
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('user');
      setPermissions({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkRole();
  }, [user]);

  const hasPermission = (module: string): boolean => {
    if (userRole === 'superadmin') return true;
    if (userRole === 'agent') {
      return permissions[module] === true;
    }
    return false;
  };

  const isAdmin = userRole === 'superadmin' || userRole === 'agent';
  const isSuperAdmin = userRole === 'superadmin';

  return (
    <AdminContext.Provider
      value={{
        userRole,
        permissions,
        hasPermission,
        isAdmin,
        isSuperAdmin,
        loading,
        checkRole,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};