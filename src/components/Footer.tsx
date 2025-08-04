import React from 'react'
import { motion } from 'framer-motion'
import { Award, Bus, HeartHandshake, Mail, MapPin, Phone, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 md:py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="lg:col-span-1">
                        <motion.div
                            className="flex items-center space-x-2 mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Bus className="h-8 w-8 text-secondary" />
                            <div>
                                <span className="text-xl md:text-2xl font-bold text-white">Rajdhani Travels</span>
                                <p className="text-xs md:text-sm text-gray-400">Travel with Trust</p>
                            </div>
                        </motion.div>
                        <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                            Your reliable partner for comfortable and safe bus travel across Gujarat.
                        </p>
                        <motion.div
                            className="flex items-center gap-2 text-secondary"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Phone className="h-4 w-4" />
                            <span className="font-semibold">+91 98765 43210</span>
                        </motion.div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                            <MapPin className="h-4 w-4 text-secondary" />
                            Popular Routes
                        </h4>
                        <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                            {[
                                "Ahmedabad → Surat",
                                "Mehsana → Ahmedabad",
                                "Palanpur → Anand",
                                "Bharuch → Navsari"
                            ].map((route, index) => (
                                <motion.li
                                    key={route}
                                    whileHover={{ x: 5, color: "#10b981" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a href="#" className="hover:text-secondary transition-colors">
                                        {route}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                            <Users className="h-4 w-4 text-secondary" />
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                            {[
                                "About Us",
                                "Contact Us",
                                "Terms & Conditions",
                                "Privacy Policy"
                            ].map((link, index) => (
                                <motion.li
                                    key={link}
                                    whileHover={{ x: 5, color: "#10b981" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link to={`/${link.split(" ").join("-").toLowerCase()}`} className="hover:text-secondary transition-colors">
                                        {link}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                            <Mail className="h-4 w-4 text-secondary" />
                            Contact Info
                        </h4>
                        <div className="space-y-3 text-gray-300 text-sm md:text-base">
                            {[
                                { icon: Phone, text: "+91 98765 43210" },
                                { icon: Mail, text: "info@rajdhanitravels.com" },
                                { icon: MapPin, text: "Gujarat, India" }
                            ].map((contact, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <contact.icon className="h-4 w-4 text-secondary flex-shrink-0" />
                                    <span>{contact.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                        <Award className="h-4 w-4 text-secondary" />
                        &copy; {new Date().getFullYear()} Rajdhani Travels. All rights reserved.
                        <HeartHandshake className="h-4 w-4 text-secondary" />
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer