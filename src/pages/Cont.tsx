import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-montserrat text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent leading-tight">
            GET IN TOUCH
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space? Let's create something extraordinary together.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="mb-12">
                <h2 className="font-montserrat text-4xl font-black text-slate-800 mb-4">
                  LET'S CONNECT
                </h2>
                <p className="text-lg font-medium text-slate-600">
                  Your dream project is just a conversation away.
                </p>
              </div>

              {/* Location Card */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-2xl shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-2xl font-bold text-slate-800 mb-3">LOCATION</h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-lg">
                      SY NUMBER: 108, near Mirja Farms,<br />
                      Murthuzaguda, Moinabad,<br />
                      Telangana – 501504
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="font-montserrat text-2xl font-bold text-slate-800 mb-6">CONTACT INFO</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">PHONE</p>
                      <p className="text-slate-600 font-medium">+91 9697798888</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">EMAIL</p>
                      <p className="text-slate-600 font-medium">info@vivenza.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">WHATSAPP</p>
                      <p className="text-slate-600 font-medium">+91 9697798888</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-2xl font-bold text-slate-800 mb-3">BUSINESS HOURS</h3>
                    <p className="text-slate-600 font-medium text-lg">
                      Monday - Sunday<br />
                      <span className="font-bold text-slate-800">9:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                  <h3 className="font-montserrat text-3xl font-black text-slate-800 mb-4">
                    SEND MESSAGE
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-montserrat font-bold text-slate-700 text-sm uppercase tracking-wide">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full h-14 px-6 border-2 border-gray-200 rounded-2xl font-medium text-slate-700 placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-montserrat font-bold text-slate-700 text-sm uppercase tracking-wide">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full h-14 px-6 border-2 border-gray-200 rounded-2xl font-medium text-slate-700 placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-montserrat font-bold text-slate-700 text-sm uppercase tracking-wide">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full h-14 px-6 border-2 border-gray-200 rounded-2xl font-medium text-slate-700 placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-montserrat font-bold text-slate-700 text-sm uppercase tracking-wide">
                      Your Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project requirements..."
                      className="w-full min-h-[180px] p-6 border-2 border-gray-200 rounded-2xl font-medium text-slate-700 placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-montserrat font-black text-lg uppercase tracking-wide rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Send className="w-6 h-6" />
                    <span>SEND MESSAGE</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;