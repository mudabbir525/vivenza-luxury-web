// import React from 'react';
// import { format, isSameDay } from 'date-fns';
// import { Calendar, Users, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// interface FoodSummaryProps {
//   selectedMeals: Record<string, boolean>;
//   dayMealConfigs: Record<string, Record<string, any>>;
//   dateRange: Date[];
//   totalCost: number;
//   mealCosts: { breakfast: number; lunch: number; snacks: number; dinner: number };
//   guestCount: number;
//   foodCategories: any[];
//   packagesByCategory: Record<number, any[]>;
// }

// const FoodSummary: React.FC<FoodSummaryProps> = ({
//   selectedMeals,
//   dayMealConfigs,
//   dateRange,
//   totalCost,
//   mealCosts,
//   guestCount,
//   foodCategories,
//   packagesByCategory
// }) => {
  
//   // NEW: Function to get available meals for a specific date
//   const getAvailableMealsForDate = (date: Date): string[] => {
//     if (!dateRange || dateRange.length === 0) return [];
    
//     const checkIn = dateRange[0];
//     const checkOut = dateRange[dateRange.length - 1];
    
//     if (isSameDay(date, checkIn)) {
//       // First day - exclude breakfast (check-in at 12 PM)
//       return ["lunch", "snacks", "dinner"];
//     }
//     if (isSameDay(date, checkOut)) {
//       // Last day - only breakfast (check-out at 11 AM)
//       return ["breakfast"];
//     }
//     // Middle days - all meals available
//     return ["breakfast", "lunch", "snacks", "dinner"];
//   };

//   // UPDATED: Calculate configuration completeness with date restrictions
//   const getConfigurationStatus = () => {
//     const selectedMealKeys = Object.entries(selectedMeals)
//       .filter(([_, selected]) => selected)
//       .map(([mealKey]) => mealKey)
//       .sort((a, b) => {
//         const aCat = foodCategories.find(cat => cat.key_name === a);
//         const bCat = foodCategories.find(cat => cat.key_name === b);
//         return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
//       });

//     let totalConfigured = 0;
//     let totalRequired = 0;

//     dateRange.forEach(date => {
//       const dateKey = format(date, 'yyyy-MM-dd');
//       const dayConfig = dayMealConfigs[dateKey];
//       const availableMeals = getAvailableMealsForDate(date); // NEW: Get available meals for this date

//       selectedMealKeys.forEach(mealKey => {
//         // NEW: Only count meals that are available for this date
//         if (availableMeals.includes(mealKey)) {
//           totalRequired++;
//           if (dayConfig?.[mealKey]?.package_id) {
//             totalConfigured++;
//           }
//         }
//       });
//     });

//     return { totalConfigured, totalRequired };
//   };

//   const { totalConfigured, totalRequired } = getConfigurationStatus();
//   const isFullyConfigured = totalConfigured === totalRequired;

//   // Get package details for display
//   const getPackageDetails = (categoryId: number, packageId: number) => {
//     const packages = packagesByCategory[categoryId] || [];
//     return packages.find(pkg => pkg.id === packageId);
//   };

//   const getCategoryById = (categoryId: number) => {
//     return foodCategories.find(cat => cat.id === categoryId);
//   };

//   // UPDATED: Render day-wise breakdown with availability restrictions
//   const renderDayWiseBreakdown = () => {
//     return dateRange.map(date => {
//       const dateKey = format(date, 'yyyy-MM-dd');
//       const dayConfig = dayMealConfigs[dateKey];
//       const availableMeals = getAvailableMealsForDate(date); // NEW: Get available meals for this date
      
//       const selectedMealKeys = Object.entries(selectedMeals)
//         .filter(([mealKey, selected]) => selected && availableMeals.includes(mealKey)) // NEW: Filter by availability
//         .map(([mealKey]) => mealKey)
//         .sort((a, b) => {
//           const aCat = foodCategories.find(cat => cat.key_name === a);
//           const bCat = foodCategories.find(cat => cat.key_name === b);
//           return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
//         });

//       // NEW: Show unavailable meals with different styling
//       const unavailableMeals = Object.entries(selectedMeals)
//         .filter(([mealKey, selected]) => selected && !availableMeals.includes(mealKey))
//         .map(([mealKey]) => mealKey);

//       return (
//         <div key={dateKey} className="border rounded-lg p-4 mb-4">
//           <div className="flex items-center space-x-2 mb-3">
//             <Calendar className="w-4 h-4 text-gray-600" />
//             <h6 className="font-semibold">{format(date, 'EEEE, MMMM d, yyyy')}</h6>
//             {/* NEW: Show day type indicator */}
//             {isSameDay(date, dateRange[0]) && (
//               <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Check-in</span>
//             )}
//             {isSameDay(date, dateRange[dateRange.length - 1]) && (
//               <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Check-out</span>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Available meals */}
//             {selectedMealKeys.map(mealKey => {
//               const mealConfig = dayConfig?.[mealKey];
//               const category = foodCategories.find(cat => cat.key_name === mealKey);
//               const packageDetails = mealConfig?.package_id 
//                 ? getPackageDetails(category?.id, mealConfig.package_id)
//                 : null;

//               return (
//                 <div key={mealKey} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//                   <div className={`w-3 h-3 rounded-full ${
//                     packageDetails ? 'bg-green-500' : 'bg-red-500'
//                   }`} />
//                   <div className="flex-1">
//                     <div className="font-medium capitalize">{mealKey}</div>
//                     <div className="text-sm text-gray-600">
//                       {packageDetails 
//                         ? `${packageDetails.name} - ₹${packageDetails.price.toLocaleString()}/person`
//                         : 'Food Package Not Selected'
//                       }
//                     </div>
//                   </div>
//                   {packageDetails && (
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                   )}
//                 </div>
//               );
//             })}

//             {/* NEW: Show unavailable meals with different styling */}
//             {unavailableMeals.map(mealKey => (
//               <div key={`unavailable-${mealKey}`} className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg opacity-60">
//                 <div className="w-3 h-3 rounded-full bg-gray-400" />
//                 <div className="flex-1">
//                   <div className="font-medium capitalize text-gray-500">{mealKey}</div>
//                   <div className="text-sm text-gray-400">
//                     {isSameDay(date, dateRange[0]) && mealKey === 'breakfast' 
//                       ? 'Not available (Check-in at 12 PM)'
//                       : isSameDay(date, dateRange[dateRange.length - 1]) && mealKey !== 'breakfast'
//                       ? 'Not available (Check-out at 11 AM)'
//                       : 'Not available'
//                     }
//                   </div>
//                 </div>
//                 <AlertCircle className="w-4 h-4 text-gray-400" />
//               </div>
//             ))}
//           </div>

//           {/* NEW: Show timing info for special days */}
//           {(isSameDay(date, dateRange[0]) || isSameDay(date, dateRange[dateRange.length - 1])) && (
//             <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
//               {isSameDay(date, dateRange[0]) && (
//                 <>📍 Check-in day: No breakfast available (Check-in at 12:00 PM)</>
//               )}
//               {isSameDay(date, dateRange[dateRange.length - 1]) && (
//                 <>📍 Check-out day: Only breakfast available (Check-out at 11:00 AM)</>
//               )}
//             </div>
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="food-summary">
//       <h4 className="text-lg font-semibold mb-4">Food Service Summary</h4>

//       {/* Configuration Status */}
//       <div className="mb-6">
//         {isFullyConfigured ? (
//           <Alert className="border-green-200 bg-green-50">
//             <CheckCircle className="h-4 w-4 text-green-600" />
//             <AlertDescription className="text-green-800">
//               Select available meals to configure! Review your selections.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <Alert className="border-amber-200 bg-amber-50">
//             <AlertCircle className="h-4 w-4 text-amber-600" />
//             <AlertDescription className="text-amber-800">
//               {totalConfigured} of {totalRequired} available meals configured. 
//               Please complete the remaining configurations.
//             </AlertDescription>
//           </Alert>
//         )}
//       </div>

//       {/* Cost Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg border">
//           <div className="flex items-center space-x-2">
//             <Users className="w-5 h-5 text-blue-600" />
//             <span className="text-sm font-medium">Guests</span>
//           </div>
//           <div className="text-2xl font-bold text-blue-600">{guestCount}</div>
//         </div>

//         {['breakfast', 'lunch', 'snacks', 'dinner'].map(mealKey => {
//           if (!selectedMeals[mealKey]) return null;
          
//           return (
//             <div key={mealKey} className="bg-white p-4 rounded-lg border">
//               <div className="flex items-center space-x-2">
//                 <DollarSign className="w-5 h-5 text-green-600" />
//                 <span className="text-sm font-medium capitalize">{mealKey}</span>
//               </div>
//               <div className="text-2xl font-bold text-green-600">
//                 ₹{mealCosts[mealKey].toLocaleString()}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Day-wise Breakdown */}
//       {dateRange.length > 0 && (
//         <div className="mb-6">
//           <h5 className="font-semibold mb-3">Day-wise Configuration</h5>
//           {renderDayWiseBreakdown()}
//         </div>
//       )}

//       {/* Total Cost */}
//       <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <DollarSign className="w-6 h-6 text-amber-600" />
//             <span className="text-lg font-semibold">Total Food Cost</span>
//           </div>
//           <div className="text-2xl font-bold text-amber-600">
//             ₹{totalCost.toLocaleString()}
//           </div>
//         </div>
//         <div className="text-sm text-gray-600 mt-1">
//           Based on {guestCount} guests for {dateRange.length} day{dateRange.length > 1 ? 's' : ''} (excluding unavailable meals)
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodSummary;




























import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Calendar, Users, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FoodSummaryProps {
  selectedMeals: Record<string, boolean>;
  dayMealConfigs: Record<string, Record<string, any>>;
  dateRange: Date[];
  totalCost: number;
  mealCosts: { breakfast: number; lunch: number; snacks: number; dinner: number };
  guestCount: number;
  foodCategories: any[];
  packagesByCategory: Record<number, any[]>;
}

const FoodSummary: React.FC<FoodSummaryProps> = ({
  selectedMeals,
  dayMealConfigs,
  dateRange,
  totalCost,
  mealCosts,
  guestCount,
  foodCategories,
  packagesByCategory
}) => {
  
  // NEW: Function to get available meals for a specific date
  const getAvailableMealsForDate = (date: Date): string[] => {
    if (!dateRange || dateRange.length === 0) return [];
    
    const checkIn = dateRange[0];
    const checkOut = dateRange[dateRange.length - 1];
    
    if (isSameDay(date, checkIn)) {
      // First day - exclude breakfast (check-in at 12 PM)
      return ["lunch", "snacks", "dinner"];
    }
    if (isSameDay(date, checkOut)) {
      // Last day - only breakfast (check-out at 11 AM)
      return ["breakfast"];
    }
    // Middle days - all meals available
    return ["breakfast", "lunch", "snacks", "dinner"];
  };

  // UPDATED: Calculate configuration completeness with date restrictions
  const getConfigurationStatus = () => {
    const selectedMealKeys = Object.entries(selectedMeals)
      .filter(([_, selected]) => selected)
      .map(([mealKey]) => mealKey)
      .sort((a, b) => {
        const aCat = foodCategories.find(cat => cat.key_name === a);
        const bCat = foodCategories.find(cat => cat.key_name === b);
        return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
      });

    let totalConfigured = 0;
    let totalRequired = 0;

    dateRange.forEach(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayConfig = dayMealConfigs[dateKey];
      const availableMeals = getAvailableMealsForDate(date); // NEW: Get available meals for this date

      selectedMealKeys.forEach(mealKey => {
        // NEW: Only count meals that are available for this date
        if (availableMeals.includes(mealKey)) {
          totalRequired++;
          if (dayConfig?.[mealKey]?.package_id) {
            totalConfigured++;
          }
        }
      });
    });

    return { totalConfigured, totalRequired };
  };

  const { totalConfigured, totalRequired } = getConfigurationStatus();
  const isFullyConfigured = totalConfigured === totalRequired;

  // Get package details for display
  const getPackageDetails = (categoryId: number, packageId: number) => {
    const packages = packagesByCategory[categoryId] || [];
    return packages.find(pkg => pkg.id === packageId);
  };

  const getCategoryById = (categoryId: number) => {
    return foodCategories.find(cat => cat.id === categoryId);
  };

  // UPDATED: Render day-wise breakdown with availability restrictions
  const renderDayWiseBreakdown = () => {
    return dateRange.map(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayConfig = dayMealConfigs[dateKey];
      const availableMeals = getAvailableMealsForDate(date); // NEW: Get available meals for this date
      
      const selectedMealKeys = Object.entries(selectedMeals)
        .filter(([mealKey, selected]) => selected && availableMeals.includes(mealKey)) // NEW: Filter by availability
        .map(([mealKey]) => mealKey)
        .sort((a, b) => {
          const aCat = foodCategories.find(cat => cat.key_name === a);
          const bCat = foodCategories.find(cat => cat.key_name === b);
          return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
        });

      // NEW: Show unavailable meals with different styling
      const unavailableMeals = Object.entries(selectedMeals)
        .filter(([mealKey, selected]) => selected && !availableMeals.includes(mealKey))
        .map(([mealKey]) => mealKey);

      return (
        <div key={dateKey} className="border rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 mx-2 sm:mx-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
              <h6 className="font-semibold text-sm sm:text-base">{format(date, 'EEEE, MMMM d, yyyy')}</h6>
            </div>
            <div className="flex space-x-2">
              {/* NEW: Show day type indicator */}
              {isSameDay(date, dateRange[0]) && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded whitespace-nowrap">Check-in</span>
              )}
              {isSameDay(date, dateRange[dateRange.length - 1]) && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded whitespace-nowrap">Check-out</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {/* Available meals */}
            {selectedMealKeys.map(mealKey => {
              const mealConfig = dayConfig?.[mealKey];
              const category = foodCategories.find(cat => cat.key_name === mealKey);
              const packageDetails = mealConfig?.package_id 
                ? getPackageDetails(category?.id, mealConfig.package_id)
                : null;

              return (
                <div key={mealKey} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                    packageDetails ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium capitalize text-sm sm:text-base truncate">{mealKey}</div>
                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {packageDetails 
                        ? `${packageDetails.name} - ₹${packageDetails.price.toLocaleString()}/person`
                        : 'Food Package Not Selected'
                      }
                    </div>
                  </div>
                  {packageDetails && (
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                  )}
                </div>
              );
            })}

            {/* NEW: Show unavailable meals with different styling */}
            {unavailableMeals.map(mealKey => (
              <div key={`unavailable-${mealKey}`} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-100 rounded-lg opacity-60">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium capitalize text-gray-500 text-sm sm:text-base truncate">{mealKey}</div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {isSameDay(date, dateRange[0]) && mealKey === 'breakfast' 
                      ? 'Not available (Check-in at 12 PM)'
                      : isSameDay(date, dateRange[dateRange.length - 1]) && mealKey !== 'breakfast'
                      ? 'Not available (Check-out at 11 AM)'
                      : 'Not available'
                    }
                  </div>
                </div>
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* NEW: Show timing info for special days */}
          {(isSameDay(date, dateRange[0]) || isSameDay(date, dateRange[dateRange.length - 1])) && (
            <div className="mt-2 sm:mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 leading-relaxed">
              {isSameDay(date, dateRange[0]) && (
                <>📍 Check-in day: No breakfast available (Check-in at 12:00 PM)</>
              )}
              {isSameDay(date, dateRange[dateRange.length - 1]) && (
                <>📍 Check-out day: Only breakfast available (Check-out at 11:00 AM)</>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="food-summary px-2 sm:px-0">
      <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Food Service Summary</h4>

      {/* Configuration Status */}
      <div className="mb-4 sm:mb-6">
        {isFullyConfigured ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-xs sm:text-sm">
              Select available meals to configure! Review your selections.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-xs sm:text-sm leading-relaxed">
              {totalConfigured} of {totalRequired} available meals configured. 
              Please complete the remaining configurations.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg border col-span-2 sm:col-span-1">
          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">Guests</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{guestCount}</div>
        </div>

        {['breakfast', 'lunch', 'snacks', 'dinner'].map(mealKey => {
          if (!selectedMeals[mealKey]) return null;
          
          return (
            <div key={mealKey} className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium capitalize truncate">{mealKey}</span>
              </div>
              <div className="text-sm sm:text-2xl font-bold text-green-600">
                ₹{mealCosts[mealKey].toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day-wise Breakdown */}
      {dateRange.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h5 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base px-2 sm:px-0">Day-wise Configuration</h5>
          {renderDayWiseBreakdown()}
        </div>
      )}

      {/* Total Cost */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
            <span className="text-base sm:text-lg font-semibold">Total Food Cost</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-600">
            ₹{totalCost.toLocaleString()}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
          Based on {guestCount} guests for {dateRange.length} day{dateRange.length > 1 ? 's' : ''} (excluding unavailable meals)
        </div>
      </div>
    </div>
  );
};

export default FoodSummary;
