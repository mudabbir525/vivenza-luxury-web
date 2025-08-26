import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Phone, Mail, CreditCard, CheckCircle, Clock, X, Eye } from 'lucide-react';
import { useAuth } from './auth-context';

interface FoodService {
  id: number;
  meal_date: string;
  category_name: string;
  meal_type: string;
  food_package_name: string;
  price_per_person: number;
  total_price: number;
  guest_count: number;
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
}

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
      const response = await fetch('https://admin.webhostdevs.com/api/bookings/get-user-bookings.php', {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserBookings}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-44">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
        <p className="text-gray-600">
          View and manage all your bookings with Vivenza
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">When you make your first booking, it will appear here.</p>
          <button
            onClick={() => window.location.href = '/packages'}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Explore Packages
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {booking.package_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Booking ID: {booking.booking_id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.booking_status)}`}>
                    {booking.booking_status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.payment_status)}`}>
                    {booking.payment_status}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-xs font-medium">Check-in</p>
                    <p className="text-sm">{formatDate(booking.check_in_date)}</p>
                  </div>
                </div>

                {booking.duration_type === '24_hours' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <div>
                      <p className="text-xs font-medium">Check-out</p>
                      <p className="text-sm">{formatDate(booking.check_out_date)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <div>
                    <p className="text-xs font-medium">Guests</p>
                    <p className="text-sm">{booking.guest_count} guests</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <div>
                    <p className="text-xs font-medium">Total Amount</p>
                    <p className="text-sm font-semibold">₹{booking.total_cost.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Booked on {formatDate(booking.created_at)}
                </div>
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Package Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Package Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">{selectedBooking.package_name}</h4>
                  <div className="mt-3 flex gap-4 text-sm">
                    <span>Duration: {selectedBooking.duration_type.replace('_', ' ')}</span>
                    <span>Base Price: ₹{selectedBooking.base_price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Food Services */}
              {selectedBooking.food_services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Food Services</h3>
                  <div className="space-y-2">
                    {selectedBooking.food_services.map((food, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{food.category_name}</p>
                            <p className="text-sm text-gray-600">{food.food_package_name}</p>
                            <p className="text-xs text-gray-500">{formatDate(food.meal_date)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{food.total_price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">₹{food.price_per_person}/person</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Services */}
              {selectedBooking.additional_services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Additional Services</h3>
                  <div className="space-y-2">
                    {selectedBooking.additional_services.map((service, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between">
                        <p className="font-medium">{service.service_name}</p>
                        <p className="font-medium">₹{service.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{selectedBooking.base_price.toLocaleString()}</span>
                  </div>
                  {selectedBooking.food_cost > 0 && (
                    <div className="flex justify-between">
                      <span>Food Services:</span>
                      <span>₹{selectedBooking.food_cost.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedBooking.additional_services_cost > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Services:</span>
                      <span>₹{selectedBooking.additional_services_cost.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{selectedBooking.total_cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              {selectedBooking.payment_id && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="font-mono">{selectedBooking.payment_id}</span>
                    </div>
                    {selectedBooking.razorpay_order_id && (
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="font-mono">{selectedBooking.razorpay_order_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
