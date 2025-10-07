// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// interface Slide {
//   id: number;
//   image: string;
//   title: string;
//   subtitle: string;
//   primary_button: string;
//   secondary_button: string;
//   primary_button_link: string;
//   secondary_button_link: string;
//   display_order: number;
// }

// const Hero: React.FC = () => {
//   const [slides, setSlides] = useState<Slide[]>([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSlides();
//   }, []);

//   const fetchSlides = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('https://admin.webhostdevs.com/api/hero.php?action=get');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Sort slides by display_order to ensure correct order
//         const sortedSlides = data.slides.sort((a: Slide, b: Slide) => 
//           a.display_order - b.display_order
//         );
//         setSlides(sortedSlides);
//       } else {
//         throw new Error(data.message || 'Failed to fetch slides');
//       }
//     } catch (err) {
//       console.error('Error fetching hero slides:', err);
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (slides.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => 
//           prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 5000); // Change image every 5 seconds

//       return () => clearInterval(interval);
//     }
//   }, [slides.length]);

//   if (loading && slides.length === 0) {
//     return (
//       <div className="relative h-[93vh] flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error && slides.length === 0) {
//     return (
//       <div className="relative h-[93vh] flex items-center justify-center">
//         <div className="text-white text-xl">Error: {error}</div>
//       </div>
//     );
//   }

//   const currentSlide = slides[currentImageIndex];

//   return (
//     <div className="relative h-[93vh]">
//       <div className="absolute mt-10 inset-0 overflow-hidden">
//         {/* Hero background image carousel */}
//         {slides.map((slide, index) => (
//           <img
//             key={slide.id}
//             src={slide.image}
//             alt={slide.title}
//             className={`h-full w-full object-cover transition-opacity duration-1000 ${
//               index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0'
//             }`}
//           />
//         ))}
//       </div>
      
//       {/* Text container with background opacity */}
//       <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
//         <div className="bg-black bg-opacity-40 rounded-lg p-8 backdrop-blur-sm">
//           <h1 
//             key={`title-${currentImageIndex}`}
//             className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight animate-fade-up"
//           >
//             {currentSlide.title.split(' ').map((word, index) => 
//               word === 'Vivenza' ? (
//                 <span key={index} style={{ color: 'rgb(255, 215, 0)' }}>{word}</span>
//               ) : (
//                 <span key={index}>{word} </span>
//               )
//             )}
//           </h1>
//           <p 
//             key={`subtitle-${currentImageIndex}`}
//             className="mt-6 max-w-2xl text-lg md:text-xl animate-fade-up"
//             style={{ animationDelay: '0.2s' }}
//           >
//             {currentSlide.subtitle}
//           </p>
//           <div 
//             className="mt-10 animate-fade-up"
//             style={{ animationDelay: '0.4s' }}
//           >
//             <Link 
//               to={currentSlide.primary_button_link || "/booking"} 
//               className="px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mr-4"
//               style={{
//                 background: 'linear-gradient(to right, rgb(255, 215, 0), rgb(255, 193, 7))',
//                 color: 'rgb(118, 37, 79)'
//               }}
//             >
//               {currentSlide.primary_button}
//             </Link>
//             <Link 
//               to={currentSlide.secondary_button_link || "/gallery"} 
//               className="px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:text-white transition-all duration-300"
//               style={{
//                 backgroundColor: 'transparent',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = 'rgb(118, 37, 79)';
//                 e.currentTarget.style.borderColor = 'rgb(118, 37, 79)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = 'white';
//               }}
//             >
//               {currentSlide.secondary_button}
//             </Link>
//           </div>
//         </div>
        
//         {/* <div 
//           className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-fade-in"
//           style={{ animationDelay: '0.6s' }}
//         >
//           <div className="text-white text-sm tracking-widest uppercase">Discover More</div>
//           <div className="mt-2 animate-bounce">
//             <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </div>
//         </div> */}
//       </div>
      
//       {/* Carousel indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id}
//             onClick={() => setCurrentImageIndex(index)}
//             className={`h-2 rounded-full transition-all ${
//               index === currentImageIndex 
//                 ? 'w-6' 
//                 : 'w-2 bg-white bg-opacity-50'
//             }`}
//             style={{
//               backgroundColor: index === currentImageIndex ? 'rgb(255, 215, 0)' : undefined
//             }}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;








import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  primary_button: string;
  secondary_button: string;
  primary_button_link: string;
  secondary_button_link: string;
  display_order: number;
}

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://admin.webhostdevs.com/api/hero.php?action=get');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        const sortedSlides = data.slides.sort((a: Slide, b: Slide) => 
          a.display_order - b.display_order
        );
        setSlides(sortedSlides);
      } else {
        throw new Error(data.message || 'Failed to fetch slides');
      }
    } catch (err) {
      console.error('Error fetching hero slides:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides.length]);

  if (loading && slides.length === 0) {
    return (
      <div className="relative h-[70vh] flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error && slides.length === 0) {
    return (
      <div className="relative h-[75vh] flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  const currentSlide = slides[currentImageIndex];

  return (
    <div className="relative h-[80vh] min-h-[500px]">
      {/* Hero background image carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute top-0'
            }`}
          />
        ))}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>
      
      {/* Text container - centered vertically and horizontally */}
      <div className="relative pt-24 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="bg-black/40 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-sm max-w-5xl w-[55vw]">
          <h1 
            key={`title-${currentImageIndex}`}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight animate-fade-up"
          >
            {currentSlide.title.split(' ').map((word, index) => 
              word === 'Vivenza' ? (
                <span key={index} style={{ color: 'rgb(255, 215, 0)' }}>{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h1>
          <p 
            key={`subtitle-${currentImageIndex}`}
            className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl animate-fade-up leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            {currentSlide.subtitle}
          </p>
          <div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Link 
              to={currentSlide.primary_button_link || "/booking"} 
              className="px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              style={{
                background: 'linear-gradient(to right, rgb(255, 215, 0), rgb(255, 193, 7))',
                color: 'rgb(118, 37, 79)'
              }}
            >
              {currentSlide.primary_button}
            </Link>
            <Link 
              to={currentSlide.secondary_button_link || "/gallery"} 
              className="px-6 sm:px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:text-white transition-all duration-300 w-full sm:w-auto"
              style={{
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(118, 37, 79)';
                e.currentTarget.style.borderColor = 'rgb(118, 37, 79)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'white';
              }}
            >
              {currentSlide.secondary_button}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'w-8' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            style={{
              backgroundColor: index === currentImageIndex ? 'rgb(255, 215, 0)' : undefined
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;