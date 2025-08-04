import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    Headphones,
    Users,
    Bus,
    Shield,
    CheckCircle,
    Star,
    Quote,
    ArrowRight
} from 'lucide-react';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            type: ''
        });
        setIsSubmitting(false);

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            details: ["+91 98765 43210", "+91 99250 29971"],
            description: "24/7 Customer Support",
            color: "from-rajdhani-primary to-rajdhani-secondary",
            action: "tel:+919876543210"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["info@rajdhanitravels.com", "support@rajdhanitravels.com"],
            description: "Quick Response Guaranteed",
            color: "from-rajdhani-secondary to-rajdhani-primary",
            action: "mailto:info@rajdhanitravels.com"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Railway Station Road, Opp – V.K Bhula School", "Near Ashwad Sweet, Patan, Gujarat-384285"],
            description: "Main Office Location",
            color: "from-rajdhani-primary to-rajdhani-secondary",
            action: "https://maps.google.com"
        }
    ];

    const officeHours = [
        { day: "Monday - Friday", time: "9:00 AM - 8:00 PM" },
        { day: "Saturday", time: "9:00 AM - 6:00 PM" },
        { day: "Sunday", time: "10:00 AM - 5:00 PM" },
        { day: "Emergency Support", time: "24/7 Available" }
    ];

    const supportTypes = [
        { icon: Bus, title: "Booking Support", description: "Help with reservations and bookings" },
        { icon: Shield, title: "Travel Assistance", description: "On-journey support and guidance" },
        { icon: Users, title: "Customer Care", description: "General inquiries and feedback" },
        { icon: MessageCircle, title: "Technical Help", description: "Website and app related issues" }
    ];

    const testimonials = [
        {
            name: "Rajesh Patel",
            location: "Ahmedabad",
            rating: 5,
            comment: "Excellent service! The support team helped me with my booking issues at midnight. Very responsive and professional."
        },
        {
            name: "Priya Sharma",
            location: "Mumbai",
            rating: 5,
            comment: "Quick response time and friendly staff. They resolved my ticket cancellation within minutes. Highly recommended!"
        },
        {
            name: "Amit Kumar",
            location: "Delhi",
            rating: 5,
            comment: "24/7 support is amazing. Had an emergency during travel and they helped immediately. Great customer service!"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-24">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white animate-bounce" />
                    <div className="absolute top-1/2 right-10 w-12 h-12 rounded-full bg-white animate-ping" />
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="text-center">
                        <div className="flex justify-center items-center gap-2 mb-6">
                            <Headphones className="h-8 w-8 text-secondary" />
                            <span className="text-white/90 font-semibold text-lg">Get In Touch</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Contact{' '}
                            <span className="text-secondary">Rajdhani Travels</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Have questions? Need assistance? We're here to help you 24/7.
                            Reach out to us anytime for support with your travel needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-20 md:py-24 -mt-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => (
                            <div
                                key={info.title}
                                className="transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                onClick={() => window.open(info.action, '_blank')}
                            >
                                <Card className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                                    <CardContent className="p-8 text-center">
                                        <div className={`bg-gradient-to-br ${info.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                            <info.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{info.title}</h3>
                                        <div className="space-y-2 mb-4">
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                                            ))}
                                        </div>
                                        <p className="text-gray-600">{info.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Support Types */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div>
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Send className="h-6 w-6 text-primary" />
                                    <span className="text-primary font-semibold">Send Message</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    We'd Love to Hear From You
                                </h2>
                                <p className="text-gray-700">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <Card className="shadow-lg border-0">
                                <CardContent className="p-8">
                                    {isSubmitted ? (
                                        <div className="text-center py-8">
                                            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent Successfully!</h3>
                                            <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                                        </div>
                                    ) : (
                                        <div onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        placeholder="Enter your full name"
                                                        required
                                                        className="mt-2 h-12 border-gray-300 focus:border-secondary"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        placeholder="Enter your phone number"
                                                        required
                                                        className="mt-2 h-12 border-gray-300 focus:border-secondary"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="Enter your email address"
                                                    required
                                                    className="mt-2 h-12 border-gray-300 focus:border-secondary"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="type" className="text-gray-700 font-medium">Inquiry Type</Label>
                                                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                                                    <SelectTrigger className="mt-2 h-12 border-gray-300 focus:border-secondary">
                                                        <SelectValue placeholder="Select inquiry type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="booking">Booking Support</SelectItem>
                                                        <SelectItem value="travel">Travel Assistance</SelectItem>
                                                        <SelectItem value="complaint">Complaint</SelectItem>
                                                        <SelectItem value="feedback">Feedback</SelectItem>
                                                        <SelectItem value="technical">Technical Issue</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="subject" className="text-gray-700 font-medium">Subject</Label>
                                                <Input
                                                    id="subject"
                                                    value={formData.subject}
                                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                                    placeholder="Brief subject of your inquiry"
                                                    className="mt-2 h-12 border-gray-300 focus:border-secondary"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                                                <Textarea
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                                    placeholder="Describe your inquiry in detail..."
                                                    required
                                                    rows={5}
                                                    className="mt-2 border-gray-300 focus:border-secondary resize-none"
                                                />
                                            </div>

                                            <Button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="w-full h-12 bg-gradient-to-r from-rajdhani-secondary to-rajdhani-primary hover:from-rajdhani-primary/50 hover:to-rajdhani-secondary/40 text-white font-semibold text-lg"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Sending...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Send className="h-5 w-5" />
                                                        Send Message
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Support Types & Office Hours */}
                        <div className="space-y-8">
                            {/* Support Types */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Users className="h-6 w-6 text-primary" />
                                    <span className="text-primary font-semibold">Support Categories</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">How Can We Help You?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {supportTypes.map((type, index) => (
                                        <Card key={type.title} className="border border-gray-200 hover:border-rajdhani-secondaryDark hover:shadow-lg transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-blue-100 p-2 rounded-lg">
                                                        <type.icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                                                        <p className="text-gray-600 text-sm">{type.description}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Clock className="h-6 w-6 text-primary" />
                                    <span className="text-primary font-semibold">Business Hours</span>
                                </div>
                                <Card className="border border-gray-200">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">When We're Available</h3>
                                        <div className="space-y-3">
                                            {officeHours.map((schedule, index) => (
                                                <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                                    <span className="font-medium text-gray-700">{schedule.day}</span>
                                                    <span className={`font-semibold ${schedule.day === 'Emergency Support' ? 'text-green-600' : 'text-gray-900'}`}>
                                                        {schedule.time}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-20 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Quote className="h-6 w-6 text-primary" />
                            <span className="text-primary font-semibold">Customer Reviews</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our satisfied customers have to say about our support services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={testimonial.name} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <MessageCircle className="h-6 w-6 text-primary" />
                            <span className="text-primary font-semibold">Quick Answers</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Find quick answers to common questions. Can't find what you're looking for? Contact us directly.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border border-gray-200">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">How can I cancel my booking?</h3>
                                    <p className="text-gray-600 text-sm">You can cancel your booking by calling our 24/7 support line or visiting our office. Cancellation charges may apply based on the timing.</p>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">What are your payment options?</h3>
                                    <p className="text-gray-600 text-sm">We accept cash, credit/debit cards, UPI payments, and net banking. Online payments are processed securely.</p>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Do you provide travel insurance?</h3>
                                    <p className="text-gray-600 text-sm">Yes, we offer optional travel insurance for all our packages. Contact us for details about coverage and pricing.</p>
                                </CardContent>
                            </Card>

                            <Card className="border border-gray-200">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">How early should I book?</h3>
                                    <p className="text-gray-600 text-sm">We recommend booking at least 2-3 days in advance for domestic travel and 1-2 weeks for international trips to ensure availability.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUsPage;