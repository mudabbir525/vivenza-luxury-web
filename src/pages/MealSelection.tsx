// import React from 'react';
// import { CheckCircle2, Clock } from "lucide-react";

// interface MealSelectionProps {
//   selectedMeals: {
//     breakfast: boolean;
//     lunch: boolean;
//     dinner: boolean;
//   };
//   onMealSelection: (meal: 'breakfast' | 'lunch' | 'dinner', selected: boolean) => void;
// }

// const MealSelection: React.FC<MealSelectionProps> = ({ selectedMeals, onMealSelection }) => {
//   const meals = [
//     {
//       id: 'breakfast',
//       name: 'Breakfast',
//       time: '8:30 AM',
//       description: 'Traditional South & North Indian options with complementary tea/coffee',
//       image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
//       color: 'orange'
//     },
//     {
//       id: 'lunch',
//       name: 'Lunch',
//       time: '1:00 PM',
//       description: 'Vegetarian & non-vegetarian options with complementary beverages',
//       image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
//       color: 'green'
//     },
//     {
//       id: 'dinner',
//       name: 'Dinner',
//       time: '8:00 PM',
//       description: 'Premium cuisine options with elegant dining experience',
//       image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
//       color: 'indigo'
//     }
//   ];

//   const colorVariants = {
//     orange: {
//       border: 'border-orange-400',
//       bg: 'bg-orange-50',
//       text: 'text-orange-600',
//       ring: 'ring-orange-200'
//     },
//     green: {
//       border: 'border-green-400',
//       bg: 'bg-green-50',
//       text: 'text-green-600',
//       ring: 'ring-green-200'
//     },
//     indigo: {
//       border: 'border-indigo-400',
//       bg: 'bg-indigo-50',
//       text: 'text-indigo-600',
//       ring: 'ring-indigo-200'
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//       {meals.map((meal) => {
//         const isSelected = selectedMeals[meal.id as keyof typeof selectedMeals];
//         const colors = colorVariants[meal.color as keyof typeof colorVariants];

//         return (
//           <div 
//             key={meal.id}
//             className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
//               ${isSelected ? `${colors.border} ${colors.bg} ring-2 ${colors.ring} shadow-lg` : 'border border-gray-100 hover:shadow-md'}`}
//             onClick={() => onMealSelection(meal.id as 'breakfast' | 'lunch' | 'dinner', !isSelected)}
//           >
//             {/* Image with overlay */}
//             <div className="relative h-40 overflow-hidden">
//               <img
//                 src={meal.image}
//                 alt={meal.name}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                 loading="lazy"
//               />
//               <div className={`absolute inset-0 bg-gradient-to-t ${
//                 isSelected 
//                   ? `from-${meal.color}-900/60 to-${meal.color}-900/20` 
//                   : 'from-black/50 to-black/20'
//               }`} />
//             </div>

//             {/* Content */}
//             <div className="p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className={`font-semibold text-lg ${isSelected ? colors.text : 'text-gray-800'}`}>
//                     {meal.name}
//                   </h3>
//                   <p className="flex items-center text-sm mt-1">
//                     <Clock className={`w-4 h-4 mr-1 ${isSelected ? colors.text : 'text-gray-500'}`} />
//                     <span className={isSelected ? colors.text : 'text-gray-600'}>Served at {meal.time}</span>
//                   </p>
//                 </div>
//                 {isSelected && (
//                   <CheckCircle2 className={`w-6 h-6 ${colors.text} animate-pop`} />
//                 )}
//               </div>
              
//               <p className={`text-sm mt-2 ${isSelected ? colors.text : 'text-gray-600'}`}>
//                 {meal.description}
//               </p>
              
//               <div className={`mt-3 text-xs font-medium ${isSelected ? colors.text : 'text-gray-500'}`}>
//                 {isSelected ? 'Selected' : 'Click to select'}
//               </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {foodCategories.map(category => {
        const isSelected = selectedMeals[category.key_name] || false;
        const colors = getColorClasses(category.color);
        
        return (
          <div
            key={category.id}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
              isSelected 
                ? `${colors.border} ${colors.bg} ${colors.ring} ring-2` 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => onMealSelection(category.key_name, !isSelected)}
          >
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                isSelected ? colors.bg : 'bg-gray-100'
              }`}>
                <Clock className={`w-6 h-6 ${isSelected ? colors.text : 'text-gray-500'}`} />
              </div>
              
              <h5 className={`font-semibold text-lg mb-1 ${
                isSelected ? colors.text : 'text-gray-800'
              }`}>
                {category.name}
              </h5>
              
              <p className="text-sm text-gray-600 mb-2">
                Served at {category.display_time}
              </p>
              
              <p className="text-xs text-gray-500 mb-3">
                {category.description}
              </p>
              
              {isSelected && (
                <div className="flex items-center justify-center">
                  <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
                  <span className={`ml-1 text-sm font-medium ${colors.text}`}>
                    Selected
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MealSelection;
