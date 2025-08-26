// import React, { useState, useEffect } from "react";
// import { User, Phone, Home, Calendar, Edit, Save, X, Construction, Mail } from "lucide-react";
// import { useAuth } from "./auth-context";

// const ProfilePage = () => {
//   const { user, updateUser, logout } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile"); // Changed default to profile
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     email: ""
//   });

//   useEffect(() => {
//     if (user) {
//       setEditedProfile({
//         name: user.name || "",
//         address: user.address || "",
//         phone: user.phone || "",
//         email: user.email || ""
//       });
//       setLoading(false);
//     }
//   }, [user]);

//   const handleInputChange = (field, value) => {
//     setEditedProfile((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "https://admin.webhostdevs.com/api/login/update_profile.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: editedProfile.name.trim(),
//             address: editedProfile.address.trim(),
//             phone: editedProfile.phone,
//             email: editedProfile.email.trim()
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         const updatedUser = {
//           ...user,
//           name: editedProfile.name.trim(),
//           address: editedProfile.address.trim(),
//           email: editedProfile.email.trim()
//         };
        
//         updateUser(updatedUser);
//         setIsEditing(false);
//         setError(null);
//       } else {
//         throw new Error(data.error || data.message || "Failed to update profile");
//       }
//     } catch (err) {
//       console.error('Profile update error:', err);
//       setError(err.message || 'Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedProfile({
//       name: user?.name || "",
//       address: user?.address || "",
//       phone: user?.phone || "",
//       email: user?.email || ""
//     });
//     setError(null);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center">
//                 <User className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Welcome to Vivenza</h1>
//                 <p className="text-gray-600">{user?.name || 'User'}</p>
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-xl shadow-lg mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               <button
//                 onClick={() => setActiveTab("profile")}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm ${
//                   activeTab === "profile"
//                     ? "border-red-600 text-red-700"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <User className="w-4 h-4" />
//                   <span>Profile</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab("bookings")}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm ${
//                   activeTab === "bookings"
//                     ? "border-red-600 text-red-700"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="w-4 h-4" />
//                   <span>My Bookings</span>
//                 </div>
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === "profile" && (
//               <div>
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold">Profile Information</h2>
//                   {!isEditing && (
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center space-x-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                       <span>Edit Profile</span>
//                     </button>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//                     {error}
//                   </div>
//                 )}

//                 {isEditing ? (
//                   <form onSubmit={handleEditSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           value={editedProfile.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           value={editedProfile.phone}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//                           disabled
//                         />
//                         <p className="text-sm text-gray-500 mt-1">Phone number cannot be changed</p>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Email Address
//                         </label>
//                         <input
//                           type="email"
//                           value={editedProfile.email}
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                           required
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Address
//                         </label>
//                         <textarea
//                           value={editedProfile.address}
//                           onChange={(e) => handleInputChange("address", e.target.value)}
//                           rows={3}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="flex space-x-4">
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="flex items-center space-x-2 px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {loading ? (
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         ) : (
//                           <Save className="w-4 h-4" />
//                         )}
//                         <span>Save Changes</span>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                       >
//                         <X className="w-4 h-4" />
//                         <span>Cancel</span>
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <User className="w-5 h-5 text-red-700" />
//                         <span className="font-medium text-gray-700">Name</span>
//                       </div>
//                       <p className="text-gray-900">{user?.name || 'Not provided'}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <Phone className="w-5 h-5 text-red-700" />
//                         <span className="font-medium text-gray-700">Phone</span>
//                       </div>
//                       <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <Mail className="w-5 h-5 text-red-700" />
//                         <span className="font-medium text-gray-700">Email</span>
//                       </div>
//                       <p className="text-gray-900">{user?.email || 'Not provided'}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg md:col-span-1">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <Home className="w-5 h-5 text-red-700" />
//                         <span className="font-medium text-gray-700">Address</span>
//                       </div>
//                       <p className="text-gray-900">{user?.address || 'Not provided'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "bookings" && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-6">My Bookings</h2>
                
//                 {/* Under Construction Message */}
//                 <div className="text-center py-16">
//                   <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Construction className="w-12 h-12 text-red-700" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Under Construction</h3>
//                   <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                     We're working hard to bring you the best booking experience. 
//                     This feature will be available soon!
//                   </p>
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//                     <p className="text-red-800 font-medium">
//                       🚀 Coming Soon Features:
//                     </p>
//                     <ul className="text-red-700 mt-2 space-y-1">
//                       <li>• View all your bookings</li>
//                       <li>• Track booking status</li>
//                       <li>• Download booking receipts</li>
//                       <li>• Manage your reservations</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;





import React, { useState, useEffect } from "react";
import { User, Phone, Home, Calendar, Edit, Save, X, Construction, Mail } from "lucide-react";
import { useAuth } from "./auth-context";
import MyBookings from "./MyBookings";

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setEditedProfile({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        email: user.email || ""
      });
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://admin.webhostdevs.com/api/login/update_profile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedProfile.name.trim(),
            address: editedProfile.address.trim(),
            phone: editedProfile.phone,
            email: editedProfile.email.trim()
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedUser = {
          ...user,
          name: editedProfile.name.trim(),
          address: editedProfile.address.trim(),
          email: editedProfile.email.trim()
        };
        updateUser(updatedUser);
        setIsEditing(false);
        setError(null);
      } else {
        throw new Error(data.error || data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      name: user?.name || "",
      address: user?.address || "",
      phone: user?.phone || "",
      email: user?.email || ""
    });
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name || 'User'}
              </h1>
              <p className="text-gray-600">{user?.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                My Profile
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Home className="w-4 h-4 inline mr-2" />
                          Address
                        </label>
                        <textarea
                          value={editedProfile.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <p className="text-gray-900">{user?.name || 'Not provided'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Home className="w-4 h-4 inline mr-2" />
                        Address
                      </label>
                      <p className="text-gray-900">{user?.address || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

