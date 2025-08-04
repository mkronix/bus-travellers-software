
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Bus,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MapPin,
  Route,
  Users
} from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
  superAdminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    superAdminOnly: true
  },
  {
    title: 'Bookings',
    url: '/admin/bookings',
    icon: BookOpen,
    permission: 'bookings'
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
    superAdminOnly: true
  },
  {
    title: 'Locations',
    url: '/admin/locations',
    icon: MapPin,
    permission: 'locations',
    superAdminOnly: true
  },
  {
    title: 'Buses',
    url: '/admin/buses',
    icon: Bus,
    permission: 'buses',
    superAdminOnly: true
  },
  {
    title: 'Routes',
    url: '/admin/routes',
    icon: Route,
    permission: 'routes',
    superAdminOnly: true
  }
];

const AdminSidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: Dispatch<SetStateAction<boolean>> }) => {

  const { signOut } = useAuth();
  const { userRole, hasPermission } = useAdmin();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => {
    // If it's superAdmin only and user is not superAdmin, hide it
    if (item.superAdminOnly && userRole !== 'superadmin') {
      return false;
    }

    // If it has a permission requirement, check if user has that permission
    if (item.permission && !hasPermission(item.permission)) {
      return false;
    }

    return true;
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "bg-white h-screen fixed left-0 border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-bold text-gray-900">Rajdhani Admin</h2>
            <p className="text-sm text-gray-500 capitalize">{userRole}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                className={cn(
                  `flex items-center ${collapsed ? "justify-center" : ""} px-3 py-2 rounded-lg transition-colors duration-200`,
                  isActive(item.url)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium">{item.title}</span>
                )}
              </NavLink>
            </li>

          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={signOut}
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
