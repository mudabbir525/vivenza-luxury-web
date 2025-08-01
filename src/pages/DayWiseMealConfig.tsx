// import React from 'react';
// import { format } from "date-fns";
// import { Calendar } from "lucide-react";

// // Import sub-components
// import SingleDayMealConfig from './SingleDayMealConfig';

// interface DayWiseMealConfigProps {
//     dateRange: Date[];
//     selectedMeals: {
//         breakfast: boolean;
//         lunch: boolean;
//         dinner: boolean;
//     };
//     getDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => any;
//     updateDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => void;
//     guestCount: number;
// }

// const DayWiseMealConfig: React.FC<DayWiseMealConfigProps> = ({
//     dateRange,
//     selectedMeals,
//     getDayMealConfig,
//     updateDayMealConfig,
//     guestCount
// }) => {
//     return (
//         <div className="space-y-8">
//             {dateRange.map((date, index) => (
//                 <div 
//                     key={date.toString()} 
//                     className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm"
//                 >
//                     {/* Date Header */}
//                     <div className="flex items-center mb-6 pb-4 border-b border-gray-300">
//                         <Calendar className="h-5 w-5 text-blue-600 mr-3" />
//                         <h4 className="text-xl font-semibold text-gray-800">
//                             {format(date, "EEEE, MMMM d, yyyy")}
//                         </h4>
//                         <span className="ml-auto text-sm text-gray-500">
//                             Day {index + 1}
//                         </span>
//                     </div>

//                     {/* Single Day Meal Configuration */}
//                     <SingleDayMealConfig
//                         date={date}
//                         selectedMeals={selectedMeals}
//                         getDayMealConfig={getDayMealConfig}
//                         updateDayMealConfig={updateDayMealConfig}
//                         guestCount={guestCount}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default DayWiseMealConfig;


import React from 'react';
import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import SingleDayMealConfig from './SingleDayMealConfig';

interface DayWiseMealConfigProps {
  dateRange: Date[];
  selectedMeals: Record<string, boolean>;
  getDayMealConfig: (date: Date, meal: string) => any;
  updateDayMealConfig: (date: Date, meal: string, config: any) => void;
  guestCount: number;
  categories: any[];
  packagesByCategory: Record<number, any[]>;
  itemsByPackage: Record<number, any[]>;
  cuisineTypes: any[];
  foodCategoriesForDate: (date: Date) => string[];
}

const DayWiseMealConfig: React.FC<DayWiseMealConfigProps> = ({
  dateRange,
  selectedMeals,
  getDayMealConfig,
  updateDayMealConfig,
  guestCount,
  categories,
  packagesByCategory,
  itemsByPackage,
  cuisineTypes,
  foodCategoriesForDate
}) => {
  // Filter active meals
  const activeMealKeys = Object.entries(selectedMeals)
    .filter(([_, selected]) => selected)
    .map(([mealKey]) => mealKey);

  if (activeMealKeys.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Please select meals above to configure them for each day.</p>
      </div>
    );
  }

  return (
    <div className="day-wise-meal-config space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h4 className="text-lg font-semibold">Configure Meals for Each Day</h4>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{guestCount} guests</span>
        </div>
      </div>

      {dateRange.map((date, dayIndex) => {
        // Get available meal categories for this specific date
        const availableMealsForDate = foodCategoriesForDate(date);
        
        // Filter selected meals that are available on this date
        const configurableMeals = activeMealKeys.filter(mealKey => 
          availableMealsForDate.includes(mealKey)
        );

        if (configurableMeals.length === 0) {
          return (
            <div key={format(date, 'yyyy-MM-dd')} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <h5 className="font-semibold text-gray-600">
                  {format(date, "EEEE, MMMM d, yyyy")} (Day {dayIndex + 1})
                </h5>
              </div>
              <p className="text-sm text-gray-500">
                No meals are available for configuration on this date based on your booking duration.
              </p>
            </div>
          );
        }

        return (
          <div key={format(date, 'yyyy-MM-dd')} className="border border-gray-200 rounded-lg shadow-sm">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h5 className="font-semibold text-gray-800">
                    {format(date, "EEEE, MMMM d, yyyy")}
                  </h5>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Day {dayIndex + 1}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {configurableMeals.length} meal{configurableMeals.length > 1 ? 's' : ''} available
                </div>
              </div>
            </div>

            <div className="p-4">
              <SingleDayMealConfig
                date={date}
                selectedMeals={selectedMeals}
                getDayMealConfig={getDayMealConfig}
                updateDayMealConfig={updateDayMealConfig}
                guestCount={guestCount}
                foodCategories={categories}
                packagesByCategory={packagesByCategory}
                itemsByPackage={itemsByPackage}
                cuisineTypes={cuisineTypes}
                foodCategoriesForDate={foodCategoriesForDate}
              />
            </div>
          </div>
        );
      })}

      {/* Configuration Progress Summary */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h6 className="font-medium text-blue-800 mb-2">Configuration Progress</h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeMealKeys.map(mealKey => {
            const totalDaysWithMeal = dateRange.filter(date => 
              foodCategoriesForDate(date).includes(mealKey)
            ).length;
            
            const configuredDays = dateRange.filter(date => {
              const config = getDayMealConfig(date, mealKey);
              const isAvailable = foodCategoriesForDate(date).includes(mealKey);
              return isAvailable && config.package_id;
            }).length;

            const progressPercentage = totalDaysWithMeal > 0 
              ? Math.round((configuredDays / totalDaysWithMeal) * 100) 
              : 0;

            return (
              <div key={mealKey} className="text-center">
                <div className="capitalize font-medium text-gray-700 mb-1">
                  {mealKey}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {configuredDays} / {totalDaysWithMeal} days
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {progressPercentage}% complete
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayWiseMealConfig;
