import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Ticket,
    Download,
    Search,
    Filter,
    Calendar,
    MapPin,
    Clock,
    Users,
    Phone,
    Mail,
    Bus,
    ArrowRight,
    Star,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/auth/AuthGuard';

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
    payment_status: string;
    bus_operator: string;
    seat_number: string;
    boarding_point: string;
    dropping_point: string;
    passenger_details: any;
    booking_date: string;
}

const MyBookingsPage = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm, statusFilter, dateFilter]);

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
            toast({
                title: "Error",
                description: "Failed to load bookings",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = [...bookings];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(booking =>
                booking.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.route_from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.route_to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.bus_operator.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(booking => booking.booking_status === statusFilter);
        }

        // Date filter
        if (dateFilter !== 'all') {
            const today = new Date();
            const filterDate = new Date();

            switch (dateFilter) {
                case 'upcoming':
                    filtered = filtered.filter(booking => {
                        const travelDate = new Date(booking.travel_date);
                        return travelDate >= today;
                    });
                    break;
                case 'past':
                    filtered = filtered.filter(booking => {
                        const travelDate = new Date(booking.travel_date);
                        return travelDate < today;
                    });
                    break;
                case 'month':
                    filterDate.setMonth(today.getMonth() - 1);
                    filtered = filtered.filter(booking => {
                        const bookingDate = new Date(booking.booking_date);
                        return bookingDate >= filterDate;
                    });
                    break;
            }
        }

        setFilteredBookings(filtered);
    };

    const downloadETicket = (booking: Booking) => {
        const ticketContent = `
===========================================
     RAJDHANI TRAVELS - E-TICKET
===========================================

Booking ID: ${booking.transaction_id}
Passenger: ${booking.passenger_details?.name || 'N/A'}
Mobile: ${booking.passenger_details?.mobile || 'N/A'}

JOURNEY DETAILS
From: ${booking.route_from}
To: ${booking.route_to}
Date: ${new Date(booking.travel_date).toLocaleDateString('en-IN')}
Departure: ${booking.departure_time || 'N/A'}
Arrival: ${booking.arrival_time || 'N/A'}

BUS DETAILS
Operator: ${booking.bus_operator}
Seat Number: ${booking.seat_number}
Boarding Point: ${booking.boarding_point || 'N/A'}
Dropping Point: ${booking.dropping_point || 'N/A'}

PAYMENT DETAILS
Amount Paid: ₹${booking.amount}
Payment Status: ${booking.payment_status}
Booking Status: ${booking.booking_status}

===========================================
Please arrive 30 minutes before departure.
Carry a valid ID proof during travel.
Thank you for choosing Rajdhani Travels!
===========================================
    `;

        const blob = new Blob([ticketContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rajdhani-ticket-${booking.transaction_id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
            title: "E-Ticket Downloaded",
            description: "Your e-ticket has been downloaded successfully.",
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            confirmed: { variant: 'default' as const, label: 'Confirmed', color: 'bg-green-100 text-green-800' },
            cancelled: { variant: 'destructive' as const, label: 'Cancelled', color: 'bg-red-100 text-red-800' },
            completed: { variant: 'secondary' as const, label: 'Completed', color: 'bg-blue-100 text-blue-800' },
            pending: { variant: 'outline' as const, label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || {
            variant: 'outline' as const,
            label: status,
            color: 'bg-gray-100 text-gray-800'
        };

        return (
            <Badge className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getPaymentStatusBadge = (status: string) => {
        const statusConfig = {
            paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || {
            color: 'bg-gray-100 text-gray-800',
            label: status
        };

        return (
            <Badge className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const BookingSkeleton = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    if (loading) {
        return (
            <AuthGuard>
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-6">
                        <Skeleton className="h-10 w-64" />
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 w-48" />
                                    <Skeleton className="h-10 w-48" />
                                </div>
                            </CardContent>
                        </Card>
                        <BookingSkeleton />
                    </div>
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Ticket className="h-8 w-8 text-primary" />
                                My Bookings
                            </h1>
                            <p className="text-gray-600">Track and manage your bus reservations</p>
                        </div>
                        <Button
                            onClick={fetchBookings}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search by booking ID, route, or bus operator..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full lg:w-48">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={dateFilter} onValueChange={setDateFilter}>
                                    <SelectTrigger className="w-full lg:w-48">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Filter by date" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Bookings</SelectItem>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="past">Past Trips</SelectItem>
                                        <SelectItem value="month">Last Month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bookings List */}
                    <AnimatePresence>
                        {filteredBookings.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                                        ? 'No bookings match your filters'
                                        : 'No bookings found'
                                    }
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                                        ? 'Try adjusting your search criteria'
                                        : 'Start your journey by booking your first bus ticket'
                                    }
                                </p>
                                {!searchTerm && statusFilter === 'all' && dateFilter === 'all' && (
                                    <Button onClick={() => window.location.href = '/'}>
                                        Book Your First Trip
                                    </Button>
                                )}
                            </motion.div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBookings.map((booking, index) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                                            <CardContent className="p-6">
                                                {/* Mobile Layout */}
                                                <div className="block lg:hidden space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                                                                <Bus className="h-5 w-5 text-primary" />
                                                                {booking.route_from} → {booking.route_to}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 font-mono">
                                                                ID: {booking.transaction_id}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            {getStatusBadge(booking.booking_status)}
                                                            {getPaymentStatusBadge(booking.payment_status)}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                                <Calendar className="h-4 w-4" />
                                                                Travel Date
                                                            </div>
                                                            <p className="font-semibold text-gray-900">
                                                                {new Date(booking.travel_date).toLocaleDateString('en-IN')}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                                <Clock className="h-4 w-4" />
                                                                Departure
                                                            </div>
                                                            <p className="font-semibold text-gray-900">
                                                                {booking.departure_time || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                                <Bus className="h-4 w-4" />
                                                                Bus & Seat
                                                            </div>
                                                            <p className="font-semibold text-gray-900">
                                                                {booking.bus_operator} - {booking.seat_number}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                                <Users className="h-4 w-4" />
                                                                Amount
                                                            </div>
                                                            <p className="font-semibold text-gray-900">
                                                                ₹{booking.amount.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {booking.passenger_details && (
                                                        <div className="bg-blue-50 p-3 rounded-lg">
                                                            <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                                                                <Users className="h-4 w-4" />
                                                                Passenger Details
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="font-semibold text-gray-900">
                                                                    {booking.passenger_details.name}
                                                                </p>
                                                                {booking.passenger_details.mobile && (
                                                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                                                        <Phone className="h-3 w-3" />
                                                                        {booking.passenger_details.mobile}
                                                                    </p>
                                                                )}
                                                                {booking.passenger_details.email && (
                                                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                                                        <Mail className="h-3 w-3" />
                                                                        {booking.passenger_details.email}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex gap-2">
                                                        <Button
                                                            onClick={() => downloadETicket(booking)}
                                                            className="flex-1"
                                                            variant="outline"
                                                        >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download E-Ticket
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Desktop Layout */}
                                                <div className="hidden lg:block">
                                                    <div className="flex items-start justify-between mb-6">
                                                        <div>
                                                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                                                                <Bus className="h-6 w-6 text-primary" />
                                                                {booking.route_from} → {booking.route_to}
                                                            </h3>
                                                            <p className="text-gray-600 font-mono mt-1">
                                                                Booking ID: {booking.transaction_id}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            {getStatusBadge(booking.booking_status)}
                                                            {getPaymentStatusBadge(booking.payment_status)}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600 mb-1">Travel Date</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {new Date(booking.travel_date).toLocaleDateString('en-IN', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600 mb-1">Departure</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {booking.departure_time || 'N/A'}
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <Bus className="h-6 w-6 text-primary mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600 mb-1">Bus Operator</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {booking.bus_operator}
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600 mb-1">Seat Number</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {booking.seat_number}
                                                            </p>
                                                        </div>

                                                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg text-center">
                                                            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                                                            <p className="font-bold text-xl text-gray-900">
                                                                ₹{booking.amount.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {booking.passenger_details && (
                                                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                                        <Users className="h-5 w-5 text-blue-600" />
                                                                        Passenger Information
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                        <div>
                                                                            <p className="text-sm text-gray-600">Name</p>
                                                                            <p className="font-semibold text-gray-900">
                                                                                {booking.passenger_details.name}
                                                                            </p>
                                                                        </div>
                                                                        {booking.passenger_details.mobile && (
                                                                            <div>
                                                                                <p className="text-sm text-gray-600">Mobile</p>
                                                                                <p className="font-semibold text-gray-900">
                                                                                    {booking.passenger_details.mobile}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        {booking.passenger_details.email && (
                                                                            <div>
                                                                                <p className="text-sm text-gray-600">Email</p>
                                                                                <p className="font-semibold text-gray-900">
                                                                                    {booking.passenger_details.email}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                        <div className="text-sm text-gray-600">
                                                            Booked on: {new Date(booking.booking_date).toLocaleDateString('en-IN')}
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <Button
                                                                onClick={() => downloadETicket(booking)}
                                                                variant="outline"
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                Download E-Ticket
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Summary Stats */}
                    {filteredBookings.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {filteredBookings.length}
                                            </p>
                                            <p className="text-gray-600">Total Bookings</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                ₹{filteredBookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}
                                            </p>
                                            <p className="text-gray-600">Total Spent</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {filteredBookings.filter(b => b.booking_status === 'completed').length}
                                            </p>
                                            <p className="text-gray-600">Completed Trips</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AuthGuard>
    );
};

export default MyBookingsPage;  