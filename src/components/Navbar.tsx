// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X, MapPin, Phone, Facebook, Twitter, Instagram, User, UserPlus, LogOut } from 'lucide-react';
// // import { useAuth } from '@/pages/Authsystem';
// import { useAuth } from '@/pages/auth-context';
// import UserDropdown from '../components/UserDropdown';

// // TypeScript interface for business details
// interface BusinessDetails {
//   id: number;
//   mobile_number: string;
//   whatsapp_number: string;
//   email: string;
//   address_long: string;
//   address_short: string;
//   facebook_link: string | null;
//   instagram_link: string | null;
//   twitter_link: string | null;
//   google_map_link: string | null;
//   business_hours: string;
//   updated_at: string;
// }
// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, logout } = useAuth();

//   // Business details state
//   const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Fetch business details from API
//   useEffect(() => {
//     const fetchBusinessDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('https://admin.webhostdevs.com/api/business_details.php', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
        
//         // Handle different response structures
//         if (result.success && result.data) {
//           setBusinessDetails(result.data);
//         } else if (result.id) {
//           // Direct data without wrapper
//           setBusinessDetails(result);
//         } else {
//           throw new Error('Invalid response format');
//         }
//       } catch (err) {
//         console.error('Error fetching business details:', err);
//         setError(err instanceof Error ? err.message : 'Failed to fetch business details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinessDetails();
//   }, []);
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Gallery', path: '/gallery' },
//     // { name: 'Packages', path: '/packages' },
//     { name: 'Amenities', path: '/amenities' },
//     { name: 'Events', path: '/events' },
//     { name: 'FAQ', path: '/faq' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   // Dynamic social links from API with fallbacks
//   const socialLinks = [
//     { 
//       icon: Facebook, 
//       href: businessDetails?.facebook_link || '#', 
//       label: 'Facebook',
//       isActive: !!businessDetails?.facebook_link 
//     },
//     { 
//       icon: Twitter, 
//       href: businessDetails?.twitter_link || '#', 
//       label: 'Twitter',
//       isActive: !!businessDetails?.twitter_link 
//     },
//     { 
//       icon: Instagram, 
//       href: businessDetails?.instagram_link || '#', 
//       label: 'Instagram',
//       isActive: !!businessDetails?.instagram_link 
//     },
//   ];

//   const handleLogout = () => {
//     logout();
//     setIsMenuOpen(false);
//   };
//   // Format phone number for display
//   const formatPhoneNumber = (number: string | undefined) => {
//     if (!number) return 'Loading...';
//     return number.startsWith('+91') ? number : `+91 ${number}`;
//   };

//   return (
//     <>
//     {/* Maintenance Banner - Add this at the very top */}
//       {/* <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-lg">
//         <div className="overflow-hidden whitespace-nowrap">
//           <div className="animate-marquee inline-block py-3 px-4">
//             <span className="text-sm md:text-base font-semibold">
//               🚧 Website Under Maintenance - We're working hard to bring you an amazing experience! 
//               Site will be live in a few days. Thank you for your patience! 🚧
//             </span>
//           </div>
//         </div>
//       </div> */}
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
//         ? 'shadow-lg'
//         : 'backdrop-blur-sm'
//       }`} style={{
//         background: isScrolled
//           ? 'linear-gradient(to right, rgb(118, 37, 79), rgb(118, 37, 79))'
//           : 'linear-gradient(to right, rgba(118, 37, 79), rgba(118, 37, 79))'
//       }}>
//       {/* Top Bar */}
//         <div className="border-b border-white/10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-3">
//               {/* Left Side - Location & Phone - Dynamic */}
//               <div className="hidden md:flex items-center space-x-6 text-white text-sm">
//                 <div className="flex items-center space-x-2 text-xs">
//                   <MapPin className="h-4 w-4" />
//                   <span>
//                     {loading ? 'Loading...' : 
//                      error ? 'Address unavailable' : 
//                      businessDetails?.address_short || 'Address unavailable'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-xs">
//                   <Phone className="h-4 w-4" />
//                   <span>
//                     {loading ? 'Loading...' : 
//                      error ? 'Phone unavailable' : 
//                      formatPhoneNumber(businessDetails?.mobile_number)}
//                   </span>
//                 </div>
//               </div>

//             {/* Center - Logo */}
//             <Link to="/" className="flex items-center">
//               <img
//                 src="/log.png"
//                 alt="Vivenza Logo"
//                 className="h-16 w-auto"
//               />
//             </Link>

// {/* Right Side - Social Icons & Auth - Dynamic */}
//               <div className="hidden md:flex items-center space-x-4">
//                 {/* Dynamic Social Icons */}
//                 <div className="flex items-center space-x-3">
//                   {!loading && !error && socialLinks.map((social, index) => (
//                     social.isActive ? (
//                       <a
//                         key={index}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white hover:text-yellow-400 transition-colors duration-300"
//                         aria-label={social.label}
//                       >
//                         <social.icon className="h-4 w-4" />
//                       </a>
//                     ) : null
//                   ))}
                  
//                   {/* Show loading state for social icons */}
//                   {loading && (
//                     <div className="flex items-center space-x-3">
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                     </div>
//                   )}
//                 </div>


//               {/* Divider */}
//               <div className="h-4 w-px bg-white/30"></div>

//               {/* Auth Links - Conditional rendering */}
//               {/* {user ? (
//                 <div className="flex items-center space-x-4 text-white text-sm">
//                   <Link
//                     to="/profile"
//                     className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
//                   >
//                     <User className="h-4 w-4" />
//                     <span>PROFILE</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span>LOGOUT</span>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-4 text-white text-sm">
//                   <Link
//                     to="/login"
//                     className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
//                   >
//                     <User className="h-4 w-4" />
//                     <span>LOGIN</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300"
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     <span>REGISTER</span>
//                   </Link>
//                 </div>
//               )} */}
//               <UserDropdown />
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-white" />
//               ) : (
//                 <Menu className="h-6 w-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex justify-center w-full">
//             <div className="flex space-x-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="relative font-medium text-white hover:text-yellow-400 transition-colors duration-300 group"
//                 >
//                   {link.name}
//                   <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Book Now Button (Desktop) */}
//           <div className="hidden lg:block absolute right-4">
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full font-semibold whitespace-nowrap hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               style={{ color: 'rgb(118, 37, 79)' }}
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden shadow-xl animate-fade-in" style={{
//             background: 'linear-gradient(to bottom, rgb(118, 37, 79), rgb(118, 37, 79))'
//           }}>
//             <div className="flex flex-col py-6 space-y-3 px-6">
//               {/* Mobile Contact Info - Dynamic */}
//               <div className="border-b border-white/10 pb-4 mb-4">
//                 <div className="flex flex-col space-y-2 text-white text-sm">
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4" />
//                     <span>
//                       {loading ? 'Loading address...' : 
//                        error ? 'Address unavailable' : 
//                        businessDetails?.address_short || 'Address unavailable'}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Phone className="h-4 w-4" />
//                     <span>
//                       {loading ? 'Loading phone...' : 
//                        error ? 'Phone unavailable' : 
//                        formatPhoneNumber(businessDetails?.mobile_number)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile Navigation Links */}
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="py-2 px-4 text-white font-medium transition-colors rounded-lg hover:bg-white/10"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}


//             {/* Mobile Auth Links */}
//             <div className="border-t border-white/10 pt-4 mt-4">
//               {user ? (
//                 <>
//                   <Link
//                     to="/profile"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="h-4 w-4" />
//                     <span>PROFILE</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span>LOGOUT</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex space-x-4 mb-4">
//                   <Link
//                     to="/login"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="h-4 w-4" />
//                     <span>LOGIN</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     <span>REGISTER</span>
//                   </Link>
//                 </div>
//               )}

// {/* Mobile Dynamic Social Icons */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   {!loading && !error && socialLinks.map((social, index) => (
//                     social.isActive ? (
//                       <a
//                         key={index}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white hover:text-yellow-400 transition-colors duration-300"
//                         aria-label={social.label}
//                       >
//                         <social.icon className="h-5 w-5" />
//                       </a>
//                     ) : null
//                   ))}
//                   {/* Loading state for mobile social icons */}
//                   {loading && (
//                     <div className="flex items-center space-x-4">
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                     </div>
//                   )}
//                 </div>

//               {/* Mobile Book Now Button */}
//               <Link
//                 to="/booking"
//                 className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
//                 style={{ color: 'rgb(118, 37, 79)' }}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Book Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//     </>
//   );
// };

// export default Navbar;












// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X, MapPin, Phone, Facebook, Twitter, Instagram, User, UserPlus, LogOut } from 'lucide-react';
// // import { useAuth } from '@/pages/Authsystem';
// import { useAuth } from '@/pages/auth-context';
// import UserDropdown from '../components/UserDropdown';

// // TypeScript interface for business details
// interface BusinessDetails {
//   id: number;
//   mobile_number: string;
//   whatsapp_number: string;
//   email: string;
//   address_long: string;
//   address_short: string;
//   facebook_link: string | null;
//   instagram_link: string | null;
//   twitter_link: string | null;
//   google_map_link: string | null;
//   business_hours: string;
//   updated_at: string;
// }
// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, logout } = useAuth();

//   // Business details state
//   const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Fetch business details from API
//   useEffect(() => {
//     const fetchBusinessDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('https://admin.webhostdevs.com/api/business_details.php', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
        
//         // Handle different response structures
//         if (result.success && result.data) {
//           setBusinessDetails(result.data);
//         } else if (result.id) {
//           // Direct data without wrapper
//           setBusinessDetails(result);
//         } else {
//           throw new Error('Invalid response format');
//         }
//       } catch (err) {
//         console.error('Error fetching business details:', err);
//         setError(err instanceof Error ? err.message : 'Failed to fetch business details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinessDetails();
//   }, []);
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Gallery', path: '/gallery' },
//     // { name: 'Packages', path: '/packages' },
//     { name: 'Amenities', path: '/amenities' },
//     { name: 'Events', path: '/events' },
//     { name: 'FAQ', path: '/faq' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   // Dynamic social links from API with fallbacks
//   const socialLinks = [
//     { 
//       icon: Facebook, 
//       href: businessDetails?.facebook_link || '#', 
//       label: 'Facebook',
//       isActive: !!businessDetails?.facebook_link 
//     },
//     { 
//       icon: Twitter, 
//       href: businessDetails?.twitter_link || '#', 
//       label: 'Twitter',
//       isActive: !!businessDetails?.twitter_link 
//     },
//     { 
//       icon: Instagram, 
//       href: businessDetails?.instagram_link || '#', 
//       label: 'Instagram',
//       isActive: !!businessDetails?.instagram_link 
//     },
//   ];

//   const handleLogout = () => {
//     logout();
//     setIsMenuOpen(false);
//   };
//   // Format phone number for display
//   const formatPhoneNumber = (number: string | undefined) => {
//     if (!number) return 'Loading...';
//     return number.startsWith('+91') ? number : `+91 ${number}`;
//   };

//   return (
//     <>
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
//         ? 'shadow-lg'
//         : 'backdrop-blur-sm'
//       }`} style={{
//         background: isScrolled
//           ? 'linear-gradient(to right, rgb(118, 37, 79), rgb(118, 37, 79))'
//           : 'linear-gradient(to right, rgba(118, 37, 79), rgba(118, 37, 79))'
//       }}>
//       {/* Top Bar */}
//         <div className="border-b border-white/10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-3">
//               {/* Left Side - Location & Phone - Dynamic */}
//               <div className="hidden md:flex items-center space-x-6 text-white text-sm">
//                 <div className="flex items-center space-x-2 text-xs">
//                   <MapPin className="h-4 w-4" />
//                   <span>
//                     {loading ? 'Loading...' : 
//                      error ? 'Address unavailable' : 
//                      businessDetails?.address_short || 'Address unavailable'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-xs">
//                   <Phone className="h-4 w-4" />
//                   <span>
//                     {loading ? 'Loading...' : 
//                      error ? 'Phone unavailable' : 
//                      formatPhoneNumber(businessDetails?.mobile_number)}
//                   </span>
//                 </div>
//               </div>

//             {/* Center - Logo */}
//             <Link to="/" className="flex items-center">
//               <img
//                 src="/log.png"
//                 alt="Vivenza Logo"
//                 className="h-16 w-auto"
//               />
//             </Link>

// {/* Right Side - Social Icons & Auth - Dynamic */}
//               <div className="hidden md:flex items-center space-x-4">
//                 {/* Dynamic Social Icons */}
//                 <div className="flex items-center space-x-3">
//                   {!loading && !error && socialLinks.map((social, index) => (
//                     social.isActive ? (
//                       <a
//                         key={index}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white hover:text-yellow-400 transition-colors duration-300"
//                         aria-label={social.label}
//                       >
//                         <social.icon className="h-4 w-4" />
//                       </a>
//                     ) : null
//                   ))}
                  
//                   {/* Show loading state for social icons */}
//                   {loading && (
//                     <div className="flex items-center space-x-3">
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
//                     </div>
//                   )}
//                 </div>


//               {/* Divider */}
//               <div className="h-4 w-px bg-white/30"></div>

              
//               <UserDropdown />
//             </div>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-white" />
//               ) : (
//                 <Menu className="h-6 w-6 text-white" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex justify-center w-full">
//             <div className="flex space-x-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="relative font-medium text-white hover:text-yellow-400 transition-colors duration-300 group"
//                 >
//                   {link.name}
//                   <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Book Now Button (Desktop) */}
//           <div className="hidden lg:block absolute right-4">
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full font-semibold whitespace-nowrap hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               style={{ color: 'rgb(118, 37, 79)' }}
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden shadow-xl animate-fade-in" style={{
//             background: 'linear-gradient(to bottom, rgb(118, 37, 79), rgb(118, 37, 79))'
//           }}>
//             <div className="flex flex-col py-6 space-y-3 px-6">
//               {/* Mobile Contact Info - Dynamic */}
//               <div className="border-b border-white/10 pb-4 mb-4">
//                 <div className="flex flex-col space-y-2 text-white text-sm">
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4" />
//                     <span>
//                       {loading ? 'Loading address...' : 
//                        error ? 'Address unavailable' : 
//                        businessDetails?.address_short || 'Address unavailable'}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Phone className="h-4 w-4" />
//                     <span>
//                       {loading ? 'Loading phone...' : 
//                        error ? 'Phone unavailable' : 
//                        formatPhoneNumber(businessDetails?.mobile_number)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile Navigation Links */}
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="py-2 px-4 text-white font-medium transition-colors rounded-lg hover:bg-white/10"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}


//             {/* Mobile Auth Links */}
//             <div className="border-t border-white/10 pt-4 mt-4">
//               {user ? (
//                 <>
//                   <Link
//                     to="/profile"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="h-4 w-4" />
//                     <span>PROFILE</span>
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300 mb-4"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span>LOGOUT</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex space-x-4 mb-4">
//                   <Link
//                     to="/login"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="h-4 w-4" />
//                     <span>LOGIN</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <UserPlus className="h-4 w-4" />
//                     <span>REGISTER</span>
//                   </Link>
//                 </div>
//               )}

// {/* Mobile Dynamic Social Icons */}
//                 <div className="flex items-center space-x-4 mb-4">
//                   {!loading && !error && socialLinks.map((social, index) => (
//                     social.isActive ? (
//                       <a
//                         key={index}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white hover:text-yellow-400 transition-colors duration-300"
//                         aria-label={social.label}
//                       >
//                         <social.icon className="h-5 w-5" />
//                       </a>
//                     ) : null
//                   ))}
//                   {/* Loading state for mobile social icons */}
//                   {loading && (
//                     <div className="flex items-center space-x-4">
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                       <div className="w-5 h-5 bg-white/30 animate-pulse rounded"></div>
//                     </div>
//                   )}
//                 </div>

//               {/* Mobile Book Now Button */}
//               <Link
//                 to="/booking"
//                 className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
//                 style={{ color: 'rgb(118, 37, 79)' }}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Book Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//     </>
//   );
// };

// export default Navbar;


















import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { useAuth } from '@/pages/auth-context';
import UserDropdown from './UserDropdown';

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

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        
        if (result.success && result.data) {
          setBusinessDetails(result.data);
        } else if (result.id) {
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Events', path: '/events' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: businessDetails?.facebook_link || '#', 
      label: 'Facebook',
      isActive: !!businessDetails?.facebook_link 
    },
    { 
      icon: Twitter, 
      href: businessDetails?.twitter_link || '#', 
      label: 'Twitter',
      isActive: !!businessDetails?.twitter_link 
    },
    { 
      icon: Instagram, 
      href: businessDetails?.instagram_link || '#', 
      label: 'Instagram',
      isActive: !!businessDetails?.instagram_link 
    },
  ];

  const formatPhoneNumber = (number: string | undefined) => {
    if (!number) return 'Loading...';
    return number.startsWith('+91') ? number : `+91 ${number}`;
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'backdrop-blur-sm'
        }`} 
        style={{
          background: isScrolled
            ? 'linear-gradient(to right, rgb(118, 37, 79), rgb(118, 37, 79))'
            : 'linear-gradient(to right, rgba(118, 37, 79, 0.95), rgba(118, 37, 79, 0.95))'
        }}
      >
        {/* Desktop Navigation - Large Screens Only */}
        <div className="hidden lg:block">
          {/* Top Bar */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-3">
                {/* Left Side - Location & Phone */}
                <div className="flex items-center space-x-6 text-white text-sm">
                  <div className="flex items-center space-x-2 text-xs">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {loading ? 'Loading...' : 
                       error ? 'Address unavailable' : 
                       businessDetails?.address_short || 'Address unavailable'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Phone className="h-4 w-4" />
                    <span>
                      {loading ? 'Loading...' : 
                       error ? 'Phone unavailable' : 
                       formatPhoneNumber(businessDetails?.mobile_number)}
                    </span>
                  </div>
                </div>

                {/* Center - Logo */}
                <Link to="/" className="flex items-center">
                  <img
                    src="/log.png"
                    alt="Vivenza Logo"
                    className="h-16 w-auto"
                  />
                </Link>

                {/* Right Side - Social Icons & Auth */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {!loading && !error && socialLinks.map((social, index) => (
                      social.isActive ? (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-yellow-400 transition-colors duration-300"
                          aria-label={social.label}
                        >
                          <social.icon className="h-4 w-4" />
                        </a>
                      ) : null
                    ))}
                    
                    {loading && (
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
                        <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
                        <div className="w-4 h-4 bg-white/30 animate-pulse rounded"></div>
                      </div>
                    )}
                  </div>

                  <div className="h-4 w-px bg-white/30"></div>
                  
                  <UserDropdown />
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex justify-center w-full">
                <div className="flex space-x-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="relative font-medium text-white hover:text-yellow-400 transition-colors duration-300 group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="absolute right-4">
                <Link
                  to="/booking"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-full font-semibold whitespace-nowrap hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ color: 'rgb(118, 37, 79)' }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navigation - Medium and Small Screens */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo on Left */}
            <Link to="/" className="flex items-center">
              <img
                src="/log.png"
                alt="Vivenza Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <UserDropdown />
              
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-yellow-400 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Higher z-index */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 pointer-events-none z-[-1]'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu Panel - Higher z-index */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-[rgb(118,37,79)] to-[rgb(98,27,59)] shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto z-[70] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-white font-semibold text-lg">Menu</span>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-yellow-400 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto py-6">
            {/* Navigation Links */}
            <div className="px-6 space-y-1 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-3 px-4 text-white text-lg font-medium hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="px-6 mb-6">
              <Link
                to="/booking"
                className="block bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 rounded-full font-semibold text-center hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg"
                style={{ color: 'rgb(118, 37, 79)' }}
                onClick={toggleMenu}
              >
                Book Now
              </Link>
            </div>

            {/* Auth Section */}
            {!user && (
              <div className="px-6 mb-6">
                <Link
                  to="/login"
                  className="block bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-white/20 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login / Register
                </Link>
              </div>
            )}

            {/* Contact Info */}
            <div className="px-6 mb-6 pb-6 border-b border-white/10">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-white/90">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    {loading ? 'Loading...' : 
                     error ? 'Address unavailable' : 
                     businessDetails?.address_short || 'Address unavailable'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">
                    {loading ? 'Loading...' : 
                     error ? 'Phone unavailable' : 
                     formatPhoneNumber(businessDetails?.mobile_number)}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="px-6">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Follow Us</h3>
              <div className="flex items-center space-x-4">
                {!loading && !error && socialLinks.map((social, index) => (
                  social.isActive ? (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-full text-white hover:text-yellow-400 hover:bg-white/20 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ) : null
                ))}
                {loading && (
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 bg-white/30 animate-pulse rounded-full"></div>
                    <div className="w-9 h-9 bg-white/30 animate-pulse rounded-full"></div>
                    <div className="w-9 h-9 bg-white/30 animate-pulse rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;