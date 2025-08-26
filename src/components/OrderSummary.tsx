import React from "react";
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
  durationType: "12_hours" | "24_hours";
  isAuthenticated: boolean;
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
  durationType,
  isAuthenticated,
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate('/login', { state: { from: '/booking' } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      {/* Coupon Section */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Apply Coupon</h4>

        {!appliedCoupon ? (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex gap-2">
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <Button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {couponLoading ? "Applying..." : "Apply"}
              </Button>
            </div>
            {couponError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {couponError}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-green-800 font-semibold">{appliedCoupon.code}</span>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Applied</span>
              </div>
              <p className="text-sm text-green-700 mt-1">{appliedCoupon.description}</p>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 hover:bg-green-100 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Base Package:</span>
          <span>₹{getBasePrice().toLocaleString()}</span>
        </div>

        {getExtraGuestCharge() > 0 && (
          <div className="flex justify-between">
            <span>
              Extra Guests ({guestCount - (selectedPackage?.max_guests || 0)}):
            </span>
            <span>₹{getExtraGuestCharge().toLocaleString()}</span>
          </div>
        )}

        {additionalServicesData
          .filter((service) => service.is_active === 1 && additionalServices[service.id])
          .map((service) => (
            <div key={service.id} className="flex justify-between">
              <span>{service.name}:</span>
              <span>₹{Number(service.price).toLocaleString()}</span>
            </div>
          ))}

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

        <div className="flex justify-between text-gray-600 border-t pt-3">
          <span>Subtotal:</span>
          <span>₹{calculateTotalPrice().toLocaleString()}</span>
        </div>

        {appliedCoupon && couponDiscount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Coupon Discount ({appliedCoupon.code}):</span>
            <span>-₹{couponDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{getFinalAmount().toLocaleString()}</span>
        </div>
      </div>

      {!isAuthenticated ? (
        <div className="mt-4 space-y-3">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please login or register to complete your booking
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAuthRedirect}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login / Register to Book
          </Button>
        </div>
      ) : (
        <Button
          onClick={handlePay}
          disabled={
            isLoading || 
            !!guestError || 
            !checkIn || 
            (durationType === "24_hours" && !checkOut) ||
            !isAuthenticated
          }
          className="w-full mt-4 bg-amber-500 hover:bg-amber-600"
        >
          {isLoading ? "Processing..." : `Pay Now - ₹${getFinalAmount().toLocaleString()}`}
        </Button>
      )}
    </div>
  );
};

export default OrderSummary;