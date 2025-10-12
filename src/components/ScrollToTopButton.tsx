// import { useState, useEffect } from 'react';
// import { ChevronUp } from 'lucide-react';

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Show button when user scrolls down 300px
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);

//     return () => {
//       window.removeEventListener('scroll', toggleVisibility);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <>
//       {isVisible && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 z-50 p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           aria-label="Scroll to top"
//         >
//           <ChevronUp className="w-5 h-5" />
//         </button>
//       )}
//     </>
//   );
// };

// export default ScrollToTopButton;














import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-2.5 sm:p-3 bg-vivenza-gold hover:bg-vivenza-gold/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-vivenza-gold focus:ring-offset-2 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(to right, rgb(255, 215, 0), rgb(255, 193, 7))',
            color: 'rgb(118, 37, 79)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgb(118, 37, 79)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, rgb(255, 215, 0), rgb(255, 193, 7))';
            e.currentTarget.style.color = 'rgb(118, 37, 79)';
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
