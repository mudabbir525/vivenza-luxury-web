// import React, { useState, useEffect, useMemo } from 'react';
// import { format } from "date-fns";
// import MealSelection from './MealSelection';
// import SingleDayMealConfig from './SingleDayMealConfig';
// import FoodSummary from './FoodSummary';

// const FoodService = ({ guestCount, dateRange, onFoodCostUpdate }) => {
//   const [foodCategories, setFoodCategories] = useState<any[]>([]);
//   const [packagesByCategory, setPackagesByCategory] = useState<Record<number, any[]>>({});
//   const [itemsByPackage, setItemsByPackage] = useState<Record<number, any[]>>({});
//   const [cuisineTypes, setCuisineTypes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({});
//   const [dayMealConfigs, setDayMealConfigs] = useState<Record<string, Record<string, any>>>({});

//   useEffect(() => {
//     const fetchFoodCategories = async () => {
//       setLoading(true);
//       const res = await fetch('https://admin.webhostdevs.com/api/food-categories/index.php');
//       const data = await res.json();
//       if (data.status === 'success') {
//         setFoodCategories(data.data.filter((cat: any) => cat.is_active === 1));
//       }
//       setLoading(false);
//     };
//     fetchFoodCategories();
//   }, []);

//   useEffect(() => {
//     const fetchCuisineTypes = async () => {
//       const res = await fetch('https://admin.webhostdevs.com/api/food-cuisine-types/index.php');
//       const data = await res.json();
//       if (data.status === 'success') {
//         setCuisineTypes(data.data.filter((c: any) => c.is_active === 1));
//       }
//     };
//     fetchCuisineTypes();
//   }, []);

//   const fetchPackagesForCategory = async (categoryId: number) => {
//     if (packagesByCategory[categoryId]) return;
//     const res = await fetch(`https://admin.webhostdevs.com/api/food-packages/index.php?category_id=${categoryId}`);
//     const data = await res.json();
//     if (data.status === 'success') {
//       setPackagesByCategory(prev => ({ ...prev, [categoryId]: data.data }));
//     }
//   };

//   const fetchItemsForPackage = async (packageId: number) => {
//     if (itemsByPackage[packageId]) return;
//     const res = await fetch(`https://admin.webhostdevs.com/api/food-items/index.php?package_id=${packageId}`);
//     const data = await res.json();
//     if (data.status === 'success') {
//       setItemsByPackage(prev => ({ ...prev, [packageId]: data.data }));
//     }
//   };

//   const handleMealSelection = async (mealKey: string, selected: boolean) => {
//     setSelectedMeals(prev => ({ ...prev, [mealKey]: selected }));
//     if (selected) {
//       const category = foodCategories.find(cat => cat.key_name === mealKey);
//       if (category) await fetchPackagesForCategory(category.id);
//     }
//   };

//   const updateDayMealConfig = async (date: Date, mealKey: string, config: any) => {
//     if (config.package_id) await fetchItemsForPackage(config.package_id);
//     const dateKey = format(date, 'yyyy-MM-dd');
//     setDayMealConfigs(prev => ({
//       ...prev,
//       [dateKey]: { ...prev[dateKey], [mealKey]: config }
//     }));
//   };

//   const getDayMealConfig = (date: Date, mealKey: string) => {
//     const dateKey = format(date, 'yyyy-MM-dd');
//     return dayMealConfigs[dateKey]?.[mealKey] || {};
//   };

//   // Function to get available food categories for a date based on 24-hour timing rules
//   const getAvailableFoodCategoriesForDate = (date: Date, dateRange: Date[]) => {
//     if (!dateRange || dateRange.length === 0) return [];
    
//     const checkIn = dateRange[0];
//     const checkOut = dateRange[dateRange.length - 1];

//     if (isSameDay(date, checkIn)) {
//       // First day - exclude breakfast (check-in at 12 PM)
//       return ["lunch", "snacks", "dinner"];
//     }
//     if (isSameDay(date, checkOut)) {
//       // Last day - only breakfast (check-out at 11:59 AM)
//       return ["breakfast"];
//     }
//     // Middle days - all meals available
//     return ["breakfast", "lunch", "snacks", "dinner"];
//   };

//   // Helper function to check if two dates are the same day
//   const isSameDay = (date1: Date, date2: Date): boolean => {
//     return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
//   };

//   const calculateTotalCosts = useMemo(() => {
//     let total = 0;
//     const mealCosts = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
//     const selectedDates = { breakfast: [], lunch: [], snacks: [], dinner: [] };

//     dateRange.forEach(date => {
//       const dateKey = format(date, 'yyyy-MM-dd');
//       const configs = dayMealConfigs[dateKey];
//       if (!configs) return;

//       Object.entries(selectedMeals).forEach(([mealKey, isSelected]) => {
//         if (!isSelected || !configs[mealKey]) return;
//         const config = configs[mealKey];
//         if (!config.package_id) return;

//         const category = foodCategories.find(c => c.key_name === mealKey);
//         if (!category) return;

//         const packages = packagesByCategory[category.id] || [];
//         const pkg = packages.find(p => p.id === config.package_id);
//         if (pkg) {
//           const cost = pkg.price * guestCount;
//           mealCosts[mealKey] += cost;
//           total += cost;
//           selectedDates[mealKey].push(date);
//         }
//       });
//     });

//     return { total, mealCosts, selectedDates };
//   }, [dayMealConfigs, selectedMeals, guestCount, dateRange, foodCategories, packagesByCategory]);

//   const foodData = useMemo(() => ({ foodCategories, packagesByCategory }), [foodCategories, packagesByCategory]);

//   useEffect(() => {
//     const { total, mealCosts, selectedDates } = calculateTotalCosts;
//     onFoodCostUpdate(total, mealCosts, selectedDates, dayMealConfigs, foodData);
//   }, [calculateTotalCosts, onFoodCostUpdate, dayMealConfigs, foodData]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="food-service bg-white rounded-lg shadow-lg p-6">
//       <h3 className="text-2xl font-semibold mb-6">Food Service Configuration</h3>

//       <MealSelection
//         foodCategories={foodCategories}
//         selectedMeals={selectedMeals}
//         onMealSelection={handleMealSelection}
//       />

//       {Object.values(selectedMeals).some(Boolean) && (
//         <div className="mb-8">
//           {dateRange.map(date => (
//             <SingleDayMealConfig
//               key={format(date, 'yyyy-MM-dd')}
//               date={date}
//               selectedMeals={selectedMeals}
//               getDayMealConfig={getDayMealConfig}
//               updateDayMealConfig={updateDayMealConfig}
//               guestCount={guestCount}
//               foodCategories={foodCategories}
//               packagesByCategory={packagesByCategory}
//               itemsByPackage={itemsByPackage}
//               cuisineTypes={cuisineTypes}
//               dateRange={dateRange}
//             />
//           ))}
//         </div>
//       )}

//       <FoodSummary
//         selectedMeals={selectedMeals}
//         dayMealConfigs={dayMealConfigs}
//         dateRange={dateRange}
//         totalCost={calculateTotalCosts.total}
//         mealCosts={calculateTotalCosts.mealCosts}
//         guestCount={guestCount}
//         foodCategories={foodCategories}
//         packagesByCategory={packagesByCategory}
//       />
//     </div>
//   );
// };

// export default FoodService;











import React, { useState, useEffect, useMemo } from 'react';
import { format } from "date-fns";
import MealSelection from './MealSelection';
import SingleDayMealConfig from './SingleDayMealConfig';
import FoodSummary from './FoodSummary';

const FoodService = ({ guestCount, dateRange, onFoodCostUpdate }) => {
  const [foodCategories, setFoodCategories] = useState<any[]>([]);
  const [packagesByCategory, setPackagesByCategory] = useState<Record<number, any[]>>({});
  const [itemsByPackage, setItemsByPackage] = useState<Record<number, any[]>>({});
  const [cuisineTypes, setCuisineTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({});
  const [dayMealConfigs, setDayMealConfigs] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    const fetchFoodCategories = async () => {
      setLoading(true);
      const res = await fetch('https://admin.webhostdevs.com/api/food-categories/index.php');
      const data = await res.json();
      if (data.status === 'success') {
        setFoodCategories(data.data.filter((cat: any) => cat.is_active === 1));
      }
      setLoading(false);
    };
    fetchFoodCategories();
  }, []);

  useEffect(() => {
    const fetchCuisineTypes = async () => {
      const res = await fetch('https://admin.webhostdevs.com/api/food-cuisine-types/index.php');
      const data = await res.json();
      if (data.status === 'success') {
        setCuisineTypes(data.data.filter((c: any) => c.is_active === 1));
      }
    };
    fetchCuisineTypes();
  }, []);

  const fetchPackagesForCategory = async (categoryId: number) => {
    if (packagesByCategory[categoryId]) return;
    const res = await fetch(`https://admin.webhostdevs.com/api/food-packages/index.php?category_id=${categoryId}`);
    const data = await res.json();
    if (data.status === 'success') {
      setPackagesByCategory(prev => ({ ...prev, [categoryId]: data.data }));
    }
  };

  const fetchItemsForPackage = async (packageId: number) => {
    if (itemsByPackage[packageId]) return;
    const res = await fetch(`https://admin.webhostdevs.com/api/food-items/index.php?package_id=${packageId}`);
    const data = await res.json();
    if (data.status === 'success') {
      setItemsByPackage(prev => ({ ...prev, [packageId]: data.data }));
    }
  };

  const handleMealSelection = async (mealKey: string, selected: boolean) => {
    setSelectedMeals(prev => ({ ...prev, [mealKey]: selected }));
    if (selected) {
      const category = foodCategories.find(cat => cat.key_name === mealKey);
      if (category) await fetchPackagesForCategory(category.id);
    }
  };

  const updateDayMealConfig = async (date: Date, mealKey: string, config: any) => {
    if (config.package_id) await fetchItemsForPackage(config.package_id);
    const dateKey = format(date, 'yyyy-MM-dd');
    setDayMealConfigs(prev => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], [mealKey]: config }
    }));
  };

  const getDayMealConfig = (date: Date, mealKey: string) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return dayMealConfigs[dateKey]?.[mealKey] || {};
  };

  // Function to get available food categories for a date based on 24-hour timing rules
  const getAvailableFoodCategoriesForDate = (date: Date, dateRange: Date[]) => {
    if (!dateRange || dateRange.length === 0) return [];
    
    const checkIn = dateRange[0];
    const checkOut = dateRange[dateRange.length - 1];

    if (isSameDay(date, checkIn)) {
      // First day - exclude breakfast (check-in at 12 PM)
      return ["lunch", "snacks", "dinner"];
    }
    if (isSameDay(date, checkOut)) {
      // Last day - only breakfast (check-out at 11:59 AM)
      return ["breakfast"];
    }
    // Middle days - all meals available
    return ["breakfast", "lunch", "snacks", "dinner"];
  };

  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return format(date1, 'yyyy-MM-dd') === format(date2, 'yyyy-MM-dd');
  };

  const calculateTotalCosts = useMemo(() => {
    let total = 0;
    const mealCosts = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
    const selectedDates = { breakfast: [], lunch: [], snacks: [], dinner: [] };

    dateRange.forEach(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const configs = dayMealConfigs[dateKey];
      if (!configs) return;

      Object.entries(selectedMeals).forEach(([mealKey, isSelected]) => {
        if (!isSelected || !configs[mealKey]) return;
        const config = configs[mealKey];
        if (!config.package_id) return;

        const category = foodCategories.find(c => c.key_name === mealKey);
        if (!category) return;

        const packages = packagesByCategory[category.id] || [];
        const pkg = packages.find(p => p.id === config.package_id);
        if (pkg) {
          const cost = pkg.price * guestCount;
          mealCosts[mealKey] += cost;
          total += cost;
          selectedDates[mealKey].push(date);
        }
      });
    });

    return { total, mealCosts, selectedDates };
  }, [dayMealConfigs, selectedMeals, guestCount, dateRange, foodCategories, packagesByCategory]);

  const foodData = useMemo(() => ({ foodCategories, packagesByCategory }), [foodCategories, packagesByCategory]);

  useEffect(() => {
    const { total, mealCosts, selectedDates } = calculateTotalCosts;
    onFoodCostUpdate(total, mealCosts, selectedDates, dayMealConfigs, foodData);
  }, [calculateTotalCosts, onFoodCostUpdate, dayMealConfigs, foodData]);

  if (loading) {
    return (
      <div className="food-service bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-amber-500"></div>
          <span className="ml-3 text-sm sm:text-base text-gray-600">Loading food options...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="food-service bg-white rounded-lg shadow-lg p-4 sm:p-5 lg:p-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Food Service Configuration</h3>
        <p className="text-sm sm:text-base text-gray-600">
          Select your preferred meals and configure each day's menu
        </p>
      </div>

      {/* Meal Selection Section */}
      <div className="mb-6 sm:mb-8">
        <MealSelection
          foodCategories={foodCategories}
          selectedMeals={selectedMeals}
          onMealSelection={handleMealSelection}
        />
      </div>

      {/* Day-wise Configuration Section */}
      {Object.values(selectedMeals).some(Boolean) && (
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Day-wise Meal Configuration</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Configure your selected meals for each day of your stay. 
              <span className="hidden sm:inline"> Available meals vary based on check-in/check-out times.</span>
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {dateRange.map(date => (
              <SingleDayMealConfig
                key={format(date, 'yyyy-MM-dd')}
                date={date}
                selectedMeals={selectedMeals}
                getDayMealConfig={getDayMealConfig}
                updateDayMealConfig={updateDayMealConfig}
                guestCount={guestCount}
                foodCategories={foodCategories}
                packagesByCategory={packagesByCategory}
                itemsByPackage={itemsByPackage}
                cuisineTypes={cuisineTypes}
                dateRange={dateRange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Food Summary Section */}
      {Object.values(selectedMeals).some(Boolean) && (
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
          <FoodSummary
            selectedMeals={selectedMeals}
            dayMealConfigs={dayMealConfigs}
            dateRange={dateRange}
            totalCost={calculateTotalCosts.total}
            mealCosts={calculateTotalCosts.mealCosts}
            guestCount={guestCount}
            foodCategories={foodCategories}
            packagesByCategory={packagesByCategory}
          />
        </div>
      )}

      {/* Empty State - When no meals selected */}
      {!Object.values(selectedMeals).some(Boolean) && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Meals Selected</h4>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            Select your preferred meals above to start configuring your food services for each day of your stay.
          </p>
        </div>
      )}

      {/* Helper Text for Mobile */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg sm:hidden">
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-xs text-blue-800 font-medium mb-1">Food Service Timing</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              • Check-in day: Lunch, Snacks, Dinner available<br/>
              • Check-out day: Only Breakfast available<br/>
              • Middle days: All meals available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodService;
