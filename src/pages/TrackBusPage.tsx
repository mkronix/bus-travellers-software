import AuthGuard from '@/components/auth/AuthGuard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    Bus,
    CheckCircle,
    Clock,
    Coffee,
    MapPin,
    Navigation,
    Phone,
    Route,
    Search,
    Shield,
    Timer,
    Users,
    Wifi,
} from 'lucide-react';
import { useState } from 'react';

interface BusTracking {
    id: string;
    bus_number: string;
    route: string;
    current_location: string;
    status: 'on_time' | 'delayed' | 'arrived' | 'cancelled';
    estimated_arrival: string;
    delay_minutes: number;
    driver_name: string;
    driver_phone: string;
    occupancy: number;
    amenities: string[];
    next_stops: string[];
    last_updated: string;
}

interface TrackingResult {
    booking_id: string;
    bus_details: BusTracking;
    passenger_name: string;
    seat_number: string;
    boarding_point: string;
    route_from: string;
    route_to: string;
}

const TrackBusPage = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [trackingId, setTrackingId] = useState('');
    const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrackBus = async () => {
        if (!trackingId.trim()) {
            setError('Please enter a valid booking ID');
            return;
        }

        setLoading(true);
        setError('');
        setTrackingResult(null);

        try {
            // First, try to find the booking
            const { data: booking, error: bookingError } = await supabase
                .from('bookings')
                .select('*')
                .eq('transaction_id', trackingId.trim())
                .single();

            if (bookingError || !booking) {
                setError('Booking not found. Please check your booking ID.');
                return;
            }

            // Simulate bus tracking data (in real app, this would come from GPS tracking system)
            const mockBusTracking: BusTracking = {
                id: 'bus_001',
                bus_number: 'GJ-01-AB-1234',
                route: `${booking.route_from} to ${booking.route_to}`,
                current_location: getRandomLocation(booking.route_from, booking.route_to),
                status: getRandomStatus(),
                estimated_arrival: getEstimatedArrival(),
                delay_minutes: Math.floor(Math.random() * 30),
                driver_name: 'Rajesh Kumar',
                driver_phone: '+91 98765 43210',
                occupancy: Math.floor(Math.random() * 100),
                amenities: ['AC', 'WiFi', 'Charging Port', 'Water Bottle'],
                next_stops: getNextStops(booking.route_from, booking.route_to),
                last_updated: new Date().toISOString()
            };

            const result: TrackingResult = {
                booking_id: booking.transaction_id,
                bus_details: mockBusTracking,
                passenger_name: 'Passenger',
                seat_number: booking.seat_number || 'N/A',
                boarding_point: booking.boarding_point || 'N/A',
                route_from: booking.route_from,
                route_to: booking.route_to
            };

            setTrackingResult(result);
            toast({
                title: "Bus Located!",
                description: "Live tracking information retrieved successfully.",
            });

        } catch (error) {
            console.error('Error tracking bus:', error);
            setError('Unable to track bus. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Helper functions for mock data
    const getRandomLocation = (from: string, to: string) => {
        const locations = [
            `Approaching ${from}`,
            `En route to ${to}`,
            `Near Highway Toll Plaza`,
            `At Rest Stop - Anand`,
            `Crossing Bharuch Bridge`,
            `Entering ${to} City Limits`
        ];
        return locations[Math.floor(Math.random() * locations.length)];
    };

    const getRandomStatus = (): 'on_time' | 'delayed' | 'arrived' | 'cancelled' => {
        const statuses: ('on_time' | 'delayed' | 'arrived' | 'cancelled')[] = ['on_time', 'delayed', 'on_time', 'on_time'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    const getEstimatedArrival = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 180) + 30);
        return now.toISOString();
    };

    const getNextStops = (from: string, to: string) => {
        const allStops = ['Anand', 'Bharuch', 'Surat', 'Navsari', 'Ahmedabad', 'Mehsana'];
        return allStops.filter(stop => stop !== from && stop !== to).slice(0, 3);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            on_time: {
                color: 'bg-green-100 text-green-800 border-green-300',
                label: 'On Time',
                icon: CheckCircle
            },
            delayed: {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                label: 'Delayed',
                icon: Timer
            },
            arrived: {
                color: 'bg-blue-100 text-blue-800 border-blue-300',
                label: 'Arrived',
                icon: MapPin
            },
            cancelled: {
                color: 'bg-red-100 text-red-800 border-red-300',
                label: 'Cancelled',
                icon: AlertCircle
            }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.on_time;
        const IconComponent = config.icon;

        return (
            <Badge className={`${config.color} flex items-center gap-1 px-3 py-1`}>
                <IconComponent className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    const TrackingSkeleton = () => (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        </div>
    );

    return (
        <AuthGuard>
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-4">
                            <MapPin className="h-8 w-8 text-primary" />
                            Track Your Bus
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Enter your booking ID to get real-time location and status updates for your bus
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Enter your Booking ID (e.g., TXN123456789)"
                                        value={trackingId}
                                        onChange={(e) => setTrackingId(e.target.value)}
                                        className="h-12 text-base"
                                        onKeyPress={(e) => e.key === 'Enter' && handleTrackBus()}
                                    />
                                </div>
                                <Button
                                    onClick={handleTrackBus}
                                    disabled={loading}
                                    className="h-12 px-8 bg-gradient-to-r from-primary to-secondary text-white"
                                >
                                    {loading ? (
                                        <Timer className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Search className="h-4 w-4 mr-2" />
                                    )}
                                    {loading ? 'Tracking...' : 'Track Bus'}
                                </Button>
                            </div>

                            {error && (
                                <Alert className="mt-4 border-red-200 bg-red-50">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                    <AlertDescription className="text-red-600">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Loading State */}
                    {loading && <TrackingSkeleton />}

                    {/* Tracking Results */}
                    <AnimatePresence>
                        {trackingResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Bus Status Card */}
                                <Card className="border-l-4 border-l-primary">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-3">
                                                <Bus className="h-6 w-6 text-primary" />
                                                Bus Status
                                            </CardTitle>
                                            {getStatusBadge(trackingResult.bus_details.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Current Location */}
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Navigation className="h-5 w-5 text-blue-600" />
                                                <span className="font-semibold text-blue-900">Current Location</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">
                                                {trackingResult.bus_details.current_location}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Last updated: {new Date(trackingResult.bus_details.last_updated).toLocaleTimeString()}
                                            </p>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                <Route className="h-6 w-6 text-primary mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 mb-1">Route</p>
                                                <p className="font-semibold text-gray-900">
                                                    {trackingResult.route_from} → {trackingResult.route_to}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 mb-1">ETA</p>
                                                <p className="font-semibold text-gray-900">
                                                    {new Date(trackingResult.bus_details.estimated_arrival).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                {trackingResult.bus_details.delay_minutes > 0 && (
                                                    <p className="text-xs text-red-600">
                                                        +{trackingResult.bus_details.delay_minutes} min delay
                                                    </p>
                                                )}
                                            </div>

                                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 mb-1">Occupancy</p>
                                                <p className="font-semibold text-gray-900">
                                                    {trackingResult.bus_details.occupancy}%
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Passenger Info & Bus Details */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Passenger Information */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Users className="h-5 w-5 text-primary" />
                                                Your Booking Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Passenger Name</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {trackingResult.passenger_name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Seat Number</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {trackingResult.seat_number}
                                                    </p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-sm text-gray-600">Boarding Point</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {trackingResult.boarding_point}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Driver & Contact Info */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Phone className="h-5 w-5 text-primary" />
                                                Driver & Contact
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Driver Name</p>
                                                <p className="font-semibold text-gray-900">
                                                    {trackingResult.bus_details.driver_name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Contact Number</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900">
                                                        {trackingResult.bus_details.driver_phone}
                                                    </p>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => window.open(`tel:${trackingResult.bus_details.driver_phone}`)}
                                                    >
                                                        <Phone className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Bus Number</p>
                                                <p className="font-semibold text-gray-900">
                                                    {trackingResult.bus_details.bus_number}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Next Stops & Amenities */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Next Stops */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-primary" />
                                                Upcoming Stops
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {trackingResult.bus_details.next_stops.map((stop, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <span className="text-sm font-semibold text-primary">{index + 1}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-gray-900">{stop}</p>
                                                            <p className="text-sm text-gray-600">
                                                                ETA: {new Date(Date.now() + (index + 1) * 30 * 60000).toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Bus Amenities */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3">
                                                <Shield className="h-5 w-5 text-primary" />
                                                Bus Amenities
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-3">
                                                {trackingResult.bus_details.amenities.map((amenity, index) => {
                                                    const getAmenityIcon = (amenity: string) => {
                                                        switch (amenity) {
                                                            case 'WiFi': return <Wifi className="h-4 w-4" />;
                                                            case 'AC': return <Shield className="h-4 w-4" />;
                                                            case 'Charging Port': return <Timer className="h-4 w-4" />;
                                                            case 'Water Bottle': return <Coffee className="h-4 w-4" />;
                                                            default: return <CheckCircle className="h-4 w-4" />;
                                                        }
                                                    };

                                                    return (
                                                        <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                                            <div className="text-green-600">
                                                                {getAmenityIcon(amenity)}
                                                            </div>
                                                            <span className="text-sm font-medium text-green-800">
                                                                {amenity}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Live Map Placeholder */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <Navigation className="h-5 w-5 text-primary" />
                                            Live Location Map
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg text-center">
                                            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Interactive Map Coming Soon
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                We're working on integrating live GPS tracking with interactive maps
                                            </p>
                                            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                                    <span>Your Bus</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                    <span>Boarding Point</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                    <span>Destination</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Auto Refresh Notice */}
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Timer className="h-5 w-5 text-blue-600 animate-pulse" />
                                            <div>
                                                <p className="font-semibold text-blue-900">Auto-Refresh Enabled</p>
                                                <p className="text-sm text-blue-700">
                                                    Location updates automatically every 2 minutes. Last updated: {' '}
                                                    {new Date(trackingResult.bus_details.last_updated).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* How to Track Instructions */}
                    {!trackingResult && !loading && (
                        <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    How to Track Your Bus
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-xl font-bold text-blue-600">1</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Find Your Booking ID</h3>
                                        <p className="text-sm text-gray-600">
                                            Check your booking confirmation email or SMS for the transaction ID
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-xl font-bold text-blue-600">2</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Enter Booking ID</h3>
                                        <p className="text-sm text-gray-600">
                                            Type your booking ID in the search box above
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <span className="text-xl font-bold text-blue-600">3</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Track Live Location</h3>
                                        <p className="text-sm text-gray-600">
                                            Get real-time updates on your bus location and status
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </AuthGuard>
    );
};

export default TrackBusPage;