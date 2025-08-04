import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';

const AdminLayout = () => {
  return (
    <AdminGuard requiredRole="superadmin">
      <div className="min-h-screen flex bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;