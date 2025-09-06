// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { format, addDays, isSameDay, isBefore, isAfter } from "date-fns";
// // import { Calendar } from "@/components/ui/calendar";
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
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// import FoodService from "./FoodService";
// import OrderSummary from "../components/OrderSummary";
// import { useAuth } from "./auth-context";
// import { useNavigate } from "react-router-dom";
// import DatePicker from '../components/DatePicker';

// interface BookingPackage {
//   id: number;
//   name: string;
//   day: string;
//   halfday_price: number;
//   fullday_price: number;
//   min_guests: number;
//   max_guests: number;
//   extra_per_guest: number;
//   sort_order: number;
// }

// interface AdditionalService {
//   id: number;
//   name: string;
//   key_name: string;
//   price: number;
//   description: string;
//   is_active: number;
//   sort_order: number;
// }

// const Booking = () => {
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   // Backend data state
//   const [packages, setPackages] = useState<BookingPackage[]>([]);
//   const [additionalServicesData, setAdditionalServicesData] = useState<AdditionalService[]>([]);
//   const [selectedPackage, setSelectedPackage] = useState<BookingPackage | null>(null);

//   // Booking state
//   const [durationType, setDurationType] = useState<"12_hours" | "24_hours">("12_hours");
//   const [checkIn, setCheckIn] = useState<Date | undefined>();
//   const [checkOut, setCheckOut] = useState<Date | undefined>();
//   const [checkInPopoverOpen, setCheckInPopoverOpen] = useState(false);
//   const [checkOutPopoverOpen, setCheckOutPopoverOpen] = useState(false);
//   const [dateRange, setDateRange] = useState<Date[]>([]);
//   const [guestCount, setGuestCount] = useState<number>(15);
//   const [guestError, setGuestError] = useState<string>("");
//   const [additionalServices, setAdditionalServices] = useState<Record<number, boolean>>({});

//   const [couponCode, setCouponCode] = useState<string>("");
//   const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
//   const [couponDiscount, setCouponDiscount] = useState<number>(0);
//   const [couponLoading, setCouponLoading] = useState<boolean>(false);
//   const [couponError, setCouponError] = useState<string>("");

//   // Food related state
//   const [includeFoodService, setIncludeFoodService] = useState(false);
//   const [foodCost, setFoodCost] = useState(0);
//   const [mealCosts, setMealCosts] = useState({
//     breakfast: 0,
//     lunch: 0,
//     snacks: 0,
//     dinner: 0,
//   });
//   const [mealDates, setMealDates] = useState({
//     breakfast: [] as Date[],
//     lunch: [] as Date[],
//     snacks: [] as Date[],
//     dinner: [] as Date[],
//   });
//   const [dayMealConfigs, setDayMealConfigs] = useState<Record<string, Record<string, any>>>({});
//   // Add these state variables after your other state declarations
// const [foodData, setFoodData] = useState<{
//   foodCategories: any[];
//   packagesByCategory: Record<number, any[]>;
// }>({
//   foodCategories: [],
//   packagesByCategory: {}
// });


//   const [isLoading, setIsLoading] = useState(false);
//   const [bookingError, setBookingError] = useState("");

//   // Auto-fill customer details from auth
//   useEffect(() => {
//     if (user) {
//       setCustomerDetails({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user]);

//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // Fetch booking packages on component mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await fetch(
//           "https://admin.webhostdevs.com/api/booking-packages/index.php"
//         );
//         const data = await response.json();
//         if (data.status === "success" && data.data?.length) {
//           setPackages(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // Fetch additional services
//   useEffect(() => {
//     const fetchAdditionalServices = async () => {
//       try {
//         const response = await fetch(
//           "https://admin.webhostdevs.com/api/additional-services/index.php"
//         );
//         const data = await response.json();
//         if (data.status === "success" && data.data) {
//           setAdditionalServicesData(data.data);
//           const servicesState: Record<number, boolean> = {};
//           data.data.forEach((service: AdditionalService) => {
//             servicesState[service.id] = false;
//           });
//           setAdditionalServices(servicesState);
//         }
//       } catch (error) {
//         console.error("Error fetching additional services:", error);
//       }
//     };

//     fetchAdditionalServices();
//   }, []);

//   // Update date range when check-in or check-out changes
//   useEffect(() => {
//     if (!checkIn) {
//       setDateRange([]);
//       return;
//     }

//     if (durationType === "12_hours") {
//       setDateRange([checkIn]);
//     } else if (checkIn && checkOut) {
//       const dates = [];
//       let currentDate = new Date(checkIn);
//       while (currentDate <= checkOut) {
//         dates.push(new Date(currentDate));
//         currentDate = addDays(currentDate, 1);
//       }
//       setDateRange(dates);
//     } else if (checkIn) {
//       setDateRange([checkIn]);
//     }
//   }, [checkIn, checkOut, durationType]);

//   // Guest validation
//   useEffect(() => {
//     if (!selectedPackage || typeof guestCount !== "number") return;
//     if (guestCount < selectedPackage.min_guests) {
//       setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
//     } else {
//       setGuestError("");
//     }
//   }, [guestCount, selectedPackage]);

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpayScript();
//   }, []);


//   // Handle package selection
//   const handlePackageChange = (packageId: string) => {
//     const pkg = packages.find((p) => p.id === parseInt(packageId));
//     if (pkg) {
//       setSelectedPackage(pkg);
//       setGuestCount(pkg.min_guests);
//       setGuestError("");
//       // Reset dates when package changes
//       setCheckIn(undefined);
//       setCheckOut(undefined);
//       setDateRange([]);
//     }
//   };

//   // Handle duration type change
//   const handleDurationTypeChange = (duration: string) => {
//     setDurationType(duration as "12_hours" | "24_hours");
//     // Reset checkout for 12 hours
//     if (duration === "12_hours") {
//       setCheckOut(undefined);
//     }
//     // Reset date range
//     setDateRange([]);
//   };

//   // Handle guest count change with validation
//   const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value) || 0;
//     setGuestCount(value);

//     if (!selectedPackage) {
//       setGuestError("Please select a package first");
//       return;
//     }

//     if (value < selectedPackage.min_guests) {
//       setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
//     } else {
//       setGuestError("");
//     }
//   };

//   // Handle additional services changes
//   const handleAdditionalServiceChange = (serviceId: number, checked: boolean) => {
//     setAdditionalServices((prev) => ({
//       ...prev,
//       [serviceId]: checked,
//     }));
//   };


//   // Get base price based on duration and package
//   const getBasePrice = () => {
//     if (!selectedPackage) return 0;
//     const price =
//       durationType === "12_hours"
//         ? selectedPackage.halfday_price
//         : selectedPackage.fullday_price;
//     return typeof price === "string"
//       ? parseFloat(price.replace(/,/g, ""))
//       : Number(price);
//   };

//   // Calculate extra guest charge
//   const getExtraGuestCharge = () => {
//     if (!selectedPackage || guestCount <= selectedPackage.max_guests) return 0;
//     const extraGuests = guestCount - selectedPackage.max_guests;
//     const charge = extraGuests * selectedPackage.extra_per_guest;
//     return typeof charge === "string"
//       ? parseFloat(charge.replace(/,/g, ""))
//       : Number(charge);
//   };

//   // Calculate additional services cost
//   const getAdditionalServicesCost = () => {
//     return additionalServicesData
//       .filter((service) => additionalServices[service.id])
//       .reduce((total, service) => {
//         const price =
//           typeof service.price === "string"
//             ? parseFloat(service.price.replace(/,/g, ""))
//             : Number(service.price);
//         return total + price;
//       }, 0);
//   };

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     let total = getBasePrice();
//     total += getExtraGuestCharge();
//     total += getAdditionalServicesCost();

//     if (includeFoodService) {
//       total +=
//         typeof foodCost === "string"
//           ? parseFloat(foodCost.replace(/,/g, ""))
//           : Number(foodCost);
//     }

//     return total;
//   };

//   const totalPrice = calculateTotalPrice();

//   // Add coupon validation function
//   const applyCoupon = async () => {
//     const code = couponCode.trim().toUpperCase();

//     if (!code) {
//       setCouponError("Please enter a coupon code");
//       return;
//     }

//     setCouponLoading(true);
//     setCouponError("");

//     try {
//       const orderValue = calculateTotalPrice();
//       const response = await fetch(
//         `https://admin.webhostdevs.com/api/coupons/coupons.php?validate=1&code=${couponCode}&order_value=${orderValue}`
//       );
//       const data = await response.json();

//       if (data.success) {
//         setAppliedCoupon(data.coupon);
//         setCouponDiscount(data.discount_amount);
//         setCouponError("");
//         setCouponCode(code);
//       } else {
//         setCouponError(data.message);
//         setAppliedCoupon(null);
//         setCouponDiscount(0);
//       }
//     } catch (error) {
//       setCouponError("Error applying coupon. Please try again.");
//       setAppliedCoupon(null);
//       setCouponDiscount(0);
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const removeCoupon = () => {
//     setCouponCode("");
//     setAppliedCoupon(null);
//     setCouponDiscount(0);
//     setCouponError("");
//   };

//   // Update final amount calculation
//   const getFinalAmount = () => {
//     const baseAmount = calculateTotalPrice();
//     return Math.max(0, baseAmount - couponDiscount);
//   };

//   // Handle food service toggle
//   const handleFoodServiceChange = (checked: boolean) => {
//     if (checked && (!checkIn || (durationType === "24_hours" && !checkOut))) {
//       alert("Please select check-in and check-out dates first");
//       return;
//     }

//     setIncludeFoodService(checked);
//     if (!checked) {
//       setFoodCost(0);
//       setMealCosts({
//         breakfast: 0,
//         lunch: 0,
//         snacks: 0,
//         dinner: 0,
//       });
//       setMealDates({
//         breakfast: [],
//         lunch: [],
//         snacks: [],
//         dinner: [],
//       });
//     }
//   };

//   // Handle food cost updates from FoodService component
//   const handleFoodCostUpdate = (
//     totalFoodCost: number,
//     mealCostsObj: {
//       breakfast: number;
//       lunch: number;
//       snacks: number;
//       dinner: number;
//     },
//     selectedDates: {
//       breakfast: Date[];
//       lunch: Date[];
//       snacks: Date[];
//       dinner: Date[];
//     },
//     dayMealConfigs: Record<string, Record<string, any>>,
//     foodData: {
//     foodCategories: any[];
//     packagesByCategory: Record<number, any[]>;
//   }
//   ) => {
//     setFoodCost(totalFoodCost);
//     setMealCosts(mealCostsObj);
//     setMealDates(selectedDates);
//     setDayMealConfigs(dayMealConfigs); 
//     setFoodData(foodData);
//   };

//   // Function to get available food categories for a date based on duration and timing rules
//   const getAvailableFoodCategoriesForDate = (date: Date) => {
//     if (!checkIn) return [];

//     if (durationType === "12_hours") {
//       // For 12 hours: only lunch, snacks, dinner (no breakfast)
//       return ["lunch", "snacks", "dinner"];
//     }

//     if (durationType === "24_hours") {
//       if (isSameDay(date, checkIn)) {
//         // First day - exclude breakfast (check-in at 12 PM)
//         return ["lunch", "snacks", "dinner"];
//       }
//       if (checkOut && isSameDay(date, checkOut)) {
//         // Last day - only breakfast (check-out at 11:59 AM)
//         return ["breakfast"];
//       }
//       // Middle days - all meals available
//       return ["breakfast", "lunch", "snacks", "dinner"];
//     }

//     return [];
//   };

//   // Create booking record before payment
//   const createBookingRecord = async () => {
//     if (!selectedPackage || !checkIn || (durationType === "24_hours" && !checkOut)) {
//       throw new Error("Select Package or Date Correctly");
//     }

//     if (!isAuthenticated || !user) {
//       throw new Error("User not authenticated");
//     }

//     // Prepare food services data if included
//     const foodServicesData = includeFoodService
//       ? Object.entries(mealDates).flatMap(([mealKey, dates]) => {
//           return dates.map(date => {
//             const dateKey = format(date, 'yyyy-MM-dd');
//             const dayConfig = dayMealConfigs[dateKey];
//             const mealConfig = dayConfig?.[mealKey];
//             // Use the passed data
//           const category = foodData.foodCategories.find(cat => cat.key_name === mealKey);
//           const packages = category ? foodData.packagesByCategory[category.id] || [] : [];
//           const selectedPackage = packages.find(pkg => pkg.id === mealConfig?.package_id);
//           const pricePerPerson = selectedPackage?.price || 0;
//             return {
//               meal_type: mealKey,
//               date: format(date, 'yyyy-MM-dd'),
//               package_id: mealConfig?.package_id || null,
//               cuisine_type_id: mealConfig?.cuisine_type_id || null,
//               price_per_person: pricePerPerson,
//               total_price: pricePerPerson * guestCount,
//               selected_items: mealConfig?.selected_items || {}
//             };
//           });
//         })
//       : [];

//     // Prepare additional services data
//     const selectedAdditionalServices = additionalServicesData
//       .filter(service => additionalServices[service.id])
//       .map(service => service.id);

//     // Prepare booking payload
//     const bookingPayload = {
//       customer_name: customerDetails.name,
//       customer_email: customerDetails.email,
//       customer_phone: customerDetails.phone,
//       package_id: selectedPackage.id,
//       duration_type: durationType,
//       check_in_date: format(checkIn, 'yyyy-MM-dd'),
//       check_out_date: durationType === "24_hours" && checkOut 
//         ? format(checkOut, 'yyyy-MM-dd') 
//         : format(checkIn, 'yyyy-MM-dd'),
//       guest_count: guestCount,
//       base_price: getBasePrice(),
//       additional_services_cost: getAdditionalServicesCost(),
//       food_cost: foodCost,
//       total_cost: getFinalAmount(),
//       food_services: foodServicesData,
//       additional_services: selectedAdditionalServices
//     };

//     console.log("Booking payload:", bookingPayload);

//     try {
//       const response = await fetch('https://admin.webhostdevs.com/api/bookings/create.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingPayload)
//       });

//       const data = await response.json();
      
//       if (!response.ok || data.status !=="success") {
//         throw new Error(data.message || "Failed to create booking");
//       }

//       return data.data; // Returns booking_id and other details
//     } catch (error) {
//       console.error("Booking creation error:", error);
//       throw error;
//     }
//   };

//   // Razorpay payment handler
//   const handleRazorpayPayment = async (bookingId: string) => {
//   try {
//     // 🔥 Step 1: Ask backend to create an order
//     const orderResponse = await fetch(
//       "https://admin.webhostdevs.com/api/bookings/create-order.php",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: getFinalAmount() }), // send amount in rupees
//       }
//     );

//     const orderData = await orderResponse.json();
//     console.log("Order creation response:", orderData);
//     if (orderData.status !== "success") {
//       throw new Error(orderData.message || "Failed to create Razorpay order");
//     }

//     const { id: razorpayOrderId, amount, currency } = orderData.order;

//     // 🔥 Step 2: Open Razorpay checkout with real order_id
//     const options = {
//       key: "rzp_test_R6qauIjIkLmjM1",
//       amount: amount, // already in paise from backend
//       currency: currency,
//       name: "Vivenza Farmhouse Booking",
//       description: `Booking ${bookingId} from ${
//         checkIn ? format(checkIn, "MMM d, yyyy") : ""
//       } to ${checkOut ? format(checkOut, "MMM d, yyyy") : ""}`,
//       image: "/logo.png",
//       order_id: razorpayOrderId, // ✅ now real order id
//       handler: async function (response: any) {
//         console.log("Payment Response:", response);
//         try {
//           // 🔥 Step 3: Verify payment with backend
//           const verifyResponse = await fetch(
//             "https://admin.webhostdevs.com/api/bookings/verify-payment.php",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 booking_id: bookingId,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );
//           console.log(response);

//           const verifyData = await verifyResponse.json();

//           if (!verifyResponse.ok || verifyData.status !== "success") {
//             throw new Error(
//               verifyData.message || "Payment verification failed"
//             );
//           }

//           // ✅ Redirect to success page with booking data
//           navigate("/booking-success", {
//             state: {
//               bookingData: verifyData.data,
//               paymentId: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//             },
//           });
//         } catch (error) {
//           console.error("Payment verification error:", error);
//           setBookingError("Payment verification failed. Please contact support.");
//           setIsLoading(false);
//         }
//       },
//       prefill: {
//         name: customerDetails.name,
//         email: customerDetails.email,
//         contact: customerDetails.phone,
//       },
//       notes: {
//         booking_id: bookingId,
//         checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
//         checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
//         guests: guestCount.toString(),
//       },
//       theme: { color: "#F59E0B" },
//       modal: {
//         ondismiss: function () {
//           setIsLoading(false);
//           console.log("Payment cancelled");
//         },
//       },
//     };

//     if (window.Razorpay) {
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } else {
//       alert("Razorpay SDK not loaded. Please try again.");
//       setIsLoading(false);
//     }
//   } catch (err) {
//     console.error("Error starting payment:", err);
//     setBookingError("Unable to start payment. Please try again.");
//     setIsLoading(false);
//   }
// };


//   const handlePay = async () => {
//     if (!isAuthenticated) {
//       setBookingError("Please login or register to book");
//       return;
//     }

//     if (!checkIn || (durationType === "24_hours" && !checkOut)) {
//       alert("Please select check-in and check-out dates");
//       return;
//     }

//     if (guestError) {
//       alert("Please fix guest count errors");
//       return;
//     }

//     setIsLoading(true);
//     setBookingError("");

//     try {
//       // First create booking record
//       const bookingResult = await createBookingRecord();
      
//       // Then initiate payment
//       await handleRazorpayPayment(bookingResult.booking_id);
//     } catch (error) {
//       console.error("Booking error:", error);
//       setBookingError(error instanceof Error ? error.message : "Booking failed. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   // Format meal dates for display
//   const formatMealDates = (dates: Date[]) => {
//     if (dates.length === 0) return "Not selected";
//     return dates.map((date) => format(date, "MMM d")).join(", ");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-stone-50 pt-24">
//         <div className="container mt-4 mx-auto py-16 px-4">
//           {/* Header with title and timing info */}
//           <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             Book Your Stay
//           </h1>
//           <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>

//           <div className="bg-amber-50 p-4 rounded-lg mb-8 text-center">
//             <p className="text-sm md:text-base">
//               <strong>Check-in time:</strong> 12:00 PM on arrival day
//               &nbsp;|&nbsp;
//               <strong>Check-out time:</strong> 11:00 AM on departure day
//             </p>
//           </div>

//           {/* Main 2-column grid */}
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* LEFT COLUMN: Package/Dates/Guests */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h3 className="font-serif text-2xl mb-6">
//                 Select Package & Dates
//               </h3>

//               <div className="space-y-6">
//                 {/* Package Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Select Package
//                   </label>
//                   <Select
//                     onValueChange={handlePackageChange}
//                     value={selectedPackage?.id.toString() || ""}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Choose your package" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {packages.map((pkg) => (
//                         <SelectItem key={pkg.id} value={pkg.id.toString()}>
//                           {pkg.name} ({pkg.day}) - ₹
//                           {(durationType === "12_hours"
//                             ? pkg.halfday_price
//                             : pkg.fullday_price
//                           ).toLocaleString()}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Duration Selection */}
//                 <div className="space-y-6">
//                   <div className="flex items-center space-x-4">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="timeFormat"
//                         value="12_hours"
//                         checked={durationType === "12_hours"}
//                         onChange={() => handleDurationTypeChange("12_hours")}
//                         className="form-radio text-blue-600"
//                       />
//                       <span>12 Hours</span>
//                     </label>

//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="timeFormat"
//                         value="24_hours"
//                         checked={durationType === "24_hours"}
//                         onChange={() => handleDurationTypeChange("24_hours")}
//                         className="form-radio text-blue-600"
//                       />
//                       <span>24 Hours</span>
//                     </label>
//                   </div>
//                 </div>

//                {/* Date Selection */}
// <div className="space-y-4">
//   <div>
//     <label className="block text-sm font-medium mb-2">
//       Select Your Dates
//     </label>
//     <DatePicker
//       selectedStartDate={checkIn}
//       selectedEndDate={checkOut}
//       onDateSelect={(start, end) => {
//         setCheckIn(start);
//         setCheckOut(end);
//       }}
//       durationType={durationType}
//       className="w-full"
//     />
//   </div>
// </div>



//                 {/* Guest Count */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Number of Guests
//                   </label>
//                   <Input
//                     type="number"
//                     min={selectedPackage?.min_guests || 1}
//                     value={guestCount}
//                     onChange={handleGuestCountChange}
//                     placeholder={
//                       selectedPackage
//                         ? `Min: ${selectedPackage.min_guests}, Max: ${selectedPackage.max_guests}`
//                         : "Select package first"
//                     }
//                     className={guestError ? "border-red-500" : ""}
//                   />
//                   {selectedPackage && (
//                     <p className="text-gray-600 text-sm mt-1">
//                       Min: {selectedPackage.min_guests}, Max:{" "}
//                       {selectedPackage.max_guests} | ₹
//                       {selectedPackage.extra_per_guest} per extra guest
//                     </p>
//                   )}
//                   {guestError && (
//                     <p className="text-red-500 text-sm mt-1">{guestError}</p>
//                   )}
//                   {selectedPackage &&
//                     guestCount > selectedPackage.max_guests && (
//                       <p className="text-amber-600 text-sm mt-1">
//                         Extra guest charge: ₹{selectedPackage.extra_per_guest}{" "}
//                         per guest × {guestCount - selectedPackage.max_guests}{" "}
//                         guests = ₹{getExtraGuestCharge().toLocaleString()}
//                       </p>
//                     )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: Services + Summary */}
//             <div className="space-y-8">
//               <div className="bg-white p-8 rounded-lg shadow-lg">
//                 <h3 className="font-serif text-2xl mb-6">
//                   Additional Services
//                 </h3>
//                 <div className="space-y-4">
//                   {additionalServicesData
//                     .filter((service) => service.is_active === 1)
//                     .map((service) => (
//                       <div
//                         key={service.id}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox
//                           id={`service-${service.id}`}
//                           checked={additionalServices[service.id] || false}
//                           onCheckedChange={(checked) =>
//                             handleAdditionalServiceChange(
//                               service.id,
//                               checked === true
//                             )
//                           }
//                         />
//                         <label
//                           htmlFor={`service-${service.id}`}
//                           className="text-sm font-medium"
//                         >
//                           {service.name} (+₹
//                           {Number(service.price).toLocaleString()})
//                         </label>
//                       </div>
//                     ))}

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
//                       <InfoIcon className="h-4 w-4 text-gray-500" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Summary - Show here if food service is not included */}
//               {!includeFoodService && (
//                 <OrderSummary
//                   couponCode={couponCode}
//                   setCouponCode={setCouponCode}
//                   applyCoupon={applyCoupon}
//                   removeCoupon={removeCoupon}
//                   couponLoading={couponLoading}
//                   couponError={couponError}
//                   appliedCoupon={appliedCoupon}
//                   couponDiscount={couponDiscount}
//                   getBasePrice={getBasePrice}
//                   getExtraGuestCharge={getExtraGuestCharge}
//                   guestCount={guestCount}
//                   selectedPackage={selectedPackage}
//                   additionalServicesData={additionalServicesData}
//                   additionalServices={additionalServices}
//                   includeFoodService={includeFoodService}
//                   foodCost={foodCost}
//                   mealCosts={mealCosts}
//                   calculateTotalPrice={calculateTotalPrice}
//                   getFinalAmount={getFinalAmount}
//                   handlePay={handlePay}
//                   isLoading={isLoading}
//                   guestError={guestError}
//                   checkIn={checkIn}
//                   checkOut={checkOut}
//                   durationType={durationType}
//                   isAuthenticated={isAuthenticated}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Food Options Section - Only visible when food service is selected */}
//           {includeFoodService && (
//             <div className="mt-12">
//               <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Food Service Section - 70% width on large screens */}
//                 <div className="lg:w-[70%]">
//                   <FoodService
//                     guestCount={guestCount}
//                     dateRange={dateRange}
//                     foodCategoriesForDate={getAvailableFoodCategoriesForDate}
//                     onFoodCostUpdate={handleFoodCostUpdate}
//                   />
//                 </div>

//                 {/* Order Summary - 30% width on large screens, sticky on top */}
//                 <div className="lg:w-[30%]">
//                   <div className="lg:sticky lg:top-36">
//                     <OrderSummary
//                       couponCode={couponCode}
//                       setCouponCode={setCouponCode}
//                       applyCoupon={applyCoupon}
//                       removeCoupon={removeCoupon}
//                       couponLoading={couponLoading}
//                       couponError={couponError}
//                       appliedCoupon={appliedCoupon}
//                       couponDiscount={couponDiscount}
//                       getBasePrice={getBasePrice}
//                       getExtraGuestCharge={getExtraGuestCharge}
//                       guestCount={guestCount}
//                       selectedPackage={selectedPackage}
//                       additionalServicesData={additionalServicesData}
//                       additionalServices={additionalServices}
//                       includeFoodService={includeFoodService}
//                       foodCost={foodCost}
//                       mealCosts={mealCosts}
//                       calculateTotalPrice={calculateTotalPrice}
//                       getFinalAmount={getFinalAmount}
//                       handlePay={handlePay}
//                       isLoading={isLoading}
//                       guestError={guestError}
//                       checkIn={checkIn}
//                       checkOut={checkOut}
//                       durationType={durationType}
//                       isAuthenticated={isAuthenticated}
//                     />
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
//             <p className="text-xl font-semibold mb-4">
//               Proceeding to Payment...
//             </p>
//             <div className="h-2 w-2/3 mx-auto bg-amber-500 rounded-full animate-bounce"></div>
//           </div>
//         </div>
//       )}

//       {/* Booking error modal */}
//       {bookingError && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h3 className="text-xl font-semibold text-red-600 mb-4">Message</h3>
//             <p className="mb-4">{bookingError}</p>
//             <div className="flex justify-end space-x-3">
//               <Button 
//                 onClick={() => setBookingError("")}
//                 className="bg-amber-500 hover:bg-amber-600"
//               >
//                 OK
//               </Button>
//               {!isAuthenticated && (
//                 <Button 
//                   onClick={() => navigate('/login')}
//                   className="bg-blue-500 hover:bg-blue-600"
//                 >
//                   Login
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;



import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { format, addDays, isSameDay, isBefore, isAfter } from "date-fns";
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
import FoodService from "./FoodService";
import OrderSummary from "../components/OrderSummary";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";
import DatePicker from '../components/DatePicker';

interface BookingPackage {
  id: number;
  name: string;
  weekday_price: number;
  weekend_price: number;
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
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Backend data state
  const [packages, setPackages] = useState<BookingPackage[]>([]);
  const [additionalServicesData, setAdditionalServicesData] = useState<AdditionalService[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<BookingPackage | null>(null);

  // NEW: Modal state for package info
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [tempSelectedPackage, setTempSelectedPackage] = useState<BookingPackage | null>(null);

  // Booking state
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [checkInPopoverOpen, setCheckInPopoverOpen] = useState(false);
  const [checkOutPopoverOpen, setCheckOutPopoverOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [guestError, setGuestError] = useState<string>("");
  const [additionalServices, setAdditionalServices] = useState<Record<number, boolean>>({});

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");

  // Food related state
  const [includeFoodService, setIncludeFoodService] = useState(false);
  const [foodCost, setFoodCost] = useState(0);
  const [mealCosts, setMealCosts] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  });
  const [mealDates, setMealDates] = useState({
    breakfast: [] as Date[],
    lunch: [] as Date[],
    snacks: [] as Date[],
    dinner: [] as Date[],
  });
  const [dayMealConfigs, setDayMealConfigs] = useState<Record<string, Record<string, any>>>({});
  const [foodData, setFoodData] = useState<{
    foodCategories: any[];
    packagesByCategory: Record<number, any[]>;
  }>({
    foodCategories: [],
    packagesByCategory: {}
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Auto-fill customer details from auth
  useEffect(() => {
    if (user) {
      setCustomerDetails({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch booking packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://admin.webhostdevs.com/api/booking-packages/index.php"
        );
        const data = await response.json();
        if (data.status === "success" && data.data?.length) {
          setPackages(data.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  // Fetch additional services
  useEffect(() => {
    const fetchAdditionalServices = async () => {
      try {
        const response = await fetch(
          "https://admin.webhostdevs.com/api/additional-services/index.php"
        );
        const data = await response.json();
        if (data.status === "success" && data.data) {
          setAdditionalServicesData(data.data);
          const servicesState: Record<number, boolean> = {};
          data.data.forEach((service: AdditionalService) => {
            servicesState[service.id] = false;
          });
          setAdditionalServices(servicesState);
        }
      } catch (error) {
        console.error("Error fetching additional services:", error);
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

    if (checkIn && checkOut) {
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
  }, [checkIn, checkOut]);

  // Guest validation
  useEffect(() => {
    if (!selectedPackage || typeof guestCount !== "number") return;
    if (guestCount < selectedPackage.min_guests) {
      setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
    } else {
      setGuestError("");
    }
  }, [guestCount, selectedPackage]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // MODIFIED: Handle package selection with modal
  const handlePackageChange = (packageId: string) => {
    const pkg = packages.find((p) => p.id === parseInt(packageId));
    if (pkg) {
      setTempSelectedPackage(pkg);
      setShowPackageModal(true);
    }
  };

  // NEW: Handle package confirmation from modal
  const handlePackageConfirm = () => {
    if (tempSelectedPackage) {
      setSelectedPackage(tempSelectedPackage);
      setGuestCount(tempSelectedPackage.min_guests);
      setGuestError("");
      // Reset dates when package changes
      setCheckIn(undefined);
      setCheckOut(undefined);
      setDateRange([]);
    }
    setShowPackageModal(false);
    setTempSelectedPackage(null);
  };

  // NEW: Handle package modal cancel
  const handlePackageCancel = () => {
    setShowPackageModal(false);
    setTempSelectedPackage(null);
  };

  // Handle guest count change with validation
  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setGuestCount(value);

    if (!selectedPackage) {
      setGuestError("Please select a package first");
      return;
    }

    if (value < selectedPackage.min_guests) {
      setGuestError(`Minimum ${selectedPackage.min_guests} guests required`);
    } else {
      setGuestError("");
    }
  };

  // Handle additional services changes
  const handleAdditionalServiceChange = (serviceId: number, checked: boolean) => {
    setAdditionalServices((prev) => ({
      ...prev,
      [serviceId]: checked,
    }));
  };

  // Get base price based on check-in date (weekday vs weekend)
  const getBasePrice = () => {
    if (!selectedPackage || !checkIn || !checkOut) return 0;
    
    let totalPrice = 0;
    let currentDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    endDate.setDate(endDate.getDate() - 1);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
      
      const dailyPrice = isWeekend ? selectedPackage.weekend_price : selectedPackage.weekday_price;
      totalPrice += typeof dailyPrice === "string" 
        ? parseFloat(dailyPrice.replace(/,/g, "")) 
        : Number(dailyPrice);
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return totalPrice;
  };

  // Fix the getPriceBreakdown function
  const getPriceBreakdown = () => {
    if (!selectedPackage || !checkIn || !checkOut) return { 
      weekdays: 0, 
      weekends: 0, 
      days: 0, 
      weekdayPrice: 0, 
      weekendPrice: 0 
    };
    
    let weekdays = 0;
    let weekends = 0;
    let currentDate = new Date(checkIn);
    // Calculate only from check-in to check-out minus 1 day
    const endDate = new Date(checkOut);
    endDate.setDate(endDate.getDate() - 1);
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
      weekdays,
      weekends,
      days: weekdays + weekends,
      weekdayPrice: typeof selectedPackage.weekday_price === "string" 
        ? parseFloat(selectedPackage.weekday_price.replace(/,/g, "")) 
        : Number(selectedPackage.weekday_price),
      weekendPrice: typeof selectedPackage.weekend_price === "string" 
        ? parseFloat(selectedPackage.weekend_price.replace(/,/g, "")) 
        : Number(selectedPackage.weekend_price)
    };
  };

  // Calculate extra guest charge
  const getExtraGuestCharge = () => {
    if (!selectedPackage || guestCount <= selectedPackage.max_guests) return 0;
    const extraGuests = guestCount - selectedPackage.max_guests;
    const charge = extraGuests * selectedPackage.extra_per_guest;
    return typeof charge === "string"
      ? parseFloat(charge.replace(/,/g, ""))
      : Number(charge);
  };

  // Calculate additional services cost
  const getAdditionalServicesCost = () => {
    return additionalServicesData
      .filter((service) => additionalServices[service.id])
      .reduce((total, service) => {
        const price =
          typeof service.price === "string"
            ? parseFloat(service.price.replace(/,/g, ""))
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
      total +=
        typeof foodCost === "string"
          ? parseFloat(foodCost.replace(/,/g, ""))
          : Number(foodCost);
    }

    return total;
  };

  const totalPrice = calculateTotalPrice();

  // Add coupon validation function
  const applyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    setCouponError("");

    try {
      const orderValue = calculateTotalPrice();
      const response = await fetch(
        `https://admin.webhostdevs.com/api/coupons/coupons.php?validate=1&code=${couponCode}&order_value=${orderValue}`
      );
      const data = await response.json();

      if (data.success) {
        setAppliedCoupon(data.coupon);
        setCouponDiscount(data.discount_amount);
        setCouponError("");
        setCouponCode(code);
      } else {
        setCouponError(data.message);
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    } catch (error) {
      setCouponError("Error applying coupon. Please try again.");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponError("");
  };

  // Update final amount calculation
  const getFinalAmount = () => {
    const baseAmount = calculateTotalPrice();
    return Math.max(0, baseAmount - couponDiscount);
  };

  // Handle food service toggle
  const handleFoodServiceChange = (checked: boolean) => {
    if (checked && (!checkIn || !checkOut)) {
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
        dinner: 0,
      });
      setMealDates({
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
      });
    }
  };

  // Handle food cost updates from FoodService component
  const handleFoodCostUpdate = (
    totalFoodCost: number,
    mealCostsObj: {
      breakfast: number;
      lunch: number;
      snacks: number;
      dinner: number;
    },
    selectedDates: {
      breakfast: Date[];
      lunch: Date[];
      snacks: Date[];
      dinner: Date[];
    },
    dayMealConfigs: Record<string, Record<string, any>>,
    foodData: {
      foodCategories: any[];
      packagesByCategory: Record<number, any[]>;
    }
  ) => {
    setFoodCost(totalFoodCost);
    setMealCosts(mealCostsObj);
    setMealDates(selectedDates);
    setDayMealConfigs(dayMealConfigs); 
    setFoodData(foodData);
  };

  // Function to get available food categories for a date based on 24-hour timing rules
  const getAvailableFoodCategoriesForDate = (date: Date) => {
    if (!checkIn || !checkOut) return [];

    if (isSameDay(date, checkIn)) {
      // First day - exclude breakfast (check-in at 12 PM)
      return ["lunch", "snacks", "dinner"];
    }
    if (isSameDay(date, checkOut)) {
      // Last day - only breakfast (check-out at 11:59 AM)
      return ["breakfast"];
    }
    // Middle days - all meals available
    return ["breakfast", "lunch", "snacks", "dinner"];
  };

  // Create booking record before payment
  const createBookingRecord = async () => {
    if (!selectedPackage || !checkIn || !checkOut) {
      throw new Error("Select Package or Date Correctly");
    }

    if (!isAuthenticated || !user) {
      throw new Error("User not authenticated");
    }

    // Prepare food services data if included
    const foodServicesData = includeFoodService
      ? Object.entries(mealDates).flatMap(([mealKey, dates]) => {
          return dates.map(date => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const dayConfig = dayMealConfigs[dateKey];
            const mealConfig = dayConfig?.[mealKey];
            // Use the passed data
            const category = foodData.foodCategories.find(cat => cat.key_name === mealKey);
            const packages = category ? foodData.packagesByCategory[category.id] || [] : [];
            const selectedPackage = packages.find(pkg => pkg.id === mealConfig?.package_id);
            const pricePerPerson = selectedPackage?.price || 0;
            return {
              meal_type: mealKey,
              date: format(date, 'yyyy-MM-dd'),
              package_id: mealConfig?.package_id || null,
              cuisine_type_id: mealConfig?.cuisine_type_id || null,
              price_per_person: pricePerPerson,
              total_price: pricePerPerson * guestCount,
              selected_items: mealConfig?.selected_items || {}
            };
          });
        })
      : [];

    // Prepare additional services data
    const selectedAdditionalServices = additionalServicesData
      .filter(service => additionalServices[service.id])
      .map(service => service.id);

    // Prepare booking payload
    const bookingPayload = {
      customer_name: customerDetails.name,
      customer_email: customerDetails.email,
      customer_phone: customerDetails.phone,
      package_id: selectedPackage.id,
      duration_type: "24_hours",
      check_in_date: format(checkIn, 'yyyy-MM-dd'),
      check_out_date: format(checkOut, 'yyyy-MM-dd'),
      guest_count: guestCount,
      base_price: getBasePrice(),
      pricing_breakdown: getPriceBreakdown(),
      additional_services_cost: getAdditionalServicesCost(),
      food_cost: foodCost,
      coupon_code: appliedCoupon?.code || null, // Add coupon code
    coupon_discount: couponDiscount, // Add coupon discount
      total_cost: getFinalAmount(),
      food_services: foodServicesData,
      additional_services: selectedAdditionalServices
    };

    console.log("Booking payload:", bookingPayload);

    try {
      const response = await fetch('https://admin.webhostdevs.com/api/bookings/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();
      
      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to create booking");
      }

      return data.data; // Returns booking_id and other details
    } catch (error) {
      console.error("Booking creation error:", error);
      throw error;
    }
  };

  // Razorpay payment handler
  const handleRazorpayPayment = async (bookingId: string) => {
    try {
      // 🔥 Step 1: Ask backend to create an order
      const orderResponse = await fetch(
        "https://admin.webhostdevs.com/api/bookings/create-order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: getFinalAmount() }), // send amount in rupees
        }
      );

      const orderData = await orderResponse.json();
      console.log("Order creation response:", orderData);
      if (orderData.status !== "success") {
        throw new Error(orderData.message || "Failed to create Razorpay order");
      }

      const { id: razorpayOrderId, amount, currency } = orderData.order;

      // 🔥 Step 2: Open Razorpay checkout with real order_id
      const options = {
        key: "rzp_live_R6qpNwT08jtUaq",
        amount: amount, // already in paise from backend
        currency: currency,
        name: "Vivenza Farmhouse Booking",
        description: `Booking ${bookingId} from ${
          checkIn ? format(checkIn, "MMM d, yyyy") : ""
        } to ${checkOut ? format(checkOut, "MMM d, yyyy") : ""}`,
        image: "/logo.png",
        order_id: razorpayOrderId, // ✅ now real order id
        handler: async function (response: any) {
          console.log("Payment Response:", response);
          try {
            // 🔥 Step 3: Verify payment with backend
            const verifyResponse = await fetch(
              "https://admin.webhostdevs.com/api/bookings/verify-payment.php",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  booking_id: bookingId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );
            console.log(response);

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || verifyData.status !== "success") {
              throw new Error(
                verifyData.message || "Payment verification failed"
              );
            }

            // ✅ Redirect to success page with booking data
            navigate("/booking-success", {
              state: {
                bookingData: verifyData.data,
                paymentId: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              },
            });
          } catch (error) {
            console.error("Payment verification error:", error);
            setBookingError("Payment verification failed. Please contact support.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        notes: {
          booking_id: bookingId,
          checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
          checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
          guests: guestCount.toString(),
        },
        theme: { color: "#F59E0B" },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            console.log("Payment cancelled");
          },
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Razorpay SDK not loaded. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error starting payment:", err);
      setBookingError("Unable to start payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handlePay = async () => {
    if (!isAuthenticated) {
      setBookingError("Please login or register to book");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (guestError) {
      alert("Please fix guest count errors");
      return;
    }

    setIsLoading(true);
    setBookingError("");

    try {
      // First create booking record
      const bookingResult = await createBookingRecord();
      
      // Then initiate payment
      await handleRazorpayPayment(bookingResult.booking_id);
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError(error instanceof Error ? error.message : "Booking failed. Please try again.");
      setIsLoading(false);
    }
  };

  // Format meal dates for display
  const formatMealDates = (dates: Date[]) => {
    if (dates.length === 0) return "Not selected";
    return dates.map((date) => format(date, "MMM d")).join(", ");
  };

  // **NEW: Login Prompt Component**
  const LoginPrompt = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-stone-50 pt-24">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Book Your Stay
            </h1>
            <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>

            {/* Login Required Card */}
            <div className="bg-white p-12 rounded-lg shadow-lg border border-amber-100">
              <div className="text-6xl mb-6">🔐</div>
              
              <h2 className="font-serif text-3xl font-medium mb-4 text-gray-800">
                Login Required
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To make a booking at Vivenza Farmhouse, please login to your account or create a new one. 
                This ensures we can securely process your booking and keep you updated.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 text-lg font-medium rounded-lg transition-colors"
                >
                  Login to Your Account
                </Button>
                
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 py-3 text-lg font-medium rounded-lg transition-colors"
                >
                  Create New Account
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Why do I need to login?</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Secure booking process and payment protection
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Easy access to your booking history and details
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Receive booking confirmations and updates
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    Manage and modify your reservations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  // **NEW: Package Info Modal Component**
  const PackageInfoModal = () => {
    if (!showPackageModal || !tempSelectedPackage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Package Selected
            </h3>
            <h4 className="text-xl font-semibold text-amber-600">
              {tempSelectedPackage.name}
            </h4>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
  

            {/* Guest Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="text-blue-500 mr-2">👥</span>
                Guest Capacity
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Guests:</span>
                  <span className="font-medium text-blue-600">{tempSelectedPackage.min_guests} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Guests:</span>
                  <span className="font-medium text-blue-600">{tempSelectedPackage.max_guests} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Extra per Guest(More than {tempSelectedPackage.max_guests}):</span>
                  <span className="font-medium text-red-600">₹{tempSelectedPackage.extra_per_guest.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            {/* <div className="bg-amber-500 text-white p-4 rounded-lg">
              <p className="text-center font-medium">
                You can accommodate {tempSelectedPackage.min_guests}-{tempSelectedPackage.max_guests} guests
              </p>
              <p className="text-center text-sm mt-1 opacity-90">
                Perfect for your group size!
              </p>
            </div> */}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <Button
              onClick={handlePackageCancel}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePackageConfirm}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Continue with this Package
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // **MAIN RETURN: Show LoginPrompt if not authenticated**
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

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
              <strong>Check-in time:</strong> 12:00 PM on arrival day
              &nbsp;|&nbsp;
              <strong>Check-out time:</strong> 11:00 AM on departure day
            </p>
          </div>

          {/* Main 2-column grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT COLUMN: Package/Dates/Guests */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-serif text-2xl mb-6">
                Select Package & Dates
              </h3>

              <div className="space-y-6">
                {/* Package Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Package
                  </label>
                  <Select
                    onValueChange={handlePackageChange}
                    value={selectedPackage?.id.toString() || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id.toString()}>
                          {pkg.name} - Weekday: ₹{pkg.weekday_price.toLocaleString()}, Weekend: ₹{pkg.weekend_price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Your Dates
                    </label>
                    <DatePicker
                      selectedStartDate={checkIn}
                      selectedEndDate={checkOut}
                      onDateSelect={(start, end) => {
                        setCheckIn(start);
                        setCheckOut(end);
                      }}
                      className="w-full"
                      isPackageSelected={!!selectedPackage}
                    />
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <Input
                    type="number"
                    min={selectedPackage?.min_guests || 1}
                    value={guestCount}
                    onChange={handleGuestCountChange}
                    placeholder={
                      selectedPackage
                        ? `Min: ${selectedPackage.min_guests}, Max: ${selectedPackage.max_guests}`
                        : "Select package first"
                    }
                    className={guestError ? "border-red-500" : ""}
                  />
                  {selectedPackage && (
                    <p className="text-gray-600 text-sm mt-1">
                      Min: {selectedPackage.min_guests}, Max:{" "}
                      {selectedPackage.max_guests} | ₹
                      {selectedPackage.extra_per_guest} per extra guest
                    </p>
                  )}
                  {guestError && (
                    <p className="text-red-500 text-sm mt-1">{guestError}</p>
                  )}
                  {selectedPackage &&
                    guestCount > selectedPackage.max_guests && (
                      <p className="text-amber-600 text-sm mt-1">
                        Extra guest charge: ₹{selectedPackage.extra_per_guest}{" "}
                        per guest × {guestCount - selectedPackage.max_guests}{" "}
                        guests = ₹{getExtraGuestCharge().toLocaleString()}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Services + Summary */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-serif text-2xl mb-6">
                  Additional Services
                </h3>
                <div className="space-y-4">
                  {additionalServicesData
                    .filter((service) => service.is_active === 1)
                    .map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={additionalServices[service.id] || false}
                          onCheckedChange={(checked) =>
                            handleAdditionalServiceChange(
                              service.id,
                              checked === true
                            )
                          }
                        />
                        <label
                          htmlFor={`service-${service.id}`}
                          className="text-sm font-medium"
                        >
                          {service.name} (+₹
                          {Number(service.price).toLocaleString()})
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
              {!includeFoodService && (
                <OrderSummary
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  applyCoupon={applyCoupon}
                  removeCoupon={removeCoupon}
                  couponLoading={couponLoading}
                  couponError={couponError}
                  appliedCoupon={appliedCoupon}
                  couponDiscount={couponDiscount}
                  getBasePrice={getBasePrice}
                  getExtraGuestCharge={getExtraGuestCharge}
                  guestCount={guestCount}
                  selectedPackage={selectedPackage}
                  additionalServicesData={additionalServicesData}
                  additionalServices={additionalServices}
                  includeFoodService={includeFoodService}
                  foodCost={foodCost}
                  mealCosts={mealCosts}
                  calculateTotalPrice={calculateTotalPrice}
                  getFinalAmount={getFinalAmount}
                  handlePay={handlePay}
                  isLoading={isLoading}
                  guestError={guestError}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  isAuthenticated={isAuthenticated}
                  getPriceBreakdown={getPriceBreakdown}
                />
              )}
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
                    onFoodCostUpdate={handleFoodCostUpdate}
                  />
                </div>

                {/* Order Summary - 30% width on large screens, sticky on top */}
                <div className="lg:w-[30%]">
                  <div className="lg:sticky lg:top-36">
                    <OrderSummary
                      couponCode={couponCode}
                      setCouponCode={setCouponCode}
                      applyCoupon={applyCoupon}
                      removeCoupon={removeCoupon}
                      couponLoading={couponLoading}
                      couponError={couponError}
                      appliedCoupon={appliedCoupon}
                      couponDiscount={couponDiscount}
                      getBasePrice={getBasePrice}
                      getExtraGuestCharge={getExtraGuestCharge}
                      guestCount={guestCount}
                      selectedPackage={selectedPackage}
                      additionalServicesData={additionalServicesData}
                      additionalServices={additionalServices}
                      includeFoodService={includeFoodService}
                      foodCost={foodCost}
                      mealCosts={mealCosts}
                      calculateTotalPrice={calculateTotalPrice}
                      getFinalAmount={getFinalAmount}
                      handlePay={handlePay}
                      isLoading={isLoading}
                      guestError={guestError}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      isAuthenticated={isAuthenticated}
                      getPriceBreakdown={getPriceBreakdown}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* NEW: Package Info Modal */}
      <PackageInfoModal />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-pulse">
            <p className="text-xl font-semibold mb-4">
              Proceeding to Payment...
            </p>
            <div className="h-2 w-2/3 mx-auto bg-amber-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      {/* Booking error modal */}
      {bookingError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Message</h3>
            <p className="mb-4">{bookingError}</p>
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => setBookingError("")}
                className="bg-amber-500 hover:bg-amber-600"
              >
                OK
              </Button>
              {!isAuthenticated && (
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
