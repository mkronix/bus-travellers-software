import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bed,
  Bus,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Info,
  MapPin,
  Phone,
  Plus,
  Shield,
  Trash2,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passengerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(1, 'Age must be at least 1').max(120, 'Age must be less than 120'),
  gender: z.enum(['male', 'female', 'other']),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

const formSchema = z.object({
  mainPassenger: passengerSchema,
  additionalPassengers: z.array(passengerSchema).max(5, 'Maximum 6 passengers allowed'),
  contactPerson: z.object({
    name: z.string().min(2, 'Contact person name is required'),
    mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
    email: z.string().email('Please enter a valid email'),
  }),
});

type FormData = z.infer<typeof formSchema>;

interface PassengerFormProps {
  selectedBus: any;
  selectedSeat: string;
  searchData: any;
  onBackToSeat: () => void;
}

const PassengerForm = ({ selectedBus, selectedSeat, searchData, onBackToSeat }: PassengerFormProps) => {
  const [additionalPassengers, setAdditionalPassengers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainPassenger: {
        name: '',
        age: 0,
        gender: undefined,
        mobile: '',
        email: '',
      },
      additionalPassengers: [],
      contactPerson: {
        name: '',
        mobile: '',
        email: '',
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Booking confirmed:', {
      ...data,
      selectedBus,
      selectedSeat,
      searchData,
    });

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const copyContactToMainPassenger = () => {
    const contactPerson = watch('contactPerson');
    if (contactPerson.name && contactPerson.mobile) {
      setValue('mainPassenger.name', contactPerson.name);
      setValue('mainPassenger.mobile', contactPerson.mobile);
      setValue('mainPassenger.email', contactPerson.email || '');
      // You can replace this with your toast system
      alert('Contact details copied to main passenger');
    }
  };

  const addAdditionalPassenger = () => {
    if (additionalPassengers.length < 5) {
      setAdditionalPassengers([...additionalPassengers, {}]);
    }
  };

  const removeAdditionalPassenger = (index: number) => {
    setAdditionalPassengers(additionalPassengers.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  const formVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-700 mb-6">Your bus ticket has been booked successfully. E-ticket will be sent via WhatsApp.</p>
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-2.5 rounded-xl"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 sticky top-0 z-40 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBackToSeat}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
            <div>
              <motion.h1
                className="text-lg md:text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Passenger Details
              </motion.h1>
              <motion.p
                className="text-gray-700 text-xs md:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Enter passenger information for your booking
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Passenger Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Person */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      Contact Person Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={formVariants}
                    >
                      <div>
                        <Label htmlFor="contactName" className="text-sm font-semibold text-gray-700">Full Name *</Label>
                        <Input
                          id="contactName"
                          {...register('contactPerson.name')}
                          placeholder="Enter full name"
                          className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                        />
                        {errors.contactPerson?.name && (
                          <motion.p
                            className="text-sm text-red-600 mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Info className="h-3 w-3" />
                            {errors.contactPerson.name.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="mainPassengerAge" className="text-sm font-semibold text-gray-700">Age *</Label>
                        <Input
                          id="mainPassengerAge"
                          type="number"
                          {...register('mainPassenger.age', { valueAsNumber: true })}
                          placeholder="Enter age"
                          maxLength={2}
                          min={1}
                          className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                        />
                        {errors.mainPassenger?.age && (
                          <motion.p
                            className="text-sm text-red-600 mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Info className="h-3 w-3" />
                            {errors.mainPassenger.age.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="mainPassengerGender" className="text-sm font-semibold text-gray-700">Gender *</Label>
                        <Select onValueChange={(value) => setValue('mainPassenger.gender', value as any)}>
                          <SelectTrigger className="mt-2 h-12 border-2 rounded-xl focus:border-primary">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.mainPassenger?.gender && (
                          <motion.p
                            className="text-sm text-red-600 mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Info className="h-3 w-3" />
                            {errors.mainPassenger.gender.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="mainPassengerMobile" className="text-sm font-semibold text-gray-700">Mobile Number *</Label>
                        <Input
                          id="mainPassengerMobile"
                          {...register('mainPassenger.mobile')}
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          minLength={10}
                          type="tel"
                          className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                        />
                        {errors.mainPassenger?.mobile && (
                          <motion.p
                            className="text-sm text-red-600 mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Info className="h-3 w-3" />
                            {errors.mainPassenger.mobile.message}
                          </motion.p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="mainPassengerEmail" className="text-sm font-semibold text-gray-700">Email Address (Optional)</Label>
                        <Input
                          id="mainPassengerEmail"
                          type="email"
                          {...register('mainPassenger.email')}
                          placeholder="Enter email address"
                          className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                        />
                        {errors.mainPassenger?.email && (
                          <motion.p
                            className="text-sm text-red-600 mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <Info className="h-3 w-3" />
                            {errors.mainPassenger.email.message}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Additional Passengers */}
              <AnimatePresence>
                {additionalPassengers.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <User className="h-5 w-5 text-primary" />
                          Additional Passengers (Optional)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 space-y-6">
                        <AnimatePresence>
                          {additionalPassengers.map((_, index) => (
                            <motion.div
                              key={index}
                              className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -20 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Additional Passenger {index + 1}
                                </h3>
                                <motion.button
                                  type="button"
                                  onClick={() => removeAdditionalPassenger(index)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-semibold text-gray-700">Full Name *</Label>
                                  <Input
                                    {...register(`additionalPassengers.${index}.name` as any)}
                                    placeholder="Enter full name"
                                    className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold text-gray-700">Age *</Label>
                                  <Input
                                    type="number"
                                    {...register(`additionalPassengers.${index}.age` as any, { valueAsNumber: true })}
                                    placeholder="Enter age"
                                    className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold text-gray-700">Gender *</Label>
                                  <Select onValueChange={(value) => setValue(`additionalPassengers.${index}.gender` as any, value)}>
                                    <SelectTrigger className="mt-2 h-12 border-2 rounded-xl focus:border-primary">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label className="text-sm font-semibold text-gray-700">Mobile Number *</Label>
                                  <Input
                                    {...register(`additionalPassengers.${index}.mobile` as any)}
                                    placeholder="Enter 10-digit mobile number"
                                    className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <Label className="text-sm font-semibold text-gray-700">Email Address (Optional)</Label>
                                  <Input
                                    type="email"
                                    {...register(`additionalPassengers.${index}.email` as any)}
                                    placeholder="Enter email address"
                                    className="mt-2 h-12 border-2 rounded-xl focus:border-primary transition-colors"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Add Additional Passenger Button */}
              {additionalPassengers.length < 5 && (
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAdditionalPassenger}
                    className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Additional Passenger (Optional)
                  </Button>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                className="flex justify-end pt-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl px-8 py-3 rounded-xl font-semibold text-base relative overflow-hidden"
                  >
                    {isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: [-100, 300] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Trip Summary */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bus className="h-5 w-5" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-4">
                  {[
                    { label: 'Route', value: `${searchData.from} → ${searchData.to}`, icon: MapPin },
                    { label: 'Date', value: searchData.date?.toLocaleDateString(), icon: Calendar },
                    { label: 'Departure', value: selectedBus?.departureTime, icon: Clock },
                    { label: 'Bus', value: selectedBus?.operator, icon: Bus },
                    { label: 'Seat', value: selectedSeat, icon: Bed }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <span className="text-gray-700 flex items-center gap-2 text-sm">
                        <item.icon className="h-4 w-4 text-gray-500" />
                        {item.label}:
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{item.value}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Price Details */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    Price Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Base Fare:</span>
                    <span className="font-medium">₹{selectedBus?.price || 1450}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Service Tax:</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <hr className="border-gray-200" />
                  <motion.div
                    className="flex justify-between font-bold text-lg"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>Total Amount:</span>
                    <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ₹{(selectedBus?.price || 1450) + 50}
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Notes */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg border border-amber-200 rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-amber-800 flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-amber-800 p-4 md:p-6">
                  {[
                    "Please carry a valid ID proof during travel",
                    "Arrive at pickup point 15 minutes before departure",
                    "E-ticket will be sent via WhatsApp",
                    "Cancellation charges apply as per policy"
                  ].map((note, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{note}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PassengerForm;