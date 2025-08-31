// import React, { useState, useEffect, useMemo } from 'react';
// import { format } from "date-fns";
// import MealSelection from './MealSelection';
// import SingleDayMealConfig from './SingleDayMealConfig';
// import FoodSummary from './FoodSummary';

// const FoodService = ({ guestCount, dateRange, foodCategoriesForDate, onFoodCostUpdate }) => {
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
//               foodCategoriesForDate={foodCategoriesForDate}
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="food-service bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">Food Service Configuration</h3>

      <MealSelection
        foodCategories={foodCategories}
        selectedMeals={selectedMeals}
        onMealSelection={handleMealSelection}
      />

      {Object.values(selectedMeals).some(Boolean) && (
        <div className="mb-8">
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
      )}

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
  );
};

export default FoodService;
