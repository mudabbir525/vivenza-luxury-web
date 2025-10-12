// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import { useAuth } from "../pages/auth-context";
// import { useNavigate } from "react-router-dom";

// interface OrderSummaryProps {
//   couponCode: string;
//   setCouponCode: (value: string) => void;
//   applyCoupon: () => void;
//   removeCoupon: () => void;
//   couponLoading: boolean;
//   couponError: string;
//   appliedCoupon: any;
//   couponDiscount: number;
//   getBasePrice: () => number;
//   getExtraGuestCharge: () => number;
//   guestCount: number;
//   selectedPackage: any;
//   additionalServicesData: any[];
//   additionalServices: Record<number, boolean>;
//   includeFoodService: boolean;
//   foodCost: number;
//   mealCosts: any;
//   calculateTotalPrice: () => number;
//   getFinalAmount: () => number;
//   handlePay: () => void;
//   isLoading: boolean;
//   guestError: string;
//   checkIn: Date | undefined;
//   checkOut: Date | undefined;
//   isAuthenticated: boolean;
//   getPriceBreakdown: () => {
//     weekdays: number;
//     weekends: number;
//     days: number;
//     weekdayPrice: number;
//     weekendPrice: number;
//   };
// }

// const OrderSummary: React.FC<OrderSummaryProps> = ({
//   couponCode,
//   setCouponCode,
//   applyCoupon,
//   removeCoupon,
//   couponLoading,
//   couponError,
//   appliedCoupon,
//   couponDiscount,
//   getBasePrice,
//   getExtraGuestCharge,
//   guestCount,
//   selectedPackage,
//   additionalServicesData,
//   additionalServices,
//   includeFoodService,
//   foodCost,
//   mealCosts,
//   calculateTotalPrice,
//   getFinalAmount,
//   handlePay,
//   isLoading,
//   guestError,
//   checkIn,
//   checkOut,
//   isAuthenticated,
//   getPriceBreakdown,
// }) => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [showCouponSuccess, setShowCouponSuccess] = useState(false);
//   const [prevAppliedCoupon, setPrevAppliedCoupon] = useState<any>(null);

//   // Show congratulations modal when coupon is applied
//   useEffect(() => {
//     if (appliedCoupon && !prevAppliedCoupon) {
//       setShowCouponSuccess(true);
//     }
//     setPrevAppliedCoupon(appliedCoupon);
//   }, [appliedCoupon, prevAppliedCoupon]);

//   // NEW: Handle login redirect specifically for booking page
//   const handleLoginRedirect = () => {
//     // This will now be handled by the parent component (Booking.tsx)
//     // Call handlePay which will handle the redirect logic
//     handlePay();
//   };

//   const handleContinue = () => {
//     setShowCouponSuccess(false);
//   };

//   const priceBreakdown = getPriceBreakdown();

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       {/* Coupon Success Modal */}
//       {showCouponSuccess && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//                 <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mt-4">Congratulations!</h3>
//               <p className="text-sm text-gray-500 mt-2">
//                 You've successfully applied coupon code <span className="font-bold text-green-600">{appliedCoupon?.code}</span> and saved ₹{couponDiscount.toLocaleString()}.
//               </p>
//               <div className="mt-6">
//                 <Button
//                   onClick={handleContinue}
//                   className="bg-green-600 hover:bg-green-700 px-6"
//                 >
//                   Continue
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//       {/* Coupon Section */}
//       <div className="border-b border-gray-200 pb-4 mb-4">
//         <h4 className="text-lg font-medium text-gray-800 mb-3">Apply Coupon</h4>

//         {!appliedCoupon ? (
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <div className="flex gap-2">
//               <Input
//                 type="text"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                 placeholder="Enter coupon code"
//                 className="flex-1 border rounded-lg px-3 py-2 text-sm"
//               />
//               <Button
//                 type="button"
//                 onClick={applyCoupon}
//                 disabled={couponLoading}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {couponLoading ? "Applying..." : "Apply"}
//               </Button>
//             </div>
//             {couponError && (
//               <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//                 {couponError}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="mt-2 p-2 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex justify-between items-center">
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="text-green-800 font-semibold">{appliedCoupon.code}</span>
//                 <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Applied</span>
//               </div>
//               <p className="text-sm text-green-700 mt-1">{appliedCoupon.description}</p>
//               <p className="text-sm text-green-800 font-medium mt-1">
//                 You saved ₹{couponDiscount.toLocaleString()}!
//               </p>
//             </div>
//             <button
//               onClick={removeCoupon}
//               className="p-1 hover:bg-green-100 rounded-full"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Price Breakdown */}
//       <div className="space-y-3">
//         {/* Base Package Total */}
//         <div className="flex justify-between">
//           <span>Base Package ({priceBreakdown.days} day{priceBreakdown.days !== 1 ? 's' : ''}):</span>
//           <span>₹{getBasePrice().toLocaleString()}</span>
//         </div>

//         {/* Detailed Pricing Breakdown */}
//         {priceBreakdown.days > 0 && (
//           <div className="pl-4 border-l-2 border-gray-200 space-y-2">
//             {priceBreakdown.weekdays > 0 && (
//               <div className="text-sm flex justify-between text-gray-600">
//                 <span>{priceBreakdown.weekdays} weekday(s) × ₹{priceBreakdown.weekdayPrice.toLocaleString()}:</span>
//                 <span>₹{(priceBreakdown.weekdays * priceBreakdown.weekdayPrice).toLocaleString()}</span>
//               </div>
//             )}
//             {priceBreakdown.weekends > 0 && (
//               <div className="text-sm flex justify-between text-gray-600">
//                 <span>{priceBreakdown.weekends} weekend(s) × ₹{priceBreakdown.weekendPrice.toLocaleString()}:</span>
//                 <span>₹{(priceBreakdown.weekends * priceBreakdown.weekendPrice).toLocaleString()}</span>
//               </div>
//             )}
//           </div>
//         )}

//         {getExtraGuestCharge() > 0 && (
//           <div className="flex justify-between">
//             <span>
//               Extra Guests ({guestCount - (selectedPackage?.max_guests || 0)}):
//             </span>
//             <span>₹{getExtraGuestCharge().toLocaleString()}</span>
//           </div>
//         )}

//         {additionalServicesData
//           .filter((service) => service.is_active === 1 && additionalServices[service.id])
//           .map((service) => (
//             <div key={service.id} className="flex justify-between">
//               <span>{service.name}:</span>
//               <span>₹{Number(service.price).toLocaleString()}</span>
//             </div>
//           ))}

//         {includeFoodService && foodCost > 0 && (
//           <>
//             <div className="border-t pt-3">
//               <h4 className="font-medium mb-2">Food Services</h4>
//               {mealCosts.breakfast > 0 && (
//                 <div className="text-sm flex justify-between">
//                   <span>Breakfast ({guestCount} guests):</span>
//                   <span>₹{mealCosts.breakfast.toLocaleString()}</span>
//                 </div>
//               )}
//               {mealCosts.lunch > 0 && (
//                 <div className="text-sm flex justify-between">
//                   <span>Lunch ({guestCount} guests):</span>
//                   <span>₹{mealCosts.lunch.toLocaleString()}</span>
//                 </div>
//               )}
//               {mealCosts.snacks > 0 && (
//                 <div className="text-sm flex justify-between">
//                   <span>Snacks ({guestCount} guests):</span>
//                   <span>₹{mealCosts.snacks.toLocaleString()}</span>
//                 </div>
//               )}
//               {mealCosts.dinner > 0 && (
//                 <div className="text-sm flex justify-between">
//                   <span>Dinner ({guestCount} guests):</span>
//                   <span>₹{mealCosts.dinner.toLocaleString()}</span>
//                 </div>
//               )}
//               <div className="flex justify-between font-medium">
//                 <span>Total Food Cost:</span>
//                 <span>₹{foodCost.toLocaleString()}</span>
//               </div>
//             </div>
//           </>
//         )}

//         <div className="flex justify-between text-gray-600 border-t pt-3">
//           <span>Subtotal:</span>
//           <span>₹{calculateTotalPrice().toLocaleString()}</span>
//         </div>

//         {appliedCoupon && couponDiscount > 0 && (
//           <div className="flex justify-between text-green-600 font-medium">
//             <span>Coupon Discount ({appliedCoupon.code}):</span>
//             <span>-₹{couponDiscount.toLocaleString()}</span>
//           </div>
//         )}

//         <div className="border-t pt-3 flex justify-between font-bold text-lg">
//           <span>Total:</span>
//           <span>₹{getFinalAmount().toLocaleString()}</span>
//         </div>
//       </div>

//       {/* MODIFIED: Single button that handles both authenticated and non-authenticated states */}
//       <Button
//         onClick={handlePay} // This now handles both cases in the parent component
//         disabled={
//           isLoading || 
//           !!guestError || 
//           !checkIn || 
//           !checkOut
//         }
//         className={`w-full mt-4 ${
//           !isAuthenticated 
//             ? 'bg-blue-600 hover:bg-blue-700' 
//             : 'bg-amber-500 hover:bg-amber-600'
//         }`}
//       >
//         {isLoading 
//           ? "Processing..." 
//           : !isAuthenticated 
//             ? "Login / Register to Continue Booking"
//             : `Pay Now - ₹${getFinalAmount().toLocaleString()}`
//         }
//       </Button>
//     </div>
//   );
// };

// export default OrderSummary;







import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAuth } from "../pages/auth-context";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  removeCoupon: () => void;
  couponLoading: boolean;
  couponError: string;
  appliedCoupon: any;
  couponDiscount: number;
  getBasePrice: () => number;
  getExtraGuestCharge: () => number;
  guestCount: number;
  selectedPackage: any;
  additionalServicesData: any[];
  additionalServices: Record<number, boolean>;
  includeFoodService: boolean;
  foodCost: number;
  mealCosts: any;
  calculateTotalPrice: () => number;
  getFinalAmount: () => number;
  handlePay: () => void;
  isLoading: boolean;
  guestError: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  isAuthenticated: boolean;
  getPriceBreakdown: () => {
    weekdays: number;
    weekends: number;
    days: number;
    weekdayPrice: number;
    weekendPrice: number;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  couponCode,
  setCouponCode,
  applyCoupon,
  removeCoupon,
  couponLoading,
  couponError,
  appliedCoupon,
  couponDiscount,
  getBasePrice,
  getExtraGuestCharge,
  guestCount,
  selectedPackage,
  additionalServicesData,
  additionalServices,
  includeFoodService,
  foodCost,
  mealCosts,
  calculateTotalPrice,
  getFinalAmount,
  handlePay,
  isLoading,
  guestError,
  checkIn,
  checkOut,
  isAuthenticated,
  getPriceBreakdown,
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);
  const [prevAppliedCoupon, setPrevAppliedCoupon] = useState<any>(null);

  // Show congratulations modal when coupon is applied
  useEffect(() => {
    if (appliedCoupon && !prevAppliedCoupon) {
      setShowCouponSuccess(true);
    }
    setPrevAppliedCoupon(appliedCoupon);
  }, [appliedCoupon, prevAppliedCoupon]);

  // NEW: Handle login redirect specifically for booking page
  const handleLoginRedirect = () => {
    // This will now be handled by the parent component (Booking.tsx)
    // Call handlePay which will handle the redirect logic
    handlePay();
  };

  const handleContinue = () => {
    setShowCouponSuccess(false);
  };

  const priceBreakdown = getPriceBreakdown();

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md">
      {/* Coupon Success Modal */}
      {showCouponSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mt-3 sm:mt-4">Congratulations!</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                You've successfully applied coupon code <span className="font-bold text-green-600">{appliedCoupon?.code}</span> and saved ₹{couponDiscount.toLocaleString()}.
              </p>
              <div className="mt-4 sm:mt-6">
                <Button
                  onClick={handleContinue}
                  className="bg-green-600 hover:bg-green-700 px-4 sm:px-6 text-sm sm:text-base"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Order Summary</h3>

      {/* Coupon Section */}
      <div className="border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
        <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Apply Coupon</h4>

        {!appliedCoupon ? (
          <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 border rounded-lg px-2.5 sm:px-3 py-2 text-sm"
              />
              <Button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading}
                className="bg-green-600 hover:bg-green-700 text-sm px-3 sm:px-4 py-2 whitespace-nowrap"
              >
                {couponLoading ? "Applying..." : "Apply"}
              </Button>
            </div>
            {couponError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm">
                {couponError}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 p-2.5 sm:p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span className="text-green-800 font-semibold text-sm sm:text-base">{appliedCoupon.code}</span>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded w-fit">Applied</span>
              </div>
              <p className="text-xs sm:text-sm text-green-700 mt-1 leading-relaxed">{appliedCoupon.description}</p>
              <p className="text-xs sm:text-sm text-green-800 font-medium mt-1">
                You saved ₹{couponDiscount.toLocaleString()}!
              </p>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 hover:bg-green-100 rounded-full flex-shrink-0 mt-0.5"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Base Package Total */}
        <div className="flex justify-between items-start">
          <span className="text-sm sm:text-base flex-1 pr-2">Base Package ({priceBreakdown.days} day{priceBreakdown.days !== 1 ? 's' : ''}):</span>
          <span className="text-sm sm:text-base font-medium flex-shrink-0">₹{getBasePrice().toLocaleString()}</span>
        </div>

        {/* Detailed Pricing Breakdown */}
        {priceBreakdown.days > 0 && (
          <div className="pl-3 sm:pl-4 border-l-2 border-gray-200 space-y-1.5 sm:space-y-2">
            {priceBreakdown.weekdays > 0 && (
              <div className="text-xs sm:text-sm flex justify-between items-start text-gray-600">
                <span className="flex-1 pr-2">{priceBreakdown.weekdays} weekday(s) × ₹{priceBreakdown.weekdayPrice.toLocaleString()}:</span>
                <span className="flex-shrink-0">₹{(priceBreakdown.weekdays * priceBreakdown.weekdayPrice).toLocaleString()}</span>
              </div>
            )}
            {priceBreakdown.weekends > 0 && (
              <div className="text-xs sm:text-sm flex justify-between items-start text-gray-600">
                <span className="flex-1 pr-2">{priceBreakdown.weekends} weekend(s) × ₹{priceBreakdown.weekendPrice.toLocaleString()}:</span>
                <span className="flex-shrink-0">₹{(priceBreakdown.weekends * priceBreakdown.weekendPrice).toLocaleString()}</span>
              </div>
            )}
          </div>
        )}

        {getExtraGuestCharge() > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-sm sm:text-base flex-1 pr-2">
              Extra Guests ({guestCount - (selectedPackage?.max_guests || 0)}):
            </span>
            <span className="text-sm sm:text-base font-medium flex-shrink-0">₹{getExtraGuestCharge().toLocaleString()}</span>
          </div>
        )}

        {additionalServicesData
          .filter((service) => service.is_active === 1 && additionalServices[service.id])
          .map((service) => (
            <div key={service.id} className="flex justify-between items-start">
              <span className="text-sm sm:text-base flex-1 pr-2">{service.name}:</span>
              <span className="text-sm sm:text-base font-medium flex-shrink-0">₹{Number(service.price).toLocaleString()}</span>
            </div>
          ))}

        {includeFoodService && foodCost > 0 && (
          <>
            <div className="border-t pt-2.5 sm:pt-3">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Food Services</h4>
              <div className="space-y-1.5">
                {mealCosts.breakfast > 0 && (
                  <div className="text-xs sm:text-sm flex justify-between items-start">
                    <span className="flex-1 pr-2">Breakfast ({guestCount} guests):</span>
                    <span className="flex-shrink-0">₹{mealCosts.breakfast.toLocaleString()}</span>
                  </div>
                )}
                {mealCosts.lunch > 0 && (
                  <div className="text-xs sm:text-sm flex justify-between items-start">
                    <span className="flex-1 pr-2">Lunch ({guestCount} guests):</span>
                    <span className="flex-shrink-0">₹{mealCosts.lunch.toLocaleString()}</span>
                  </div>
                )}
                {mealCosts.snacks > 0 && (
                  <div className="text-xs sm:text-sm flex justify-between items-start">
                    <span className="flex-1 pr-2">Snacks ({guestCount} guests):</span>
                    <span className="flex-shrink-0">₹{mealCosts.snacks.toLocaleString()}</span>
                  </div>
                )}
                {mealCosts.dinner > 0 && (
                  <div className="text-xs sm:text-sm flex justify-between items-start">
                    <span className="flex-1 pr-2">Dinner ({guestCount} guests):</span>
                    <span className="flex-shrink-0">₹{mealCosts.dinner.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start font-medium mt-2 pt-2 border-t border-gray-100">
                <span className="text-sm sm:text-base flex-1 pr-2">Total Food Cost:</span>
                <span className="text-sm sm:text-base flex-shrink-0">₹{foodCost.toLocaleString()}</span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-start text-gray-600 border-t pt-2.5 sm:pt-3">
          <span className="text-sm sm:text-base flex-1 pr-2">Subtotal:</span>
          <span className="text-sm sm:text-base font-medium flex-shrink-0">₹{calculateTotalPrice().toLocaleString()}</span>
        </div>

        {appliedCoupon && couponDiscount > 0 && (
          <div className="flex justify-between items-start text-green-600 font-medium">
            <span className="text-sm sm:text-base flex-1 pr-2">Coupon Discount ({appliedCoupon.code}):</span>
            <span className="text-sm sm:text-base flex-shrink-0">-₹{couponDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="border-t pt-2.5 sm:pt-3 flex justify-between items-start font-bold text-base sm:text-lg">
          <span className="flex-1 pr-2">Total:</span>
          <span className="flex-shrink-0">₹{getFinalAmount().toLocaleString()}</span>
        </div>
      </div>

      {/* MODIFIED: Single button that handles both authenticated and non-authenticated states */}
      <Button
        onClick={handlePay} // This now handles both cases in the parent component
        disabled={
          isLoading || 
          !!guestError || 
          !checkIn || 
          !checkOut
        }
        className={`w-full mt-3 sm:mt-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium ${
          !isAuthenticated 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-amber-500 hover:bg-amber-600'
        }`}
      >
        {isLoading 
          ? "Processing..." 
          : !isAuthenticated 
            ? "Login / Register to Continue Booking"
            : `Pay Now - ₹${getFinalAmount().toLocaleString()}`
        }
      </Button>

      {/* Helper text for mobile users */}
      {/* {!isAuthenticated && (
        <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
          We'll save your booking details during login
        </p>
      )} */}
    </div>
  );
};

export default OrderSummary;
