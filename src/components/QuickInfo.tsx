// import React from "react";
// import { Link } from "react-router-dom";
// import house from "/public/12.jpeg";
// const EventsSection = () => {
//   const eventCategories = [
//     {
//       title: "Celebrations & Social Gatherings",
//       description: "Birthday parties, anniversaries, reunions and more",
//       image:
//         "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//       items: [
//         "Birthday Parties (Kids, Teens, Adults)",
//         "Anniversary Celebrations",
//         "Retirement Parties",
//         "Kitty Parties",
//         "Baby Showers",
//         "Bridal Showers",
//       ],
//     },
//     {
//       title: "Corporate & Formal Events",
//       description: "Professional gatherings with premium amenities",
//       image:
//      
//         "Corporate Offsites",
//         "Team-Building Retreats",
//         "Product Launches",
//         "Networking Mixers",
//         "Board Meetings with a View",
//       ],
//     },
//     {
//       title: "Weddings & Related Events",
//       description: "Make your special day unforgettable",
//       image:
//         "https://www.wedamor.com/wp-content/uploads/2024/06/indian-wedding-traditions-2.jpeg",
//       items: [
//         "Weddings",
//         "Engagement Ceremonies",
//         "Haldi, Mehndi & Sangeet",
//         "Pre-Wedding Photoshoots",
//         "Reception Parties",
//       ],
//     },
//     {
//       title: "Wellness & Retreats",
//       description: "Rejuvenate in our peaceful environment",
//       image:
//         "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//       items: [
//         "Yoga Retreats",
//         "Meditation Camps",
//         "Detox & Wellness Retreats",
//         "Spiritual Gatherings",
//       ],
//     },
//     {
//       title: "Cultural & Community Events",
//       description: "Celebrate diversity and traditions",
//       image:
//         "https://thumbs.dreamstime.com/b/house-lightning-eve-diwali-india-193913179.jpg",
//       items: [
//         "Festivals (Holi, Diwali, Christmas)",
//         "Theme Nights",
//         "Community Picnics",
//         "Seasonal Markets or Fairs",
//       ],
//     },
//     {
//       title: "Workshops & Learning",
//       description: "Creative and educational experiences",
//       image:
//         "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
//       items: [
//         "Art & Craft Workshops",
//         "Cooking/Baking Classes",
//         "Gardening Demos",
//         "Photography Workshops",
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Pricing Section */}
//       <section className="py-16 bg-white">
//         <div className="luxury-container">
//           <div className="text-center mb-12">
//             <h2 className="font-display text-3xl md:text-4xl font-medium text-vivenza-black">
//               Booking & Pricing
//             </h2>
//             <div className="gold-divider mx-auto"></div>
//             <p className="max-w-3xl mx-auto text-vivenza-black/80">
//               Transparent pricing for your perfect farmhouse experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Weekdays */}
//             <div className="flex h-full">
//               <div className="bg-[linear-gradient(to_right,_rgb(118,37,79),_rgb(118,37,79))] rounded-xl p-8 text-white w-full flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-display text-2xl font-semibold mb-6">
//                     Weekdays (Mon-Fri)
//                   </h3>
//                   <div className="space-y-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">12 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹20,000
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">24 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹25,000
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-1 opacity-90">
//                     <p>Minimum - 10 members and Maximum - 25 members</p>
//                     <p>Extra per guest - ₹1000</p>
//                   </div>
//                 </div>
//                 <div className="text-center pt-4">
//                   <Link
//                     to="/booking"
//                     className="inline-block px-8 py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg"
//                   >
//                     Book Your Stay
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Weekends */}
//             <div className="flex h-full">
//               <div className="bg-[linear-gradient(to_right,_rgb(118,37,79),_rgb(118,37,79))] rounded-xl p-8 text-white w-full flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-display text-2xl font-semibold mb-6">
//                     Weekends (Sat-Sun)
//                   </h3>
//                   <div className="space-y-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">12 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹30,000
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">24 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹35,000
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-1 opacity-90">
//                     <p>Minimum - 10 members and Maximum - 25 members</p>
//                     <p>Extra per guest - ₹1000</p>
//                   </div>
//                 </div>
//                 <div className="text-center pt-4">
//                   <Link
//                     to="/booking"
//                     className="inline-block px-8 py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg"
//                   >
//                     Book Your Stay
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Full FarmHouse Stay */}
//             <div className="flex h-full">
//               <div className="bg-[linear-gradient(to_right,_rgb(118,37,79),_rgb(118,37,79))] rounded-xl p-8 text-white w-full flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-display text-2xl font-semibold mb-6">
//                     Full FarmHouse Stay (Including Garden Area)
//                   </h3>
//                   <div className="space-y-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">12 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹50,000
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">24 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹75,000
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-1 opacity-90">
//                     <p>Minimum - 50 members and Maximum - 500 members</p>
//                   </div>
//                 </div>
//                 <div className="text-center pt-4">
//                   <Link
//                     to="/booking"
//                     className="inline-block px-8 py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg"
//                   >
//                     Book Your Stay
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Open Garden Area */}
//             <div className="flex h-full">
//               <div className="bg-[linear-gradient(to_right,_rgb(118,37,79),_rgb(118,37,79))] rounded-xl p-8 text-white w-full flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-display text-2xl font-semibold mb-6">
//                     Open Garden Area
//                   </h3>
//                   <div className="space-y-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">12 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹40,000
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg">24 Hrs:</span>
//                       <span className="text-2xl font-bold text-yellow-300">
//                         ₹55,000
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-sm space-y-1 opacity-90">
//                     <p>Minimum - 50 members and Maximum - 500 members</p>
//                   </div>
//                 </div>
//                 <div className="text-center pt-4">
//                   <Link
//                     to="/booking"
//                     className="inline-block px-8 py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg"
//                   >
//                     Book Your Stay
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Events Section */}
//       <section className="py-16 bg-gradient-to-b from-vivenza-offWhite to-white">
//         <div className="luxury-container">
//           <div className="text-center mb-12">
//             <h2 className="font-display text-3xl md:text-4xl   font-medium">
//               Host Your Perfect Event
//             </h2>
//             <div className="gold-divider mx-auto"></div>
//             <p className="max-w-3xl mx-auto text-vivenza-black/80">
//               Our luxury farmhouse provides the ideal setting for all types of
//               gatherings and celebrations
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {eventCategories.map((category, index) => (
//               <Link
//                 key={index}
//                 to="/booking"
//                 className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96 block cursor-pointer"
//               >
//                 {/* Image that's always visible */}
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
//                 />

//                 {/* Dark overlay to make text more readable - always present but stronger on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/70"></div>

//                 {/* Content */}
//                 <div className="absolute inset-0 flex flex-col justify-end p-6">
//                   <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
//                     <h3 className="font-display text-2xl font-semibold text-white mb-2 drop-shadow-lg">
//                       {category.title}
//                     </h3>
//                     <p className="text-vivenza-gold mb-3 drop-shadow-md font-medium">
//                       {category.description}
//                     </p>
//                   </div>

//                   <div className="max-h-0 overflow-hidden group-hover:max-h-64 transition-all duration-700 ease-in-out">
//                     <ul className="text-white text-sm space-y-1.5 bg-black/30 p-3 rounded-lg">
//                       {category.items.map((item, i) => (
//                         <li key={i} className="flex items-start">
//                           <span className="text-vivenza-gold mr-2 font-bold">
//                             •
//                           </span>
//                           {item}
//                         </li>
//                       ))}
//                     </ul>

//                     <button className="mt-4 px-4 py-2 bg-vivenza-gold text-white rounded-md hover:bg-opacity-90 transition-colors font-medium shadow-md">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventsSection;













import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PricingCategory {
  id: number;
  package_title: string;
  halfday_price: number;
  fullday_price: number;
  min_guests: number;
  max_guests: number;
  extra_per_guest: number | null;
  requirements: string | null;
  sort_order: number;
}

interface EventCategory {
  id: number;
  title: string;
  description: string;
  image_url: string;
  items: EventItem[];
  sort_order: number;
}

interface EventItem {
  id: number;
  item: string;
  sort_order: number;
}

const QuickInfo = () => {
  const [pricingCategories, setPricingCategories] = useState<PricingCategory[]>([]);
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch pricing categories
      const pricingResponse = await fetch("https://admin.webhostdevs.com/api/pricing_info_package.php");
      if (!pricingResponse.ok) {
        throw new Error("Failed to fetch pricing data");
      }
      const pricingData = await pricingResponse.json();
      
      // Fetch event categories
      const eventResponse = await fetch("https://admin.webhostdevs.com/api/eventsection.php");
      if (!eventResponse.ok) {
        throw new Error("Failed to fetch event data");
      }
      const eventData = await eventResponse.json();
      
      setPricingCategories(pricingData.data || []);
      setEventCategories(eventData.data || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to parse requirements into an array
  const parseRequirements = (requirements: string | null): string[] => {
    if (!requirements) return [];
    
    // Split by newlines and filter out empty lines
    return requirements.split('\n')
      .map(req => req.trim())
      .filter(req => req.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vivenza-gold mx-auto"></div>
          <p className="mt-4 text-vivenza-black">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-vivenza-gold text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-vivenza-black">
              Booking & Pricing
            </h2>
            <div className="gold-divider mx-auto"></div>
            <p className="max-w-3xl mx-auto text-vivenza-black/80">
              Transparent pricing for your perfect farmhouse experience
            </p>
            
            {/* Timings information */}
            <div className="mt-6 bg-vivenza-offWhite p-4 rounded-lg inline-block">
              <p className="text-vivenza-black font-medium">
                Check-in time: 12:00 PM on arrival day | Check-out time: 11:00 AM on departure day
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingCategories.map((category) => {
              const requirementsList = parseRequirements(category.requirements);
              
              return (
                <div key={category.id} className="flex h-full">
                  <div className="bg-[linear-gradient(to_right,_rgb(118,37,79),_rgb(118,37,79))] rounded-xl p-8 text-white w-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold mb-6">
                        {category.package_title}
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">24 Hrs:</span>
                          <span className="text-2xl font-bold text-yellow-300">
                            ₹{category.fullday_price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-2 opacity-90">
                        <p>Minimum - {category.min_guests} members and Maximum - {category.max_guests} members</p>
                        {category.extra_per_guest && (
                          <p>Extra per guest - ₹{category.extra_per_guest.toLocaleString('en-IN')}</p>
                        )}
                        
                        {/* Check-in and Check-out times */}
                        <div className="bg-black/20 p-3 rounded-lg border border-yellow-300/30 mt-3">
                          <p className="text-yellow-300 font-medium mb-1">Timing Details:</p>
                          <p>Check-in: 12:00 PM on arrival day</p>
                          <p>Check-out: 11:00 AM on departure day</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Requirements section with improved design */}
                    {requirementsList.length > 0 && (
                      <div className="mb-4 mt-4">
                        <div className="flex items-center mb-3">
                          <div className="h-px bg-yellow-300 flex-grow mr-3"></div>
                          <h4 className="text-yellow-300 font-semibold text-lg whitespace-nowrap">
                            Package Inclusions
                          </h4>
                          <div className="h-px bg-yellow-300 flex-grow ml-3"></div>
                        </div>
                        
                        <div className="bg-black/20 p-4 rounded-lg border border-yellow-300/30">
                          <ul className="text-white text-sm space-y-2">
                            {requirementsList.map((requirement, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-yellow-300 mr-2 font-bold">•</span>
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center pt-4">
                      <Link
                        to="/booking"
                        className="inline-block px-8 py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                      >
                        Book Your Stay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gradient-to-b from-vivenza-offWhite to-white">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Host Your Perfect Event
            </h2>
            <div className="gold-divider mx-auto"></div>
            <p className="max-w-3xl mx-auto text-vivenza-black/80">
              Our luxury farmhouse provides the ideal setting for all types of
              gatherings and celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventCategories.map((category) => (
              <Link
                key={category.id}
                to="/booking"
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96 block cursor-pointer"
              >
                {/* Image that's always visible */}
                <img
                  src={category.image_url}
                  alt={category.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                  onError={(e) => {
                    // Fallback image if the API image fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
                  }}
                />

                {/* Dark overlay to make text more readable - always present but stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/70"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-display text-2xl font-semibold text-white mb-2 drop-shadow-lg">
                      {category.title}
                    </h3>
                    <p className="text-vivenza-gold mb-3 drop-shadow-md font-medium">
                      {category.description}
                    </p>
                  </div>

                  <div className="max-h-0 overflow-hidden group-hover:max-h-64 transition-all duration-700 ease-in-out">
                    <ul className="text-white text-sm space-y-1.5 bg-black/30 p-3 rounded-lg">
                      {category.items.map((item,index) => (
                        <li key={item.id || `item-${index}`} className="flex items-start">
                          <span className="text-vivenza-gold mr-2 font-bold">
                            •
                          </span>
                          {item.item}
                        </li>
                      ))}
                    </ul>

                    <button className="mt-4 px-4 py-2 bg-vivenza-gold text-white rounded-md hover:bg-opacity-90 transition-colors font-medium shadow-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickInfo;
