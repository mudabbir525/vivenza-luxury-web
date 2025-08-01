// import React from 'react';
// import { Calendar, Users, DollarSign, CheckCircle } from 'lucide-react';

// const FoodSummary = ({ selectedMeals, dayWiseMealConfig, dateRange, totalCost, mealCosts }) => {
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const formatDateKey = (date) => {
//     return date.toISOString().split('T')[0]; // yyyy-mm-dd format
//   };

//   const getMealConfigStatus = (date, mealType) => {
//     const dateKey = formatDateKey(date);
//     const dayConfig = dayWiseMealConfig[dateKey];
    
//     if (!selectedMeals[mealType]) {
//       return { configured: false, status: 'Not selected' };
//     }
    
//     if (!dayConfig || !dayConfig[mealType]) {
//       return { configured: false, status: 'Not configured' };
//     }

//     const mealConfig = dayConfig[mealType];
    
//     if (mealType === 'breakfast') {
//       return {
//         configured: !!mealConfig.package,
//         status: mealConfig.package ? `Package: ${mealConfig.package}` : 'Package not selected'
//       };
//     } else {
//       return {
//         configured: !!(mealConfig.type && mealConfig.package),
//         status: mealConfig.type && mealConfig.package 
//           ? `${mealConfig.type} - ${mealConfig.package}` 
//           : 'Type/Package not selected'
//       };
//     }
//   };

//   const renderDayWiseBreakdown = () => {
//     return dateRange.map((date, index) => {
//       const breakfastStatus = getMealConfigStatus(date, 'breakfast');
//       const lunchStatus = getMealConfigStatus(date, 'lunch');
//       const dinnerStatus = getMealConfigStatus(date, 'dinner');

//       return (
//         <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-blue-500" />
//               Day {index + 1} - {formatDate(date)}
//             </h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Breakfast */}
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium text-orange-800">Breakfast</h4>
//                 {breakfastStatus.configured && (
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                 )}
//               </div>
//               <p className="text-sm text-gray-600">
//                 {breakfastStatus.status}
//               </p>
//             </div>

//             {/* Lunch */}
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium text-blue-800">Lunch</h4>
//                 {lunchStatus.configured && (
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                 )}
//               </div>
//               <p className="text-sm text-gray-600">
//                 {lunchStatus.status}
//               </p>
//             </div>

//             {/* Dinner */}
//             <div className="bg-purple-50 p-3 rounded-lg">
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium text-purple-800">Dinner</h4>
//                 {dinnerStatus.configured && (
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                 )}
//               </div>
//               <p className="text-sm text-gray-600">
//                 {dinnerStatus.status}
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   const renderTotalSummary = () => {
//     const totalDays = dateRange.length;
//     const selectedMealCount = Object.values(selectedMeals).filter(Boolean).length;
//     const totalPossibleMeals = totalDays * selectedMealCount;
    
//     // Count configured meals
//     let configuredMeals = 0;
//     dateRange.forEach(date => {
//       if (selectedMeals.breakfast && getMealConfigStatus(date, 'breakfast').configured) configuredMeals++;
//       if (selectedMeals.lunch && getMealConfigStatus(date, 'lunch').configured) configuredMeals++;  
//       if (selectedMeals.dinner && getMealConfigStatus(date, 'dinner').configured) configuredMeals++;
//     });

//     return (
//       <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-bold mb-4 text-gray-800">Total Summary</h3>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <Calendar className="w-6 h-6 text-blue-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{totalDays}</div>
//             <div className="text-sm text-gray-600">Days</div>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <Users className="w-6 h-6 text-green-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-800">{selectedMealCount}</div>
//             <div className="text-sm text-gray-600">Meal Types</div>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <CheckCircle className="w-6 h-6 text-purple-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-800">
//               {configuredMeals}/{totalPossibleMeals}
//             </div>
//             <div className="text-sm text-gray-600">Configured</div>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center justify-center mb-2">
//               <DollarSign className="w-6 h-6 text-yellow-500" />
//             </div>
//             <div className="text-2xl font-bold text-green-600">₹{totalCost}</div>
//             <div className="text-sm text-gray-600">Total Cost</div>
//           </div>
//         </div>

//         {/* Meal-wise breakdown */}
//         <div className="border-t border-gray-200 pt-4">
//           <h4 className="text-lg font-semibold text-gray-800 mb-3">Cost Breakdown by Meal</h4>
//           <div className="grid grid-cols-3 gap-4">
//             {selectedMeals.breakfast && (
//               <div className="bg-orange-100 p-3 rounded-lg text-center">
//                 <div className="text-lg font-bold text-orange-800">₹{mealCosts.breakfast}</div>
//                 <div className="text-sm text-gray-600">Breakfast</div>
//               </div>
//             )}
//             {selectedMeals.lunch && (
//               <div className="bg-blue-100 p-3 rounded-lg text-center">
//                 <div className="text-lg font-bold text-blue-800">₹{mealCosts.lunch}</div>
//                 <div className="text-sm text-gray-600">Lunch</div>
//               </div>
//             )}
//             {selectedMeals.dinner && (
//               <div className="bg-purple-100 p-3 rounded-lg text-center">
//                 <div className="text-lg font-bold text-purple-800">₹{mealCosts.dinner}</div>
//                 <div className="text-sm text-gray-600">Dinner</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {configuredMeals < totalPossibleMeals && (
//           <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-800 text-sm">
//               ⚠️ {totalPossibleMeals - configuredMeals} meals are not yet configured. 
//               Complete all meal configurations for accurate cost calculation.
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">Food Service Summary</h2>
//         <span className="text-sm text-gray-500">
//           {dateRange.length} days
//         </span>
//       </div>

//       {renderTotalSummary()}

//       <div>
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">Day-wise Breakdown</h3>
//         {renderDayWiseBreakdown()}
//       </div>

//       {totalCost === 0 && (
//         <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
//           <p className="text-gray-600">
//             No meals configured yet. Start by selecting meals for each day to see the cost breakdown.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodSummary;


import React from 'react';
import { format } from 'date-fns';
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
  // Calculate configuration completeness
  const getConfigurationStatus = () => {
    const selectedMealKeys = Object.entries(selectedMeals)
      .filter(([_, selected]) => selected)
      .map(([mealKey]) => mealKey);

    let totalConfigured = 0;
    let totalRequired = 0;

    dateRange.forEach(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayConfig = dayMealConfigs[dateKey];

      selectedMealKeys.forEach(mealKey => {
        totalRequired++;
        if (dayConfig?.[mealKey]?.package_id) {
          totalConfigured++;
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

  const renderDayWiseBreakdown = () => {
    return dateRange.map(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayConfig = dayMealConfigs[dateKey];
      
      const selectedMealKeys = Object.entries(selectedMeals)
        .filter(([_, selected]) => selected)
        .map(([mealKey]) => mealKey);

      return (
        <div key={dateKey} className="border rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-600" />
            <h6 className="font-semibold">{format(date, 'EEEE, MMMM d, yyyy')}</h6>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedMealKeys.map(mealKey => {
              const mealConfig = dayConfig?.[mealKey];
              const category = foodCategories.find(cat => cat.key_name === mealKey);
              const packageDetails = mealConfig?.package_id 
                ? getPackageDetails(category?.id, mealConfig.package_id)
                : null;

              return (
                <div key={mealKey} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    packageDetails ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium capitalize">{mealKey}</div>
                    <div className="text-sm text-gray-600">
                      {packageDetails 
                        ? `${packageDetails.name} - ₹${packageDetails.price.toLocaleString()}/person`
                        : 'Not configured'
                      }
                    </div>
                  </div>
                  {packageDetails && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="food-summary">
      <h4 className="text-lg font-semibold mb-4">Food Service Summary</h4>

      {/* Configuration Status */}
      <div className="mb-6">
        {isFullyConfigured ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              All meals are configured! Review your selections below.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              {totalConfigured} of {totalRequired} meals configured. 
              Please complete the remaining configurations.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Guests</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{guestCount}</div>
        </div>

        {['breakfast', 'lunch', 'snacks', 'dinner'].map(mealKey => {
          if (!selectedMeals[mealKey]) return null;
          
          return (
            <div key={mealKey} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium capitalize">{mealKey}</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ₹{mealCosts[mealKey].toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day-wise Breakdown */}
      {dateRange.length > 0 && (
        <div className="mb-6">
          <h5 className="font-semibold mb-3">Day-wise Configuration</h5>
          {renderDayWiseBreakdown()}
        </div>
      )}

      {/* Total Cost */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-amber-600" />
            <span className="text-lg font-semibold">Total Food Cost</span>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            ₹{totalCost.toLocaleString()}
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Based on {guestCount} guests for {dateRange.length} day{dateRange.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default FoodSummary;
