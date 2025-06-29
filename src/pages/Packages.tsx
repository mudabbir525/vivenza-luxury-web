import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import darkhouse from '/public/5.jpeg';
import { 
  Wifi, 
  Snowflake, 
  Zap, 
  ShowerHead, 
  Refrigerator, 
  Thermometer,
  Waves,
  Music,
  Users,
  Gamepad2,
  Flame,
  ChefHat,
  Baby,
  Crown,
  Bed,
  Heart,
  TreePine,
  Trees,
  UtensilsCrossed,
  Volume2,
  CookingPot,
  Shield,
  ShieldCheck,
  Shirt,
  Bath,
  Droplets,
  Tv,
  MapPin,
  Gift,
  WashingMachine
} from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      name: "Full Farmhouse Stay",
      weekdayPrice: "₹36,000",
      description: "Access to all 8 bedrooms, halls, and amenities",
      features: [
        "All 4 AC bedrooms",
        "4 spacious halls", 
        "Swimming pool access",
        "Garden area access",
        "24/7 security"
      ]
    },
    {
      name: "Garden Area",
      weekdayPrice: "₹26,000",
      description: "12 hours use of our expansive garden area",
      features: [
        "Up to 500 guests capacity",
        "Event setup space",
        "Parking facility",
        "Basic amenities access",
        "Security service"
      ]
    }
  ];

  const addOns = [
    { name: "DJ Services", price: "₹10,000" },
    { name: "Drinking Permission", price: "₹15,000" },
    { name: "Bonfire", price: "₹2,500" },
    {
      name: "Food Services (Vegetarian)",
      price: "₹800",
      note: "Per person"
    },
    {
      name: "Food Services (Non-Vegetarian)",
      price: "₹1,200",
      note: "Per person"
    }
  ];

  const amenitiesCategories = [
    {
      title: "Essentials",
      items: [
        { name: "Free WiFi", icon: Wifi },
        { name: "Air Conditioning", icon: Snowflake },
        { name: "Power Backup", icon: Zap },
        { name: "Geyser", icon: ShowerHead },
        { name: "Refrigerator", icon: Refrigerator },
        { name: "Heating/Cooling", icon: Thermometer }
      ]
    },
    {
      title: "Entertainment & Leisure",
      items: [
        { name: "Swimming Pool", icon: Waves },
        { name: "Music System", icon: Music },
        { name: "Carrom", icon: Users },
        { name: "Board Games", icon: Gamepad2 },
        { name: "Bonfire", icon: Flame },
        { name: "Barbeque", icon: ChefHat }
      ]
    },
    {
      title: "Kids & Family Friendly",
      items: [
        { name: "Kids Play Area", icon: Baby },
        { name: "Highchair", icon: Crown },
        { name: "Pack-n-Play", icon: Bed },
        { name: "Pet Friendly", icon: Heart },
        { name: "Outdoor Games", icon: TreePine }
      ]
    },
    {
      title: "Event-Ready",
      items: [
        { name: "Garden Lawn", icon: Trees },
        { name: "Dining Area", icon: UtensilsCrossed },
        { name: "Sound System", icon: Volume2 },
        { name: "Fully-stocked Kitchen", icon: CookingPot }
      ]
    },
    {
      title: "Safety & Comfort",
      items: [
        { name: "CCTV", icon: Shield },
        { name: "Security Guard", icon: ShieldCheck },
        { name: "Wardrobe", icon: Shirt },
        { name: "Towels", icon: Bath },
        { name: "Soap", icon: Droplets },
        { name: "Gas Stove", icon: Flame },
        { name: "Television", icon: Tv },
        { name: "Bathtub", icon: Bath },
        { name: "Walking Trails", icon: MapPin },
        { name: "Welcome Basket", icon: Gift },
        { name: "Washer/Dryer", icon: WashingMachine }
      ]
    }
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => 
        (prevIndex + 1) % amenitiesCategories.length
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [amenitiesCategories.length]);

  const currentCategory = amenitiesCategories[currentCategoryIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-12 bg-vivenza-offWhite">
        <div className="luxury-container mt-4 py-20">
          <h1 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
            Our Packages
          </h1>
          <div className="gold-divider mx-auto mb-12"></div>
          
          {/* Package information */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-display text-2xl mb-4">{pkg.name}</h3>
                <p className="text-vivenza-gold text-3xl font-medium mb-4">
                  {pkg.weekdayPrice}
                  <span className="text-sm text-vivenza-black/60"> / weekday</span>
                </p>
                <p className="text-vivenza-black/80 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center text-vivenza-black/80">
                      <svg className="w-5 h-5 mr-3 text-vivenza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="luxury-button block text-center">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
          
          {/* Timing information */}
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg mb-16">
            <h3 className="font-display text-xl mb-4 text-center">Check-in & Check-out Times</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">Check-in Time</p>
                <p className="text-lg">12:00 PM on arrival day</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">Check-out Time</p>
                <p className="text-lg">11:00 AM on departure day</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white rounded-lg shadow-lg mb-16 overflow-hidden">
            <div className="p-8">
              <h3 className="font-display text-2xl mb-6 text-center">Our Amenities</h3>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left side - Scrolling Amenities */}
                <div className="space-y-6">
                  <div className="transition-all duration-1000 ease-in-out transform">
                    <h4 className="font-display text-xl mb-4 text-vivenza-gold">
                      {currentCategory.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {currentCategory.items.map((amenity, index) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div 
                            key={`${amenity.name}-${currentCategoryIndex}`}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                            style={{
                              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                              opacity: 0
                            }}
                          >
                            <IconComponent className="w-5 h-5 text-vivenza-gold flex-shrink-0" />
                            <span className="text-vivenza-black/80">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Category indicator dots */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {amenitiesCategories.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentCategoryIndex 
                            ? 'bg-vivenza-gold w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setCurrentCategoryIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="relative">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={darkhouse}
                      alt="Luxury Farmhouse Amenities"
                      className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Experience Luxury</p>
                    <p className="text-xs opacity-90">Premium amenities for your comfort</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.6s ease-out;
            }
          `}</style>
          
          {/* Additional services */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="font-display text-2xl mb-6">Additional Services</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon) => (
                <div key={addon.name} className="flex justify-between items-center p-4 border border-vivenza-gold/20 rounded-lg">
                  <div>
                    <span className="text-vivenza-black/80">{addon.name}</span>
                    {addon.note && (
                      <span className="block text-sm text-vivenza-black/60 mt-1">{addon.note}</span>
                    )}
                  </div>
                  <span className="text-vivenza-gold font-medium">{addon.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-vivenza-black/70">
              <p><strong>Note:</strong> Food service pricing is per person. The final cost will be calculated based on your guest count and preference (vegetarian or non-vegetarian).</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;