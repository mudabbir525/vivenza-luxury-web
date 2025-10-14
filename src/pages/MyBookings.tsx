// import React, { useState, useEffect } from 'react';
// import { Calendar, Users, MapPin, Phone, Mail, CreditCard, CheckCircle, Clock, X, Eye } from 'lucide-react';
// import { useAuth } from './auth-context';

// interface FoodService {
//   id: number;
//   meal_date: string;
//   category_name: string;
//   meal_type: string;
//   food_package_name: string;
//   price_per_person: number;
//   total_price: number;
//   guest_count: number;
// }

// interface AdditionalService {
//   id: number;
//   service_name: string;
//   price: number;
// }

// interface Booking {
//   id: number;
//   booking_id: string;
//   customer_name: string;
//   customer_email: string;
//   customer_phone: string;
//   package_id: number;
//   package_name: string;
//   duration_type: '12_hours' | '24_hours';
//   check_in_date: string;
//   check_out_date: string;
//   guest_count: number;
//   base_price: number;
//   additional_services_cost: number;
//   food_cost: number;
//   coupon_code: string | null;
//   coupon_discount: number;
//   total_cost: number;
//   payment_status: 'paid';
//   payment_id: string | null;
//   razorpay_order_id: string | null;
//   razorpay_payment_id: string | null;
//   booking_status: 'confirmed' | 'cancelled' | 'completed';
//   created_at: string;
//   updated_at: string;
//   food_services: FoodService[];
//   additional_services: AdditionalService[];
// }

// const MyBookings = () => {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

//   useEffect(() => {
//     if (user?.phone) {
//       fetchUserBookings();
//     }
//   }, [user]);

//   const fetchUserBookings = async () => {
//     if (!user?.phone) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://vivenza.adminmahaspice.in/api/bookings/get-user-bookings.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           phone: user.phone
//         }),
//       });

//       const data = await response.json();

//       if (data.status === 'success') {
//         setBookings(data.data);
//       } else {
//         setError(data.message || 'Failed to fetch bookings');
//       }
//     } catch (err) {
//       console.error('Fetch bookings error:', err);
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case 'paid':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'failed':
//         return 'bg-red-100 text-red-800';
//       case 'refunded':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading your bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Bookings</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchUserBookings}
//             className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 pt-48">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
//         <p className="text-gray-600">
//           View and manage all your bookings with Vivenza
//         </p>
//       </div>

//       {bookings.length === 0 ? (
//         <div className="text-center py-12">
//           <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
//           <p className="text-gray-500 mb-6">When you make your first booking, it will appear here.</p>
//           <button
//             onClick={() => window.location.href = '/packages'}
//             className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
//           >
//             Explore Packages
//           </button>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking.booking_id}
//               className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-1">
//                     {booking.package_name}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Booking ID: {booking.booking_id}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.booking_status)}`}>
//                     {booking.booking_status}
//                   </span>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.payment_status)}`}>
//                     {booking.payment_status}
//                   </span>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Calendar className="h-4 w-4" />
//                   <div>
//                     <p className="text-xs font-medium">Check-in</p>
//                     <p className="text-sm">{formatDate(booking.check_in_date)}</p>
//                   </div>
//                 </div>

//                 {booking.duration_type === '24_hours' && (
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar className="h-4 w-4" />
//                     <div>
//                       <p className="text-xs font-medium">Check-out</p>
//                       <p className="text-sm">{formatDate(booking.check_out_date)}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Users className="h-4 w-4" />
//                   <div>
//                     <p className="text-xs font-medium">Guests</p>
//                     <p className="text-sm">{booking.guest_count} guests</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 text-gray-600">
//                   <CreditCard className="h-4 w-4" />
//                   <div>
//                     <p className="text-xs font-medium">Total Amount</p>
//                     <p className="text-sm font-semibold">₹{booking.total_cost.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center">
//                 <div className="text-sm text-gray-500">
//                   Booked on {formatDate(booking.created_at)}
//                 </div>
//                 <button
//                   onClick={() => setSelectedBooking(booking)}
//                   className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
//                 >
//                   <Eye className="h-4 w-4" />
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Booking Details Modal */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6 w-full">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
//               <button
//                 onClick={() => setSelectedBooking(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {/* Package Info */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">Package Information</h3>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="font-medium text-gray-800">{selectedBooking.package_name}</h4>
//                   <div className="mt-3 flex gap-4 text-sm">
//                     <span>Duration: {selectedBooking.duration_type.replace('_', ' ')}</span>
//                     <span>Base Price: ₹{selectedBooking.base_price.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Food Services */}
//               {selectedBooking.food_services.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3">Food Services</h3>
//                   <div className="space-y-2">
//                     {selectedBooking.food_services.map((food, index) => (
//                       <div key={index} className="bg-gray-50 rounded-lg p-3">
//                         <div className="flex justify-between">
//                           <div>
//                             <p className="font-medium">{food.category_name}</p>
//                             <p className="text-sm text-gray-600">{food.food_package_name}</p>
//                             <p className="text-xs text-gray-500">{formatDate(food.meal_date)}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-medium">₹{food.total_price.toLocaleString()}</p>
//                             <p className="text-xs text-gray-500">₹{food.price_per_person}/person</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Additional Services */}
//               {selectedBooking.additional_services.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3">Additional Services</h3>
//                   <div className="space-y-2">
//                     {selectedBooking.additional_services.map((service, index) => (
//                       <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between">
//                         <p className="font-medium">{service.service_name}</p>
//                         <p className="font-medium">₹{service.price.toLocaleString()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Cost Breakdown */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
//                 <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                   <div className="flex justify-between">
//                     <span>Base Price:</span>
//                     <span>₹{selectedBooking.base_price.toLocaleString()}</span>
//                   </div>
                  
//                   {selectedBooking.food_cost > 0 && (
//                     <div className="flex justify-between">
//                       <span>Food Services:</span>
//                       <span>₹{selectedBooking.food_cost.toLocaleString()}</span>
//                     </div>
//                   )}
                  
//                   {selectedBooking.additional_services_cost > 0 && (
//                     <div className="flex justify-between">
//                       <span>Additional Services:</span>
//                       <span>₹{selectedBooking.additional_services_cost.toLocaleString()}</span>
//                     </div>
//                   )}
                  
//                   {/* Calculate Subtotal */}
//                   <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
//                     <span className="font-medium">Subtotal:</span>
//                     <span className="font-medium">
//                       ₹{(
//                         selectedBooking.base_price + 
//                         selectedBooking.food_cost + 
//                         selectedBooking.additional_services_cost
//                       ).toLocaleString()}
//                     </span>
//                   </div>
                  
//                   {/* Coupon Discount */}
//                   {selectedBooking.coupon_discount > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>
//                         Coupon Discount {selectedBooking.coupon_code && `(${selectedBooking.coupon_code})`}:
//                       </span>
//                       <span className="font-medium">-₹{selectedBooking.coupon_discount.toLocaleString()}</span>
//                     </div>
//                   )}
                  
//                   <hr className="my-2 border-gray-300" />
                  
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Total Amount:</span>
//                     <span>₹{selectedBooking.total_cost.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Info */}
//               {selectedBooking.payment_id && (
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
//                   <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
//                     <div className="flex justify-between">
//                       <span>Payment ID:</span>
//                       <span className="font-mono">{selectedBooking.payment_id}</span>
//                     </div>
//                     {selectedBooking.razorpay_order_id && (
//                       <div className="flex justify-between">
//                         <span>Order ID:</span>
//                         <span className="font-mono">{selectedBooking.razorpay_order_id}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setSelectedBooking(null)}
//                 className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;














import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, CreditCard, Eye, X, ArrowLeft, ChefHat, Download } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from './auth-context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

interface FoodService {
  id: number;
  meal_date: string;
  category_name: string;
  meal_type: string;
  food_package_name: string;
  price_per_person: number;
  total_price: number;
  guest_count: number;
  selected_items?: string;
  selected_item_names?: string;
  cuisine_type_id?: number;
}

interface AdditionalService {
  id: number;
  service_name: string;
  price: number;
}

interface Booking {
  id: number;
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_id: number;
  package_name: string;
  duration_type: '12_hours' | '24_hours';
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  base_price: number;
  additional_services_cost: number;
  food_cost: number;
  coupon_code: string | null;
  coupon_discount: number;
  total_cost: number;
  payment_status: 'paid';
  payment_id: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  booking_status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  food_services: FoodService[];
  additional_services: AdditionalService[];
  extra_guest_charges?: number;
}

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.phone) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    if (!user?.phone) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://vivenza.adminmahaspice.in/api/bookings/get-user-bookings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: user.phone
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setBookings(data.data);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate extra guest charges
  const calculateExtraGuestCharges = (booking: Booking) => {
    if (booking.extra_guest_charges) {
      return parseFloat(booking.extra_guest_charges.toString());
    }
    
    if (booking.guest_count > 25) {
      return (booking.guest_count - 25) * 500;
    }
    return 0;
  };

  // Parse selected items from food services
  const parseSelectedItems = (service: FoodService) => {
    if (service.selected_item_names) {
      try {
        const itemNamesMap = JSON.parse(service.selected_item_names);
        const selectedItems: any[] = [];
        
        if (service.selected_items) {
          const itemsData = JSON.parse(service.selected_items);
          
          for (const [category, itemIds] of Object.entries(itemsData)) {
            if (Array.isArray(itemIds)) {
              itemIds.forEach((itemId: any) => {
                selectedItems.push({
                  id: itemId,
                  name: itemNamesMap[itemId] || `Item ${itemId}`,
                  category: category
                });
              });
            }
          }
        }
        return selectedItems;
      } catch (error) {
        console.error('Error parsing selected_item_names:', error);
      }
    }

    try {
      if (!service.selected_items) return [];
      
      const itemsData = JSON.parse(service.selected_items);
      const selectedItems: any[] = [];
      
      for (const [category, itemIds] of Object.entries(itemsData)) {
        if (Array.isArray(itemIds)) {
          itemIds.forEach((itemId: any) => {
            selectedItems.push({
              id: itemId,
              name: `Item ${itemId}`,
              category: category
            });
          });
        }
      }
      return selectedItems;
    } catch (error) {
      console.error('Error parsing selected_items:', error);
      return [];
    }
  };

  // Handle PDF download
  const handleDownloadReceipt = async (booking: Booking) => {
    if (!contentRef.current) return;

    try {
      const button = document.querySelector('[title="Download Receipt"]') as HTMLButtonElement;
      const originalText = button.innerHTML;
      button.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>Generating PDF...';
      button.disabled = true;

      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 40;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgHeight > pdfHeight - 40) {
        finalHeight = pdfHeight - 40;
        finalWidth = (imgProps.width * finalHeight) / imgProps.height;
      }

      pdf.addImage(imgData, 'PNG', 20, 20, finalWidth, finalHeight);
      pdf.save(`Vivenza_Booking_Receipt_${booking.booking_id}.pdf`);

      button.innerHTML = originalText;
      button.disabled = false;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'refunded':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateDetailed = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow bg-vivenza-offWhite">
          <div className="luxury-container py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <div className="text-center px-4">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-amber-600 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-base sm:text-lg text-gray-600">Loading your bookings...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow bg-vivenza-offWhite">
          <div className="luxury-container py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <div className="text-center px-4">
                <div className="text-red-500 mb-3 sm:mb-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg text-red-600 mb-3 sm:mb-4">Error loading bookings</p>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{error}</p>
                <button 
                  onClick={fetchUserBookings}
                  className="bg-amber-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded hover:bg-amber-700 transition-colors text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite">
        <div className="luxury-container py-6 sm:py-8 md:py-12 lg:py-16">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-center mb-4 sm:mb-6 px-4 mt-16 sm:mt-16 lg:mt-24">
            My Bookings
          </h1>
          <div className="gold-divider mx-auto mb-6 sm:mb-8 lg:mb-10"></div>
          
          {bookings.length === 0 ? (
            <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
              <div className="max-w-md mx-auto">
                <Calendar className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">No bookings yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">When you make your first booking, it will appear here.</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-amber-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Explore Packages
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4">
              {bookings.map((booking) => {
                const extraGuestCharges = calculateExtraGuestCharges(booking);
                
                return (
                  <div
                    key={booking.booking_id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border border-gray-100"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 sm:mb-6 gap-3 sm:gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                          {booking.package_name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Booking ID: <span className="font-mono text-amber-600 font-medium">{booking.booking_id}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 sm:gap-3 flex-wrap">
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status}
                        </span>
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getPaymentStatusColor(booking.payment_status)}`}>
                          {booking.payment_status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-600 bg-opacity-10 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Check-in</p>
                          <p className="text-sm sm:text-base text-gray-800 font-semibold truncate">{formatDate(booking.check_in_date)}</p>
                        </div>
                      </div>

                      {booking.duration_type === '24_hours' && (
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-600 bg-opacity-10 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Check-out</p>
                            <p className="text-sm sm:text-base text-gray-800 font-semibold truncate">{formatDate(booking.check_out_date)}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="bg-amber-600 bg-opacity-10 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Guests</p>
                          <p className="text-sm sm:text-base text-gray-800 font-semibold">
                            {booking.guest_count} guests
                            {extraGuestCharges > 0 && (
                              <span className="text-amber-600 ml-1 text-xs sm:text-sm block sm:inline">
                                ({booking.guest_count - 25} extra)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-amber-600 bg-opacity-10 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                          <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Total Amount</p>
                          <p className="text-amber-600 font-bold text-lg sm:text-xl">₹{booking.total_cost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-4">
                      <div className="text-xs sm:text-sm text-gray-500">
                        Booked on {formatDate(booking.created_at)}
                      </div>
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-sm sm:text-base"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Enhanced Booking Details Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto w-full shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">Booking Details</h2>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-gray-400 hover:text-gray-600 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>

                <div ref={contentRef} className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                  {/* Resort Header */}
                  <div className="bg-amber-600 text-white p-4 sm:p-6 rounded-lg -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold">Vivenza Resort</h2>
                        <p className="text-amber-100 text-sm sm:text-base">Luxury Experience Awaits</p>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-xs sm:text-sm text-amber-100">Booking ID</p>
                        <p className="text-base sm:text-lg font-mono font-semibold break-all">{selectedBooking.booking_id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information and Reservation Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    {/* Guest Details */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Guest Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs sm:text-sm font-medium">{selectedBooking.customer_name?.charAt(0) || 'G'}</span>
                          </div>
                          <span className="font-medium text-sm sm:text-base break-words">{selectedBooking.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm break-all">{selectedBooking.customer_email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{selectedBooking.customer_phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Reservation Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium">Check-in</p>
                            <p className="text-xs sm:text-sm text-gray-600">{formatDateDetailed(selectedBooking.check_in_date)}</p>
                          </div>
                        </div>
                        {selectedBooking.duration_type === '24_hours' && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Check-out</p>
                              <p className="text-xs sm:text-sm text-gray-600">{formatDateDetailed(selectedBooking.check_out_date)}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <Users className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium">Guests</p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {selectedBooking.guest_count} guests
                              {calculateExtraGuestCharges(selectedBooking) > 0 && (
                                <span className="text-amber-600 ml-1 block sm:inline">
                                  ({selectedBooking.guest_count - 25} extra guests)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Information */}
                  <div className="border-t pt-4 sm:pt-6 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Package Details</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">{selectedBooking.package_name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Duration: {selectedBooking.duration_type === '12_hours' ? '12 Hours' : '24 Hours'}
                      </p>
                      {calculateExtraGuestCharges(selectedBooking) > 0 && (
                        <p className="text-xs sm:text-sm text-amber-600 mt-1">
                          Extra guests: {selectedBooking.guest_count - 25} × ₹500 = ₹{calculateExtraGuestCharges(selectedBooking).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Food Services with Selected Items */}
                  {selectedBooking.food_services && selectedBooking.food_services.length > 0 && (
                    <div className="border-t pt-4 sm:pt-6 mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Food Services</h3>
                      <div className="space-y-3 sm:space-y-4">
                        {selectedBooking.food_services.map((service, index) => {
                          const selectedItems = parseSelectedItems(service);
                          
                          return (
                            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                              <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2 sm:gap-0">
                                <div className="w-full sm:w-auto">
                                  <h4 className="font-medium text-gray-900 capitalize text-sm sm:text-base">
                                    {service.category_name} - {service.meal_type}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-600">{service.food_package_name}</p>
                                  <p className="text-xs text-gray-500">
                                    Date: {format(new Date(service.meal_date), 'MMM d, yyyy')}
                                  </p>
                                </div>
                                <div className="text-left sm:text-right w-full sm:w-auto">
                                  <p className="font-medium text-sm sm:text-base">₹{parseFloat(service.total_price.toString()).toLocaleString()}</p>
                                  <p className="text-xs text-gray-500">
                                    ₹{parseFloat(service.price_per_person.toString()).toLocaleString()} per person
                                  </p>
                                </div>
                              </div>

                              {/* Selected Items Display */}
                              {selectedItems.length > 0 ? (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <ChefHat className="w-4 h-4 text-amber-600" />
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                                      Selected Items ({selectedItems.length})
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    {selectedItems.map((item: any, itemIndex: number) => (
                                      <div key={itemIndex} className="flex items-center gap-2 text-xs bg-amber-50 text-amber-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-amber-200">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                        <span className="font-medium break-words">{item.name}</span>
                                        {item.category && (
                                          <span className="text-amber-600 text-xs flex-shrink-0">({item.category})</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-xs sm:text-sm text-gray-500 italic">
                                    No specific items selected for this meal.
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Additional Services */}
                  {selectedBooking.additional_services && selectedBooking.additional_services.length > 0 && (
                    <div className="border-t pt-4 sm:pt-6 mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Additional Services</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedBooking.additional_services.map((service, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 sm:p-4 gap-2">
                            <span className="font-medium text-gray-900 text-sm sm:text-base break-words">{service.service_name}</span>
                            <span className="font-medium text-sm sm:text-base flex-shrink-0">₹{parseFloat(service.price.toString()).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Payment Summary */}
                  <div className="border-t pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Payment Summary</h3>
                    <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm">Base Package Cost:</span>
                          <span className="text-xs sm:text-sm">₹{parseFloat(selectedBooking.base_price.toString()).toLocaleString()}</span>
                        </div>

                        {calculateExtraGuestCharges(selectedBooking) > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm">Extra Guest Charges:</span>
                            <span className="text-xs sm:text-sm">₹{calculateExtraGuestCharges(selectedBooking).toLocaleString()}</span>
                          </div>
                        )}

                        {parseFloat(selectedBooking.food_cost.toString()) > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm">Food Services:</span>
                            <span className="text-xs sm:text-sm">₹{parseFloat(selectedBooking.food_cost.toString()).toLocaleString()}</span>
                          </div>
                        )}

                        {parseFloat(selectedBooking.additional_services_cost.toString()) > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm">Additional Services:</span>
                            <span className="text-xs sm:text-sm">₹{parseFloat(selectedBooking.additional_services_cost.toString()).toLocaleString()}</span>
                          </div>
                        )}

                        {parseFloat(selectedBooking.coupon_discount.toString()) > 0 ? (
                          <>
                            <div className="flex justify-between items-center pt-2 border-t border-green-200">
                              <span className="text-xs sm:text-sm font-medium">Subtotal:</span>
                              <span className="text-xs sm:text-sm font-medium">
                                ₹{(
                                  parseFloat(selectedBooking.base_price.toString()) +
                                  calculateExtraGuestCharges(selectedBooking) +
                                  parseFloat(selectedBooking.food_cost.toString()) +
                                  parseFloat(selectedBooking.additional_services_cost.toString())
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-green-600">
                              <span className="text-xs sm:text-sm break-words">
                                Coupon Discount {selectedBooking.coupon_code && `(${selectedBooking.coupon_code})`}:
                              </span>
                              <span className="text-xs sm:text-sm">-₹{parseFloat(selectedBooking.coupon_discount.toString()).toLocaleString()}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between items-center pt-2 border-t border-green-200">
                            <span className="text-xs sm:text-sm font-medium">Subtotal:</span>
                            <span className="text-xs sm:text-sm font-medium">
                              ₹{(
                                parseFloat(selectedBooking.base_price.toString()) +
                                calculateExtraGuestCharges(selectedBooking) +
                                parseFloat(selectedBooking.food_cost.toString()) +
                                parseFloat(selectedBooking.additional_services_cost.toString())
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="border-t border-green-200 mt-2 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-sm sm:text-base">Total Paid:</span>
                            <span className="font-semibold text-base sm:text-lg flex items-center gap-1">
                              ₹{parseFloat(selectedBooking.total_cost.toString()).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-green-200 space-y-1">
                          <p className="text-xs text-green-700 break-all">Payment ID: {selectedBooking.payment_id}</p>
                          <p className="text-xs text-green-700">Status: {selectedBooking.payment_status?.toUpperCase() || 'PAID'}</p>
                          <p className="text-xs text-green-700">Date: {format(new Date(), 'PPP')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  {selectedBooking.razorpay_order_id && (
                    <div className="border-t pt-4 sm:pt-6">
                      <h3 className="text-base sm:text-lg xl:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Payment Information</h3>
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-mono text-gray-800 bg-white px-2 py-1 rounded border break-all text-xs">{selectedBooking.razorpay_order_id}</span>
                          </div>
                          {selectedBooking.razorpay_payment_id && (
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                              <span className="text-gray-600">Payment ID:</span>
                              <span className="font-mono text-gray-800 bg-white px-2 py-1 rounded border break-all text-xs">{selectedBooking.razorpay_payment_id}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDownloadReceipt(selectedBooking)}
                      className="bg-amber-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center gap-2 text-sm sm:text-base"
                      title="Download Receipt"
                    >
                      <Download className="h-4 w-4" />
                      Download Receipt
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MyBookings;
