// import React, { useState, useEffect, useMemo } from 'react';
// import { format } from "date-fns";
// import { foodMenuData } from './foodData.js';

// // Import sub-components
// import MealSelection from './MealSelection';
// import DayWiseMealConfig from './DayWiseMealConfig';
// import FoodSummary from './FoodSummary';
// import ProgressIndicator from './ProgressIndicator';

// interface FoodServiceProps {
//     guestCount: number;
//     dateRange: Date[];
//     onFoodCostUpdate: (
//         total: number, 
//         mealCosts: { breakfast: number, lunch: number, dinner: number },
//         selectedDates: { breakfast: Date[], lunch: Date[], dinner: Date[] }
//     ) => void;
// }

// const FoodService: React.FC<FoodServiceProps> = ({ guestCount, dateRange, onFoodCostUpdate }) => {
//     // Main state for which meals are selected
//     const [selectedMeals, setSelectedMeals] = useState({
//         breakfast: false,
//         lunch: false,
//         dinner: false
//     });

//     // Day-wise meal configurations
//     const [dayWiseMealConfig, setDayWiseMealConfig] = useState<Record<string, any>>({});

//     // Calculate total costs
//     const calculateTotalCosts = useMemo(() => {
//         let totalCost = 0;
//         const mealCosts = { breakfast: 0, lunch: 0, dinner: 0 };
//         const selectedDates = { breakfast: [], lunch: [], dinner: [] };

//         dateRange.forEach(date => {
//             const dateKey = format(date, 'yyyy-MM-dd');
//             const dayConfig = dayWiseMealConfig[dateKey];

//             if (!dayConfig) return;

//             // Calculate breakfast cost for this day
//             if (selectedMeals.breakfast && dayConfig.breakfast?.package) {
//                 const packageData = foodMenuData.breakfast[dayConfig.breakfast.package];
//                 if (packageData) {
//                     const cost = packageData.price * guestCount;
//                     mealCosts.breakfast += cost;
//                     totalCost += cost;
//                     selectedDates.breakfast.push(date);
//                 }
//             }

//             // Calculate lunch cost for this day
//             if (selectedMeals.lunch && dayConfig.lunch?.type && dayConfig.lunch?.package) {
//                 const packageData = foodMenuData[dayConfig.lunch.type]?.[dayConfig.lunch.package];
//                 if (packageData) {
//                     const cost = packageData.price * guestCount;
//                     mealCosts.lunch += cost;
//                     totalCost += cost;
//                     selectedDates.lunch.push(date);
//                 }
//             }

//             // Calculate dinner cost for this day
//             if (selectedMeals.dinner && dayConfig.dinner?.type && dayConfig.dinner?.package) {
//                 const packageData = foodMenuData[dayConfig.dinner.type]?.[dayConfig.dinner.package];
//                 if (packageData) {
//                     const cost = packageData.price * guestCount;
//                     mealCosts.dinner += cost;
//                     totalCost += cost;
//                     selectedDates.dinner.push(date);
//                 }
//             }
//         });

//         return { totalCost, mealCosts, selectedDates };
//     }, [dayWiseMealConfig, selectedMeals, guestCount, dateRange]);

//     // Update parent component with costs
//     useEffect(() => {
//         const { totalCost, mealCosts, selectedDates } = calculateTotalCosts;
//         onFoodCostUpdate(totalCost, mealCosts, selectedDates);
//     }, [calculateTotalCosts, onFoodCostUpdate]);

//     // Handle meal selection change
//     const handleMealSelection = (meal: 'breakfast' | 'lunch' | 'dinner', selected: boolean) => {
//         setSelectedMeals(prev => ({
//             ...prev,
//             [meal]: selected
//         }));

//         // Clear configurations for unselected meals
//         if (!selected) {
//             setDayWiseMealConfig(prev => {
//                 const updated = { ...prev };
//                 Object.keys(updated).forEach(dateKey => {
//                     if (updated[dateKey]?.[meal]) {
//                         const newDayConfig = { ...updated[dateKey] };
//                         delete newDayConfig[meal];
//                         updated[dateKey] = newDayConfig;
//                     }
//                 });
//                 return updated;
//             });
//         }
//     };

//     // Update day-wise meal configuration
//     const updateDayMealConfig = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => {
//         const dateKey = format(date, 'yyyy-MM-dd');
//         setDayWiseMealConfig(prev => ({
//             ...prev,
//             [dateKey]: {
//                 ...prev[dateKey],
//                 [meal]: config
//             }
//         }));
//     };

//     // Get configuration for a specific day and meal
//     const getDayMealConfig = (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => {
//         const dateKey = format(date, 'yyyy-MM-dd');
//         return dayWiseMealConfig[dateKey]?.[meal] || {};
//     };

//     return (
//         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md">
//             <h3 className="font-serif text-3xl mb-8 text-gray-800 border-b pb-4">Food Service</h3>

//             {/* Step 1: Select Meals */}
//             <div className="mb-12">
//                 <ProgressIndicator step={1} title="Select Meals" />
//                 <MealSelection 
//                     selectedMeals={selectedMeals}
//                     onMealSelection={handleMealSelection}
//                 />
//             </div>

//             {/* Step 2: Configure Day-wise Meals */}
//             {(selectedMeals.breakfast || selectedMeals.lunch || selectedMeals.dinner) && (
//                 <div className="mb-12">
//                     <ProgressIndicator step={2} title="Configure Day-wise Meals" />
//                     <DayWiseMealConfig
//                         dateRange={dateRange}
//                         selectedMeals={selectedMeals}
//                         getDayMealConfig={getDayMealConfig}
//                         updateDayMealConfig={updateDayMealConfig}
//                         guestCount={guestCount}
//                     />
//                 </div>
//             )}

//             {/* Step 3: Summary */}
//             <div className="mt-10">
//                 <ProgressIndicator step={3} title="Food Selection Summary" />
//                 <FoodSummary
//                     selectedMeals={selectedMeals}
//                     dayWiseMealConfig={dayWiseMealConfig}
//                     dateRange={dateRange}
//                     totalCost={calculateTotalCosts.totalCost}
//                     mealCosts={calculateTotalCosts.mealCosts}
//                 />
//             </div>
//         </div>
//     );
// };

// export default FoodService;


// import React, { useState, useEffect, useMemo } from 'react';
// import { format } from "date-fns";

// // Import sub-components
// import MealSelection from './MealSelection';
// import DayWiseMealConfig from './DayWiseMealConfig';
// import FoodSummary from './FoodSummary';
// import ProgressIndicator from './ProgressIndicator';

// interface FoodServiceProps {
//   guestCount: number;
//   dateRange: Date[];
//   foodCategoriesForDate: (date: Date) => string[]; // function to get available categories per date
//   onFoodCostUpdate: (
//     total: number,
//     mealCosts: { breakfast: number, lunch: number, snacks: number, dinner: number },
//     selectedDates: { breakfast: Date[], lunch: Date[], snacks: Date[], dinner: Date[] }
//   ) => void;
// }

// const FoodService: React.FC<FoodServiceProps> = ({ 
//   guestCount, 
//   dateRange, 
//   foodCategoriesForDate, 
//   onFoodCostUpdate 
// }) => {
//   // Backend data state
//   const [foodCategories, setFoodCategories] = useState<any[]>([]);
//   const [foodPackages, setFoodPackages] = useState<Record<string, any[]>>({});
//   const [foodItems, setFoodItems] = useState<Record<string, any[]>>({});
//   const [loading, setLoading] = useState(false);

//   // Main state for which meals are selected
//   const [selectedMeals, setSelectedMeals] = useState({
//     breakfast: false,
//     lunch: false,
//     snacks: false,
//     dinner: false
//   });

//   // Day-wise meal configurations
//   const [dayWiseMealConfig, setDayWiseMealConfig] = useState<Record<string, any>>({});

//   // Current step in the food service process
//   const [currentStep, setCurrentStep] = useState(1);

//   // Fetch food categories from backend on mount
//   useEffect(() => {
//     const fetchFoodCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://webhostdevs.com/api/food_categories');
//         const data = await response.json();
//         if (data.status === 'success') {
//           setFoodCategories(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching food categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFoodCategories();
//   }, []);

//   // Fetch food packages when a meal category is selected
//   const fetchFoodPackages = async (categoryId: number) => {
//     try {
//       const response = await fetch(`https://webhostdevs.com/api/food_packages?category_id=${categoryId}`);
//       const data = await response.json();
//       if (data.status === 'success') {
//         return data.data;
//       }
//     } catch (error) {
//       console.error('Error fetching food packages:', error);
//     }
//     return [];
//   };

//   // Fetch food items when a package is selected
//   const fetchFoodItems = async (packageId: number) => {
//     try {
//       const response = await fetch(`https://webhostdevs.com/api/food_items?package_id=${packageId}`);
//       const data = await response.json();
//       if (data.status === 'success') {
//         return data.data;
//       }
//     } catch (error) {
//       console.error('Error fetching food items:', error);
//     }
//     return [];
//   };

//   // Calculate total costs based on configurations
//   const calculateTotalCosts = useMemo(() => {
//     let totalCost = 0;
//     const mealCosts = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
//     const selectedDates = { breakfast: [], lunch: [], snacks: [], dinner: [] };

//     dateRange.forEach(date => {
//       const dateKey = format(date, 'yyyy-MM-dd');
//       const dayConfig = dayWiseMealConfig[dateKey];
//       if (!dayConfig) return;

//       // Calculate costs for each meal type
//       ['breakfast', 'lunch', 'snacks', 'dinner'].forEach(mealType => {
//         if (selectedMeals[mealType] && dayConfig[mealType]?.package) {
//           const packageData = dayConfig[mealType].packageData;
//           if (packageData) {
//             const cost = packageData.price * guestCount;
//             mealCosts[mealType] += cost;
//             totalCost += cost;
//             selectedDates[mealType].push(date);
//           }
//         }
//       });
//     });

//     return { totalCost, mealCosts, selectedDates };
//   }, [dayWiseMealConfig, selectedMeals, guestCount, dateRange]);

//   // Update parent component with costs
//   useEffect(() => {
//     const { totalCost, mealCosts, selectedDates } = calculateTotalCosts;
//     onFoodCostUpdate(totalCost, mealCosts, selectedDates);
//   }, [calculateTotalCosts, onFoodCostUpdate]);

//   // Handle meal selection change
//   const handleMealSelection = async (meal: 'breakfast' | 'lunch' | 'snacks' | 'dinner', selected: boolean) => {
//     setSelectedMeals(prev => ({
//       ...prev,
//       [meal]: selected
//     }));

//     if (selected) {
//       // Fetch packages for this meal category when selected
//       const category = foodCategories.find(cat => cat.key_name === meal);
//       if (category && !foodPackages[meal]) {
//         const packages = await fetchFoodPackages(category.id);
//         setFoodPackages(prev => ({
//           ...prev,
//           [meal]: packages
//         }));
//       }
//     } else {
//       // Clear configurations for unselected meals
//       setDayWiseMealConfig(prev => {
//         const updated = { ...prev };
//         Object.keys(updated).forEach(dateKey => {
//           if (updated[dateKey]?.[meal]) {
//             const newDayConfig = { ...updated[dateKey] };
//             delete newDayConfig[meal];
//             updated[dateKey] = newDayConfig;
//           }
//         });
//         return updated;
//       });
//     }

//     // Update step progress
//     const selectedCount = Object.values({
//       ...selectedMeals,
//       [meal]: selected
//     }).filter(Boolean).length;
    
//     if (selectedCount > 0) {
//       setCurrentStep(2);
//     } else {
//       setCurrentStep(1);
//     }
//   };

//   // Update day-wise meal configuration
//   const updateDayMealConfig = async (date: Date, meal: 'breakfast' | 'lunch' | 'snacks' | 'dinner', config: any) => {
//     const dateKey = format(date, 'yyyy-MM-dd');
    
//     // If package changed, fetch items for it
//     if (config.packageId && config.packageId !== dayWiseMealConfig[dateKey]?.[meal]?.packageId) {
//       const items = await fetchFoodItems(config.packageId);
//       config.availableItems = items;
      
//       // Find package data
//       const packages = foodPackages[meal] || [];
//       const packageData = packages.find(pkg => pkg.id === config.packageId);
//       config.packageData = packageData;
//     }

//     setDayWiseMealConfig(prev => ({
//       ...prev,
//       [dateKey]: {
//         ...prev[dateKey],
//         [meal]: config
//       }
//     }));

//     // Update step to summary if all configurations are complete
//     setCurrentStep(3);
//   };

//   // Get configuration for a specific day and meal
//   const getDayMealConfig = (date: Date, meal: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
//     const dateKey = format(date, 'yyyy-MM-dd');
//     return dayWiseMealConfig[dateKey]?.[meal] || {};
//   };

//   // Get available packages for a meal type
//   const getAvailablePackages = (mealType: string) => {
//     return foodPackages[mealType] || [];
//   };

//   // Get available items for a package
//   const getAvailableItems = (mealType: string, packageId: number) => {
//     const dateConfigs = Object.values(dayWiseMealConfig);
//     for (const dayConfig of dateConfigs) {
//       if (dayConfig[mealType]?.packageId === packageId && dayConfig[mealType]?.availableItems) {
//         return dayConfig[mealType].availableItems;
//       }
//     }
//     return [];
//   };

//   // Check if all required configurations are complete
//   const isConfigurationComplete = () => {
//     const activeMeals = Object.entries(selectedMeals).filter(([_, selected]) => selected);
//     if (activeMeals.length === 0) return false;

//     return dateRange.every(date => {
//       const dateKey = format(date, 'yyyy-MM-dd');
//       const dayConfig = dayWiseMealConfig[dateKey];
//       const availableCategories = foodCategoriesForDate(date);
      
//       return activeMeals.every(([mealType, _]) => {
//         if (!availableCategories.includes(mealType)) return true; // Skip if not available for this date
//         return dayConfig?.[mealType]?.packageId && dayConfig?.[mealType]?.selectedItems?.length > 0;
//       });
//     });
//   };

//   const steps = [
//     { id: 1, title: 'Meal Selection', description: 'Choose which meals to serve' },
//     { id: 2, title: 'Day Configuration', description: 'Configure meals for each day' },
//     { id: 3, title: 'Summary & Review', description: 'Review and finalize' }
//   ];

//   if (loading) {
//     return (
//       <div className="food-service p-6">
//         <div className="flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//             <p>Loading food options...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="food-service">
//       <h3 className="text-2xl font-semibold mb-4">Food Service</h3>
      
//       {/* Progress Indicator */}
//       <ProgressIndicator currentStep={currentStep} steps={steps} className="mb-6" />

//       {/* Step 1: Select Meals */}
//       <MealSelection 
//         selectedMeals={selectedMeals} 
//         onMealSelection={handleMealSelection}
//         foodCategories={foodCategories}
//       />

//       {/* Step 2: Configure Day-wise Meals */}
//       {(selectedMeals.breakfast || selectedMeals.lunch || selectedMeals.snacks || selectedMeals.dinner) && (
//         <DayWiseMealConfig
//           dateRange={dateRange}
//           selectedMeals={selectedMeals}
//           getDayMealConfig={getDayMealConfig}
//           updateDayMealConfig={updateDayMealConfig}
//           guestCount={guestCount}
//           foodCategoriesForDate={foodCategoriesForDate}
//           getAvailablePackages={getAvailablePackages}
//           getAvailableItems={getAvailableItems}
//         />
//       )}

//       {/* Step 3: Summary */}
//       {isConfigurationComplete() && (
//         <FoodSummary
//           selectedMeals={selectedMeals}
//           dayWiseMealConfig={dayWiseMealConfig}
//           dateRange={dateRange}
//           totalCost={calculateTotalCosts.totalCost}
//           mealCosts={calculateTotalCosts.mealCosts}
//           guestCount={guestCount}
//         />
//       )}

//       {/* Configuration Status */}
//       {Object.values(selectedMeals).some(Boolean) && !isConfigurationComplete() && (
//         <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
//           <p className="text-amber-800">
//             <strong>Configuration Incomplete:</strong> Please complete the meal selection and configuration for all selected dates to see the final cost.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodService;

import React, { useState, useEffect, useMemo } from 'react';
import { format } from "date-fns";
import MealSelection from './MealSelection';
import SingleDayMealConfig from './SingleDayMealConfig';
import FoodSummary from './FoodSummary';

interface FoodServiceProps {
  guestCount: number;
  dateRange: Date[];
  foodCategoriesForDate: (date: Date) => string[];
  onFoodCostUpdate: (
    total: number,
    mealCosts: { breakfast: number; lunch: number; snacks: number; dinner: number },
    selectedDates: { breakfast: Date[]; lunch: Date[]; snacks: Date[]; dinner: Date[] }
  ) => void;
}

const FoodService: React.FC<FoodServiceProps> = ({
  guestCount,
  dateRange,
  foodCategoriesForDate,
  onFoodCostUpdate
}) => {
  // Backend data state
  const [foodCategories, setFoodCategories] = useState<any[]>([]);
  const [packagesByCategory, setPackagesByCategory] = useState<Record<number, any[]>>({});
  const [itemsByPackage, setItemsByPackage] = useState<Record<number, any[]>>({});
  const [cuisineTypes, setCuisineTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Meal selection state
  const [selectedMeals, setSelectedMeals] = useState<Record<string, boolean>>({});

  // Day-wise meal configurations
  const [dayMealConfigs, setDayMealConfigs] = useState<Record<string, Record<string, any>>>({});

  // Fetch food categories on mount
  useEffect(() => {
    const fetchFoodCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://admin.webhostdevs.com/api/food-categories/index.php');
        const data = await response.json();
        
        if (data.status === 'success') {
          const activeCategories = data.data.filter((cat: any) => cat.is_active === 1);
          setFoodCategories(activeCategories);
        }
      } catch (error) {
        console.error('Error fetching food categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodCategories();
  }, []);

  // Fetch cuisine types
  useEffect(() => {
    const fetchCuisineTypes = async () => {
      try {
        const response = await fetch('https://admin.webhostdevs.com/api/food-cuisine-types/index.php');
        const data = await response.json();
        
        if (data.status === 'success') {
          const activeCuisines = data.data.filter((cuisine: any) => cuisine.is_active === 1);
          setCuisineTypes(activeCuisines);
        }
      } catch (error) {
        console.error('Error fetching cuisine types:', error);
      }
    };

    fetchCuisineTypes();
  }, []);

  // Fetch packages for a category
  const fetchPackagesForCategory = async (categoryId: number) => {
    if (packagesByCategory[categoryId]) return;

    try {
      const response = await fetch(`https://admin.webhostdevs.com/api/food-packages/index.php?category_id=${categoryId}`);
      const data = await response.json();
      console.log(`Fetching packages for category ${categoryId}:`, data);
      if (data.status === 'success') {
        setPackagesByCategory(prev => ({
          ...prev,
          [categoryId]: data.data
        }));
      }
    } catch (error) {
      console.error('Error fetching packages for category:', error);
    }
  };

  // Fetch items for a package
  const fetchItemsForPackage = async (packageId: number) => {
    if (itemsByPackage[packageId]) return;

    try {
      const response = await fetch(`https://admin.webhostdevs.com/api/food-items/index.php?package_id=${packageId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setItemsByPackage(prev => ({
          ...prev,
          [packageId]: data.data
        }));
      }
    } catch (error) {
      console.error('Error fetching items for package:', error);
    }
  };

  // Handle meal selection
  const handleMealSelection = async (mealKey: string, selected: boolean) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealKey]: selected
    }));

    if (selected) {
      // Find category and fetch packages
      const category = foodCategories.find(cat => cat.key_name === mealKey);
      if (category) {
        await fetchPackagesForCategory(category.id);
      }
    } else {
      // Clear configurations for unselected meal
      setDayMealConfigs(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(dateKey => {
          if (updated[dateKey] && updated[dateKey][mealKey]) {
            delete updated[dateKey][mealKey];
          }
        });
        return updated;
      });
    }
  };

  // Update day meal configuration
  const updateDayMealConfig = async (date: Date, mealKey: string, config: any) => {
    // Fetch items if package is selected
    if (config.package_id) {
      await fetchItemsForPackage(config.package_id);
    }

    const dateKey = format(date, 'yyyy-MM-dd');
    setDayMealConfigs(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealKey]: config
      }
    }));
  };

  // Get configuration for a specific date and meal
  const getDayMealConfig = (date: Date, mealKey: string) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return dayMealConfigs[dateKey]?.[mealKey] || {};
  };

  // Calculate total costs
  const calculateTotalCosts = useMemo(() => {
    let totalCost = 0;
    const mealCosts = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
    const selectedDates = { breakfast: [] as Date[], lunch: [] as Date[], snacks: [] as Date[], dinner: [] as Date[] };

    dateRange.forEach(date => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayConfigs = dayMealConfigs[dateKey];
      
      if (!dayConfigs) return;

      Object.entries(selectedMeals).forEach(([mealKey, isSelected]) => {
        if (!isSelected || !dayConfigs[mealKey]) return;

        const config = dayConfigs[mealKey];
        if (!config.package_id) return;

        // Find the category for this meal
        const category = foodCategories.find(cat => cat.key_name === mealKey);
        if (!category) return;

        // Find the package
        const packages = packagesByCategory[category.id] || [];
        const selectedPackage = packages.find(pkg => pkg.id === config.package_id);
        
        if (selectedPackage) {
          const cost = selectedPackage.price * guestCount;
          mealCosts[mealKey] += cost;
          totalCost += cost;
          selectedDates[mealKey].push(date);
        }
      });
    });

    return { totalCost, mealCosts, selectedDates };
  }, [dayMealConfigs, selectedMeals, guestCount, dateRange, foodCategories, packagesByCategory]);

  // Update parent component
  useEffect(() => {
    const { totalCost, mealCosts, selectedDates } = calculateTotalCosts;
    onFoodCostUpdate(totalCost, mealCosts, selectedDates);
  }, [calculateTotalCosts, onFoodCostUpdate]);

  if (loading) {
    return (
      <div className="food-service-loading p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading food categories...</p>
      </div>
    );
  }

  return (
    <div className="food-service bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">Food Service Configuration</h3>
      
      {/* Step 1: Meal Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4">Step 1: Select Meals</h4>
        <MealSelection
          foodCategories={foodCategories}
          selectedMeals={selectedMeals}
          onMealSelection={handleMealSelection}
        />
      </div>

      {/* Step 2: Day-wise Configuration */}
      {Object.values(selectedMeals).some(Boolean) && (
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Step 2: Configure Meals for Each Day</h4>
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
              foodCategoriesForDate={foodCategoriesForDate}
            />
          ))}
        </div>
      )}

      {/* Step 3: Summary */}
      <FoodSummary
        selectedMeals={selectedMeals}
        dayMealConfigs={dayMealConfigs}
        dateRange={dateRange}
        totalCost={calculateTotalCosts.totalCost}
        mealCosts={calculateTotalCosts.mealCosts}
        guestCount={guestCount}
        foodCategories={foodCategories}
        packagesByCategory={packagesByCategory}
      />
    </div>
  );
};

export default FoodService;
