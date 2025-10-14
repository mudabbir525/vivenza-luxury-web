// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ScrollToTopButton from '../components/ScrollToTopButton';
// const ReturnPolicy = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-vivenza-offWhite py-20">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">Return Policy</h1>
//           <div className="gold-divider mb-8"></div>

//           <div className="prose prose-lg mx-auto">
//             <p className="text-lg text-vivenza-black/80 mb-6">
//               Last updated: May 15, 2025
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               To provide the best customer satisfaction, we provide the following solutions.
//               If you have any questions regarding the Return Policy please call +91 969 779 8888.
//               Preparation of your order can begin immediately after your order has been confirmed.
//               We cannot accept return once your order has been confirmed with the restaurant.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Food Order Errors</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               If you receive food that is different from your receipt, we sincerely apologize.
//               Please call us as soon as you notice that there was an error in your order.
//               You may come to pick up the correct food item.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               <strong>For credit card payments:</strong> You will be refunded the sales price amount associated
//               with the error and recharged for the new item's price.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               <strong>For cash payments:</strong> You will be asked to pay the difference of the balance if the new
//               food has a greater value than the food received in error. In the same way, you will receive the
//               difference of the balance back as credit for the new item if less than the food received in error.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               In some cases, we may offer you a store credit. Your order will be priority if you come to pick it up.
//               In all cases, please return the food order in the original container(s) to our host.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Food Order Incomplete</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               In the rare occasion that you do not receive food that is on your receipt, we will make it up to you.
//               Please call us as soon as you notice that any food items were not received in your order.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               You may cancel the missed food before we prepare it without any question, and we will refund the amount
//               to a credit card, cash refund, or we will refund you with a store credit.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Food Dissatisfaction</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               We cook our food fresh to order with only the finest and freshest ingredients.
//               We take great care and pride in all of the dishes we make.
//               Please call us immediately if you receive unsatisfactory food caused by a dislike or objects in the food.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               We will need the food returned in the original container(s) so we may investigate and deal with the issue.
//               We will prepare you a new food order. If you do not wish to receive a new dish, we may refund the amount
//               to a credit card, cash refund, or we will refund you with a store credit only after we receive the food
//               in the original container(s) and have confirmed the error to the discretion of the manager on duty.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Order Replacement</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               You are entitled to replacement of Items delivered in case of wrong delivery, food spillage,
//               foreign object in food item, or stale food. You will be required to provide a proof of the same
//               in the form of a photo for our verification.
//             </p>

//             <p className="text-vivenza-black/80 mb-6">
//               The request for the replacement shall be placed through our Customer Care chat window or call service.
//             </p>

//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               If you have any questions or concerns about our Return Policy, please contact us at:
//             </p>
//             <p className="text-vivenza-black/80 mb-10">
//               Phone: +91 969 779 8888<br />
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

// export default ReturnPolicy;

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

const ReturnPolicy = () => {
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
    if (!number) return "+91 969 779 8888";
    return number.startsWith("+91") ? number : `+91 ${number}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">
            Return Policy
          </h1>
          <div className="gold-divider mb-8"></div>

          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: May 15, 2025
            </p>

            <p className="text-vivenza-black/80 mb-6">
              To provide the best customer satisfaction, we provide the
              following solutions. If you have any questions regarding the
              Return Policy please call{" "}
              {loading ? (
                <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded"></span>
              ) : error ? (
                "+91 969 779 8888"
              ) : (
                <span className="text-vivenza-gold">
                  {formatPhoneNumber(businessDetails?.mobile_number) ||
                    "9697798888"}
                </span>
              )}
              . Preparation of your order can begin immediately after your order
              has been confirmed. We cannot accept return once your order has
              been confirmed with the restaurant.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Food Order Errors
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              If you receive food that is different from your receipt, we
              sincerely apologize. Please call us as soon as you notice that
              there was an error in your order. You may come to pick up the
              correct food item.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              <strong>For credit card payments:</strong> You will be refunded
              the sales price amount associated with the error and recharged for
              the new item's price.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              <strong>For cash payments:</strong> You will be asked to pay the
              difference of the balance if the new food has a greater value than
              the food received in error. In the same way, you will receive the
              difference of the balance back as credit for the new item if less
              than the food received in error.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              In some cases, we may offer you a store credit. Your order will be
              priority if you come to pick it up. In all cases, please return
              the food order in the original container(s) to our host.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Food Order Incomplete
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              In the rare occasion that you do not receive food that is on your
              receipt, we will make it up to you. Please call us as soon as you
              notice that any food items were not received in your order.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              You may cancel the missed food before we prepare it without any
              question, and we will refund the amount to a credit card, cash
              refund, or we will refund you with a store credit.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Food Dissatisfaction
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              We cook our food fresh to order with only the finest and freshest
              ingredients. We take great care and pride in all of the dishes we
              make. Please call us immediately if you receive unsatisfactory
              food caused by a dislike or objects in the food.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              We will need the food returned in the original container(s) so we
              may investigate and deal with the issue. We will prepare you a new
              food order. If you do not wish to receive a new dish, we may
              refund the amount to a credit card, cash refund, or we will refund
              you with a store credit only after we receive the food in the
              original container(s) and have confirmed the error to the
              discretion of the manager on duty.
            </p>

            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Order Replacement
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              You are entitled to replacement of Items delivered in case of
              wrong delivery, food spillage, foreign object in food item, or
              stale food. You will be required to provide a proof of the same in
              the form of a photo for our verification.
            </p>

            <p className="text-vivenza-black/80 mb-6">
              The request for the replacement shall be placed through our
              Customer Care chat window or call service.
            </p>

            {/* Dynamic Contact Us Section */}
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">
              Contact Us
            </h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions or concerns about our Return Policy,
              please contact us at:
            </p>

            {loading ? (
              <div className="mb-10 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error ? (
              <p className="text-vivenza-black/80 mb-10">
                Phone: +91 969 779 8888
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

export default ReturnPolicy;
