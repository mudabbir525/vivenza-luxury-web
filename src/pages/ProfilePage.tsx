// import React, { useState, useEffect } from "react";
// import { User, Phone, Home, Calendar, Edit, Save, X, Construction, Mail, FileText } from "lucide-react";
// import { useAuth } from "./auth-context";

// const ProfilePage = () => {
//   const { user, updateUser, logout } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProfile, setEditedProfile] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     email: "",
//     identity_type: "",
//     identity_document: null as File | null
//   });

//   useEffect(() => {
//     if (user) {
//       setEditedProfile({
//         name: user.name || "",
//         address: user.address || "",
//         phone: user.phone || "",
//         email: user.email || "",
//         identity_type: user.identity_type || "",
//         identity_document: null
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

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setError('File size should be less than 5MB');
//         return;
//       }
      
//       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//       if (!allowedTypes.includes(file.type)) {
//         setError('Please upload JPEG, PNG, or PDF files only');
//         return;
//       }
      
//       setEditedProfile(prev => ({ ...prev, identity_document: file }));
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('name', editedProfile.name.trim());
//       formData.append('address', editedProfile.address.trim());
//       formData.append('phone', editedProfile.phone);
//       formData.append('email', editedProfile.email.trim());
      
//       if (editedProfile.identity_type) {
//         formData.append('identity_type', editedProfile.identity_type);
//       }
      
//       if (editedProfile.identity_document) {
//         formData.append('identity_document', editedProfile.identity_document);
//       }

//       const response = await fetch(
//         "https://admin.webhostdevs.com/api/login/update_profile.php",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         const updatedUser = {
//           ...user,
//           name: editedProfile.name.trim(),
//           address: editedProfile.address.trim(),
//           email: editedProfile.email.trim(),
//           identity_type: editedProfile.identity_type || user.identity_type
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
//       email: user?.email || "",
//       identity_type: user?.identity_type || "",
//       identity_document: null
//     });
//     setError(null);
//   };

//   const getIdentityTypeName = (type) => {
//     const types = {
//       'aadhaar': 'Aadhaar Card',
//       'pan': 'PAN Card',
//       'passport': 'Passport',
//       'driving': 'Driving License'
//     };
//     return types[type] || type;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {user?.name || 'User'}
//               </h1>
//               <p className="text-gray-600">{user?.phone || 'Not provided'}</p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <div className="border-b">
//             <nav className="flex space-x-8 px-6">
//               <button
//                 onClick={() => setActiveTab("profile")}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === "profile"
//                     ? "border-amber-500 text-amber-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <User className="w-4 h-4 inline mr-2" />
//                 My Profile
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
//                       className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                     <p className="text-red-600">{error}</p>
//                   </div>
//                 )}

//                 {isEditing ? (
//                   <form onSubmit={handleEditSubmit} className="space-y-6">
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <User className="w-4 h-4 inline mr-2" />
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           value={editedProfile.name}
//                           onChange={(e) => handleInputChange("name", e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <Mail className="w-4 h-4 inline mr-2" />
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={editedProfile.email}
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <Phone className="w-4 h-4 inline mr-2" />
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           value={editedProfile.phone}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
//                           disabled
//                         />
//                         <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Identity Type
//                         </label>
//                         <select
//                           value={editedProfile.identity_type}
//                           onChange={(e) => handleInputChange("identity_type", e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         >
//                           <option value="">Select Identity Type</option>
//                           <option value="aadhaar">Aadhaar Card</option>
//                           <option value="pan">PAN Card</option>
//                           <option value="passport">Passport</option>
//                           <option value="driving">Driving License</option>
//                         </select>
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <Home className="w-4 h-4 inline mr-2" />
//                           Address
//                         </label>
//                         <textarea
//                           value={editedProfile.address}
//                           onChange={(e) => handleInputChange("address", e.target.value)}
//                           rows={3}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                           required
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Update Identity Document (Optional)
//                         </label>
//                         <input
//                           type="file"
//                           onChange={handleFileChange}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                           Upload JPEG, PNG, or PDF files (Max 5MB)
//                         </p>
//                         {editedProfile.identity_document && (
//                           <div className="mt-2 flex items-center justify-between bg-amber-50 p-2 rounded">
//                             <div className="flex items-center">
//                               <FileText className="w-4 h-4 text-amber-600 mr-2" />
//                               <span className="text-sm text-amber-800">
//                                 {editedProfile.identity_document.name}
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex gap-4">
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
//                       >
//                         <Save className="w-4 h-4" />
//                         {loading ? "Saving..." : "Save Changes"}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//                       >
//                         <X className="w-4 h-4" />
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 ) : (
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <User className="w-4 h-4 inline mr-2" />
//                         Full Name
//                       </label>
//                       <p className="text-gray-900">{user?.name || 'Not provided'}</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <Phone className="w-4 h-4 inline mr-2" />
//                         Phone Number
//                       </label>
//                       <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <Mail className="w-4 h-4 inline mr-2" />
//                         Email
//                       </label>
//                       <p className="text-gray-900">{user?.email || 'Not provided'}</p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <FileText className="w-4 h-4 inline mr-2" />
//                         Identity Type
//                       </label>
//                       <p className="text-gray-900">
//                         {user?.identity_type ? getIdentityTypeName(user.identity_type) : 'Not provided'}
//                       </p>
//                     </div>

//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <Home className="w-4 h-4 inline mr-2" />
//                         Address
//                       </label>
//                       <p className="text-gray-900">{user?.address || 'Not provided'}</p>
//                     </div>

//                     {user?.identity_document && (
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Identity Document
//                         </label>
//                         <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                           <FileText className="w-5 h-5 text-gray-600" />
//                           <span className="text-gray-700">Document uploaded</span>
//                           {user.identity_document && (
//                             <a
//                               href={`https://admin.webhostdevs.com/api/login/${user.identity_document}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="ml-auto text-amber-600 hover:text-amber-700 text-sm"
//                             >
//                               View Document
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
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
import { User, Phone, Home, Calendar, Edit, Save, X, Construction, Mail, FileText, Upload, Check } from "lucide-react";
import { useAuth } from "./auth-context";

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
    email: "",
    identity_type: "",
    identity_document: null
  });

  useEffect(() => {
    if (user) {
      setEditedProfile({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        email: user.email || "",
        identity_type: user.identity_type || "",
        identity_document: null
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload JPEG, PNG, or PDF files only');
        return;
      }
      
      setEditedProfile(prev => ({ ...prev, identity_document: file }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', editedProfile.name.trim());
      formData.append('address', editedProfile.address.trim());
      formData.append('phone', editedProfile.phone);
      formData.append('email', editedProfile.email.trim());
      
      if (editedProfile.identity_type) {
        formData.append('identity_type', editedProfile.identity_type);
      }
      
      if (editedProfile.identity_document) {
        formData.append('identity_document', editedProfile.identity_document);
      }

      const response = await fetch(
        "https://admin.webhostdevs.com/api/login/update_profile.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        const updatedUser = {
          ...user,
          name: editedProfile.name.trim(),
          address: editedProfile.address.trim(),
          email: editedProfile.email.trim(),
          identity_type: editedProfile.identity_type || user.identity_type
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
      email: user?.email || "",
      identity_type: user?.identity_type || "",
      identity_document: null
    });
    setError(null);
  };

  const getIdentityTypeName = (type) => {
    const types = {
      'aadhaar': 'Aadhaar Card',
      'pan': 'PAN Card',
      'passport': 'Passport',
      'driving': 'Driving License'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden mt-40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-amber-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-amber-600 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {user?.name || 'User'}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-amber-50">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{user?.phone || 'Not provided'}</span>
                </div>
                {user?.email && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6 md:px-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-5 px-1 border-b-3 font-semibold text-sm transition-all duration-200 ${
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

          <div className="p-6 md:p-8">
            {activeTab === "profile" && (
              <div>
                {!isEditing && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                    <p className="text-gray-500">Manage your personal information and identity documents</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}

                {isEditing ? (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Profile</h2>
                      <p className="text-gray-500">Update your personal information below</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <User className="w-4 h-4 mr-2 text-amber-600" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Mail className="w-4 h-4 mr-2 text-amber-600" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Phone className="w-4 h-4 mr-2 text-amber-600" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                          disabled
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                          Phone number cannot be changed
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <FileText className="w-4 h-4 mr-2 text-amber-600" />
                          Identity Type
                        </label>
                        <select
                          value={editedProfile.identity_type}
                          onChange={(e) => handleInputChange("identity_type", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white"
                        >
                          <option value="">Select Identity Type</option>
                          <option value="aadhaar">Aadhaar Card</option>
                          <option value="pan">PAN Card</option>
                          <option value="passport">Passport</option>
                          <option value="driving">Driving License</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Home className="w-4 h-4 mr-2 text-amber-600" />
                          Address
                        </label>
                        <textarea
                          value={editedProfile.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none"
                          placeholder="Enter your complete address"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                          <Upload className="w-4 h-4 mr-2 text-amber-600" />
                          Update Identity Document (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                          />
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                          Upload JPEG, PNG, or PDF files (Max 5MB)
                        </p>
                        {editedProfile.identity_document && (
                          <div className="mt-3 flex items-center gap-3 bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-amber-900 flex-1 truncate">
                              {editedProfile.identity_document.name}
                            </span>
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                      <button
                        onClick={handleEditSubmit}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                      >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center justify-center gap-2 bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <User className="w-4 h-4 mr-2 text-amber-600" />
                        Full Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user?.name || 'Not provided'}</p>
                    </div>

                    <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <Phone className="w-4 h-4 mr-2 text-amber-600" />
                        Phone Number
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user?.phone || 'Not provided'}</p>
                    </div>

                    <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <Mail className="w-4 h-4 mr-2 text-amber-600" />
                        Email Address
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user?.email || 'Not provided'}</p>
                    </div>

                    <div className="space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <FileText className="w-4 h-4 mr-2 text-amber-600" />
                        Identity Type
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {user?.identity_type ? getIdentityTypeName(user.identity_type) : 'Not provided'}
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-3 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                      <label className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <Home className="w-4 h-4 mr-2 text-amber-600" />
                        Address
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{user?.address || 'Not provided'}</p>
                    </div>

                    {user?.identity_document && (
                      <div className="md:col-span-2 space-y-3 p-5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200">
                        <label className="flex items-center text-xs font-semibold text-amber-800 uppercase tracking-wide">
                          <FileText className="w-4 h-4 mr-2" />
                          Identity Document
                        </label>
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 block">Document uploaded</span>
                              <span className="text-xs text-gray-500">Verified identity document</span>
                            </div>
                          </div>
                          {user.identity_document && (
                            <a
                              href={`https://admin.webhostdevs.com/api/login/${user.identity_document}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
                            >
                              View Document
                            </a>
                          )}
                        </div>
                      </div>
                    )}
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