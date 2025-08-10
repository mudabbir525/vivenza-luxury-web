// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { format, addDays, isSameDay } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { CalendarIcon, InfoIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import FoodService from './FoodService';

// const Booking = () => {
//   const [checkIn, setCheckIn] = useState<Date | undefined>();
//   const [checkOut, setCheckOut] = useState<Date | undefined>();
//   const [basePrice, setBasePrice] = useState(3);
//   const [guestCount, setGuestCount] = useState(15);
//   const [additionalServices, setAdditionalServices] = useState({
//     dj: false,
//     drinking: false,
//     bonfire: false
//   });

//   // Food related state
//   const [includeFoodService, setIncludeFoodService] = useState(false);
//   const [foodCost, setFoodCost] = useState(0);
//   const [mealCosts, setMealCosts] = useState({
//     breakfast: 0,
//     lunch: 0,
//     dinner: 0
//   });
//   const [mealDates, setMealDates] = useState({
//     breakfast: [] as Date[],
//     lunch: [] as Date[],
//     dinner: [] as Date[],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [dateRange, setDateRange] = useState<Date[]>([]);

//   // Customer details for Razorpay
//   const [customerDetails, setCustomerDetails] = useState({
//     name: '',
//     email: '',
//     phone: ''
//   });

//   // Update date range when check-in or check-out changes
//   useEffect(() => {
//     if (checkIn && checkOut) {
//       const dates = [];
//       let currentDate = new Date(checkIn);
      
//       while (currentDate <= checkOut) {
//         dates.push(new Date(currentDate));
//         currentDate = addDays(currentDate, 1);
//       }
      
//       setDateRange(dates);
//     } else {
//       setDateRange([]);
//     }
//   }, [checkIn, checkOut]);

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpayScript();
//   }, []);

//   // Handle package selection
//   const handlePackageChange = (value: string) => {
//   switch (value) {
//     case "weekdays":
//       setBasePrice(3);
//       break;
//     case "weekends":
//       setBasePrice(4);
//       break;
//     case "garden":
//       setBasePrice(5);
//       break;
//     case "farmhouse":
//       setBasePrice(6);
//       break;
//     default:
//       setBasePrice(0); // fallback in case of invalid input
//   }
// };


//   // Handle additional services changes
//   const handleAdditionalServiceChange = (service: string, checked: boolean) => {
//     setAdditionalServices({
//       ...additionalServices,
//       [service]: checked
//     });
//   };

//   // Handle customer details change
//   const handleCustomerDetailsChange = (field: string, value: string) => {
//     setCustomerDetails({
//       ...customerDetails,
//       [field]: value
//     });

//   };

//   // Razorpay payment handler
//   const handleRazorpayPayment = () => {
//     // if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
//     //   alert('Please fill in all customer details');
//     //   return;
//     // }

//     const options = {
//       key: 'rzp_live_Kx00d9elvHbrtP', // Your Razorpay key
//       amount: totalPrice * 100, // Amount in paise
//       currency: 'INR',
//       name: 'Farmhouse Booking',
//       description: `Booking from ${checkIn ? format(checkIn, 'MMM d, yyyy') : ''} to ${checkOut ? format(checkOut, 'MMM d, yyyy') : ''}`,
//       image: '/logo.png', // Optional: Add your logo
//       order_id: '', // You should generate this from your backend
//       handler: function (response: any) {
//         // Payment success callback
//         console.log('Payment successful:', response);
//         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        
//         // Here you would typically:
//         // 1. Send the payment details to your backend
//         // 2. Confirm the booking
//         // 3. Send confirmation email
//         // 4. Redirect to success page
        
//         // For now, we'll just show a success message
//         handlePaymentSuccess(response);
//       },
//       prefill: {
//         name: customerDetails.name,
//         email: customerDetails.email,
//         contact: customerDetails.phone,
//       },
//       notes: {
//         checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : '',
//         checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : '',
//         guests: guestCount.toString(),
//         services: Object.entries(additionalServices)
//           .filter(([_, selected]) => selected)
//           .map(([service]) => service)
//           .join(', '),
//         foodService: includeFoodService ? 'Yes' : 'No'
//       },
//       theme: {
//         color: '#F59E0B' // Amber color to match your theme
//       },
//       modal: {
//         ondismiss: function() {
//           setIsLoading(false);
//           console.log('Payment cancelled');
//         }
//       }
//     };

//     if (window.Razorpay) {
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } else {
//       alert('Razorpay SDK not loaded. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   const handlePaymentSuccess = (response: any) => {
//     // Handle successful payment
//     setIsLoading(false);
    
//     // You can add logic here to:
//     // - Save booking details to database
//     // - Send confirmation email
//     // - Clear form
//     // - Redirect to success page
    
//     console.log('Booking confirmed with payment:', response);
//   };

//   const handlePay = () => {
//     setIsLoading(true);
    
//     // Validate required fields
//     if (!checkIn || !checkOut) {
//       alert('Please select check-in and check-out dates');
//       setIsLoading(false);
//       return;
//     }

//     // In a real application, you would create an order on your backend first
//     // For now, we'll proceed directly to Razorpay
//     setTimeout(() => {
//       handleRazorpayPayment();
//     }, 1000);
//   };

//   // Handle food service toggle
//   const handleFoodServiceChange = (checked: boolean) => {
//     if (checked && (!checkIn || !checkOut)) {
//       alert("Please select check-in and check-out dates first");
//       return;
//     }
    
//     setIncludeFoodService(checked);
//     if (!checked) {
//       setFoodCost(0);
//       setMealCosts({
//         breakfast: 0,
//         lunch: 0,
//         dinner: 0
//       });
//       setMealDates({
//         breakfast: [],
//         lunch: [],
//         dinner: []
//       });
//     }
//   };

//   // Handle food cost updates from FoodService component
//   const handleFoodCostUpdate = (
//     totalFoodCost: number, 
//     mealCostsObj: { breakfast: number, lunch: number, dinner: number },
//     selectedDates: { breakfast: Date[], lunch: Date[], dinner: Date[] }
//   ) => {
//     setFoodCost(totalFoodCost);
//     setMealCosts(mealCostsObj);
//     setMealDates(selectedDates);
//   };

//   // Handle guest count change
//   const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value) || 0;
//     setGuestCount(value > 0 ? value : 15);
//   };

//   // Calculate total price based on all selections
//   const calculateTotalPrice = () => {
//     let total = basePrice;
    
//     // Add DJ service cost if selected
//     if (additionalServices.dj) {
//       total += 10000;
//     }
    
//     // Add drinking permission cost if selected
//     if (additionalServices.drinking) {
//       total += 15000;
//     }
    
//     // Add bonfire cost if selected
//     if (additionalServices.bonfire) {
//       total += 2500;
//     }
    
//     // Add food service cost if selected
//     if (includeFoodService) {
//       total += foodCost;
//     }
    
//     return total;
//   };
  
//   // Total price calculation
//   const totalPrice = calculateTotalPrice();

//   // Format meal dates for display
//   const formatMealDates = (dates: Date[]) => {
//     if (dates.length === 0) return "Not selected";
//     return dates.map(date => format(date, "MMM d")).join(", ");
//   };

//   // Order Summary Component
//   const OrderSummary = ({ className = "" }) => (
//     <div className={`bg-white border p-6 rounded-lg shadow-lg ${className}`}>
//       <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <span>Base Package:</span>
//           <span>₹{basePrice.toLocaleString()}</span>
//         </div>
        
//         {additionalServices.dj && (
//           <div className="flex justify-between">
//             <span>DJ Services:</span>
//             <span>₹10,000</span>
//           </div>
//         )}
        
//         {additionalServices.drinking && (
//           <div className="flex justify-between">
//             <span>Drinking Permission:</span>
//             <span>₹15,000</span>
//           </div>
//         )}
        
//         {additionalServices.bonfire && (
//           <div className="flex justify-between">
//             <span>Bonfire:</span>
//             <span>₹2,500</span>
//           </div>
//         )}
        
//         {includeFoodService && foodCost > 0 && (
//           <>
//             <div className="pt-2 border-t border-dashed">
//               <div className="text-lg font-medium mb-2">Food Services</div>
              
//               {mealCosts.breakfast > 0 && (
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <span>Breakfast ({guestCount} guests):</span>
//                     <span>₹{mealCosts.breakfast.toLocaleString()}</span>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Dates: {formatMealDates(mealDates.breakfast)} at 9:00 AM
//                   </div>
//                 </div>
//               )}
              
//               {mealCosts.lunch > 0 && (
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <span>Lunch ({guestCount} guests):</span>
//                     <span>₹{mealCosts.lunch.toLocaleString()}</span>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Dates: {formatMealDates(mealDates.lunch)} at 2:00 PM
//                   </div>
//                 </div>
//               )}
              
//               {mealCosts.dinner > 0 && (
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <span>Dinner ({guestCount} guests):</span>
//                     <span>₹{mealCosts.dinner.toLocaleString()}</span>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Dates: {formatMealDates(mealDates.dinner)} at 10:00 PM
//                   </div>
//                 </div>
//               )}
              
//               <div className="flex justify-between font-medium pt-2">
//                 <span>Total Food Cost:</span>
//                 <span>₹{foodCost.toLocaleString()}</span>
//               </div>
//             </div>
//           </>
//         )}
        
//         <div className="pt-4 border-t border-gray-300">
//           <div className="flex justify-between text-lg font-bold">
//             <span>Total:</span>
//             <span>₹{totalPrice.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>

//       {/* Customer Details Form*/}
//       {/* <div className="mt-6 pt-6 border-t border-gray-200">
//         <h4 className="font-medium mb-4">Customer Details</h4>
//         <div className="space-y-3">
//           <Input
//             placeholder="Full Name"
//             value={customerDetails.name}
//             onChange={(e) => handleCustomerDetailsChange('name', e.target.value)}
//           />
//           <Input
//             type="email"
//             placeholder="Email Address"
//             value={customerDetails.email}
//             onChange={(e) => handleCustomerDetailsChange('email', e.target.value)}
//           />
//           <Input
//             type="tel"
//             placeholder="Phone Number"
//             value={customerDetails.phone}
//             onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
//           />
//         </div>
//       </div>  */}
      
//       <Button 
//         className="w-full mt-6 bg-amber-500 hover:bg-amber-600"
//         onClick={handlePay} 
//         // disabled={isLoading || !checkIn || !checkOut || !customerDetails.name || !customerDetails.email || !customerDetails.phone}
//         disabled={isLoading || !checkIn || !checkOut}
//       >
//         {isLoading ? "Processing..." : "Pay Now with Razorpay"}
//       </Button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-stone-50 pt-24">
//         <div className="container mt-4 mx-auto py-16 px-4">
//           <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             Book Your Stay
//           </h1>
//           <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>

//           <div className="bg-amber-50 p-4 rounded-lg mb-8 text-center">
//             <p className="text-sm md:text-base">
//               <strong>Check-in time:</strong> 12:00 PM on arrival day &nbsp;|&nbsp; 
//               <strong>Check-out time:</strong> 11:00 AM on departure day
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h3 className="font-serif text-2xl mb-6">Select Package & Dates</h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Select Package</label>
//                   <Select onValueChange={handlePackageChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a package" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="farmhouse">Full Farmhouse Stay </SelectItem>
//                       <SelectItem value="garden">Garden Area </SelectItem>
//                       <SelectItem value="weekdays">Weekdays(ONLY FarmHouse)</SelectItem>
//                       <SelectItem value="weekends">Weekends(ONLY FarmHouse)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                <div className="space-y-6">
//   <div className="flex items-center space-x-4">
//     <label className="flex items-center space-x-2">
//       <input
//         type="radio"
//         name="timeFormat"
//         value="12hr"
//         className="form-radio text-blue-600"
//       />
//       <span>12 Hours</span>
//     </label>
    
//     <label className="flex items-center space-x-2">
//       <input
//         type="radio"
//         name="timeFormat"
//         value="24hr"
//         className="form-radio text-blue-600"
//       />
//       <span>24 Hours</span>
//     </label>
//   </div>
// </div>




//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Check-in Date</label>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button variant="outline" className="w-full justify-start text-left font-normal">
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={checkIn}
//                           onSelect={setCheckIn}
//                           initialFocus
//                           className="rounded-md border"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Check-out Date</label>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button variant="outline" className="w-full justify-start text-left font-normal">
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={checkOut}
//                           onSelect={setCheckOut}
//                           initialFocus
//                           disabled={(date) => !checkIn || date < checkIn}
//                           className="rounded-md border"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Number of Guests</label>
//                   <Input 
//                     type="number" 
//                     min="15" 
//                     value={guestCount}
//                     onChange={handleGuestCountChange}
//                     placeholder="Enter number of guests" 
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8">
//               <div className="bg-white p-8 rounded-lg shadow-lg">
//                 <h3 className="font-serif text-2xl mb-6">Additional Services</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox 
//                       id="dj" 
//                       checked={additionalServices.dj}
//                       onCheckedChange={(checked) => 
//                         handleAdditionalServiceChange("dj", checked === true)
//                       }
//                     />
//                     <label
//                       htmlFor="dj"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       DJ Services (+₹10,000)
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox 
//                       id="drinking" 
//                       checked={additionalServices.drinking}
//                       onCheckedChange={(checked) => 
//                         handleAdditionalServiceChange("drinking", checked === true)
//                       }
//                     />
//                     <label
//                       htmlFor="drinking"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Drinking Permission (+₹15,000)
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox 
//                       id="bonfire" 
//                       checked={additionalServices.bonfire}
//                       onCheckedChange={(checked) => 
//                         handleAdditionalServiceChange("bonfire", checked === true)
//                       }
//                     />
//                     <label
//                       htmlFor="bonfire"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Bonfire (+₹2,500)
//                     </label>
//                   </div>
                  
//                   {/* Food Service Option */}
//                   <div className="pt-4 border-t">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox 
//                         id="food" 
//                         checked={includeFoodService}
//                         onCheckedChange={(checked) => 
//                           handleFoodServiceChange(checked === true)
//                         }
//                       />
//                       <label
//                         htmlFor="food"
//                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                       >
//                         Include Food Services
//                       </label>
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <InfoIcon className="h-4 w-4 text-gray-500" />
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p className="w-64">Select from breakfast, lunch, and dinner options with different price tiers.</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Order Summary - Show here if food service is not included */}
//               {!includeFoodService && <OrderSummary />}
//             </div>
//           </div>

//           {/* Food Options Section with Order Summary - Only visible when food service is selected */}
//           {includeFoodService && (
//             <div className="mt-12">
//               <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Food Service Section - 70% width on large screens */}
//                 <div className="lg:w-[70%]">
//                   <FoodService 
//                     guestCount={guestCount} 
//                     onFoodCostUpdate={handleFoodCostUpdate}
//                     dateRange={dateRange}
//                   />
//                 </div>
                
//                 {/* Order Summary - 30% width on large screens, sticky on top */}
//                 <div className="lg:w-[30%]">
//                   <div className="lg:sticky lg:top-36">
//                     <OrderSummary />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />

//       {isLoading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-pulse">
//             <p className="text-xl font-semibold mb-4">Proceeding to Payment...</p>
//             <div className="h-2 w-2/3 mx-auto bg-amber-500 rounded-full animate-bounce"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;



import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format, addDays, isSameDay, isBefore, isAfter } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon, InfoIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FoodService from './FoodService';

// Types
interface BookingPackage {
  id: number;
  name: string;
  day: string;
  halfday_price: number;
  fullday_price: number;
  min_guests: number;
  max_guests: number;
  extra_per_guest: number;
  sort_order: number;
}

interface AdditionalService {
  id: number;
  name: string;
  key_name: string;
  price: number;
  description: string;
  is_active: number;
  sort_order: number;
}

const Booking = () => {
  // Backend data state
  const [packages, setPackages] = useState<BookingPackage[]>([]);
  const [additionalServicesData, setAdditionalServicesData] = useState<AdditionalService[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<BookingPackage | null>(null);

  // Booking state
  const [durationType, setDurationType] = useState<'12_hours' | '24_hours'>('12_hours');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [checkInPopoverOpen, setCheckInPopoverOpen] = useState(false);
const [checkOutPopoverOpen, setCheckOutPopoverOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [guestCount, setGuestCount] = useState<number>(15);
  const [guestError, setGuestError] = useState<string>('');
  const [additionalServices, setAdditionalServices] = useState<Record<number, boolean>>({});

  // Food related state
  const [includeFoodService, setIncludeFoodService] = useState(false);
  const [foodCost, setFoodCost] = useState(0);
  const [mealCosts, setMealCosts] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0
  });
  const [mealDates, setMealDates] = useState({
    breakfast: [] as Date[],
    lunch: [] as Date[],
    snacks: [] as Date[],
    dinner: [] as Date[],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Customer details for Razorpay
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Fetch booking packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://admin.webhostdevs.com/api/booking-packages/index.php');
        const data = await response.json();
        if (data.status === 'success' && data.data?.length) {
          setPackages(data.data);
          // if (data.data.length > 0) {
          //   setSelectedPackage(data.data[0]);
          //   setGuestCount(data.data[0].min_guests);
          // }
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Fetch additional services
  useEffect(() => {
    const fetchAdditionalServices = async () => {
      try {
        const response = await fetch('https://admin.webhostdevs.com/api/additional-services/index.php');
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setAdditionalServicesData(data.data);
          // Initialize services selection state
          const servicesState: Record<number, boolean> = {};
          data.data.forEach((service: AdditionalService) => {
            servicesState[service.id] = false;
          });
          setAdditionalServices(servicesState);
        }
      } catch (error) {
        console.error('Error fetching additional services:', error);
      }
    };

    fetchAdditionalServices();
  }, []);

  // Update date range when check-in or check-out changes
  useEffect(() => {
    if (!checkIn) {
      setDateRange([]);
      return;
    }
    
    if (durationType === '12_hours') {
      setDateRange([checkIn]);
    } else if (checkIn && checkOut) {
      const dates = [];
      let currentDate = new Date(checkIn);
      while (currentDate <= checkOut) {
        dates.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
      }
      setDateRange(dates);
    } else if (checkIn) {
      setDateRange([checkIn]);
    }
  }, [checkIn, checkOut, durationType]);

  // Guest validation
  useEffect(() => {
    if (!selectedPackage || typeof guestCount !== 'number') return;
    if (guestCount < selectedPackage.min_guests) {
      setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
    } else {
      setGuestError('');
    }
  }, [guestCount, selectedPackage]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Real-time date validation (blocks today check-in after 12 PM)
  const isCheckInDateDisabled = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Block past dates
    if (selectedDate < today) return true;
    
    // If it's today and current time is >= 12 PM, block today
    if (isSameDay(selectedDate, today) && now.getHours() >= 12) {
      return true;
    }
    
    return false;
  };

  // Check-out date validation
  const isCheckOutDateDisabled = (date: Date) => {
    if (!checkIn) return true;
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    return isBefore(date, checkInDate) || isSameDay(date, checkInDate);
  };

  // Handle package selection
  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find(p => p.id === parseInt(packageId));
    if (pkg) {
      setSelectedPackage(pkg);
      setGuestCount(pkg.min_guests);
      setGuestError('');
      // Reset dates when package changes
      setCheckIn(undefined);
      setCheckOut(undefined);
      setDateRange([]);
    }
  };

  // Handle duration type change
  const handleDurationTypeChange = (duration: string) => {
    setDurationType(duration as '12_hours' | '24_hours');
    // Reset checkout for 12 hours
    if (duration === '12_hours') {
      setCheckOut(undefined);
    }
    // Reset date range
    setDateRange([]);
  };

  // Handle guest count change with validation
  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setGuestCount(value);
    
    if (!selectedPackage) {
      setGuestError('Please select a package first');
      return;
    }

    if (value < selectedPackage.min_guests) {
      setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
    } else {
      setGuestError('');
    }
  };

  // Handle additional services changes
  const handleAdditionalServiceChange = (serviceId: number, checked: boolean) => {
    setAdditionalServices(prev => ({
      ...prev,
      [serviceId]: checked
    }));
  };

  // Handle check-in date change
  const handleCheckInChange = (date: Date | undefined) => {
    setCheckIn(date);
    setCheckInPopoverOpen(false);
    if (durationType === '12_hours') {
      setCheckOut(undefined);
    } else if (checkOut && date && isAfter(date, checkOut)) {
      setCheckOut(undefined);
    }
  };

  // Handle check-out date change
  const handleCheckOutChange = (date: Date | undefined) => {
    if (durationType === '24_hours') {
      setCheckOut(date);
      setCheckOutPopoverOpen(false); 
    }
  };

  // Get base price based on duration and package
  const getBasePrice = () => {
    if (!selectedPackage) return 0;
    const price = durationType === '12_hours' ? selectedPackage.halfday_price : selectedPackage.fullday_price;
    return typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : Number(price);
  };

  // Calculate extra guest charge
  const getExtraGuestCharge = () => {
    if (!selectedPackage || guestCount <= selectedPackage.max_guests) return 0;
    const extraGuests = guestCount - selectedPackage.max_guests;
    const charge = extraGuests * selectedPackage.extra_per_guest;
    return typeof charge === 'string' ? parseFloat(charge.replace(/,/g, '')) : Number(charge);
  };

  // Calculate additional services cost
  const getAdditionalServicesCost = () => {
    return additionalServicesData
      .filter(service => additionalServices[service.id])
      .reduce((total, service) => {
        const price = typeof service.price === 'string' 
          ? parseFloat(service.price.replace(/,/g, '')) 
          : Number(service.price);
        return total + price;
      }, 0);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = getBasePrice();
    total += getExtraGuestCharge();
    total += getAdditionalServicesCost();
    
    if (includeFoodService) {
      total += typeof foodCost === 'string' ? parseFloat(foodCost.replace(/,/g, '')) : Number(foodCost);
    }
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  // Handle food service toggle
  const handleFoodServiceChange = (checked: boolean) => {
    if (checked && (!checkIn || (durationType === '24_hours' && !checkOut))) {
      alert("Please select check-in and check-out dates first");
      return;
    }

    setIncludeFoodService(checked);
    if (!checked) {
      setFoodCost(0);
      setMealCosts({
        breakfast: 0,
        lunch: 0,
        snacks: 0,
        dinner: 0
      });
      setMealDates({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
      });
    }
  };

  // Handle food cost updates from FoodService component
  const handleFoodCostUpdate = (
    totalFoodCost: number,
    mealCostsObj: { breakfast: number, lunch: number, snacks: number, dinner: number },
    selectedDates: { breakfast: Date[], lunch: Date[], snacks: Date[], dinner: Date[] }
  ) => {
    setFoodCost(totalFoodCost);
    setMealCosts(mealCostsObj);
    setMealDates(selectedDates);
  };

  // Function to get available food categories for a date based on duration and timing rules
  const getAvailableFoodCategoriesForDate = (date: Date) => {
    if (!checkIn) return [];
    
    if (durationType === '12_hours') {
      // For 12 hours: only lunch, snacks, dinner (no breakfast)
      return ['lunch', 'snacks', 'dinner'];
    }
    
    if (durationType === '24_hours') {
      if (isSameDay(date, checkIn)) {
        // First day - exclude breakfast (check-in at 12 PM)
        return ['lunch', 'snacks', 'dinner'];
      }
      if (checkOut && isSameDay(date, checkOut)) {
        // Last day - only breakfast (check-out at 11:59 AM)
        return ['breakfast'];
      }
      // Middle days - all meals available
      return ['breakfast', 'lunch', 'snacks', 'dinner'];
    }
    
    return [];
  };

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    const options = {
      key: 'rzp_live_Kx00d9elvHbrtP',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Farmhouse Booking',
      description: `Booking from ${checkIn ? format(checkIn, 'MMM d, yyyy') : ''} to ${checkOut ? format(checkOut, 'MMM d, yyyy') : ''}`,
      image: '/logo.png',
      order_id: '',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        handlePaymentSuccess(response);
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      notes: {
        checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : '',
        checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : '',
        guests: guestCount.toString(),
        services: additionalServicesData
          .filter(service => additionalServices[service.id])
          .map(service => service.name)
          .join(', '),
        foodService: includeFoodService ? 'Yes' : 'No'
      },
      theme: {
        color: '#F59E0B'
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
          console.log('Payment cancelled');
        }
      }
    };

    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert('Razorpay SDK not loaded. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (response: any) => {
    setIsLoading(false);
    console.log('Booking confirmed with payment:', response);
  };

  const handlePay = () => {
    if (!checkIn || (durationType === '24_hours' && !checkOut)) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    if (guestError) {
      alert('Please fix guest count errors');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      handleRazorpayPayment();
    }, 1000);
  };

  // Format meal dates for display
  const formatMealDates = (dates: Date[]) => {
    if (dates.length === 0) return "Not selected";
    return dates.map(date => format(date, "MMM d")).join(", ");
  };

  // Order Summary Component
  const OrderSummary = ({ className = "" }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Base Package:</span>
          <span>₹{getBasePrice().toLocaleString()}</span>
        </div>
        
        {getExtraGuestCharge() > 0 && (
          <div className="flex justify-between">
            <span>Extra Guests ({guestCount - (selectedPackage?.max_guests || 0)}):</span>
            <span>₹{getExtraGuestCharge().toLocaleString()}</span>
          </div>
        )}

        {additionalServicesData
        .filter(service => service.is_active === 1 && additionalServices[service.id])
        .map(service => 
          additionalServices[service.id] && (
            <div key={service.id} className="flex justify-between">
              <span>{service.name}:</span>
              <span>₹{Number(service.price).toLocaleString()}</span>
            </div>
          )
        )}

        {includeFoodService && foodCost > 0 && (
          <>
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Food Services</h4>
              {mealCosts.breakfast > 0 && (
                <div className="text-sm flex justify-between">
                  <span>Breakfast ({guestCount} guests):</span>
                  <span>₹{mealCosts.breakfast.toLocaleString()}</span>
                </div>
              )}
              {mealCosts.lunch > 0 && (
                <div className="text-sm flex justify-between">
                  <span>Lunch ({guestCount} guests):</span>
                  <span>₹{mealCosts.lunch.toLocaleString()}</span>
                </div>
              )}
              {mealCosts.snacks > 0 && (
                <div className="text-sm flex justify-between">
                  <span>Snacks ({guestCount} guests):</span>
                  <span>₹{mealCosts.snacks.toLocaleString()}</span>
                </div>
              )}
              {mealCosts.dinner > 0 && (
                <div className="text-sm flex justify-between">
                  <span>Dinner ({guestCount} guests):</span>
                  <span>₹{mealCosts.dinner.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span>Total Food Cost:</span>
                <span>₹{foodCost.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        onClick={handlePay} 
        disabled={isLoading || !!guestError || !checkIn || (durationType === '24_hours' && !checkOut)}
        className="w-full mt-4 bg-amber-500 hover:bg-amber-600"
      >
        {isLoading ? "Processing..." : "Pay Now with Razorpay"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-stone-50 pt-24">
        <div className="container mt-4 mx-auto py-16 px-4">
          {/* Header with title and timing info */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Book Your Stay
          </h1>
          <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>

          <div className="bg-amber-50 p-4 rounded-lg mb-8 text-center">
            <p className="text-sm md:text-base">
              <strong>Check-in time:</strong> 12:00 PM on arrival day &nbsp;|&nbsp; 
              <strong>Check-out time:</strong> 11:00 AM on departure day
            </p>
          </div>

          {/* Main 2-column grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT COLUMN: Package/Dates/Guests */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-serif text-2xl mb-6">Select Package & Dates</h3>
              
              <div className="space-y-6">
                {/* Package Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Package</label>
                  <Select onValueChange={handlePackageChange} value={selectedPackage?.id.toString() || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map(pkg => (
                        <SelectItem key={pkg.id} value={pkg.id.toString()}>
                          {pkg.name} ({pkg.day}) - ₹{(durationType === '12_hours' ? pkg.halfday_price : pkg.fullday_price).toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Selection */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="timeFormat"
                        value="12_hours"
                        checked={durationType === '12_hours'}
                        onChange={() => handleDurationTypeChange('12_hours')}
                        className="form-radio text-blue-600"
                      />
                      <span>12 Hours</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="timeFormat"
                        value="24_hours"
                        checked={durationType === '24_hours'}
                        onChange={() => handleDurationTypeChange('24_hours')}
                        className="form-radio text-blue-600"
                      />
                      <span>24 Hours</span>
                    </label>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <Popover open={checkInPopoverOpen} onOpenChange={setCheckInPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={handleCheckInChange}
                          disabled={isCheckInDateDisabled}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {durationType === '24_hours' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Check-out Date</label>
                      <Popover open={checkOutPopoverOpen} onOpenChange={setCheckOutPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={handleCheckOutChange}
                            disabled={isCheckOutDateDisabled}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <Input
                    type="number"
                    min={selectedPackage?.min_guests || 1}
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    placeholder={selectedPackage ? `Min: ${selectedPackage.min_guests}, Max: ${selectedPackage.max_guests}` : "Select package first"}
                    className={guestError ? "border-red-500" : ""}
                  />
                  {selectedPackage && (
                    <p className="text-gray-600 text-sm mt-1">
                      Min: {selectedPackage.min_guests}, Max: {selectedPackage.max_guests} | ₹{selectedPackage.extra_per_guest} per extra guest
                    </p>
                  )}
                  {guestError && (
                    <p className="text-red-500 text-sm mt-1">{guestError}</p>
                  )}
                  {selectedPackage && guestCount > selectedPackage.max_guests && (
                    <p className="text-amber-600 text-sm mt-1">
                      Extra guest charge: ₹{selectedPackage.extra_per_guest} per guest × {guestCount - selectedPackage.max_guests} guests = ₹{getExtraGuestCharge().toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Services + Summary */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-serif text-2xl mb-6">Additional Services</h3>
                <div className="space-y-4">
                  {additionalServicesData
                  .filter(service => service.is_active === 1)
                  .map(service => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={additionalServices[service.id] || false}
                        onCheckedChange={(checked) => handleAdditionalServiceChange(service.id, checked === true)}
                      />
                      <label htmlFor={`service-${service.id}`} className="text-sm font-medium">
                        {service.name} (+₹{Number(service.price).toLocaleString()})
                      </label>
                    </div>
                  ))}
                  
                  {/* Food Service Option */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="food" 
                        checked={includeFoodService}
                        onCheckedChange={(checked) => 
                          handleFoodServiceChange(checked === true)
                        }
                      />
                      <label
                        htmlFor="food"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include Food Services
                      </label>
                      <InfoIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary - Show here if food service is not included */}
              {!includeFoodService && <OrderSummary />}
            </div>
          </div>

          {/* Food Options Section - Only visible when food service is selected */}
          {includeFoodService && (
            <div className="mt-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Food Service Section - 70% width on large screens */}
                <div className="lg:w-[70%]">
                  <FoodService 
                    guestCount={guestCount}
                    dateRange={dateRange}
                    foodCategoriesForDate={getAvailableFoodCategoriesForDate}
                    onFoodCostUpdate={handleFoodCostUpdate}
                  />
                </div>
                
                {/* Order Summary - 30% width on large screens, sticky on top */}
                <div className="lg:w-[30%]">
                  <div className="lg:sticky lg:top-36">
                    <OrderSummary />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-pulse">
            <p className="text-xl font-semibold mb-4">Proceeding to Payment...</p>
            <div className="h-2 w-2/3 mx-auto bg-amber-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
