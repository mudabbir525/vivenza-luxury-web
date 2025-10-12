// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// import { CheckCircle, Calendar, Users, IndianRupee, Phone, Mail, MapPin, Download } from 'lucide-react';

// const BookingSuccess: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingData, paymentId } = location.state || {};

//   if (!bookingData) {
//     navigate('/');
//     return null;
//   }

//   const handleDownloadReceipt = () => {
//     // Implement receipt download functionality
//     console.log('Download receipt for booking:', bookingData.booking_id);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Success Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-20">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
//           <p className="text-gray-600">Your reservation has been successfully confirmed</p>
//         </div>

//         {/* Booking Details Card */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
//           {/* Header */}
//           <div className="bg-amber-600 text-white p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-xl font-semibold">Vivenza Resort</h2>
//                 <p className="text-amber-100">Luxury Experience Awaits</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-amber-100">Booking ID</p>
//                 <p className="text-lg font-mono font-semibold">{bookingData.booking_id}</p>
//               </div>
//             </div>
//           </div>

//           {/* Booking Information */}
//           <div className="p-6">
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               {/* Guest Details */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Information</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                       <span className="text-sm font-medium">{bookingData.customer_name.charAt(0)}</span>
//                     </div>
//                     <span className="font-medium">{bookingData.customer_name}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm">{bookingData.customer_email}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm">{bookingData.customer_phone}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Booking Details */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Reservation Details</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-4 h-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm font-medium">Check-in</p>
//                       <p className="text-sm text-gray-600">{format(new Date(bookingData.check_in_date), 'EEEE, MMMM d, yyyy')}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-4 h-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm font-medium">Check-out</p>
//                       <p className="text-sm text-gray-600">{format(new Date(bookingData.check_out_date), 'EEEE, MMMM d, yyyy')}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Users className="w-4 h-4 text-gray-500" />
//                     <div>
//                       <p className="text-sm font-medium">Guests</p>
//                       <p className="text-sm text-gray-600">{bookingData.guest_count} guests</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Package Information */}
//             <div className="border-t pt-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Details</h3>
//               <div className="bg-gray-50 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900">{bookingData.package_name}</h4>
//                 {/* <p className="text-sm text-gray-600 mt-1">{bookingData.package_description}</p> */}
//                 <p className="text-sm text-gray-500 mt-2">Duration: {bookingData.duration_type === '12_hours' ? '12 Hours' : '24 Hours'}</p>
//               </div>
//             </div>

//             {/* Food Services */}
//             {bookingData.food_services && bookingData.food_services.length > 0 && (
//               <div className="border-t pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Food Services</h3>
//                 <div className="space-y-3">
//                   {bookingData.food_services.map((service: any, index: number) => (
//                     <div key={index} className="bg-gray-50 rounded-lg p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-medium text-gray-900">{service.category_name}</h4>
//                           <p className="text-sm text-gray-600">{service.package_name}</p>
//                           <p className="text-xs text-gray-500">Date: {format(new Date(service.meal_date), 'MMM d, yyyy')}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-medium">₹{parseFloat(service.total_price).toLocaleString()}</p>
//                           <p className="text-xs text-gray-500">₹{parseFloat(service.price_per_person)} per person</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Additional Services */}
//             {bookingData.additional_services && bookingData.additional_services.length > 0 && (
//               <div className="border-t pt-6 mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Services</h3>
//                 <div className="space-y-3">
//                   {bookingData.additional_services.map((service: any, index: number) => (
//                     <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
//                       <span className="font-medium text-gray-900">{service.service_name}</span>
//                       <span className="font-medium">₹{parseFloat(service.price).toLocaleString()}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Payment Summary */}
//             <div className="border-t pt-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Summary</h3>
//               <div className="bg-green-50 rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm">Base Package Cost</span>
//                   <span className="text-sm">₹{parseFloat(bookingData.base_price).toLocaleString()}</span>
//                 </div>
//                 {parseFloat(bookingData.food_cost) > 0 && (
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm">Food Services</span>
//                     <span className="text-sm">₹{parseFloat(bookingData.food_cost).toLocaleString()}</span>
//                   </div>
//                 )}
//                 {parseFloat(bookingData.additional_services_cost) > 0 && (
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm">Additional Services</span>
//                     <span className="text-sm">₹{parseFloat(bookingData.additional_services_cost).toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="border-t border-green-200 mt-2 pt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold">Total Paid</span>
//                     <span className="font-semibold text-lg flex items-center gap-1">
//                       <IndianRupee className="w-4 h-4" />
//                       {parseFloat(bookingData.total_cost).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-2 pt-2 border-t border-green-200">
//                   <p className="text-xs text-green-700">Payment ID: {paymentId}</p>
//                   <p className="text-xs text-green-700">Status: {bookingData.payment_status.toUpperCase()}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Important Information */}
//         <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Information</h3>
//           <ul className="text-sm text-amber-700 space-y-1">
//             <li>• Please arrive at the resort by 12:00 PM on your check-in date</li>
//             <li>• Carry a valid photo ID for verification at check-in</li>
//             <li>• Contact us at least 24 hours prior for any modifications</li>
//             <li>• Check-out time is 11:00 AM on your departure date</li>
//           </ul>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={handleDownloadReceipt}
//             className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//           >
//             <Download className="w-5 h-5" />
//             Download Receipt
//           </button>
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>

//         {/* Contact Information */}
//         <div className="text-center mt-8 p-6 bg-white rounded-lg shadow">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
//           <p className="text-gray-600 mb-4">Our team is here to assist you with your reservation</p>
//           <div className="flex justify-center items-center gap-6">
//             <div className="flex items-center gap-2">
//               <Phone className="w-4 h-4 text-amber-600" />
//               <span className="text-sm">+91 12345 67890</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Mail className="w-4 h-4 text-amber-600" />
//               <span className="text-sm">support@vivenza.com</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingSuccess;













import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  CheckCircle,
  Calendar,
  Users,
  IndianRupee,
  Phone,
  Mail,
  MapPin,
  Download,
  ChefHat,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface BusinessDetails {
  id: number;
  mobile_number: string;
  whatsapp_number: string;
  email: string;
  address_long: string;
  address_short: string;
  facebook_link: string | null;
  instagram_link: string | null;
  twitter_link: string | null;
  google_map_link: string | null;
  business_hours: string;
  updated_at: string;
}

const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, paymentId } = location.state || {};
  const contentRef = useRef<HTMLDivElement>(null);

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [loadingBusiness, setLoadingBusiness] = useState<boolean>(true);
  const [businessError, setBusinessError] = useState<string | null>(null);

  // Fetch business details
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoadingBusiness(true);
        setBusinessError(null);
        
        const response = await fetch('https://admin.webhostdevs.com/api/business_details.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setBusinessDetails(result.data);
        } else if (result.id) {
          setBusinessDetails(result);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching business details:', err);
        setBusinessError(err instanceof Error ? err.message : 'Failed to fetch business details');
      } finally {
        setLoadingBusiness(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  // Format phone number helper function
  const formatPhoneNumber = (number: string | undefined) => {
    if (!number) return '+91 XXXXXXXXXX';
    return number.startsWith('+91') ? number : `+91 ${number}`;
  };

  if (!bookingData) {
    navigate("/");
    return null;
  }

  // Calculate extra guest charges
  const calculateExtraGuestCharges = () => {
    if (bookingData.extra_guest_charges) {
      return parseFloat(bookingData.extra_guest_charges);
    }

    if (bookingData.package_details && bookingData.guest_count) {
      const maxGuests = bookingData.package_details.max_guests || 25;
      const extraPerGuest = bookingData.package_details.extra_per_guest || 500;

      if (bookingData.guest_count > maxGuests) {
        const extraGuests = bookingData.guest_count - maxGuests;
        return extraGuests * extraPerGuest;
      }
    }
    return 0;
  };

  const extraGuestCharges = calculateExtraGuestCharges();

  // Parse selected items from food services
  const parseSelectedItems = (service: any) => {
    console.log("Service data:", service);
    
    if (service.selected_items_enhanced && Array.isArray(service.selected_items_enhanced)) {
      return service.selected_items_enhanced;
    }

    if (service.selected_item_names) {
      try {
        const itemNamesMap = JSON.parse(service.selected_item_names);
        const selectedItems = [];
        
        if (service.selected_items) {
          const itemsData = JSON.parse(service.selected_items);
          
          for (const [category, itemIds] of Object.entries(itemsData)) {
            if (Array.isArray(itemIds)) {
              itemIds.forEach(itemId => {
                selectedItems.push({
                  id: itemId,
                  name: itemNamesMap[itemId] || `Item #${itemId}`,
                  category: category
                });
              });
            }
          }
        }
        
        return selectedItems;
      } catch (error) {
        console.error("Error parsing selected_item_names:", error);
      }
    }

    try {
      if (!service.selected_items) return [];
      const itemsData = JSON.parse(service.selected_items);
      const selectedItems = [];
      
      for (const [category, itemIds] of Object.entries(itemsData)) {
        if (Array.isArray(itemIds)) {
          itemIds.forEach(itemId => {
            selectedItems.push({
              id: itemId,
              name: `Item #${itemId}`,
              category: category
            });
          });
        }
      }
      
      return selectedItems;
    } catch (error) {
      console.error("Error parsing selected_items:", error);
      return [];
    }
  };

  const handleDownloadReceipt = async () => {
    if (!contentRef.current) return;

    try {
      const button = document.querySelector(
        '[title="Download Receipt"]'
      ) as HTMLButtonElement;
      const originalText = button.innerHTML;
      button.innerHTML =
        '<div class="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>Generating PDF...';
      button.disabled = true;

      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
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

      pdf.addImage(imgData, "PNG", 20, 20, finalWidth, finalHeight);
      pdf.save(`Vivenza_Booking_Receipt_${bookingData.booking_id}.pdf`);

      button.innerHTML = originalText;
      button.disabled = false;
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // Calculate subtotal properly
  const calculateSubtotal = () => {
    const base = parseFloat(bookingData.base_price) || 0;
    const food = parseFloat(bookingData.food_cost || 0);
    const additional = parseFloat(bookingData.additional_services_cost || 0);
    const extraGuests = extraGuestCharges;

    return base + food + additional + extraGuests;
  };

  const subtotal = calculateSubtotal();
  const couponDiscount = parseFloat(bookingData.coupon_discount || 0);
  const finalTotal = parseFloat(bookingData.total_cost) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Download Receipt Button - Mobile Responsive */}
        <div className="relative mb-6 sm:mb-8">
          <button
            onClick={handleDownloadReceipt}
            className="hidden sm:flex sm:absolute sm:right-0 sm:top-0 items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors z-10"
            title="Download Receipt"
          >
            <Download className="w-5 h-5" />
            <span className="sm:inline">Download Receipt</span>
          </button>
        </div>

        {/* Success Header - Mobile Responsive */}
        <div className="text-center mb-6 sm:mb-8 mt-24 sm:mt-20 md:mt-20 lg:mt-36">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4 sm:mb-6">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-4">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Your reservation has been successfully confirmed
          </p>
        </div>

        {/* PDF CONTENT AREA - Mobile Responsive */}
        <div
          ref={contentRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 sm:mb-6"
        >
          {/* Header - Mobile Responsive */}
          <div className="bg-amber-600 text-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">Vivenza Farmhouse</h2>
                <p className="text-amber-100 text-sm sm:text-base">Luxury Experience Awaits</p>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-xs sm:text-sm text-amber-100">Booking ID</p>
                <p className="text-base sm:text-lg font-mono font-semibold break-all">
                  {bookingData.booking_id}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Information - Mobile Responsive */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Guest Details */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  Guest Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium">
                        {bookingData.customer_name?.charAt(0) || "G"}
                      </span>
                    </div>
                    <span className="font-medium text-sm sm:text-base break-words">
                      {bookingData.customer_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm break-all">
                      {bookingData.customer_email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {bookingData.customer_phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                  Reservation Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Check-in</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {format(
                          new Date(bookingData.check_in_date),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Check-out</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {format(
                          new Date(bookingData.check_out_date),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Guests</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {bookingData.guest_count} guests
                        {extraGuestCharges > 0 && (
                          <span className="text-amber-600 ml-1 block sm:inline">
                            ({bookingData.guest_count - 25} extra guests)
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                Package Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  {bookingData.package_name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Duration:{" "}
                  {bookingData.duration_type === "12_hours"
                    ? "12 Hours"
                    : "24 Hours"}
                </p>
                {extraGuestCharges > 0 && (
                  <p className="text-xs sm:text-sm text-amber-600 mt-1">
                    Extra guests: {bookingData.guest_count - 25} × ₹500 = ₹
                    {extraGuestCharges.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Food Services with Items */}
            {bookingData.food_services &&
              bookingData.food_services.length > 0 && (
                <div className="border-t pt-4 sm:pt-6 mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Food Services
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {bookingData.food_services.map(
                      (service: any, index: number) => {
                        const selectedItems = parseSelectedItems(service);

                        return (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-3 sm:p-4 border"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2 sm:gap-0">
                              <div className="w-full sm:w-auto">
                                <h4 className="font-medium text-gray-900 capitalize text-sm sm:text-base">
                                  {service.category_name || service.meal_type}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {service.package_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Date:{" "}
                                  {format(
                                    new Date(service.meal_date),
                                    "MMM d, yyyy"
                                  )}
                                </p>
                              </div>
                              <div className="text-left sm:text-right w-full sm:w-auto">
                                <p className="font-medium text-sm sm:text-base">
                                  ₹
                                  {parseFloat(
                                    service.total_price
                                  ).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ₹
                                  {parseFloat(
                                    service.price_per_person
                                  ).toLocaleString()}{" "}
                                  per person
                                </p>
                              </div>
                            </div>

                            {/* Selected Items */}
                            {selectedItems.length > 0 ? (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <ChefHat className="w-4 h-4 text-amber-600" />
                                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                                    Selected Items ({selectedItems.length}):
                                  </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {selectedItems.map(
                                    (item: any, itemIndex: number) => (
                                      <div
                                        key={itemIndex}
                                        className="flex items-center gap-2 text-xs bg-amber-50 text-amber-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-amber-200"
                                      >
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                                        <span className="font-medium break-words">
                                          {item.name}
                                        </span>
                                        {item.category && (
                                          <span className="text-amber-600 text-xs flex-shrink-0">
                                            ({item.category})
                                          </span>
                                        )}
                                      </div>
                                    )
                                  )}
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
                      }
                    )}
                  </div>
                </div>
              )}

            {/* Additional Services */}
            {bookingData.additional_services &&
              bookingData.additional_services.length > 0 && (
                <div className="border-t pt-4 sm:pt-6 mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Additional Services
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {bookingData.additional_services.map(
                      (service: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-gray-50 rounded-lg p-3 sm:p-4 gap-2"
                        >
                          <span className="font-medium text-gray-900 text-sm sm:text-base break-words">
                            {service.service_name}
                          </span>
                          <span className="font-medium text-sm sm:text-base flex-shrink-0">
                            ₹{parseFloat(service.price).toLocaleString()}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Payment Summary */}
            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                Payment Summary
              </h3>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Base Package Cost</span>
                    <span className="text-xs sm:text-sm">
                      ₹
                      {parseFloat(bookingData.base_price || 0).toLocaleString()}
                    </span>
                  </div>

                  {extraGuestCharges > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Extra Guest Charges</span>
                      <span className="text-xs sm:text-sm">
                        ₹{extraGuestCharges.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {parseFloat(bookingData.food_cost || 0) > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Food Services</span>
                      <span className="text-xs sm:text-sm">
                        ₹
                        {parseFloat(
                          bookingData.food_cost || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {parseFloat(bookingData.additional_services_cost || 0) > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm">Additional Services</span>
                      <span className="text-xs sm:text-sm">
                        ₹
                        {parseFloat(
                          bookingData.additional_services_cost || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {couponDiscount > 0 ? (
                    <>
                      <div className="flex justify-between items-center pt-2 border-t border-green-200">
                        <span className="text-xs sm:text-sm font-medium">Subtotal</span>
                        <span className="text-xs sm:text-sm font-medium">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-green-600">
                        <span className="text-xs sm:text-sm break-words">
                          Coupon Discount (
                          {bookingData.coupon_code || "Applied"})
                        </span>
                        <span className="text-xs sm:text-sm">
                          -₹{couponDiscount.toLocaleString()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="pt-2 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium">Subtotal</span>
                        <span className="text-xs sm:text-sm font-medium">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-green-200 mt-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm sm:text-base">Total Paid</span>
                      <span className="font-semibold text-base sm:text-lg flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-green-200 space-y-1">
                    <p className="text-xs text-green-700 break-all">
                      Payment ID: {paymentId}
                    </p>
                    <p className="text-xs text-green-700">
                      Status:{" "}
                      {bookingData.payment_status?.toUpperCase() || "PAID"}
                    </p>
                    <p className="text-xs text-green-700">
                      Date: {format(new Date(), "PPP")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Download Receipt Button - Only visible on small devices */}
            <div className="border-t pt-4 sm:hidden">
              <button
                onClick={handleDownloadReceipt}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-colors"
                title="Download Receipt"
              >
                <Download className="w-5 h-5" />
                <span>Download Receipt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-amber-800 mb-3">
            Important Information
          </h3>
          <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
            <li>
              • Please arrive at the Farmhouse by 12:00 PM on your check-in date
            </li>
            <li>• Carry a valid photo ID for verification at check-in</li>
            <li>• Contact us at least 24 hours prior for any modifications</li>
            <li>• Check-out time is 11:00 AM on your departure date</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
          >
            Back to Home
          </button>
        </div>

        {/* Contact Information */}
        <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Our team is here to assist you with your reservation
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {loadingBusiness ? (
              <>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm bg-gray-200 animate-pulse rounded w-20 sm:w-24 h-3 sm:h-4"></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm bg-gray-200 animate-pulse rounded w-24 sm:w-32 h-3 sm:h-4"></span>
                </div>
              </>
            ) : businessError ? (
              <>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm">+91 96977 98888</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm">support@vivenza.com</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm">
                    {formatPhoneNumber(businessDetails?.mobile_number)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm break-all">
                    {businessDetails?.email || 'support@vivenza.com'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
