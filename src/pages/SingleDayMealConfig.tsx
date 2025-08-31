// import React, { useMemo, useCallback } from 'react';
// import { format } from 'date-fns';
// import { Calendar, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// interface SingleDayMealConfigProps {
//   date: Date;
//   selectedMeals: Record<string, boolean>;
//   getDayMealConfig: (date: Date, mealKey: string) => any;
//   updateDayMealConfig: (date: Date, mealKey: string, config: any) => void;
//   guestCount: number;
//   foodCategories: any[];
//   packagesByCategory: Record<number, any[]>;
//   itemsByPackage: Record<number, any[]>;
//   cuisineTypes: any[];
//   foodCategoriesForDate: (date: Date) => string[];
// }

// const SingleDayMealConfig: React.FC<SingleDayMealConfigProps> = ({
//   date,
//   selectedMeals,
//   getDayMealConfig,
//   updateDayMealConfig,
//   guestCount,
//   foodCategories,
//   packagesByCategory,
//   itemsByPackage,
//   cuisineTypes,
//   foodCategoriesForDate
// }) => {
//   const availableMealsForDate = foodCategoriesForDate(date);

//   const activeMeals = useMemo(() => {
//     return Object.entries(selectedMeals)
//       .filter(([mealKey, selected]) => selected && availableMealsForDate.includes(mealKey))
//       .map(([mealKey]) => mealKey)
//       .sort((a, b) => {
//         const aCat = foodCategories.find(cat => cat.key_name === a);
//         const bCat = foodCategories.find(cat => cat.key_name === b);
//         return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
//       });
//   }, [selectedMeals, availableMealsForDate, foodCategories]);

//   if (activeMeals.length === 0) {
//     return (
//       <Alert className="mb-4">
//         <AlertDescription>
//           No meals available for {format(date, 'MMMM d, yyyy')} based on your booking duration.
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   const MealConfigSection: React.FC<{ mealKey: string }> = React.memo(({ mealKey }) => {
//     const category = foodCategories.find(cat => cat.key_name === mealKey);
//     if (!category) return <div className="text-red-500">Category not found for {mealKey}</div>;

//     const config = getDayMealConfig(date, mealKey) || {};

//     const allPackagesForThisCategory = useMemo(
//       () => (packagesByCategory[category.id] || []).filter(pkg => pkg.is_active === 1),
//       [packagesByCategory, category.id]
//     );

//     const getSelectionLimits = useCallback((limits: any) => {
//       if (!limits) return {};
//       if (typeof limits === 'string') {
//         try {
//           return JSON.parse(limits);
//         } catch {
//           return {};
//         }
//       }
//       return limits || {};
//     }, []);

//     const handlePackageSelect = useCallback(
//       (packageId: number) => {
//         const currentConfig = getDayMealConfig(date, mealKey) || {};
//         updateDayMealConfig(date, mealKey, {
//           ...currentConfig,
//           package_id: packageId,
//           cuisine_type_id: currentConfig.cuisine_type_id,
//           selected_items: {}
//         });
//       },
//       [date, mealKey, getDayMealConfig, updateDayMealConfig]
//     );

//     const handleCuisineSelect = useCallback(
//       (cuisineTypeId: number) => {
//         const currentConfig = getDayMealConfig(date, mealKey) || {};
//         updateDayMealConfig(date, mealKey, {
//           ...currentConfig,
//           cuisine_type_id: cuisineTypeId,
//           package_id: null,
//           selected_items: {}
//         });
//       },
//       [date, mealKey, getDayMealConfig, updateDayMealConfig]
//     );

//     const handleCategoryItemsSelect = useCallback(
//       (categoryName: string, selectedItems: string[]) => {
//         const currentConfig = getDayMealConfig(date, mealKey) || {};
//         updateDayMealConfig(date, mealKey, {
//           ...currentConfig,
//           selected_items: {
//             ...(currentConfig.selected_items || {}),
//             [categoryName]: selectedItems
//           }
//         });
//       },
//       [date, mealKey, getDayMealConfig, updateDayMealConfig]
//     );

//     const needsCuisineSelection = mealKey !== 'breakfast';

//     const filteredPackages = useMemo(() => {
//       let pkgs = [...allPackagesForThisCategory];
//       if (needsCuisineSelection) {
//         if (config?.cuisine_type_id) {
//           pkgs = pkgs.filter(pkg => pkg.cuisine_type_id === config.cuisine_type_id);
//         } else {
//           pkgs = [];
//         }
//       }
//       return pkgs;
//     }, [allPackagesForThisCategory, needsCuisineSelection, config?.cuisine_type_id]);

//     const selectedPackage = filteredPackages.find(pkg => pkg.id === config.package_id);
//     const availableItems = selectedPackage
//       ? (itemsByPackage[selectedPackage.id] || []).filter(item => item.is_active === 1)
//       : [];

//     const selectionLimits = selectedPackage ? getSelectionLimits(selectedPackage.selection_limits) : {};
//     const currentSelectedItems = config.selected_items || {};

//     const itemsByItemCategory = useMemo(() => {
//       const out: Record<string, any[]> = {};
//       availableItems.forEach(item => {
//         const cat = item.item_category || 'other';
//         if (!out[cat]) out[cat] = [];
//         out[cat].push(item);
//       });
//       return out;
//     }, [availableItems]);

//     const getCategoryValidation = useCallback((categoryName: string) => {
//       const limit = selectionLimits[categoryName] || 1;
//       const selectedCount = currentSelectedItems[categoryName]?.length || 0;
//       return {
//         limit,
//         selectedCount,
//         isComplete: selectedCount >= limit,
//         hasError: selectedCount < limit,
//         canAddMore: selectedCount < limit
//       };
//     }, [selectionLimits, currentSelectedItems]);

//     const toggleCategoryItemSelection = useCallback(
//       (categoryName: string, itemId: string) => {
//         const currentConfig = getDayMealConfig(date, mealKey) || {};
//         const currentItems = (currentConfig.selected_items || {})[categoryName] || [];
//         const limit = selectionLimits[categoryName] || 1;

//         let newItems;
//         if (currentItems.includes(itemId)) {
//           newItems = currentItems.filter((id: string) => id !== itemId);
//         } else {
//           if (currentItems.length >= limit) {
//             alert(`You can only select ${limit} item${limit > 1 ? 's' : ''} from ${categoryName.replace('mainCourse', 'Main Course')}`);
//             return;
//           }
//           newItems = [...currentItems, itemId];
//         }
//         handleCategoryItemsSelect(categoryName, newItems);
//       },
//       [date, mealKey, getDayMealConfig, selectionLimits, handleCategoryItemsSelect]
//     );

//     const isAllCategoriesComplete = useCallback(() => {
//       const categoriesToCheck = Object.keys(itemsByItemCategory).filter(
//         (categoryName) => selectionLimits[categoryName] && itemsByItemCategory[categoryName].length > 0
//       );
//       if (categoriesToCheck.length === 0) return false;
//       return categoriesToCheck.every((categoryName) => {
//         const v = getCategoryValidation(categoryName);
//         return v.isComplete;
//       });
//     }, [itemsByItemCategory, selectionLimits, getCategoryValidation]);

//     return (
//       <div className="space-y-4">
//         <div className="flex items-center space-x-2 mb-4">
//           <ChefHat className="w-5 h-5 text-amber-600" />
//           <h6 className="font-semibold capitalize">{mealKey} Configuration</h6>
//         </div>

//         {/* Cuisine Selection */}
//         {needsCuisineSelection && (
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Step 1: Select Cuisine Type for {mealKey}:
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {cuisineTypes.map(cuisine => (
//                 <button
//                   key={cuisine.id}
//                   type="button"
//                   onClick={e => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handleCuisineSelect(cuisine.id);
//                   }}
//                   className={`p-3 rounded-lg border text-left transition-colors
//                     ${config.cuisine_type_id === cuisine.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300'}
//                   `}
//                 >
//                   <div className="font-medium">{cuisine.name}</div>
//                   <div className="text-sm text-gray-600">{cuisine.description}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Package Selection */}
//         {(!needsCuisineSelection || config.cuisine_type_id) && (
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               {needsCuisineSelection ? 'Step 2: ' : ''}Select {mealKey} Package:
//             </label>
//             {filteredPackages.length === 0 ? (
//               <div className="text-gray-500 text-sm p-4 border rounded-lg bg-gray-50">
//                 {needsCuisineSelection && !config.cuisine_type_id
//                   ? `Please select a cuisine type first to see ${mealKey} packages`
//                   : `No ${mealKey} packages available${config.cuisine_type_id ? ' for selected cuisine' : ''}`}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 {filteredPackages.map(pkg => (
//                   <button
//                     key={pkg.id}
//                     type="button"
//                     onClick={e => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       handlePackageSelect(pkg.id);
//                     }}
//                     className={`p-4 rounded-lg border text-left transition-colors
//                       ${config.package_id === pkg.id
//                         ? 'border-amber-500 bg-amber-50'
//                         : 'border-gray-200 hover:border-gray-300'
//                       }
//                     `}
//                   >
//                     <div className="font-medium mb-1">{pkg.name}</div>
//                     <div className="text-sm text-gray-600 mb-2">{pkg.description}</div>
//                     <div className="text-sm font-medium text-amber-600">
//                       ₹{pkg.price.toLocaleString()} per person
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Category-wise Items Selection */}
//         {selectedPackage && Object.keys(itemsByItemCategory).length > 0 && (
//           <div>
//             <label className="block text-sm font-medium mb-4">
//               {needsCuisineSelection ? 'Step 3: ' : 'Step 2: '}Select Items by Category:
//             </label>
//             <div className="space-y-6">
//               {Object.entries(itemsByItemCategory).map(([categoryName, items]) => {
//                 if (items.length === 0) return null;
//                 const validation = getCategoryValidation(categoryName);
//                 const currentCategoryItems = currentSelectedItems[categoryName] || [];
//                 const hasSelectionLimit = selectionLimits[categoryName];

//                 return (
//                   <div key={categoryName} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
//                     {/* Category Header */}
//                     <div className="flex justify-between items-center mb-3">
//                       <h6 className="font-semibold capitalize text-lg text-gray-800">
//                         {categoryName.replace('mainCourse', 'Main Course')}
//                         {hasSelectionLimit && (
//                           <span className="ml-2 text-sm font-normal text-gray-600">
//                             (Select {validation.limit} item{validation.limit > 1 ? 's' : ''})
//                           </span>
//                         )}
//                       </h6>
//                       <div className="flex items-center space-x-2">
//                         {hasSelectionLimit && (
//                           <>
//                             <span className="text-sm text-gray-600">
//                               {validation.selectedCount}/{validation.limit} selected
//                             </span>
//                             {validation.isComplete && (
//                               <CheckCircle2 className="w-4 h-4 text-green-600" />
//                             )}
//                             {validation.hasError && (
//                               <AlertCircle className="w-4 h-4 text-red-600" />
//                             )}
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {/* Items Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {items.map(item => {
//                         const isSelected = (currentCategoryItems || []).includes(item.id.toString());
//                         const canSelect = !isSelected && (hasSelectionLimit ? validation.canAddMore : true);
//                         return (
//                           <div
//                             key={item.id}
//                             className={`
//                               flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
//                               ${isSelected
//                                 ? 'border-amber-500 bg-amber-50 shadow-md'
//                                 : canSelect
//                                   ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
//                                   : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
//                               }
//                             `}
//                             onClick={e => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               if (isSelected || canSelect) {
//                                 toggleCategoryItemSelection(categoryName, item.id.toString());
//                               }
//                             }}
//                           >
//                             <div className="flex-1 pointer-events-none">
//                               <div className="font-medium text-gray-800">{item.name}</div>
//                               <div className="text-sm text-gray-600">{item.description}</div>
//                               <div className="text-xs text-gray-400 mt-1">
//                                 Category: {item.item_category}
//                               </div>
//                             </div>
//                             {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 pointer-events-none" />}
//                             {!canSelect && !isSelected && hasSelectionLimit && (
//                               <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center pointer-events-none">
//                                 <span className="text-xs text-gray-500">✕</span>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                     {/* Category validation alert */}
//                     {hasSelectionLimit && validation.hasError && (
//                       <Alert variant="destructive" className="mt-3">
//                         <AlertCircle className="h-4 w-4" />
//                         <AlertDescription>
//                           Please select {validation.limit - validation.selectedCount} more item
//                           {validation.limit - validation.selectedCount > 1 ? 's' : ''} from{' '}
//                           {categoryName.replace('mainCourse', 'Main Course')}.
//                         </AlertDescription>
//                       </Alert>
//                     )}
//                     {/* Category completion indicator */}
//                     {hasSelectionLimit && validation.isComplete && (
//                       <Alert className="mt-3 border-green-200 bg-green-50">
//                         <CheckCircle2 className="h-4 w-4 text-green-600" />
//                         <AlertDescription className="text-green-800">
//                           {categoryName.replace('mainCourse', 'Main Course')} selection complete!
//                         </AlertDescription>
//                       </Alert>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             {/* Overall completion status */}
//             {isAllCategoriesComplete() && (
//               <Alert className="mt-4 border-green-200 bg-green-50">
//                 <CheckCircle2 className="h-4 w-4 text-green-600" />
//                 <AlertDescription className="text-green-800">
//                   ✅ All required categories completed for {mealKey}! You can proceed to the next step.
//                 </AlertDescription>
//               </Alert>
//             )}
//           </div>
//         )}

//         {/* Cost Display */}
//         {selectedPackage && (
//           <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
//             <div className="font-medium text-lg">
//               Cost for {mealKey} on {format(date, 'MMM d')}:
//               <span className="text-amber-600 ml-2 font-bold">
//                 ₹{(selectedPackage.price * guestCount).toLocaleString()}
//               </span>
//             </div>
//             {!isAllCategoriesComplete() && (
//               <div className="text-sm text-red-600 mt-2 flex items-center">
//                 <AlertCircle className="w-4 h-4 mr-1" />
//                 Complete all required category selections to finalize this meal
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   });

//   return (
//     <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
//       <div className="flex items-center space-x-2 mb-4">
//         <Calendar className="w-5 h-5 text-gray-600" />
//         <h5 className="font-semibold text-gray-800">
//           {format(date, 'EEEE, MMMM d, yyyy')}
//         </h5>
//       </div>
//       <Tabs defaultValue={activeMeals[0]} className="w-full">
//         <TabsList
//           className={`grid w-full ${
//             activeMeals.length === 1
//               ? 'grid-cols-1'
//               : activeMeals.length === 2
//               ? 'grid-cols-2'
//               : activeMeals.length === 3
//               ? 'grid-cols-3'
//               : 'grid-cols-4'
//           }`}
//         >
//           {activeMeals.map(mealKey => (
//             <TabsTrigger key={mealKey} value={mealKey} className="capitalize">
//               {mealKey}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//         {activeMeals.map(mealKey => (
//           <TabsContent key={mealKey} value={mealKey} className="mt-4">
//             <MealConfigSection mealKey={mealKey} />
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   );
// };

// export default SingleDayMealConfig;












import React, { useMemo, useCallback } from 'react';
import { format, isSameDay } from 'date-fns';
import { Calendar, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SingleDayMealConfigProps {
  date: Date;
  selectedMeals: Record<string, boolean>;
  getDayMealConfig: (date: Date, mealKey: string) => any;
  updateDayMealConfig: (date: Date, mealKey: string, config: any) => void;
  guestCount: number;
  foodCategories: any[];
  packagesByCategory: Record<number, any[]>;
  itemsByPackage: Record<number, any[]>;
  cuisineTypes: any[];
  dateRange: Date[];
}

const SingleDayMealConfig: React.FC<SingleDayMealConfigProps> = ({
  date,
  selectedMeals,
  getDayMealConfig,
  updateDayMealConfig,
  guestCount,
  foodCategories,
  packagesByCategory,
  itemsByPackage,
  cuisineTypes,
  dateRange
}) => {
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

  const availableMealsForDate = getAvailableFoodCategoriesForDate(date, dateRange);

  const activeMeals = useMemo(() => {
    return Object.entries(selectedMeals)
      .filter(([mealKey, selected]) => selected && availableMealsForDate.includes(mealKey))
      .map(([mealKey]) => mealKey)
      .sort((a, b) => {
        const aCat = foodCategories.find(cat => cat.key_name === a);
        const bCat = foodCategories.find(cat => cat.key_name === b);
        return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
      });
  }, [selectedMeals, availableMealsForDate, foodCategories]);

  if (activeMeals.length === 0) {
    return (
      <Alert className="mb-4">
        <AlertDescription>
          No meals available for {format(date, 'MMMM d, yyyy')} based on your booking duration.
        </AlertDescription>
      </Alert>
    );
  }

  const MealConfigSection: React.FC<{ mealKey: string }> = React.memo(({ mealKey }) => {
    const category = foodCategories.find(cat => cat.key_name === mealKey);
    if (!category) return <div className="text-red-500">Category not found for {mealKey}</div>;

    const config = getDayMealConfig(date, mealKey) || {};

    const allPackagesForThisCategory = useMemo(
      () => (packagesByCategory[category.id] || []).filter(pkg => pkg.is_active === 1),
      [packagesByCategory, category.id]
    );

    const getSelectionLimits = useCallback((limits: any) => {
      if (!limits) return {};
      if (typeof limits === 'string') {
        try {
          return JSON.parse(limits);
        } catch {
          return {};
        }
      }
      return limits || {};
    }, []);

    const handlePackageSelect = useCallback(
      (packageId: number) => {
        const currentConfig = getDayMealConfig(date, mealKey) || {};
        updateDayMealConfig(date, mealKey, {
          ...currentConfig,
          package_id: packageId,
          cuisine_type_id: currentConfig.cuisine_type_id,
          selected_items: {}
        });
      },
      [date, mealKey, getDayMealConfig, updateDayMealConfig]
    );

    const handleCuisineSelect = useCallback(
      (cuisineTypeId: number) => {
        const currentConfig = getDayMealConfig(date, mealKey) || {};
        updateDayMealConfig(date, mealKey, {
          ...currentConfig,
          cuisine_type_id: cuisineTypeId,
          package_id: null,
          selected_items: {}
        });
      },
      [date, mealKey, getDayMealConfig, updateDayMealConfig]
    );

    const handleCategoryItemsSelect = useCallback(
      (categoryName: string, selectedItems: string[]) => {
        const currentConfig = getDayMealConfig(date, mealKey) || {};
        updateDayMealConfig(date, mealKey, {
          ...currentConfig,
          selected_items: {
            ...(currentConfig.selected_items || {}),
            [categoryName]: selectedItems
          }
        });
      },
      [date, mealKey, getDayMealConfig, updateDayMealConfig]
    );

    const needsCuisineSelection = mealKey !== 'breakfast';

    const filteredPackages = useMemo(() => {
      let pkgs = [...allPackagesForThisCategory];
      if (needsCuisineSelection) {
        if (config?.cuisine_type_id) {
          pkgs = pkgs.filter(pkg => pkg.cuisine_type_id === config.cuisine_type_id);
        } else {
          pkgs = [];
        }
      }
      return pkgs;
    }, [allPackagesForThisCategory, needsCuisineSelection, config?.cuisine_type_id]);

    const selectedPackage = filteredPackages.find(pkg => pkg.id === config.package_id);
    const availableItems = selectedPackage
      ? (itemsByPackage[selectedPackage.id] || []).filter(item => item.is_active === 1)
      : [];

    const selectionLimits = selectedPackage ? getSelectionLimits(selectedPackage.selection_limits) : {};
    const currentSelectedItems = config.selected_items || {};

    const itemsByItemCategory = useMemo(() => {
      const out: Record<string, any[]> = {};
      availableItems.forEach(item => {
        const cat = item.item_category || 'other';
        if (!out[cat]) out[cat] = [];
        out[cat].push(item);
      });
      return out;
    }, [availableItems]);

    const getCategoryValidation = useCallback((categoryName: string) => {
      const limit = selectionLimits[categoryName] || 1;
      const selectedCount = currentSelectedItems[categoryName]?.length || 0;
      return {
        limit,
        selectedCount,
        isComplete: selectedCount >= limit,
        hasError: selectedCount < limit,
        canAddMore: selectedCount < limit
      };
    }, [selectionLimits, currentSelectedItems]);

    const toggleCategoryItemSelection = useCallback(
      (categoryName: string, itemId: string) => {
        const currentConfig = getDayMealConfig(date, mealKey) || {};
        const currentItems = (currentConfig.selected_items || {})[categoryName] || [];
        const limit = selectionLimits[categoryName] || 1;

        let newItems;
        if (currentItems.includes(itemId)) {
          newItems = currentItems.filter((id: string) => id !== itemId);
        } else {
          if (currentItems.length >= limit) {
            alert(`You can only select ${limit} item${limit > 1 ? 's' : ''} from ${categoryName.replace('mainCourse', 'Main Course')}`);
            return;
          }
          newItems = [...currentItems, itemId];
        }
        handleCategoryItemsSelect(categoryName, newItems);
      },
      [date, mealKey, getDayMealConfig, selectionLimits, handleCategoryItemsSelect]
    );

    const isAllCategoriesComplete = useCallback(() => {
      const categoriesToCheck = Object.keys(itemsByItemCategory).filter(
        (categoryName) => selectionLimits[categoryName] && itemsByItemCategory[categoryName].length > 0
      );
      if (categoriesToCheck.length === 0) return false;
      return categoriesToCheck.every((categoryName) => {
        const v = getCategoryValidation(categoryName);
        return v.isComplete;
      });
    }, [itemsByItemCategory, selectionLimits, getCategoryValidation]);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <ChefHat className="w-5 h-5 text-amber-600" />
          <h6 className="font-semibold capitalize">{mealKey} Configuration</h6>
        </div>

        {/* Cuisine Selection */}
        {needsCuisineSelection && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Step 1: Select Cuisine Type for {mealKey}:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cuisineTypes.map(cuisine => (
                <button
                  key={cuisine.id}
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCuisineSelect(cuisine.id);
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors
                    ${config.cuisine_type_id === cuisine.id ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="font-medium">{cuisine.name}</div>
                  <div className="text-sm text-gray-600">{cuisine.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Package Selection */}
        {(!needsCuisineSelection || config.cuisine_type_id) && (
          <div>
            <label className="block text-sm font-medium mb-2">
              {needsCuisineSelection ? 'Step 2: ' : ''}Select {mealKey} Package:
            </label>
            {filteredPackages.length === 0 ? (
              <div className="text-gray-500 text-sm p-4 border rounded-lg bg-gray-50">
                {needsCuisineSelection && !config.cuisine_type_id
                  ? `Please select a cuisine type first to see ${mealKey} packages`
                  : `No ${mealKey} packages available${config.cuisine_type_id ? ' for selected cuisine' : ''}`}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredPackages.map(pkg => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePackageSelect(pkg.id);
                    }}
                    className={`p-4 rounded-lg border text-left transition-colors
                      ${config.package_id === pkg.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-medium mb-1">{pkg.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{pkg.description}</div>
                    <div className="text-sm font-medium text-amber-600">
                      ₹{pkg.price.toLocaleString()} per person
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category-wise Items Selection */}
        {selectedPackage && Object.keys(itemsByItemCategory).length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-4">
              {needsCuisineSelection ? 'Step 3: ' : 'Step 2: '}Select Items by Category:
            </label>
            <div className="space-y-6">
              {Object.entries(itemsByItemCategory).map(([categoryName, items]) => {
                if (items.length === 0) return null;
                const validation = getCategoryValidation(categoryName);
                const currentCategoryItems = currentSelectedItems[categoryName] || [];
                const hasSelectionLimit = selectionLimits[categoryName];

                return (
                  <div key={categoryName} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    {/* Category Header */}
                    <div className="flex justify-between items-center mb-3">
                      <h6 className="font-semibold capitalize text-lg text-gray-800">
                        {categoryName.replace('mainCourse', 'Main Course')}
                        {hasSelectionLimit && (
                          <span className="ml-2 text-sm font-normal text-gray-600">
                            (Select {validation.limit} item{validation.limit > 1 ? 's' : ''})
                          </span>
                        )}
                      </h6>
                      <div className="flex items-center space-x-2">
                        {hasSelectionLimit && (
                          <>
                            <span className="text-sm text-gray-600">
                              {validation.selectedCount}/{validation.limit} selected
                            </span>
                            {validation.isComplete && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                            {validation.hasError && (
                              <AlertCircle className="w-4 h-4 text-red-600" />
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {items.map(item => {
                        const isSelected = (currentCategoryItems || []).includes(item.id.toString());
                        const canSelect = !isSelected && (hasSelectionLimit ? validation.canAddMore : true);
                        return (
                          <div
                            key={item.id}
                            className={`
                              flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${isSelected
                                ? 'border-amber-500 bg-amber-50 shadow-md'
                                : canSelect
                                  ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                                  : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                              }
                            `}
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (isSelected || canSelect) {
                                toggleCategoryItemSelection(categoryName, item.id.toString());
                              }
                            }}
                          >
                            <div className="flex-1 pointer-events-none">
                              <div className="font-medium text-gray-800">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Category: {item.item_category}
                              </div>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 pointer-events-none" />}
                            {!canSelect && !isSelected && hasSelectionLimit && (
                              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center pointer-events-none">
                                <span className="text-xs text-gray-500">✕</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {/* Category validation alert */}
                    {hasSelectionLimit && validation.hasError && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please select {validation.limit - validation.selectedCount} more item
                          {validation.limit - validation.selectedCount > 1 ? 's' : ''} from{' '}
                          {categoryName.replace('mainCourse', 'Main Course')}.
                        </AlertDescription>
                      </Alert>
                    )
                    }
                    {/* Category completion indicator */}
                    {hasSelectionLimit && validation.isComplete && (
                      <Alert className="mt-3 border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          {categoryName.replace('mainCourse', 'Main Course')} selection complete!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Overall completion status */}
            {isAllCategoriesComplete() && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ✅ All required categories completed for {mealKey}! You can proceed to the next step.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Cost Display */}
        {selectedPackage && (
          <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <div className="font-medium text-lg">
              Cost for {mealKey} on {format(date, 'MMM d')}:
              <span className="text-amber-600 ml-2 font-bold">
                ₹{(selectedPackage.price * guestCount).toLocaleString()}
              </span>
            </div>
            {!isAllCategoriesComplete() && (
              <div className="text-sm text-red-600 mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Complete all required category selections to finalize this meal
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h5 className="font-semibold text-gray-800">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h5>
      </div>
      <Tabs defaultValue={activeMeals[0]} className="w-full">
        <TabsList
          className={`grid w-full ${
            activeMeals.length === 1
              ? 'grid-cols-1'
              : activeMeals.length === 2
              ? 'grid-cols-2'
              : activeMeals.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-4'
          }`}
        >
          {activeMeals.map(mealKey => (
            <TabsTrigger key={mealKey} value={mealKey} className="capitalize">
              {mealKey}
            </TabsTrigger>
          ))}
        </TabsList>
        {activeMeals.map(mealKey => (
          <TabsContent key={mealKey} value={mealKey} className="mt-4">
            <MealConfigSection mealKey={mealKey} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SingleDayMealConfig;
