import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Edit,
  Save,
  X,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/auth/AuthGuard';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  boarding_points: string[];
  dropping_points: string[];
  created_at: string;
}

interface UserStats {
  totalBookings: number;
  totalSpent: number;
  completedTrips: number;
  averageRating: number;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalBookings: 0,
    totalSpent: 0,
    completedTrips: 0,
    averageRating: 4.5
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    boarding_points: [] as string[],
    dropping_points: [] as string[]
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserStats();
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
          phone: '',
          boarding_points: [],
          dropping_points: [],
          created_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (!insertError) {
          setProfile(newProfile);
          setEditForm({
            full_name: newProfile.full_name,
            phone: newProfile.phone,
            boarding_points: newProfile.boarding_points,
            dropping_points: newProfile.dropping_points
          });
        }
      } else if (!error && data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          boarding_points: data.boarding_points || [],
          dropping_points: data.dropping_points || []
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('amount, booking_status')
        .eq('user_id', user?.id);

      if (!error && bookings) {
        const totalSpent = bookings.reduce((sum, booking) => sum + (Number(booking.amount) || 0), 0);
        const completedTrips = bookings.filter(b => b.booking_status === 'completed').length;

        setStats({
          totalBookings: bookings.length,
          totalSpent,
          completedTrips,
          averageRating: 4.5 // Mock average rating
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone,
          boarding_points: editForm.boarding_points,
          dropping_points: editForm.dropping_points
        })
        .eq('id', user?.id);

      if (!error) {
        setProfile(prev => prev ? {
          ...prev,
          full_name: editForm.full_name,
          phone: editForm.phone,
          boarding_points: editForm.boarding_points,
          dropping_points: editForm.dropping_points
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
    } finally {
      setSaving(false);
    }
  };

  const ProfileSkeleton = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <ProfileSkeleton />
        </div>
      </AuthGuard>
    );
  }

  const statsCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Spent',
      value: `₹${stats.totalSpent.toLocaleString()}`,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Completed Trips',
      value: stats.completedTrips,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Premium Member
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
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
              </motion.div>
            ))}
          </div>

          {/* Profile Information */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdateProfile}
                      size="sm"
                      disabled={saving}
                    >
                      {saving ? (
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          full_name: profile?.full_name || '',
                          phone: profile?.phone || '',
                          boarding_points: profile?.boarding_points || [],
                          dropping_points: profile?.dropping_points || []
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
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="mt-2"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{profile?.full_name || 'Not provided'}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-2"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-900">{profile?.phone || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">{profile?.email}</p>
                      <Badge variant="outline" className="ml-auto">Verified</Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Member Since</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">
                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Preferred Boarding Points</Label>
                  <div className="mt-2 space-y-2">
                    {profile?.boarding_points && profile.boarding_points.length > 0 ? (
                      profile.boarding_points.map((point, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {point}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No preferences set</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Preferred Dropping Points</Label>
                  <div className="mt-2 space-y-2">
                    {profile?.dropping_points && profile.dropping_points.length > 0 ? (
                      profile.dropping_points.map((point, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {point}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No preferences set</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AuthGuard>
  );
};

export default UserProfile;