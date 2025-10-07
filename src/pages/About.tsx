
// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow mt-9 bg-vivenza-offWhite pt-8">
//         <div className="luxury-container mt-9 py-20">
//           <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             About Vivenza
//           </h1>
//           <div className="gold-divider mx-auto mb-12"></div>
          
//           <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
//             <div>
//               <img 
//                 src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
//                 alt="Vivenza Luxury Farmhouse" 
//                 className="rounded-lg shadow-xl w-full h-[400px] object-cover"
//               />
//             </div>
//             <div className="space-y-6">
//               <p className="text-lg text-vivenza-black/80">
//                 Experience luxury and elegance at Vivenza, the most premium farmhouse in Moinabad, Telangana. With expansive spaces and world-class amenities, we create unforgettable memories.
//               </p>
//               <p className="text-lg text-vivenza-black/80">
//                 Nestled in a serene 4-acre property, Vivenza offers the perfect blend of luxury and nature. Our farmhouse features 8 air-conditioned bedrooms, 4 spacious halls, and multiple lounges designed for your comfort.
//               </p>
//               <p className="text-lg text-vivenza-black/80">
//                 Whether you're planning a family getaway, a corporate retreat, or a grand celebration, our versatile spaces can accommodate your needs. The open garden area can host up to 500 guests, making it ideal for weddings and large events.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//             <div className="p-6 bg-white rounded-lg shadow-lg">
//               <h3 className="font-display text-2xl mb-4">Location</h3>
//               <p className="text-vivenza-black/80">
//                 SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504
//               </p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-lg">
//               <h3 className="font-display text-2xl mb-4">Accommodation</h3>
//               <p className="text-vivenza-black/80">
//                 8 AC bedrooms, 4 bathrooms, 4 spacious halls, multiple lounges and private suites
//               </p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow-lg">
//               <h3 className="font-display text-2xl mb-4">Events</h3>
//               <p className="text-vivenza-black/80">
//                 Perfect for weddings, corporate events, family gatherings, and celebrations
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;





import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const About = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-9 bg-vivenza-offWhite">
        <div className="luxury-container mt-9 py-20">
          <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            About Vivenza
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Vivenza Luxury Farmhouse" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-vivenza-black/80">
                Experience luxury and elegance at Vivenza, the most premium farmhouse in Moinabad, Telangana. With expansive spaces and world-class amenities, we create unforgettable memories.
              </p>
              <p className="text-lg text-vivenza-black/80">
                Nestled in a serene 4-acre property, Vivenza offers the perfect blend of luxury and nature. Our farmhouse features 8 air-conditioned bedrooms, 4 spacious halls, and multiple lounges designed for your comfort.
              </p>
              <p className="text-lg text-vivenza-black/80">
                Whether you're planning a family getaway, a corporate retreat, or a grand celebration, our versatile spaces can accommodate your needs. The open garden area can host up to 500 guests, making it ideal for weddings and large events.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Dynamic Location Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Location</h3>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              ) : error ? (
                <p className="text-vivenza-black/60">
                  SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504
                </p>
              ) : (
                <p className="text-vivenza-black/80 whitespace-pre-line">
                  {businessDetails?.address_long || 'SY NUMBER: 108, near Mirja Farms, Murthuzaguda, Moinabad, Telangana – 501504'}
                </p>
              )}
            </div>
            
            {/* Static Accommodation Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Accommodation</h3>
              <p className="text-vivenza-black/80">
                8 AC bedrooms, 4 bathrooms, 4 spacious halls, multiple lounges and private suites
              </p>
            </div>
            
            {/* Static Events Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="font-display text-2xl mb-4">Events</h3>
              <p className="text-vivenza-black/80">
                Perfect for weddings, corporate events, family gatherings, and celebrations
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default About;
