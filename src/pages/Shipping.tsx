// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ScrollToTopButton from '../components/ScrollToTopButton';
// const ShippingPolicy = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-vivenza-offWhite py-20">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">Shipping & Delivery Policy</h1>
//           <div className="gold-divider mb-8"></div>

//           <div className="prose prose-lg mx-auto">
//             <p className="text-lg text-vivenza-black/80 mb-6">
//               Last updated: May 15, 2025
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               At Vivenza, we are committed to providing you with a seamless delivery experience.
//               This Shipping and Delivery Policy outlines our procedures for delivering your orders.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Delivery Timing</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Our delivery services are available from Monday to Sunday during operating hours.
//               Delivery time may vary based on location, weather, traffic, and other factors.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Delivery Fees</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Delivery fees may vary based on the delivery location and order amount.
//               The delivery fee will be clearly displayed during the checkout process.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Order Processing Time</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               All orders placed on our website or app will be processed within 20-30 minutes.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Order Cancellation & Refunds</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Orders can be canceled before the delivery process has started. In case of any issues with the delivered food,
//               customers are requested to contact us within 1-2 hours to request a refund or replacement.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Delivery Accuracy</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               We take all possible steps to ensure that the food is delivered accurately and in good condition.
//               In case of any errors with the order, please contact us immediately.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Responsibility after Delivery</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Once the food has been delivered, it becomes the responsibility of the customer.
//               We are not responsible for any damage caused after the delivery.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Delivery Arrangements</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               You must ensure that at the time of delivery adequate arrangements, including access where necessary,
//               are in place for the safe delivery of the items. We cannot be held liable for non-delivery or late
//               delivery where this arises as a result of a failure to provide adequate access or arrangements for delivery.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Late Delivery</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               In case of a late delivery, the delivery charge will neither be voided nor refunded by VIVENZA FARM.
//               If the items are not delivered within the estimated delivery time quoted by our team,
//               please contact our Customer Care Service.
//             </p>

//             <p className="text-vivenza-black/80 mb-6 mt-8 italic">
//               Note: This policy is subject to change at any time without prior notice.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               For any issues in utilizing our services, you may contact our helpdesk at:
//             </p>
//             <p className="text-vivenza-black/80 mb-10">
//               Phone: +91 800 825 8888<br />
//               Email: admin@gsrhospitality.com
//             </p>

//             <div className="text-center mt-12 mb-6">
//               <Link to="/" className="luxury-button">
//                 Return to Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default ShippingPolicy;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

// TypeScript interface for business details
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

const ShippingPolicy = () => {
  // Business details state
  const [businessDetails, setBusinessDetails] =
    useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch business details from API
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://vivenza.adminmahaspice.in/api/business_details.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Handle different response structures
        if (result.success && result.data) {
          setBusinessDetails(result.data);
        } else if (result.id) {
          // Direct data without wrapper
          setBusinessDetails(result);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching business details:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch business details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  // Format phone number for display
  const formatPhoneNumber = (number: string | undefined) => {
    if (!number) return "+91 800 825 8888";
    return number.startsWith("+91") ? number : `+91 ${number}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">
            Shipping & Delivery Policy
          </h1>
          <div className="gold-divider mb-8"></div>

          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: May 15, 2025
            </p>

            <p className="text-vivenza-black/80 mb-6">
              At Vivenza, we are committed to providing you with a seamless
              delivery experience. This Shipping and Delivery Policy outlines
              our procedures for delivering your orders.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Delivery Timing
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              Our delivery services are available from Monday to Sunday during
              operating hours. Delivery time may vary based on location,
              weather, traffic, and other factors.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Delivery Fees
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              Delivery fees may vary based on the delivery location and order
              amount. The delivery fee will be clearly displayed during the
              checkout process.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Order Processing Time
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              All orders placed on our website or app will be processed within
              20-30 minutes.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Order Cancellation & Refunds
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              Orders can be canceled before the delivery process has started. In
              case of any issues with the delivered food, customers are
              requested to contact us within 1-2 hours to request a refund or
              replacement.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Delivery Accuracy
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              We take all possible steps to ensure that the food is delivered
              accurately and in good condition. In case of any errors with the
              order, please contact us immediately.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Responsibility after Delivery
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              Once the food has been delivered, it becomes the responsibility of
              the customer. We are not responsible for any damage caused after
              the delivery.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Delivery Arrangements
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              You must ensure that at the time of delivery adequate
              arrangements, including access where necessary, are in place for
              the safe delivery of the items. We cannot be held liable for
              non-delivery or late delivery where this arises as a result of a
              failure to provide adequate access or arrangements for delivery.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Late Delivery
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              In case of a late delivery, the delivery charge will neither be
              voided nor refunded by VIVENZA FARM. If the items are not
              delivered within the estimated delivery time quoted by our team,
              please contact our Customer Care Service.
            </p>

            <p className="text-vivenza-black/80 mb-6 mt-8 italic">
              Note: This policy is subject to change at any time without prior
              notice.
            </p>

            {/* Dynamic Contact Us Section */}
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              For any issues in utilizing our services, you may contact our
              helpdesk at:
            </p>

            {loading ? (
              <div className="mb-10 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error ? (
              <p className="text-vivenza-black/80 mb-10">
                Phone: +91 800 825 8888
                <br />
                Email: admin@gsrhospitality.com
              </p>
            ) : (
              <p className="text-vivenza-black/80 mb-10">
                Email:{" "}
                <span className="text-vivenza-gold">
                  {businessDetails?.email || "support@vivenza.com"}
                </span>
                <br />
                Phone:{" "}
                <span className="text-vivenza-gold">
                  {formatPhoneNumber(businessDetails?.mobile_number) ||
                    "9697798888"}
                </span>
              </p>
            )}

            <div className="text-center mt-12 mb-6">
              <Link to="/" className="luxury-button">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ShippingPolicy;
