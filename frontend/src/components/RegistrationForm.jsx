import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, AVAILABLE_COURSES } from '@/lib/validationSchema';
import { registrationAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User, Mail, Phone, Users, GraduationCap, Calendar, MapPin, Upload, Loader2, CheckCircle2 } from 'lucide-react';

export default function RegistrationForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      fatherName: '',
      motherName: '',
      course: '',
      dateOfBirth: '',
      gender: '',
      passportPhoto: undefined,
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
      },
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('passportPhoto', file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all fields
      formData.append('fullName', data.fullName);
      formData.append('mobileNumber', data.mobileNumber);
      formData.append('email', data.email);
      formData.append('fatherName', data.fatherName);
      formData.append('motherName', data.motherName);
      formData.append('course', data.course);
      formData.append('dateOfBirth', data.dateOfBirth);
      formData.append('gender', data.gender);
      formData.append('passportPhoto', data.passportPhoto);
      
      // Append address as JSON string
      formData.append('address', JSON.stringify(data.address));
      
      // Submit to API
      const response = await registrationAPI.submitRegistration(formData);
      
      // Call success callback with WhatsApp link
      onSuccess(response.whatsappLink);
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-warm-white to-mint-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-navy mb-2">
            SmartDesignHub Course Registration
          </h1>
          <p className="text-lg text-slate">
            Join our 2026 Tech Courses - 9 Weeks of Intensive Learning
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>Starting January 2026 | Hybrid Mode | 1:00 PM - 4:00 PM</span>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
            <CardTitle className="text-white text-2xl">Student Registration Form</CardTitle>
            <CardDescription className="text-white/90">
              Please fill in all required information accurately
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male" className="cursor-pointer">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female" className="cursor-pointer">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other" className="cursor-pointer">Other</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mobile Number */}
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="08012345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Parent Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <Users className="w-5 h-5 text-primary" />
                    Parent/Guardian Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Father's Name */}
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Father's full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mother's Name */}
                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mother's full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Course Selection Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Course Selection
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Course *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AVAILABLE_COURSES.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Address Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Lagos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input placeholder="Lagos State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code *</FormLabel>
                          <FormControl>
                            <Input placeholder="100001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Passport Photo Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-navy flex items-center gap-2 border-b pb-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Passport Photograph
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="passportPhoto"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Passport Photo * (Max 5MB, JPEG/PNG)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              ref={fileInputRef}
                              onChange={handlePhotoChange}
                              {...field}
                            />
                            {photoPreview && (
                              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
                                <img
                                  src={photoPreview}
                                  alt="Passport preview"
                                  className="w-24 h-24 object-cover rounded-lg border-2 border-primary"
                                />
                                <div className="flex items-center gap-2 text-mint">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="text-sm font-medium">Photo uploaded successfully</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Registration...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate">
          <p>For more information, visit: www.smartdesignhub.space</p>
          <p className="mt-2">Follow us on social media: @SmartDesignHub</p>
        </div>
      </div>
    </div>
  );
}
