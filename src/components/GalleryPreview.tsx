
// import React from 'react';
// import { Link } from 'react-router-dom';

// const GalleryPreview: React.FC = () => {
//   const images = [
//     {
//       src: " /5.jpeg",
//       alt: "Vivenza Garden at Night",
//       category: "Night View"
//     },
//     {
//       src:  "/7.jpeg",
//       alt: "Vivenza Pool View",
//       category: "Garden"
//     },
//     {
//       src: "/16.jpeg",
//       alt: "Vivenza Relaxation Area",
//       category: "Farmhouse"
//     },
//     {
//       src: "/13.jpeg",
//       alt: "Vivenza Natural Surroundings",
//       category: "Garden"
//     },
//     {
//       src: "https://s7ap1.scene7.com/is/image/incredibleindia/mrugavani-national-park-hyderabad-secunderabad-telangana-4-attr-hero?qlt=82&ts=1726674399232",
//       alt: "Wildlife at Vivenza",
//       category: "Events"
//     },
//     {
//       src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
//       alt: "Vivenza Suite Room",
//       category: "Farmhouse"
//     }
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="luxury-container">
//         <div className="text-center mb-12">
//           <h2 className="font-display text-3xl md:text-4xl font-medium">Gallery</h2>
//           <div className="gold-divider"></div>
//           <p className="max-w-3xl mx-auto text-vivenza-black/80">
//             Take a visual tour of our stunning property
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {images.map((image, index) => (
//             <div 
//               key={index} 
//               className="group relative overflow-hidden h-64 md:h-72"
//             >
//               <img 
//                 src={image.src} 
//                 alt={image.alt}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
//               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <span className="text-white text-xs bg-vivenza-gold px-2 py-1 mb-2">{image.category}</span>
//                 <h3 className="text-white text-center px-4">{image.alt}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           <Link to="/gallery" className="luxury-button">
//             View Full Gallery
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GalleryPreview;










import React from 'react';
import { Link } from 'react-router-dom';

const GalleryPreview: React.FC = () => {
  const images = [
    {
      src: " /5.jpeg",
      alt: "Vivenza Garden at Night",
      category: "Night View"
    },
    {
      src:  "/7.jpeg",
      alt: "Vivenza Pool View",
      category: "Garden"
    },
    {
      src: "/16.jpeg",
      alt: "Vivenza Relaxation Area",
      category: "Farmhouse"
    },
    {
      src: "/13.jpeg",
      alt: "Vivenza Natural Surroundings",
      category: "Garden"
    },
    {
      src: "https://s7ap1.scene7.com/is/image/incredibleindia/mrugavani-national-park-hyderabad-secunderabad-telangana-4-attr-hero?qlt=82&ts=1726674399232",
      alt: "Wildlife at Vivenza",
      category: "Events"
    },
    {
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Vivenza Suite Room",
      category: "Farmhouse"
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="luxury-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium">Gallery</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80 text-sm sm:text-base px-4">
            Take a visual tour of our stunning property
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg sm:rounded-xl cursor-pointer"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <span className="text-white text-xs sm:text-sm bg-vivenza-gold px-2 sm:px-3 py-1 rounded-full mb-2 font-medium shadow-lg">
                  {image.category}
                </span>
                <h3 className="text-white text-center text-sm sm:text-base lg:text-lg font-medium px-2 drop-shadow-lg leading-tight">
                  {image.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <Link 
            to="/gallery" 
            className="luxury-button inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-vivenza-gold text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
