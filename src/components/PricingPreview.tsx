import React, { useState, useEffect } from 'react';
import { 
  Check,
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

// Mock Link component for demonstration
const Link = ({ to, className, children, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

const PricingPreview: React.FC = () => {
  const packages = [
    {
      title: "Full Farmhouse Stay",
      price: "₹36,000",
      period: "weekdays",
      description: "Exclusive access to the entire luxury farmhouse",
      features: [
        "4 Air-conditioned Bedrooms",
        "4 Bathrooms",
        "4 Spacious Halls",
        "Multiple Lounges",
        "Private Garden Access",
        "Swimming Pool Access"
      ]
    },
    {
      title: "Garden Area",
      price: "₹26,000",
      period: "for 12 hours",
      description: "Perfect for hosting large events and celebrations",
      features: [
        "Large Open Garden",
        "Capacity for 500 Guests",
        "Event Setup Space",
        "Parking Area",
        "Basic Amenities",
        "Staffing Support"
      ]
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
    }, 4000);

    return () => clearInterval(interval);
  }, [amenitiesCategories.length]);

  const currentCategory = amenitiesCategories[currentCategoryIndex];

  return (
    <section className="py-16 bg-vivenza-offWhite">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Our Packages</h2>
          <div className="gold-divider"></div>
          <p className="max-w-3xl mx-auto text-vivenza-black/80 mb-4">
            Choose the perfect package for your needs with transparent pricing
          </p>
          <p className="text-vivenza-black/70 text-sm">
            *Weekend prices vary. Contact us for special pricing and custom packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded shadow-lg overflow-hidden animated-card">
              <div className="bg-vivenza-black p-6 text-white text-center">
                <h3 className="font-display text-2xl font-medium">{pkg.title}</h3>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-3xl font-semibold text-vivenza-gold">{pkg.price}</span>
                  <span className="ml-1 text-white/70">/{pkg.period}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-center mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-vivenza-gold flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <Link to="/packages" className="luxury-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-lg shadow-lg mb-16 overflow-hidden">
          <div className="p-8">
            <h3 className="font-display text-2xl mb-6 text-center">Our Premium Amenities</h3>
            <div className="text-center mb-8">
              <h4 className="font-display text-xl mb-4 text-vivenza-gold transition-all duration-500">
                {currentCategory.title}
              </h4>
              
              {/* Grid Layout for Amenities */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {currentCategory.items.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div 
                      key={`${amenity.name}-${currentCategoryIndex}`}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                        opacity: 0
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-vivenza-gold mb-2 flex-shrink-0" />
                      <span className="text-xs text-center text-vivenza-black/80 leading-tight">
                        {amenity.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Category indicator dots */}
              <div className="flex justify-center space-x-2 mt-8">
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
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-xl mb-4">Add-on Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4">
            <div className="bg-white p-4 shadow">
              <span className="font-medium">DJ Services:</span> ₹10,000
            </div>
            <div className="bg-white p-4 shadow">
              <span className="font-medium">Drinking Allowed:</span> ₹15,000
            </div>
          </div>
          <Link to="/booking" className="luxury-button mt-8 inline-block">
            Book Now
          </Link>
        </div>
      </div>

      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </section>
  );
};

export default PricingPreview;