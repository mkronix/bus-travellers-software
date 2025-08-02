
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Plus, Trash2, User, Mail, Phone, Calendar } from 'lucide-react';
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
  passengers: z.array(passengerSchema).min(1, 'At least one passenger is required'),
  contactPerson: z.object({
    name: z.string().min(2, 'Contact person name is required'),
    mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
    email: z.string().email('Please enter a valid email'),
  }),
});

type FormData = z.infer<typeof formSchema>;

const PassengerForm = () => {
  const [selectedSeats] = useState(['1A', '1B']); // Mock selected seats
  const [totalAmount] = useState(900); // Mock total amount

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: selectedSeats.map(() => ({
        name: '',
        age: 0,
        gender: undefined,
        mobile: '',
        email: '',
      })),
      contactPerson: {
        name: '',
        mobile: '',
        email: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast.success('Passenger details saved! Proceeding to payment...');
    // Here you would typically navigate to payment page
  };

  const copyContactToPassenger = (index: number) => {
    const contactPerson = watch('contactPerson');
    if (contactPerson.name && contactPerson.mobile) {
      setValue(`passengers.${index}.name`, contactPerson.name);
      setValue(`passengers.${index}.mobile`, contactPerson.mobile);
      setValue(`passengers.${index}.email`, contactPerson.email || '');
      toast.success('Contact details copied to passenger');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-warmBrown-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-browning-900">Passenger Details</h1>
              <p className="text-browning-700">Enter passenger information for your booking</p>
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
                    <User className="h-5 w-5 text-warmBrown-500" />
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
                        className="input-field"
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
                        className="input-field"
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
                      className="input-field"
                    />
                    {errors.contactPerson?.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.contactPerson.email.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Passengers */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User className="h-5 w-5 text-warmBrown-500" />
                      Passenger Details
                    </span>
                    <Badge variant="outline">{fields.length} Passenger(s)</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border border-warmBrown-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-browning-900">
                          Passenger {index + 1} 
                          <Badge variant="secondary" className="ml-2">Seat {selectedSeats[index]}</Badge>
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyContactToPassenger(index)}
                          >
                            Copy Contact Details
                          </Button>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`passenger-${index}-name`}>Full Name *</Label>
                          <Input
                            id={`passenger-${index}-name`}
                            {...register(`passengers.${index}.name`)}
                            placeholder="Enter full name"
                            className="input-field"
                          />
                          {errors.passengers?.[index]?.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.passengers[index]?.name?.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor={`passenger-${index}-age`}>Age *</Label>
                          <Input
                            id={`passenger-${index}-age`}
                            type="number"
                            {...register(`passengers.${index}.age`, { valueAsNumber: true })}
                            placeholder="Enter age"
                            className="input-field"
                          />
                          {errors.passengers?.[index]?.age && (
                            <p className="text-sm text-red-600 mt-1">{errors.passengers[index]?.age?.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor={`passenger-${index}-gender`}>Gender *</Label>
                          <Select onValueChange={(value) => setValue(`passengers.${index}.gender`, value as any)}>
                            <SelectTrigger className="input-field">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.passengers?.[index]?.gender && (
                            <p className="text-sm text-red-600 mt-1">{errors.passengers[index]?.gender?.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor={`passenger-${index}-mobile`}>Mobile Number *</Label>
                          <Input
                            id={`passenger-${index}-mobile`}
                            {...register(`passengers.${index}.mobile`)}
                            placeholder="Enter 10-digit mobile number"
                            className="input-field"
                          />
                          {errors.passengers?.[index]?.mobile && (
                            <p className="text-sm text-red-600 mt-1">{errors.passengers[index]?.mobile?.message}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor={`passenger-${index}-email`}>Email Address (Optional)</Label>
                          <Input
                            id={`passenger-${index}-email`}
                            type="email"
                            {...register(`passengers.${index}.email`)}
                            placeholder="Enter email address"
                            className="input-field"
                          />
                          {errors.passengers?.[index]?.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.passengers[index]?.email?.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {fields.length < 6 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ name: '', age: 0, gender: undefined, mobile: '', email: '' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Passenger
                    </Button>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" className="btn-primary px-8">
                  Continue to Payment
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
                  <span className="text-browning-700">Route:</span>
                  <span className="font-medium">Rajkot → Ahmedabad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Date:</span>
                  <span className="font-medium">15 Dec 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Departure:</span>
                  <span className="font-medium">06:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Bus:</span>
                  <span className="font-medium">Rajkot Express</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Seats:</span>
                  <div className="flex gap-1">
                    {selectedSeats.map(seat => (
                      <Badge key={seat} variant="secondary">{seat}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-browning-700">Base Fare:</span>
                  <span>₹{totalAmount - 50}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-browning-700">Service Tax:</span>
                  <span>₹50</span>
                </div>
                <hr className="border-warmBrown-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-warmBrown-600">₹{totalAmount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-warmBrown-50">
              <CardHeader>
                <CardTitle className="text-sm">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Please carry a valid ID proof during travel</p>
                <p>• Arrive at pickup point 15 minutes before departure</p>
                <p>• Cancellation charges apply as per policy</p>
                <p>• Bus departure time may vary ±15 minutes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
