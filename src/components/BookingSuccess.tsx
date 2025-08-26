import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Users, IndianRupee, Phone, Mail, MapPin, Download } from 'lucide-react';

const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, paymentId } = location.state || {};

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const handleDownloadReceipt = () => {
    // Implement receipt download functionality
    console.log('Download receipt for booking:', bookingData.booking_id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-20">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your reservation has been successfully confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-amber-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">Vivenza Resort</h2>
                <p className="text-amber-100">Luxury Experience Awaits</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-amber-100">Booking ID</p>
                <p className="text-lg font-mono font-semibold">{bookingData.booking_id}</p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Guest Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{bookingData.customer_name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{bookingData.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{bookingData.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{bookingData.customer_phone}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reservation Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-gray-600">{format(new Date(bookingData.check_in_date), 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-gray-600">{format(new Date(bookingData.check_out_date), 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Guests</p>
                      <p className="text-sm text-gray-600">{bookingData.guest_count} guests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{bookingData.package_name}</h4>
                {/* <p className="text-sm text-gray-600 mt-1">{bookingData.package_description}</p> */}
                <p className="text-sm text-gray-500 mt-2">Duration: {bookingData.duration_type === '12_hours' ? '12 Hours' : '24 Hours'}</p>
              </div>
            </div>

            {/* Food Services */}
            {bookingData.food_services && bookingData.food_services.length > 0 && (
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Food Services</h3>
                <div className="space-y-3">
                  {bookingData.food_services.map((service: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{service.category_name}</h4>
                          <p className="text-sm text-gray-600">{service.package_name}</p>
                          <p className="text-xs text-gray-500">Date: {format(new Date(service.meal_date), 'MMM d, yyyy')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{parseFloat(service.total_price).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">₹{parseFloat(service.price_per_person)} per person</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Services */}
            {bookingData.additional_services && bookingData.additional_services.length > 0 && (
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Services</h3>
                <div className="space-y-3">
                  {bookingData.additional_services.map((service: any, index: number) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <span className="font-medium text-gray-900">{service.service_name}</span>
                      <span className="font-medium">₹{parseFloat(service.price).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Summary</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Base Package Cost</span>
                  <span className="text-sm">₹{parseFloat(bookingData.base_price).toLocaleString()}</span>
                </div>
                {parseFloat(bookingData.food_cost) > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Food Services</span>
                    <span className="text-sm">₹{parseFloat(bookingData.food_cost).toLocaleString()}</span>
                  </div>
                )}
                {parseFloat(bookingData.additional_services_cost) > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Additional Services</span>
                    <span className="text-sm">₹{parseFloat(bookingData.additional_services_cost).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-green-200 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Paid</span>
                    <span className="font-semibold text-lg flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {parseFloat(bookingData.total_cost).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-green-200">
                  <p className="text-xs text-green-700">Payment ID: {paymentId}</p>
                  <p className="text-xs text-green-700">Status: {bookingData.payment_status.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Important Information</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Please arrive at the resort by 12:00 PM on your check-in date</li>
            <li>• Carry a valid photo ID for verification at check-in</li>
            <li>• Contact us at least 24 hours prior for any modifications</li>
            <li>• Check-out time is 11:00 AM on your departure date</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Our team is here to assist you with your reservation</p>
          <div className="flex justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <span className="text-sm">+91 12345 67890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-600" />
              <span className="text-sm">support@vivenza.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
