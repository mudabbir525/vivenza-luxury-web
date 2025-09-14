
// import React from 'react';
// import { MapPin, Phone, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const ContactPreview: React.FC = () => {
//   return (
//     <section className="py-16 bg-vivenza-offWhite">
//       <div className="luxury-container">
//         <div className="text-center mb-12">
//           <h2 className="font-display text-3xl md:text-4xl font-medium">Connect With Us</h2>
//           <div className="gold-divider"></div>
//           <p className="max-w-3xl mx-auto text-vivenza-black/80">
//             We're here to answer your questions and help plan your perfect stay or event
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           <div className="bg-white p-8 text-center shadow-md animated-card">
//             <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
//               <MapPin className="h-8 w-8 text-vivenza-gold" />
//             </div>
//             <h3 className="font-display text-xl font-medium mb-2">Our Location</h3>
//             <p className="text-vivenza-black/80">
//               SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504
//             </p>
//           </div>
          
//           <div className="bg-white p-8 text-center shadow-md animated-card">
//             <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
//               <Phone className="h-8 w-8 text-vivenza-gold" />
//             </div>
//             <h3 className="font-display text-xl font-medium mb-2">Contact Us</h3>
//             <p className="text-vivenza-black/80 mb-2">
//               <a href="tel:+919876543210" className="hover:text-vivenza-gold transition-colors">
//                 +91 9697798888
//               </a>
//             </p>
//             <p className="text-vivenza-black/80">
//               <a href="mailto:info@vivenza.in" className="hover:text-vivenza-gold transition-colors">
//                 info@vivenza.in
//               </a>
//             </p>
//           </div>
          
//           <div className="bg-white p-8 text-center shadow-md animated-card">
//             <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
//               <Calendar className="h-8 w-8 text-vivenza-gold" />
//             </div>
//             <h3 className="font-display text-xl font-medium mb-2">Book a Visit</h3>
//             <p className="text-vivenza-black/80 mb-4">
//               Schedule a property tour to experience Vivenza in person
//             </p>
//             <Link to="/contact" className="luxury-button-outline text-sm py-2">
//               Request a Tour
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactPreview;
















import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const ContactPreview: React.FC = () => {
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
    if (!number) return '+91 XXXXXXXXXX';
    return number.startsWith('+91') ? number : `+91 ${number}`;
  };

  return (
    <section className="py-16 bg-vivenza-offWhite">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Connect With Us</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80">
            We're here to answer your questions and help plan your perfect stay or event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Location Card - Dynamic */}
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <MapPin className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Our Location</h3>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-1/2"></div>
              </div>
            ) : error ? (
              <p className="text-vivenza-black/60 text-sm">Address currently unavailable</p>
            ) : (
              <p className="text-vivenza-black/80 whitespace-pre-line">
                {businessDetails?.address_long || 'Address not available'}
              </p>
            )}
          </div>

          {/* Contact Card - Dynamic */}
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <Phone className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Contact Us</h3>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-1/2"></div>
              </div>
            ) : error ? (
              <div>
                <p className="text-vivenza-black/60 text-sm mb-2">Contact info unavailable</p>
                <p className="text-vivenza-black/60 text-sm">Please try again later</p>
              </div>
            ) : (
              <div>
                <p className="text-vivenza-black/80 mb-2">
                  <a 
                    href={`tel:${businessDetails?.mobile_number}`} 
                    className="hover:text-vivenza-gold transition-colors"
                  >
                    {formatPhoneNumber(businessDetails?.mobile_number)}
                  </a>
                </p>
                <p className="text-vivenza-black/80">
                  <a 
                    href={`mailto:${businessDetails?.email || 'info@vivenza.in'}`} 
                    className="hover:text-vivenza-gold transition-colors"
                  >
                    {businessDetails?.email || 'info@vivenza.in'}
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Book a Visit Card - Static with Dynamic Integration */}
          <div className="bg-white p-8 text-center shadow-md animated-card">
            <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-vivenza-offWhite">
              <Calendar className="h-8 w-8 text-vivenza-gold" />
            </div>
            <h3 className="font-display text-xl font-medium mb-2">Book a Visit</h3>
            <p className="text-vivenza-black/80 mb-4">
              Schedule a property tour to experience Vivenza in person
            </p>
            {!loading && !error && businessDetails?.business_hours && (
              <p className="text-vivenza-black/60 text-sm mb-4">
                {businessDetails.business_hours}
              </p>
            )}
            <Link to="/contact" className="luxury-button-outline text-sm py-2">
              Request a Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
