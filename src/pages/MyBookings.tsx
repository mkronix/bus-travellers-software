
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Clock, Download, Search } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import Header from '@/components/Header';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  transaction_id: string;
  route_from: string;
  route_to: string;
  travel_date: string;
  departure_time: string;
  booking_status: string;
  amount: number;
  seat_number: string;
  passenger_details: any;
  booking_date: string;
}

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Error fetching your bookings');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.route_from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.route_to.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.booking_status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const downloadTicket = (booking: Booking) => {
    // In a real app, this would generate a proper e-ticket PDF
    const ticketData = {
      transactionId: booking.transaction_id,
      from: booking.route_from,
      to: booking.route_to,
      date: new Date(booking.travel_date).toLocaleDateString(),
      time: booking.departure_time ? new Date(booking.departure_time).toLocaleTimeString() : 'N/A',
      seat: booking.seat_number,
      passenger: booking.passenger_details?.name || 'N/A',
      amount: `₹${booking.amount}`
    };

    const ticketText = `
RAJDHANI BUS SERVICE - E-TICKET
================================
Transaction ID: ${ticketData.transactionId}
From: ${ticketData.from}
To: ${ticketData.to}
Date: ${ticketData.date}
Time: ${ticketData.time}
Seat: ${ticketData.seat}
Passenger: ${ticketData.passenger}
Amount: ${ticketData.amount}
Status: ${booking.booking_status}
================================
Thank you for choosing Rajdhani Bus Service!
    `;

    const blob = new Blob([ticketText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${booking.transaction_id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { variant: 'default' as const, label: 'Confirmed' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' },
      completed: { variant: 'secondary' as const, label: 'Completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      variant: 'outline' as const,
      label: status
    };

    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your bus ticket bookings</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by transaction ID or route..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.route_from} → {booking.route_to}
                        </h3>
                        {getStatusBadge(booking.booking_status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {new Date(booking.travel_date).toLocaleDateString()}
                            {booking.departure_time && (
                              <span> • {new Date(booking.departure_time).toLocaleTimeString()}</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Seat: {booking.seat_number || 'N/A'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Transaction: {booking.transaction_id}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Passenger: {booking.passenger_details?.name || 'N/A'}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{booking.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Booked on {new Date(booking.booking_date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => downloadTicket(booking)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download E-Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No bookings found' : 'No bookings yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start by booking your first bus journey'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button onClick={() => window.location.href = '/'} className="bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default MyBookings;
