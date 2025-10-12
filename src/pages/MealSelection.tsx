// import React from 'react';
// import { CheckCircle2, Clock } from "lucide-react";

// interface MealSelectionProps {
//   foodCategories: any[];
//   selectedMeals: Record<string, boolean>;
//   onMealSelection: (mealKey: string, selected: boolean) => void;
// }

// const MealSelection: React.FC<MealSelectionProps> = ({
//   foodCategories,
//   selectedMeals,
//   onMealSelection
// }) => {
//   const getColorClasses = (color: string) => {
//     const colorMap = {
//       orange: {
//         border: 'border-orange-400',
//         bg: 'bg-orange-50',
//         text: 'text-orange-600',
//         ring: 'ring-orange-200'
//       },
//       green: {
//         border: 'border-green-400',
//         bg: 'bg-green-50',
//         text: 'text-green-600',
//         ring: 'ring-green-200'
//       },
//       blue: {
//         border: 'border-blue-400',
//         bg: 'bg-blue-50',
//         text: 'text-blue-600',
//         ring: 'ring-blue-200'
//       },
//       red: {
//         border: 'border-red-400',
//         bg: 'bg-red-50',
//         text: 'text-red-600',
//         ring: 'ring-red-200'
//       },
//       purple: {
//         border: 'border-purple-400',
//         bg: 'bg-purple-50',
//         text: 'text-purple-600',
//         ring: 'ring-purple-200'
//       },
//       indigo: {
//         border: 'border-indigo-400',
//         bg: 'bg-indigo-50',
//         text: 'text-indigo-600',
//         ring: 'ring-indigo-200'
//       },
//       gray: {
//         border: 'border-gray-400',
//         bg: 'bg-gray-50',
//         text: 'text-gray-600',
//         ring: 'ring-gray-200'
//       }
//     };
//     return colorMap[color] || colorMap.gray;
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {foodCategories
//       .filter(category => category.is_active === 1) // Only active meals
//       .sort((a, b) => a.sort_order - b.sort_order)
//       .map(category => {
//         const isSelected = selectedMeals[category.key_name] || false;
//         const colors = getColorClasses(category.color);
        
//         return (
//           <div
//             key={category.id}
//             className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
//               isSelected 
//                 ? `${colors.border} ${colors.bg} ${colors.ring} ring-2` 
//                 : 'border-gray-200 bg-white hover:border-gray-300'
//             }`}
//             onClick={() => onMealSelection(category.key_name, !isSelected)}
//           >
//             <div className="text-center">
//               <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
//                 isSelected ? colors.bg : 'bg-gray-100'
//               }`}>
//                 <Clock className={`w-6 h-6 ${isSelected ? colors.text : 'text-gray-500'}`} />
//               </div>
              
//               <h5 className={`font-semibold text-lg mb-1 ${
//                 isSelected ? colors.text : 'text-gray-800'
//               }`}>
//                 {category.name}
//               </h5>
              
//               <p className="text-sm text-gray-600 mb-2">
//                 Served at {category.display_time}
//               </p>
              
//               <p className="text-xs text-gray-500 mb-3">
//                 {category.description}
//               </p>
              
//               {isSelected && (
//                 <div className="flex items-center justify-center">
//                   <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
//                   <span className={`ml-1 text-sm font-medium ${colors.text}`}>
//                     Selected
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MealSelection;











import React from 'react';
import { CheckCircle2, Clock } from "lucide-react";

interface MealSelectionProps {
  foodCategories: any[];
  selectedMeals: Record<string, boolean>;
  onMealSelection: (mealKey: string, selected: boolean) => void;
}

const MealSelection: React.FC<MealSelectionProps> = ({
  foodCategories,
  selectedMeals,
  onMealSelection
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: {
        border: 'border-orange-400',
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        ring: 'ring-orange-200'
      },
      green: {
        border: 'border-green-400',
        bg: 'bg-green-50',
        text: 'text-green-600',
        ring: 'ring-green-200'
      },
      blue: {
        border: 'border-blue-400',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        ring: 'ring-blue-200'
      },
      red: {
        border: 'border-red-400',
        bg: 'bg-red-50',
        text: 'text-red-600',
        ring: 'ring-red-200'
      },
      purple: {
        border: 'border-purple-400',
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        ring: 'ring-purple-200'
      },
      indigo: {
        border: 'border-indigo-400',
        bg: 'bg-indigo-50',
        text: 'text-indigo-600',
        ring: 'ring-indigo-200'
      },
      gray: {
        border: 'border-gray-400',
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        ring: 'ring-gray-200'
      }
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="px-2 sm:px-0">
      <div className="mb-3 sm:mb-4">
        <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Select Your Meals</h4>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Choose which meals you'd like to include in your food service. You can configure each meal for individual days later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {foodCategories
        .filter(category => category.is_active === 1) // Only active meals
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(category => {
          const isSelected = selectedMeals[category.key_name] || false;
          const colors = getColorClasses(category.color);
          
          return (
            <div
              key={category.id}
              className={`cursor-pointer rounded-lg border-2 p-3 sm:p-4 transition-all duration-200 hover:shadow-md touch-manipulation active:scale-95 ${
                isSelected 
                  ? `${colors.border} ${colors.bg} ${colors.ring} ring-1 sm:ring-2` 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => onMealSelection(category.key_name, !isSelected)}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-3 transition-colors ${
                  isSelected ? colors.bg : 'bg-gray-100'
                }`}>
                  <Clock className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isSelected ? colors.text : 'text-gray-500'}`} />
                </div>
                
                <h5 className={`font-semibold text-base sm:text-lg mb-1 transition-colors ${
                  isSelected ? colors.text : 'text-gray-800'
                }`}>
                  {category.name}
                </h5>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  Served at {category.display_time}
                </p>
                
                <p className="text-xs text-gray-500 mb-2 sm:mb-3 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
                
                {isSelected && (
                  <div className="flex items-center justify-center pt-1">
                    <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${colors.text}`} />
                    <span className={`ml-1 text-xs sm:text-sm font-medium transition-colors ${colors.text}`}>
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile helper text */}
      <div className="mt-4 sm:mt-6 sm:hidden">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs text-amber-800 font-medium mb-1">Tip</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Select the meals you want, then configure specific packages and items for each day of your stay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state when no categories available */}
      {(!foodCategories || foodCategories.filter(cat => cat.is_active === 1).length === 0) && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Meal Options Available</h4>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            Food service options are currently unavailable. Please contact us for more information about meal arrangements.
          </p>
        </div>
      )}
    </div>
  );
};

export default MealSelection;
