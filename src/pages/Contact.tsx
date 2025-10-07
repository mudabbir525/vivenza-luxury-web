
// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// const Contact = () => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow mt-10 bg-vivenza-offWhite pt-8">
//         <div className="luxury-container mt-4 py-20">
//           <h1 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             Contact Us
//           </h1>
//           <div className="gold-divider mx-auto mb-12"></div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="space-y-8">
//               <div>
//                 <h3 className="font-display text-2xl mb-4">Location</h3>
//                 <p className="text-vivenza-black/80">
//                   SY NUMBER: 108, near Mirja Farms,<br />
//                   Murthuzaguda, Moinabad,<br />
//                   Telangana – 501504
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-display text-2xl mb-4">Contact Information</h3>
//                 <div className="space-y-3">
//                   <p className="text-vivenza-black/80">Phone: +91 9697798888</p>
//                   <p className="text-vivenza-black/80">Email: info@vivenza.com</p>
//                   <p className="text-vivenza-black/80">WhatsApp: +91 9697798888</p>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-display text-2xl mb-4">Business Hours</h3>
//                 <p className="text-vivenza-black/80">
//                   Monday - Sunday: 9:00 AM - 6:00 PM
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h3 className="font-display text-2xl mb-6">Send us a Message</h3>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <Input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full"
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full"
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     type="tel"
//                     placeholder="Your Phone"
//                     className="w-full"
//                   />
//                 </div>
//                 <div>
//                   <Textarea
//                     placeholder="Your Message"
//                     className="w-full min-h-[150px]"
//                   />
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Send Message
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Contact;














import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from '../components/ScrollToTopButton';
// Define TypeScript interface for business details
interface BusinessDetails {
  id: number;
  mobile_number: string;
  whatsapp_number: string;
  email: string;
  address_long: string;
  address_short: string;
  facebook_link?: string;
  instagram_link?: string;
  twitter_link?: string;
  google_map_link?: string;
  business_hours: string;
  updated_at: string;
}

const Contact = () => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch business details from API
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        setLoading(true);
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
        
        // Check if the response has the expected structure
        if (result.success && result.data) {
          setBusinessDetails(result.data);
        } else {
          // Handle case where data is directly returned without wrapper
          setBusinessDetails(result);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching business details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch business details');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-10 bg-vivenza-offWhite pt-8">
          <div className="luxury-container mt-4 py-20">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/6 mx-auto mb-8"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-10 bg-vivenza-offWhite pt-8">
          <div className="luxury-container mt-4 py-20">
            <div className="text-center text-red-600">
              <h2 className="text-2xl font-semibold mb-4">Error Loading Contact Information</h2>
              <p>{error}</p>
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
      <div className="flex-grow mt-10 bg-vivenza-offWhite">
        <div className="luxury-container mt-4 py-20">
          <h1 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Contact Us
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {/* Location Section - Dynamic */}
              <div>
                <h3 className="font-display text-2xl mb-4">Location</h3>
                <p className="text-vivenza-black/80 whitespace-pre-line">
                  {businessDetails?.address_long || 'Address not available'}
                </p>
              </div>

              {/* Contact Information Section - Dynamic */}
              <div>
                <h3 className="font-display text-2xl mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p className="text-vivenza-black/80">
                    Phone: {businessDetails?.mobile_number ? `+91 ${businessDetails.mobile_number}` : 'Not available'}
                  </p>
                  <p className="text-vivenza-black/80">
                    Email: {businessDetails?.email || 'Not available'}
                  </p>
                  <p className="text-vivenza-black/80">
                    WhatsApp: {businessDetails?.whatsapp_number ? `+91 ${businessDetails.whatsapp_number}` : 'Not available'}
                  </p>
                </div>
              </div>

              {/* Business Hours Section - Dynamic */}
              <div>
                <h3 className="font-display text-2xl mb-4">Business Hours</h3>
                <p className="text-vivenza-black/80">
                  {businessDetails?.business_hours || 'Business hours not available'}
                </p>
              </div>
            </div>

            {/* Contact Form - Static */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;
