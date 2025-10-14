// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ScrollToTopButton from '../components/ScrollToTopButton';
// const RefundPolicy = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-vivenza-offWhite py-20">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">Refund & Cancellation Policy</h1>
//           <div className="gold-divider mb-8"></div>
          
//           <div className="prose prose-lg mx-auto">
//             <p className="text-lg text-vivenza-black/80 mb-6">
//               Last updated: April 20, 2025
//             </p>
            
//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Cancellation</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Any Capitalized terms used but not defined herein shall have the meaning
//               assigned to them under the Terms of Use which govern your use of our
//               website <strong>Vivenza.co.in</strong> (the "Website") and our 'Vivenza.co.in'
//               application for mobile and handheld devices (the "App"). The Website and
//               the App are jointly referred to as the "Platform".
//             </p>
//             <p className="text-vivenza-black/80 mb-6">
//               As a general rule Buyer shall not be entitled to cancel Order once
//               placed. Buyer may choose to cancel Order at any time but it may lead to
//               put penalty of 10-30% of the price of the product. However, subject to
//               Buyer's previous cancellation history, Vivenza.co.in reserves the right
//               to deny any refund to Buyer pursuant to a cancellation initiated by
//               Buyer.
//             </p>
            
//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Refunds</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               Buyer may be entitled to a refund for prepaid Orders. Vivenza.co.in
//               retains the right to retain the penalty payable by the Buyer mentioned
//               in cancellation section from the amount refundable to him/her. The Buyer
//               shall also be entitled to a refund of proportionate value in the event
//               packaging of an item in an Order or the complete Order, is either
//               tampered or damaged and the Buyer refuses to accept at the time of
//               delivery for the said reason.
//             </p>
//             <p className="text-vivenza-black/80 mb-6">
//               Buyer may be entitled to a refund upto 100% of the Order value if PDP
//               fails to deliver the Order due to a cause attributable to either PDP or
//               Vivenza.co.in, however such refunds will be assessed on a case to case
//               basis by Vivenza.co.in.
//             </p>
//             <p className="text-vivenza-black/80 mb-6">
//               Our decision on refunds shall be final and binding.
//             </p>
//             <p className="text-vivenza-black/80 mb-6">
//               All refund amounts shall be credited to Buyer's account as may be
//               stipulated as per the payment mechanism of Buyer's choice, the
//               estimated timelines are detailed as below, in case Buyer don't choose
//               to credit it to Buyer's wallet with his/her Vivenza.co.in Account:
//             </p>
            
//             <div className="overflow-x-auto mb-6">
//               <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Process</th>
//                     <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Payment Method</th>
//                     <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Refund Source</th>
//                     <th className="py-3 px-4 text-left text-vivenza-black font-semibold">TAT</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   <tr>
//                     <td className="py-3 px-4 text-vivenza-black/80" rowSpan={3}>Order Edit/Cancellation/Compensation/Payment Failure</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">Net Banking</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">Source</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
//                   </tr>
//                   <tr>
//                     <td className="py-3 px-4 text-vivenza-black/80">Debit/Credit Cards</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">Source</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
//                   </tr>
//                   <tr>
//                     <td className="py-3 px-4 text-vivenza-black/80">UPI</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">Source</td>
//                     <td className="py-3 px-4 text-vivenza-black/80">3-4 Business Days</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
            
//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Additional Cancellation Terms</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               A user can cancel an order before the order completes its cooking. After the order completes cooking, 
//               a user is disabled to cancel the order. Payments can be made through cash on Delivery (COD) OR using our
//               Online Payment Methods.
//             </p>
//             <p className="text-vivenza-black/80 mb-6">
//               Once the order completes cooking it will be out for delivery & Payments once made will not be refunded back.
//             </p>
            
//             <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
//             <p className="text-vivenza-black/80 mb-6">
//               If you have any questions about our Refund and Cancellation Policy, please contact us at:
//             </p>
//             <p className="text-vivenza-black/80 mb-10">
//               Email: support@vivenza.com<br />
//               Phone: +91 9697798888
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

// export default RefundPolicy;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from '../components/ScrollToTopButton';

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

const RefundPolicy = () => {
  // Business details state
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch business details from API
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://vivenza.adminmahaspice.in/api/business_details.php', {
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
        
        // Handle different response structures
        if (result.success && result.data) {
          setBusinessDetails(result.data);
        } else if (result.id) {
          // Direct data without wrapper
          setBusinessDetails(result);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching business details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch business details');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  // Format phone number for display
  const formatPhoneNumber = (number: string | undefined) => {
    if (!number) return '+91 9697798888';
    return number.startsWith('+91') ? number : `+91 ${number}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-vivenza-offWhite py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl mt-24 font-medium mb-4 text-center">Refund & Cancellation Policy</h1>
          <div className="gold-divider mb-8"></div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-vivenza-black/80 mb-6">
              Last updated: April 20, 2025
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Cancellation</h2>
            <p className="text-vivenza-black/80 mb-6">
              Any Capitalized terms used but not defined herein shall have the meaning
              assigned to them under the Terms of Use which govern your use of our
              website <strong>Vivenza.co.in</strong> (the "Website") and our 'Vivenza.co.in'
              application for mobile and handheld devices (the "App"). The Website and
              the App are jointly referred to as the "Platform".
            </p>
            <p className="text-vivenza-black/80 mb-6">
              As a general rule Buyer shall not be entitled to cancel Order once
              placed. Buyer may choose to cancel Order at any time but it may lead to
              put penalty of 10-30% of the price of the product. However, subject to
              Buyer's previous cancellation history, Vivenza.co.in reserves the right
              to deny any refund to Buyer pursuant to a cancellation initiated by
              Buyer.
            </p>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Refunds</h2>
            <p className="text-vivenza-black/80 mb-6">
              Buyer may be entitled to a refund for prepaid Orders. Vivenza.co.in
              retains the right to retain the penalty payable by the Buyer mentioned
              in cancellation section from the amount refundable to him/her. The Buyer
              shall also be entitled to a refund of proportionate value in the event
              packaging of an item in an Order or the complete Order, is either
              tampered or damaged and the Buyer refuses to accept at the time of
              delivery for the said reason.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Buyer may be entitled to a refund upto 100% of the Order value if PDP
              fails to deliver the Order due to a cause attributable to either PDP or
              Vivenza.co.in, however such refunds will be assessed on a case to case
              basis by Vivenza.co.in.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Our decision on refunds shall be final and binding.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              All refund amounts shall be credited to Buyer's account as may be
              stipulated as per the payment mechanism of Buyer's choice, the
              estimated timelines are detailed as below, in case Buyer don't choose
              to credit it to Buyer's wallet with his/her Vivenza.co.in Account:
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Process</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Payment Method</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">Refund Source</th>
                    <th className="py-3 px-4 text-left text-vivenza-black font-semibold">TAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80" rowSpan={3}>Order Edit/Cancellation/Compensation/Payment Failure</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Net Banking</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80">Debit/Credit Cards</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">5-7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-vivenza-black/80">UPI</td>
                    <td className="py-3 px-4 text-vivenza-black/80">Source</td>
                    <td className="py-3 px-4 text-vivenza-black/80">3-4 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Additional Cancellation Terms</h2>
            <p className="text-vivenza-black/80 mb-6">
              A user can cancel an order before the order completes its cooking. After the order completes cooking, 
              a user is disabled to cancel the order. Payments can be made through cash on Delivery (COD) OR using our
              Online Payment Methods.
            </p>
            <p className="text-vivenza-black/80 mb-6">
              Once the order completes cooking it will be out for delivery & Payments once made will not be refunded back.
            </p>
            
            {/* Dynamic Contact Us Section */}
            <h2 className="font-display text-2xl font-medium mt-10 mb-4">Contact Us</h2>
            <p className="text-vivenza-black/80 mb-6">
              If you have any questions about our Refund and Cancellation Policy, please contact us at:
            </p>
            
            {loading ? (
              <div className="mb-10 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error ? (
              <p className="text-vivenza-black/80 mb-10">
                Email: support@vivenza.com<br />
                Phone: +91 9697798888
              </p>
            ) : (
              <p className="text-vivenza-black/80 mb-10">
  Email: <span className="text-vivenza-gold">
    {businessDetails?.email || 'support@vivenza.com'}
  </span><br />
  Phone: <span className="text-vivenza-gold">
    {formatPhoneNumber(businessDetails?.mobile_number) || '9697798888'}
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

export default RefundPolicy;
