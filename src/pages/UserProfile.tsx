import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  Ticket, 
  TrendingUp,
  MapPin,
  Star,
  Edit,
  Save,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/auth/AuthGuard';
import Header from '@/components/Header';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
}

interface Booking {
  id: string;
  transaction_id: string;
  route_from: string;
  route_to: string;
  travel_date: string;
  departure_time: string;
  arrival_time: string;
  amount: number;
  booking_status: string;
  bus_operator: string;
  seat_number: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          id: user?.id,
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || '',
          phone: ''
        };
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (!insertError) {
          setProfile(newProfile);
          setEditForm({
            full_name: newProfile.full_name,
            phone: newProfile.phone
          });
        }
      } else if (!error && data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone
        })
        .eq('id', user?.id);

      if (!error) {
        setProfile(prev => prev ? {
          ...prev,
          full_name: editForm.full_name,
          phone: editForm.phone
        } : null);
        setIsEditing(false);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadETicket = (booking: Booking) => {
    // Simple e-ticket generation
    const ticketContent = `
RAJDHANI TRAVELS - E-TICKET
============================
Ticket ID: ${booking.transaction_id}
From: ${booking.route_from}
To: ${booking.route_to}
Date: ${new Date(booking.travel_date).toLocaleDateString()}
Departure: ${booking.departure_time}
Arrival: ${booking.arrival_time}
Bus Operator: ${booking.bus_operator}
Seat: ${booking.seat_number}
Amount: ₹${booking.amount}
Status: ${booking.booking_status}
============================
Please arrive 30 minutes before departure.
Thank you for choosing Rajdhani Travels!
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.transaction_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getBookingStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'confirmed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };

    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const totalSpent = bookings.reduce((sum, booking) => sum + (Number(booking.amount) || 0), 0);
  const completedTrips = bookings.filter(b => b.booking_status === 'completed').length;
  const averageRating = 4.5; // Mock average rating

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Profile Header */}
            <Card className="mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-6 w-6 text-primary" />
                    My Profile
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpdateProfile}
                        size="sm"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            full_name: profile?.full_name || '',
                            phone: profile?.phone || ''
                          });
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="full_name"
                          value={editForm.full_name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{profile?.full_name || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        {profile?.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1"
                          placeholder="Enter phone number"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900 flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {profile?.phone || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Member Since</Label>
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Completed Trips</p>
                      <p className="text-2xl font-bold text-gray-900">{completedTrips}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Average Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Ticket className="h-6 w-6 text-primary" />
                  Booking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No bookings found</p>
                    <p className="text-sm text-gray-500">Your booking history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {booking.route_from} → {booking.route_to}
                              </h3>
                              {getBookingStatusBadge(booking.booking_status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <p>Date: {new Date(booking.travel_date).toLocaleDateString()}</p>
                              <p>Bus: {booking.bus_operator}</p>
                              <p>Seat: {booking.seat_number}</p>
                              <p>Amount: ₹{booking.amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => downloadETicket(booking)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" />
                              E-Ticket
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default UserProfile;