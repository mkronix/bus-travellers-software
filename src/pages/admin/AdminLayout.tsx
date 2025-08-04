import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { useState } from 'react';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <AdminGuard requiredRole="superadmin">
      <div className="flex bg-gray-50">
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={`${collapsed ? 'ml-16' : 'ml-56'} flex-1 overflow-auto`}>
          <Outlet />
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;