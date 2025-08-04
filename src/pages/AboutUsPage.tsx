import { motion } from 'framer-motion';
import {
    Award,
    Bus,
    Clock,
    Coffee,
    Heart,
    MapPin,
    Phone,
    Shield,
    Star,
    Target,
    Users,
    Wifi
} from 'lucide-react';

const AboutUsPage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const stats = [
        { icon: Bus, label: "10+ Buses", description: "Modern Fleet" },
        { icon: Users, label: "10,000+", description: "Happy Customers" },
        { icon: MapPin, label: "20+ Cities", description: "Connected" },
        { icon: Award, label: "15+ Years", description: "Experience" }
    ];

    const features = [
        {
            icon: Shield,
            title: "Safety First",
            description: "GPS tracking, trained drivers, and regular vehicle maintenance ensure your safety on every journey."
        },
        {
            icon: Heart,
            title: "Comfort Guaranteed",
            description: "Spacious seats, air conditioning, and modern amenities for a comfortable travel experience."
        },
        {
            icon: Clock,
            title: "On-Time Service",
            description: "Punctual departures and arrivals with real-time tracking to keep you informed."
        },
        {
            icon: Star,
            title: "Quality Service",
            description: "Professional staff, clean buses, and excellent customer service at affordable prices."
        }
    ];

    const amenities = [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Refreshments" },
        { icon: Phone, label: "Charging Points" },
        { icon: Shield, label: "CCTV Security" },
        { icon: Users, label: "Comfortable Seating" },
        { icon: Star, label: "Entertainment System" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-32">
                <div className="absolute inset-0 opacity-10">
                    <motion.div
                        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-white"
                        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                </div>

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        className="text-center mb-12"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div
                            className="flex justify-center items-center gap-2 mb-6"
                            variants={fadeInUp}
                        >
                            <Bus className="h-8 w-8 text-secondary" />
                            <span className="text-white/90 font-semibold text-lg">About Rajdhani Travels</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            variants={fadeInUp}
                        >
                            Your Trusted Travel{' '}
                            <span className="text-secondary">Partner</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                            variants={fadeInUp}
                        >
                            For over 15 years, we've been connecting Gujarat with safe, comfortable, and reliable bus services.
                            Your journey is our commitment.
                        </motion.p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                    <stat.icon className="h-10 w-10 text-secondary mx-auto mb-3" />
                                    <h3 className="text-base md:text-2xl font-bold text-white mb-1">{stat.label}</h3>
                                    <p className="text-white/80 text-sm">{stat.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <Target className="h-6 w-6 text-primary" />
                                    <span className="text-primary font-semibold">Our Story</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Transforming Bus Travel in Gujarat
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        Founded in 2008, Rajdhani Travels began with a simple vision: to revolutionize bus travel
                                        in Gujarat by providing safe, comfortable, and reliable transportation services. What started
                                        as a small operation with just 3 buses has grown into one of Gujarat's most trusted travel brands.
                                    </p>
                                    <p>
                                        Our journey has been driven by an unwavering commitment to passenger safety and comfort.
                                        We've invested heavily in modern fleet expansion, advanced safety systems, and comprehensive
                                        driver training programs to ensure every journey exceeds expectations.
                                    </p>
                                    <p>
                                        Today, we proudly serve over 50,000 passengers annually across 20+ cities in Gujarat,
                                        maintaining our founding principles of punctuality, safety, and exceptional customer service.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/10 rounded-full"></div>
                                <Bus className="h-32 w-32 text-primary/30 mx-auto mb-6" />
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                    <p className="text-gray-700">
                                        To provide the safest, most comfortable, and reliable bus travel experience
                                        while connecting communities across Gujarat with affordable transportation solutions.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Award className="h-6 w-6 text-primary" />
                            <span className="text-primary font-semibold">Why Choose Us</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Excellence in Every Journey
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            We're committed to providing exceptional travel experiences through our comprehensive approach to safety, comfort, and service.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="text-center group"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                                    <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="py-20 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="h-6 w-6 text-primary" />
                            <span className="text-primary font-semibold">Premium Amenities</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Travel in Comfort & Style
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Our modern fleet comes equipped with state-of-the-art amenities to ensure your journey is as comfortable as possible.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        variants={staggerChildren}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {amenities.map((amenity, index) => (
                            <motion.div
                                key={amenity.label}
                                className="text-center group"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                    <amenity.icon className="h-10 w-10 mx-auto mb-3 text-primary group-hover:text-white transition-colors" />
                                    <p className="font-medium text-gray-900 group-hover:text-white transition-colors">
                                        {amenity.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-20 md:py-24 bg-gradient-to-br from-primary to-secondary">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied passengers who trust Rajdhani Travels for their journey across Gujarat.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/"
                                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Your Journey
                            </motion.a>
                            <motion.a
                                href="/contact-us"
                                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Us
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;