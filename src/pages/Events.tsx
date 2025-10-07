// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Events = () => {
//   const eventTypes = [
//     {
//       title: "Weddings",
//       description: "Create magical memories in our stunning outdoor venue, perfect for ceremonies and receptions.",
//       image: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b7307be2e1_1738240775.webp"
//     },
//     {
//       title: "Corporate Retreats",
//       description: "An ideal setting for team building, conferences, and business meetings.",
//       image: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b758c8e177_1738241420.webp"
//     },
//     {
//       title: "Birthday Celebrations",
//       description: "Celebrate your special day in style with our versatile event spaces.",
//       image: "https://adminmahaspice.in/ms3/uploads/event_categories/679c857bd2de2_birthday.webp"
//     },
//     {
//       title: "Private Parties",
//       description: "From bachelor parties to family reunions, we cater to all your celebration needs.",
//       image: "https://adminmahaspice.in/ms3/uploads/event_categories/679c85f62436f_cocktail.webp"
//     }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow mt-12 bg-vivenza-offWhite">
//         <div className="luxury-container mt-4 py-20">
//           <h1 className="font-display mt-3 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
//             Events
//           </h1>
//           <div className="gold-divider mx-auto mb-12"></div>

//           <div className="grid md:grid-cols-2 gap-10 mb-16">
//             {eventTypes.map((event) => (
//               <div key={event.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="w-full h-96 overflow-hidden">
//                   <img 
//                     src={event.image} 
//                     alt={event.title} 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-8">
//                   <h3 className="font-display text-3xl mb-4">{event.title}</h3>
//                   <p className="text-vivenza-black/80 mb-6 text-lg">{event.description}</p>
//                   <Link to="/booking" className="luxury-button inline-block">
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white p-10 rounded-lg shadow-lg text-center">
//             <h3 className="font-display text-3xl mb-4">Custom Event Planning</h3>
//             <p className="text-vivenza-black/80 mb-6 text-lg">
//               Have a unique event in mind? Contact our event planning team to create your perfect celebration.
//             </p>
//             <Link to="/contact" className="luxury-button inline-block">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Events;























import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
interface Event {
  id: number;
  title: string;
  description: string;
  image_path: string;
  image_url: string;
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://admin.webhostdevs.com/api/events.php');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Sort events by display_order to ensure correct order
        const sortedEvents = data.data.sort((a: Event, b: Event) => 
          a.display_order - b.display_order
        );
        setEvents(sortedEvents);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Fallback to default events if API fails
      setEvents([
        {
          id: 1,
          title: "Weddings",
          description: "Create magical memories in our stunning outdoor venue, perfect for ceremonies and receptions.",
          image_path: "../uploads/events/68adcb66286dc.webp",
          image_url: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b7307be2e1_1738240775.webp",
          status: "active",
          display_order: 1,
          created_at: "2025-07-12 08:51:55",
          updated_at: "2025-08-26 14:57:42"
        },
        {
          id: 2,
          title: "Corporate Retreats",
          description: "An ideal setting for team building, conferences, and business meetings.",
          image_path: "../uploads/events/68adcb729f75c.webp",
          image_url: "https://adminmahaspice.in/ms3/uploads/sectionThree/679b758c8e177_1738241420.webp",
          status: "active",
          display_order: 2,
          created_at: "2025-07-12 07:39:12",
          updated_at: "2025-08-26 14:57:54"
        },
        {
          id: 3,
          title: "Birthday Celebrations",
          description: "Celebrate your special day in style with our versatile event spaces.",
          image_path: "../uploads/events/68adcb7cc754d.webp",
          image_url: "https://adminmahaspice.in/ms3/uploads/event_categories/679c857bd2de2_birthday.webp",
          status: "active",
          display_order: 3,
          created_at: "2025-07-12 07:39:12",
          updated_at: "2025-08-26 14:58:04"
        },
        {
          id: 4,
          title: "Private Parties",
          description: "From bachelor parties to family reunions, we cater to all your celebration needs.",
          image_path: "../uploads/events/68adcb87a25db.webp",
          image_url: "https://adminmahaspice.in/ms3/uploads/event_categories/679c85f62436f_cocktail.webp",
          status: "active",
          display_order: 4,
          created_at: "2025-07-12 07:39:12",
          updated_at: "2025-08-26 14:58:15"
        }
      ]);
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
                <p className="text-lg text-gray-600">Loading events...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && events.length === 0) {
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
                <p className="text-lg text-red-600 mb-4">Error loading events</p>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={fetchEvents}
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
            Events
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-96 overflow-hidden">
                  <img 
                    src={event.image_url || event.image_path} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MlYxMzhIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      e.currentTarget.alt = 'Image not available';
                    }}
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-3xl mb-4">{event.title}</h3>
                  <p className="text-vivenza-black/80 mb-6 text-lg">{event.description}</p>
                  <Link to="/booking" className="luxury-button inline-block">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-lg shadow-lg text-center">
            <h3 className="font-display text-3xl mb-4">Custom Event Planning</h3>
            <p className="text-vivenza-black/80 mb-6 text-lg">
              Have a unique event in mind? Contact our event planning team to create your perfect celebration.
            </p>
            <Link to="/contact" className="luxury-button inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Events;