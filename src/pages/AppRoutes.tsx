import React from 'react';
import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import NotFound from "./NotFound";
import About from "./About";
import Gallery from "./Gallery";
import Packages from "./Packages";
import Amenities from "./Amenities";
import Events from "./Events";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Booking from "./Booking";
import Privacy from "./Privacy";
import Terms from "./Terms";
import Return from "./Return";
import Refund from "./Refund";
import Shipping from "./Shipping";
import AuthSystem from "./Authsystem"; // Fixed: Capital 'S'
import ProfilePage from "./ProfilePage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/packages" element={<Packages />} />
    <Route path="/amenities" element={<Amenities />} />
    <Route path="/events" element={<Events />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/shipping-policy" element={<Shipping />} />
    <Route path="/refund-cancellation" element={<Refund />} />
    <Route path="/return-policy" element={<Return />} />
    
    {/* Login route - AuthSystem handles showing login or profile */}
    <Route path="/login" element={<AuthSystem><Index /></AuthSystem>} />
    
    {/* Profile route - protected by AuthSystem */}
    <Route path="/profile" element={
      <AuthSystem>
        <ProfilePage />
      </AuthSystem>
    } />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
