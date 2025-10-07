
// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Amenities = () => {
//   const amenitiesCategories = [
//     {
//       title: "Essentials",
//       items: ["Free WiFi", "Air Conditioning", "Power Backup", "Geyser", "Refrigerator", "Heating/Cooling"]
//     },
//     {
//       title: "Entertainment & Leisure",
//       items: ["Swimming Pool", "Music System", "Carrom", "Board Games", "Bonfire", "Barbeque"]
//     },
//     {
//       title: "Kids & Family Friendly",
//       items: ["Kids Play Area", "Highchair", "Pack-n-Play", "Pet Friendly", "Outdoor Games"]
//     },
//     {
//       title: "Event-Ready",
//       items: ["Garden Lawn", "Dining Area", "Sound System", "Fully-stocked Kitchen"]
//     },
//     {
//       title: "Safety & Comfort",
//       items: ["CCTV", "Security Guard", "Wardrobe", "Towels", "Soap", "Gas Stove", "Television", "Bathtub", "Walking Trails", "Welcome Basket", "Washer/Dryer"]
//     }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow mt-12 bg-vivenza-offWhite">
//         <div className="luxury-container mt-4 py-20">
//           <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             Amenities
//           </h1>
//           <div className="gold-divider mx-auto mb-12"></div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {amenitiesCategories.map((category) => (
//               <div key={category.title} className="bg-white p-8 rounded-lg shadow-lg">
//                 <h3 className="font-display text-2xl mb-6">{category.title}</h3>
//                 <ul className="space-y-3">
//                   {category.items.map((item) => (
//                     <li key={item} className="flex items-center text-vivenza-black/80">
//                       <svg className="w-5 h-5 mr-3 text-vivenza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Amenities;






import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
interface AmenityCategory {
  id: number;
  name: string;
  priority: number;
  items: AmenityItem[];
}

interface AmenityItem {
  id: number;
  name: string;
  priority: number;
}

const Amenities = () => {
  const [categories, setCategories] = useState<AmenityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://admin.webhostdevs.com/api/amenities.php');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Sort categories by priority
        const sortedCategories = data.data.sort((a: AmenityCategory, b: AmenityCategory) => 
          a.priority - b.priority
        );
        
        // Sort items within each category by priority
        sortedCategories.forEach((category: AmenityCategory) => {
          category.items.sort((a: AmenityItem, b: AmenityItem) => a.priority - b.priority);
        });
        
        setCategories(sortedCategories);
      } else {
        throw new Error(data.message || 'Failed to fetch amenities');
      }
    } catch (err) {
      console.error('Error fetching amenities:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-12 bg-vivenza-offWhite pt-8">
          <div className="luxury-container mt-4 py-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vivenza-gold mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Loading amenities...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow mt-12 bg-vivenza-offWhite">
          <div className="luxury-container mt-4 py-20">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-lg text-red-600 mb-4">Error loading amenities</p>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={fetchAmenities}
                  className="bg-vivenza-gold text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  Retry
                </button>
              </div>
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
      <div className="flex-grow mt-12 bg-vivenza-offWhite">
        <div className="luxury-container mt-4 py-20">
          <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Amenities
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          {categories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No amenities found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="font-display text-2xl mb-6">{category.name}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.id} className="flex items-center text-vivenza-black/80">
                        <svg className="w-5 h-5 mr-3 text-vivenza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Amenities;