
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Plus, Trash2, User, Mail, Phone, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

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

  const onSubmit = (data: FormData) => {
    console.log('Booking confirmed:', {
      ...data,
      selectedBus,
      selectedSeat,
      searchData,
    });
    toast.success('🎫 Booking confirmed! E-ticket will be sent via WhatsApp');
  };

  const copyContactToMainPassenger = () => {
    const contactPerson = watch('contactPerson');
    if (contactPerson.name && contactPerson.mobile) {
      setValue('mainPassenger.name', contactPerson.name);
      setValue('mainPassenger.mobile', contactPerson.mobile);
      setValue('mainPassenger.email', contactPerson.email || '');
      toast.success('Contact details copied to main passenger');
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBackToSeat} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Passenger Details</h1>
              <p className="text-gray-700">Enter passenger information for your booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Passenger Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Person */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact Person Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Full Name *</Label>
                      <Input
                        id="contactName"
                        {...register('contactPerson.name')}
                        placeholder="Enter full name"
                        className="mt-1"
                      />
                      {errors.contactPerson?.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.contactPerson.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="contactMobile">Mobile Number *</Label>
                      <Input
                        id="contactMobile"
                        {...register('contactPerson.mobile')}
                        placeholder="Enter 10-digit mobile number"
                        className="mt-1"
                      />
                      {errors.contactPerson?.mobile && (
                        <p className="text-sm text-red-600 mt-1">{errors.contactPerson.mobile.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register('contactPerson.email')}
                      placeholder="Enter email address"
                      className="mt-1"
                    />
                    {errors.contactPerson?.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.contactPerson.email.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Main Passenger */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Main Passenger Details
                    </span>
                    <Badge variant="secondary">Seat {selectedSeat}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-end mb-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyContactToMainPassenger}
                    >
                      Copy Contact Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mainPassengerName">Full Name *</Label>
                      <Input
                        id="mainPassengerName"
                        {...register('mainPassenger.name')}
                        placeholder="Enter full name"
                        className="mt-1"
                      />
                      {errors.mainPassenger?.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.mainPassenger.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mainPassengerAge">Age *</Label>
                      <Input
                        id="mainPassengerAge"
                        type="number"
                        {...register('mainPassenger.age', { valueAsNumber: true })}
                        placeholder="Enter age"
                        className="mt-1"
                      />
                      {errors.mainPassenger?.age && (
                        <p className="text-sm text-red-600 mt-1">{errors.mainPassenger.age.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mainPassengerGender">Gender *</Label>
                      <Select onValueChange={(value) => setValue('mainPassenger.gender', value as any)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.mainPassenger?.gender && (
                        <p className="text-sm text-red-600 mt-1">{errors.mainPassenger.gender.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mainPassengerMobile">Mobile Number *</Label>
                      <Input
                        id="mainPassengerMobile"
                        {...register('mainPassenger.mobile')}
                        placeholder="Enter 10-digit mobile number"
                        className="mt-1"
                      />
                      {errors.mainPassenger?.mobile && (
                        <p className="text-sm text-red-600 mt-1">{errors.mainPassenger.mobile.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="mainPassengerEmail">Email Address (Optional)</Label>
                      <Input
                        id="mainPassengerEmail"
                        type="email"
                        {...register('mainPassenger.email')}
                        placeholder="Enter email address"
                        className="mt-1"
                      />
                      {errors.mainPassenger?.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.mainPassenger.email.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Passengers (Optional) */}
              {additionalPassengers.length > 0 && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Additional Passengers (Optional)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {additionalPassengers.map((_, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            Additional Passenger {index + 1}
                          </h3>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeAdditionalPassenger(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name *</Label>
                            <Input
                              {...register(`additionalPassengers.${index}.name` as any)}
                              placeholder="Enter full name"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label>Age *</Label>
                            <Input
                              type="number"
                              {...register(`additionalPassengers.${index}.age` as any, { valueAsNumber: true })}
                              placeholder="Enter age"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label>Gender *</Label>
                            <Select onValueChange={(value) => setValue(`additionalPassengers.${index}.gender` as any, value)}>
                              <SelectTrigger className="mt-1">
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
                            <Label>Mobile Number *</Label>
                            <Input
                              {...register(`additionalPassengers.${index}.mobile` as any)}
                              placeholder="Enter 10-digit mobile number"
                              className="mt-1"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label>Email Address (Optional)</Label>
                            <Input
                              type="email"
                              {...register(`additionalPassengers.${index}.email` as any)}
                              placeholder="Enter email address"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Add Additional Passenger Button */}
              {additionalPassengers.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAdditionalPassenger}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Additional Passenger (Optional)
                </Button>
              )}

              <div className="flex justify-end">
                <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-8">
                  <Mail className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Trip Summary */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Route:</span>
                  <span className="font-medium">{searchData.from} → {searchData.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Date:</span>
                  <span className="font-medium">{searchData.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Departure:</span>
                  <span className="font-medium">{selectedBus?.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Bus:</span>
                  <span className="font-medium">{selectedBus?.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Seat:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    {selectedSeat}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Price Details */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Base Fare:</span>
                  <span>₹{selectedBus?.price || 1450}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Service Tax:</span>
                  <span>₹50</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{(selectedBus?.price || 1450) + 50}</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Please carry a valid ID proof during travel</p>
                <p>• Arrive at pickup point 15 minutes before departure</p>
                <p>• E-ticket will be sent via WhatsApp</p>
                <p>• Cancellation charges apply as per policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
