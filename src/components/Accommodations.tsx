
// import React from 'react';

// const Accommodations: React.FC = () => {
//   const accommodations = [
//     {
//       image: " /5.jpeg",
//       title: "Farmhouse Stay",
//       description: "Private, luxurious villa-style accommodation with 8 air-conditioned bedrooms and 4 spacious halls.",
//       features: ["4 AC Bedrooms", "4 Bathrooms", "4 Spacious Halls", "Multiple Lounges"]
//     },
//     {
//       image:  "/3.jpeg",
//       title: "Open Garden Area",
//       description: "Perfect venue for large events with beautiful landscaping that can accommodate up to 500 guests.",
//       features: ["Large Event Space", "Beautifully Landscaped", "Up to 500 Guests", "Open-air Experience"]
//     }
//   ];

//   return (
//     <section className="section-padding bg-white">
//       <div className="luxury-container">
//         <div className="text-center mb-12">
//           <h2 className="font-display text-3xl md:text-4xl font-medium">Accommodations</h2>
//           <div className="gold-divider"></div>
//           <p className="max-w-3xl mx-auto text-vivenza-black/80">
//             Choose from our exclusive accommodation options designed for luxury and comfort
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {accommodations.map((accommodation, index) => (
//             <div key={index} className="group overflow-hidden shadow-lg">
//               <div className="relative h-80 overflow-hidden">
//                 <img 
//                   src={accommodation.image} 
//                   alt={accommodation.title} 
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//                 <div className="absolute bottom-0 left-0 p-6 text-white">
//                   <h3 className="text-2xl font-medium">{accommodation.title}</h3>
//                 </div>
//               </div>
//               <div className="p-6 bg-white">
//                 <p className="mb-4">{accommodation.description}</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {accommodation.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center">
//                       <div className="w-2 h-2 bg-vivenza-gold rounded-full mr-2"></div>
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Accommodations;
















import React, { useState, useEffect } from 'react';

interface Feature {
  feature: string;
  sort_order: number;
}

interface Accommodation {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
  features: Feature[];
}

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://vivenza.adminmahaspice.in/api/accommodations.php');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if the response has the expected structure
        if (data.success && Array.isArray(data.data)) {
          setAccommodations(data.data);
        } else if (Array.isArray(data)) {
          // If data is directly an array
          setAccommodations(data);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Error fetching accommodations:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch accommodations');
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="luxury-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium">Accommodations</h2>
            <div className="gold-divider"></div>
            <p className="max-w-3xl mx-auto text-vivenza-black/80 text-sm sm:text-base px-4">
              Loading accommodations...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="luxury-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium">Accommodations</h2>
            <div className="gold-divider"></div>
            <p className="max-w-3xl mx-auto text-red-600 text-sm sm:text-base px-4">
              Error: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="luxury-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium">Accommodations</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80 text-sm sm:text-base px-4">
            Choose from our exclusive accommodation options designed for luxury and comfort
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="group overflow-hidden shadow-lg rounded-lg sm:rounded-xl">
              <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden">
                <img 
                  src={accommodation.image_url} 
                  alt={accommodation.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback image if the API image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-medium drop-shadow-lg">
                    {accommodation.title}
                  </h3>  
                </div>
              </div>
              
              <div className="p-4 sm:p-6 bg-white">
                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-vivenza-black/80 leading-relaxed">
                  {accommodation.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {accommodation.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vivenza-gold rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-vivenza-black/90 leading-relaxed">
                        {feature.feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {accommodations.length === 0 && !loading && (
          <div className="text-center px-4">
            <p className="max-w-3xl mx-auto text-vivenza-black/80 text-sm sm:text-base">
              No accommodations available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accommodations;
