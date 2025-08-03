import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  BookOpen,
  Bus,
  MapPin,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalBuses: number;
  todayBookings: number;
  monthlyBookings: number;
  recentBookings: any[];
  bookingStatusData: any[];
  monthlyRevenueData: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalBuses: 0,
    todayBookings: 0,
    monthlyBookings: 0,
    recentBookings: [],
    bookingStatusData: [],
    monthlyRevenueData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total stats
      const [bookingsRes, usersRes, busesRes] = await Promise.all([
        supabase.from('bookings').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('buses').select('*')
      ]);

      const bookings = bookingsRes.data || [];
      const users = usersRes.data || [];
      const buses = busesRes.data || [];

      // Calculate revenue
      const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);

      // Today's bookings
      const today = new Date().toISOString().split('T')[0];
      const todayBookings = bookings.filter(
        booking => booking.booking_date?.split('T')[0] === today
      ).length;

      // This month's bookings
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.booking_date);
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
      }).length;

      // Booking status data for pie chart
      const statusCounts = bookings.reduce((acc, booking) => {
        acc[booking.booking_status] = (acc[booking.booking_status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const bookingStatusData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status,
        value: count
      }));

      // Recent bookings
      const recentBookings = bookings
        .sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())
        .slice(0, 5);

      setStats({
        totalBookings: bookings.length,
        totalRevenue,
        totalUsers: users.length,
        totalBuses: buses.length,
        todayBookings,
        monthlyBookings,
        recentBookings,
        bookingStatusData,
        monthlyRevenueData: [] // Would need more complex calculation for monthly revenue
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const statsCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Buses',
      value: stats.totalBuses,
      icon: Bus,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Today\'s Bookings',
      value: stats.todayBookings,
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'This Month',
      value: stats.monthlyBookings,
      icon: TrendingUp,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminGuard requiredRole="superadmin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to Rajdhani Bus Service Admin Panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.bookingStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.route_from} → {booking.route_to}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{booking.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.booking_status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.booking_status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.booking_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminDashboard;