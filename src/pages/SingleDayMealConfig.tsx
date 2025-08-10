// import React from 'react';
// import { CheckCircle2, AlertCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//     Alert,
//     AlertDescription
// } from "@/components/ui/alert";
// import { foodMenuData } from './foodData.js';

// // Import meal-specific components
// import BreakfastConfig from './BreakfastConfig';
// import LunchDinnerConfig from './LunchDinnerConfig';

// interface SingleDayMealConfigProps {
//     date: Date;
//     selectedMeals: {
//         breakfast: boolean;
//         lunch: boolean;
//         dinner: boolean;
//     };
//     getDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner') => any;
//     updateDayMealConfig: (date: Date, meal: 'breakfast' | 'lunch' | 'dinner', config: any) => void;
//     guestCount: number;
// }

// const SingleDayMealConfig: React.FC<SingleDayMealConfigProps> = ({
//     date,
//     selectedMeals,
//     getDayMealConfig,
//     updateDayMealConfig,
//     guestCount
// }) => {
//     // Get active meals for tabs
//     const activeMeals = Object.entries(selectedMeals)
//         .filter(([_, selected]) => selected)
//         .map(([meal, _]) => meal);

//     const defaultTab = activeMeals[0] || 'breakfast';

//     // Meal color mapping
//     const getMealColorClass = (meal: string): string => {
//         switch (meal) {
//             case 'breakfast': return 'orange';
//             case 'lunch': return 'green';
//             case 'dinner': return 'indigo';
//             default: return 'gray';
//         }
//     };

//     if (activeMeals.length === 0) {
//         return (
//             <div className="text-center py-8 text-gray-500">
//                 <p>No meals selected for configuration.</p>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Tabs defaultValue={defaultTab} className="w-full">
//                 <TabsList className="grid w-full grid-cols-3 mb-6">
//                     {selectedMeals.breakfast && (
//                         <TabsTrigger 
//                             value="breakfast" 
//                             className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
//                         >
//                             Breakfast
//                         </TabsTrigger>
//                     )}
//                     {selectedMeals.lunch && (
//                         <TabsTrigger 
//                             value="lunch" 
//                             className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
//                         >
//                             Lunch
//                         </TabsTrigger>
//                     )}
//                     {selectedMeals.dinner && (
//                         <TabsTrigger 
//                             value="dinner" 
//                             className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
//                         >
//                             Dinner
//                         </TabsTrigger>
//                     )}
//                 </TabsList>

//                 {selectedMeals.breakfast && (
//                     <TabsContent value="breakfast">
//                         <BreakfastConfig
//                             date={date}
//                             config={getDayMealConfig(date, 'breakfast')}
//                             updateConfig={(config) => updateDayMealConfig(date, 'breakfast', config)}
//                             guestCount={guestCount}
//                         />
//                     </TabsContent>
//                 )}

//                 {selectedMeals.lunch && (
//                     <TabsContent value="lunch">
//                         <LunchDinnerConfig
//                             date={date}
//                             meal="lunch"
//                             config={getDayMealConfig(date, 'lunch')}
//                             updateConfig={(config) => updateDayMealConfig(date, 'lunch', config)}
//                             guestCount={guestCount}
//                         />
//                     </TabsContent>
//                 )}

//                 {selectedMeals.dinner && (
//                     <TabsContent value="dinner">
//                         <LunchDinnerConfig
//                             date={date}
//                             meal="dinner"
//                             config={getDayMealConfig(date, 'dinner')}
//                             updateConfig={(config) => updateDayMealConfig(date, 'dinner', config)}
//                             guestCount={guestCount}
//                         />
//                     </TabsContent>
//                 )}
//             </Tabs>
//         </div>
//     );
// };

// export default SingleDayMealConfig;


// ----------------------------------------


// import React from 'react';
// import { format } from 'date-fns';
// import { Calendar, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Alert, AlertDescription } from "@/components/ui/alert";

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
//   const activeMeals = Object.entries(selectedMeals)
//     .filter(([mealKey, selected]) => selected && availableMealsForDate.includes(mealKey))
//     .map(([mealKey]) => mealKey);

//   if (activeMeals.length === 0) {
//     return (
//       <Alert className="mb-4">
//         <AlertDescription>
//           No meals available for {format(date, 'MMMM d, yyyy')} based on your booking duration.
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   const MealConfigSection = ({ mealKey }: { mealKey: string }) => {
//     const category = foodCategories.find(cat => cat.key_name === mealKey);
    
//     if (!category) {
//       return <div className="text-red-500">Category not found for {mealKey}</div>;
//     }

//     const allPackagesForThisCategory = (packagesByCategory[category.id] || []).filter(pkg => pkg.is_active === 1);
//     const config = getDayMealConfig(date, mealKey);

//     // Helper function to safely get selection limits
//     const getSelectionLimits = (limits: any) => {
//       if (!limits) return {};
      
//       if (typeof limits === 'string') {
//         try {
//           return JSON.parse(limits);
//         } catch (e) {
//           console.error('Error parsing selection limits:', e);
//           return {};
//         }
//       }
      
//       return limits; // Already an object
//     };

//     const handlePackageSelect = (packageId: number) => {
//       updateDayMealConfig(date, mealKey, {
//         ...config,
//         package_id: packageId,
//         cuisine_type_id: config.cuisine_type_id,
//         selected_items: {} // Reset as object with categories: {starters: [], mainCourse: [], desserts: []}
//       });
//     };

//     const handleCuisineSelect = (cuisineTypeId: number) => {
//       updateDayMealConfig(date, mealKey, {
//         ...config,
//         cuisine_type_id: cuisineTypeId,
//         package_id: null,
//         selected_items: {}
//       });
//     };

//     // Handle category-wise item selection
//     const handleCategoryItemsSelect = (categoryName: string, selectedItems: string[]) => {
//       const currentSelection = config.selected_items || {};
//       updateDayMealConfig(date, mealKey, {
//         ...config,
//         selected_items: {
//           ...currentSelection,
//           [categoryName]: selectedItems
//         }
//       });
//     };

//     const needsCuisineSelection = mealKey !== 'breakfast';
    
//     const getFilteredPackages = () => {
//       let filteredPackages = allPackagesForThisCategory;
      
//       if (needsCuisineSelection && config.cuisine_type_id) {
//         filteredPackages = filteredPackages.filter(pkg => 
//           pkg.cuisine_type_id === config.cuisine_type_id
//         );
//       }
      
//       if (needsCuisineSelection && !config.cuisine_type_id) {
//         filteredPackages = [];
//       }
      
//       return filteredPackages;
//     };

//     const filteredPackages = getFilteredPackages();
//     const selectedPackage = filteredPackages.find(pkg => pkg.id === config.package_id);
//     const availableItems = selectedPackage ? (itemsByPackage[selectedPackage.id] || []) : [];

//     // Get selection limits from the selected package (category-wise)
//     const selectionLimits = selectedPackage ? getSelectionLimits(selectedPackage.selection_limits) : {};
    
//     // Current selection state (category-wise)
//     const currentSelectedItems = config.selected_items || {};

//     // FIXED: Group items by their item_category field - Show ALL categories that have items
//     const itemsByItemCategory: Record<string, any[]> = {};
    
//     // First, group all available items by their category
//     availableItems.forEach(item => {
//       const itemCategory = item.item_category || 'other';
//       if (!itemsByItemCategory[itemCategory]) {
//         itemsByItemCategory[itemCategory] = [];
//       }
//       itemsByItemCategory[itemCategory].push(item);
//     });

//     // Get category validation info
//     const getCategoryValidation = (categoryName: string) => {
//       const limit = selectionLimits[categoryName] || 1;
//       const selectedCount = currentSelectedItems[categoryName]?.length || 0;
//       return {
//         limit,
//         selectedCount,
//         isComplete: selectedCount >= limit,
//         hasError: selectedCount < limit,
//         canAddMore: selectedCount < limit
//       };
//     };

//     // FIXED: Toggle item selection within category limits with proper enforcement
//     const toggleCategoryItemSelection = (categoryName: string, itemId: string) => {
//       const currentItems = currentSelectedItems[categoryName] || [];
//       const limit = selectionLimits[categoryName] || 1;
      
//       let newItems;
//       if (currentItems.includes(itemId)) {
//         // Remove item - always allowed
//         newItems = currentItems.filter(id => id !== itemId);
//       } else {
//         // Add item - only if under limit
//         if (currentItems.length >= limit) {
//           // Show alert or prevent selection
//           alert(`You can only select ${limit} item${limit > 1 ? 's' : ''} from ${categoryName}`);
//           return; // Don't allow selection beyond limit
//         }
//         newItems = [...currentItems, itemId];
//       }
      
//       handleCategoryItemsSelect(categoryName, newItems);
//     };

//     // Check if all categories meet their requirements
//     const isAllCategoriesComplete = () => {
//       // Only check categories that have items AND have selection limits
//       const categoriesToCheck = Object.keys(itemsByItemCategory).filter(categoryName => 
//         selectionLimits[categoryName] && itemsByItemCategory[categoryName].length > 0
//       );
      
//       if (categoriesToCheck.length === 0) return false;
      
//       return categoriesToCheck.every(categoryName => {
//         const validation = getCategoryValidation(categoryName);
//         return validation.isComplete;
//       });
//     };

//     // Debug logging
//     console.log(`=== ${mealKey.toUpperCase()} DEBUG ===`, {
//       categoryId: category.id,
//       selectedPackage: selectedPackage,
//       selectionLimits: selectionLimits,
//       itemsByItemCategory: itemsByItemCategory,
//       currentSelectedItems: currentSelectedItems,
//       availableItems: availableItems.length
//     });

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
//                   onClick={() => handleCuisineSelect(cuisine.id)}
//                   className={`p-3 rounded-lg border text-left transition-colors ${
//                     config.cuisine_type_id === cuisine.id
//                       ? 'border-amber-500 bg-amber-50 text-amber-700'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
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
//                   : `No ${mealKey} packages available${config.cuisine_type_id ? ' for selected cuisine' : ''}`
//                 }
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 {filteredPackages.map(pkg => (
//                   <button
//                     key={pkg.id}
//                     onClick={() => handlePackageSelect(pkg.id)}
//                     className={`p-4 rounded-lg border text-left transition-colors ${
//                       config.package_id === pkg.id
//                         ? 'border-amber-500 bg-amber-50'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
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

//         {/* Category-wise Items Selection - FIXED */}
//         {selectedPackage && Object.keys(itemsByItemCategory).length > 0 && (
//           <div>
//             <label className="block text-sm font-medium mb-4">
//               {needsCuisineSelection ? 'Step 3: ' : 'Step 2: '}Select Items by Category:
//             </label>
            
//             {/* Render each category that has items */}
//             <div className="space-y-6">
//               {Object.entries(itemsByItemCategory).map(([categoryName, items]) => {
//                 // Only show categories that have items
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

//                     {/* Progress Bar for this category (only if has selection limit) */}
//                     {hasSelectionLimit && (
//                       <div className="mb-4">
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full transition-all duration-300 ${
//                               validation.isComplete ? 'bg-green-500' : 'bg-amber-500'
//                             }`}
//                             style={{ 
//                               width: `${Math.min((validation.selectedCount / validation.limit) * 100, 100)}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Items Grid for this category */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {items.map(item => {
//                         const isSelected = currentCategoryItems.includes(item.id.toString());
//                         const canSelect = !isSelected && (hasSelectionLimit ? validation.canAddMore : true);
                        
//                         return (
//                           <div
//                             key={item.id}
//                             className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
//                               isSelected
//                                 ? 'border-amber-500 bg-amber-50 shadow-md'
//                                 : canSelect
//                                 ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
//                                 : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
//                             }`}
//                             onClick={() => {
//                               if (isSelected || canSelect) {
//                                 toggleCategoryItemSelection(categoryName, item.id.toString());
//                               }
//                             }}
//                           >
//                             {/* Item Image */}
//                             {item.image_url && (
//                               <img
//                                 src={item.image_url}
//                                 alt={item.name}
//                                 className="w-14 h-14 object-cover rounded-lg"
//                                 onError={(e) => {
//                                   e.currentTarget.style.display = 'none';
//                                 }}
//                               />
//                             )}
                            
//                             {/* Item Details */}
//                             <div className="flex-1">
//                               <div className="font-medium text-gray-800">{item.name}</div>
//                               <div className="text-sm text-gray-600">{item.description}</div>
//                               <div className="text-xs text-gray-400 mt-1">Category: {item.item_category}</div>
//                             </div>
                            
//                             {/* Selection Indicator */}
//                             {isSelected && (
//                               <CheckCircle2 className="w-5 h-5 text-amber-600" />
//                             )}
//                             {!canSelect && !isSelected && hasSelectionLimit && (
//                               <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
//                                 <span className="text-xs text-gray-500">✕</span>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/* Category validation alert (only if has selection limit) */}
//                     {hasSelectionLimit && validation.hasError && (
//                       <Alert variant="destructive" className="mt-3">
//                         <AlertCircle className="h-4 w-4" />
//                         <AlertDescription>
//                           Please select {validation.limit - validation.selectedCount} more item{validation.limit - validation.selectedCount > 1 ? 's' : ''} from {categoryName.replace('mainCourse', 'Main Course')}.
//                         </AlertDescription>
//                       </Alert>
//                     )}

//                     {/* Category completion indicator (only if has selection limit) */}
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
//   };

//   return (
//     <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
//       <div className="flex items-center space-x-2 mb-4">
//         <Calendar className="w-5 h-5 text-gray-600" />
//         <h5 className="font-semibold text-gray-800">
//           {format(date, 'EEEE, MMMM d, yyyy')}
//         </h5>
//       </div>

//       <Tabs defaultValue={activeMeals[0]} className="w-full">
//         <TabsList className={`grid w-full ${
//           activeMeals.length === 1 ? 'grid-cols-1' : 
//           activeMeals.length === 2 ? 'grid-cols-2' : 
//           activeMeals.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
//         }`}>
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


// ------------------------------------


import React from 'react';
import { format } from 'date-fns';
import { Calendar, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  foodCategoriesForDate: (date: Date) => string[];
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
  foodCategoriesForDate
}) => {
  const availableMealsForDate = foodCategoriesForDate(date);
  const activeMeals = Object.entries(selectedMeals)
    .filter(([mealKey, selected]) => selected && availableMealsForDate.includes(mealKey))
    .map(([mealKey]) => mealKey);

  if (activeMeals.length === 0) {
    return (
      <Alert className="mb-4">
        <AlertDescription>
          No meals available for {format(date, 'MMMM d, yyyy')} based on your booking duration.
        </AlertDescription>
      </Alert>
    );
  }

  const MealConfigSection = ({ mealKey }: { mealKey: string }) => {
    const category = foodCategories.find(cat => cat.key_name === mealKey);
    
    if (!category) {
      return <div className="text-red-500">Category not found for {mealKey}</div>;
    }

    const allPackagesForThisCategory = (packagesByCategory[category.id] || []).filter(pkg => pkg.is_active === 1);
    const config = getDayMealConfig(date, mealKey);

    // Helper function to safely get selection limits
    const getSelectionLimits = (limits: any) => {
      if (!limits) return {};
      
      if (typeof limits === 'string') {
        try {
          return JSON.parse(limits);
        } catch (e) {
          console.error('Error parsing selection limits:', e);
          return {};
        }
      }
      
      return limits; // Already an object
    };

    const handlePackageSelect = (packageId: number) => {
      updateDayMealConfig(date, mealKey, {
        ...config,
        package_id: packageId,
        cuisine_type_id: config.cuisine_type_id,
        selected_items: {} // Reset as object with categories: {starters: [], mainCourse: [], desserts: []}
      });
    };

    const handleCuisineSelect = (cuisineTypeId: number) => {
      updateDayMealConfig(date, mealKey, {
        ...config,
        cuisine_type_id: cuisineTypeId,
        package_id: null,
        selected_items: {}
      });
    };

    // Handle category-wise item selection
    const handleCategoryItemsSelect = (categoryName: string, selectedItems: string[]) => {
      const currentSelection = config.selected_items || {};
      updateDayMealConfig(date, mealKey, {
        ...config,
        selected_items: {
          ...currentSelection,
          [categoryName]: selectedItems
        }
      });
    };

    const needsCuisineSelection = mealKey !== 'breakfast';
    
    const getFilteredPackages = () => {
      let filteredPackages = allPackagesForThisCategory;
      
      if (needsCuisineSelection && config.cuisine_type_id) {
        filteredPackages = filteredPackages.filter(pkg => 
          pkg.cuisine_type_id === config.cuisine_type_id
        );
      }
      
      if (needsCuisineSelection && !config.cuisine_type_id) {
        filteredPackages = [];
      }
      
      return filteredPackages;
    };

    const filteredPackages = getFilteredPackages();
    const selectedPackage = filteredPackages.find(pkg => pkg.id === config.package_id);
    const availableItems = selectedPackage ? (itemsByPackage[selectedPackage.id] || []).filter(item => item.is_active === 1) : [];

    // Get selection limits from the selected package (category-wise)
    const selectionLimits = selectedPackage ? getSelectionLimits(selectedPackage.selection_limits) : {};
    
    // Current selection state (category-wise)
    const currentSelectedItems = config.selected_items || {};

    // Group items by their item_category field - Show ALL categories that have items
    const itemsByItemCategory: Record<string, any[]> = {};
    
    // First, group all available items by their category
    availableItems.forEach(item => {
      const itemCategory = item.item_category || 'other';
      if (!itemsByItemCategory[itemCategory]) {
        itemsByItemCategory[itemCategory] = [];
      }
      itemsByItemCategory[itemCategory].push(item);
    });

    // Get category validation info
    const getCategoryValidation = (categoryName: string) => {
      const limit = selectionLimits[categoryName] || 1;
      const selectedCount = currentSelectedItems[categoryName]?.length || 0;
      return {
        limit,
        selectedCount,
        isComplete: selectedCount >= limit,
        hasError: selectedCount < limit,
        canAddMore: selectedCount < limit
      };
    };

    // Toggle item selection within category limits with proper enforcement
    const toggleCategoryItemSelection = (categoryName: string, itemId: string) => {
      const currentItems = currentSelectedItems[categoryName] || [];
      const limit = selectionLimits[categoryName] || 1;
      
      let newItems;
      if (currentItems.includes(itemId)) {
        // Remove item - always allowed
        newItems = currentItems.filter(id => id !== itemId);
      } else {
        // Add item - only if under limit
        if (currentItems.length >= limit) {
          // Show alert or prevent selection
          alert(`You can only select ${limit} item${limit > 1 ? 's' : ''} from ${categoryName}`);
          return; // Don't allow selection beyond limit
        }
        newItems = [...currentItems, itemId];
      }
      
      handleCategoryItemsSelect(categoryName, newItems);
    };

    // Check if all categories meet their requirements
    const isAllCategoriesComplete = () => {
      // Only check categories that have items AND have selection limits
      const categoriesToCheck = Object.keys(itemsByItemCategory).filter(categoryName => 
        selectionLimits[categoryName] && itemsByItemCategory[categoryName].length > 0
      );
      
      if (categoriesToCheck.length === 0) return false;
      
      return categoriesToCheck.every(categoryName => {
        const validation = getCategoryValidation(categoryName);
        return validation.isComplete;
      });
    };

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
                  onClick={() => handleCuisineSelect(cuisine.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    config.cuisine_type_id === cuisine.id
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
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
                  : `No ${mealKey} packages available${config.cuisine_type_id ? ' for selected cuisine' : ''}`
                }
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredPackages.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      config.package_id === pkg.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
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
            
            {/* Render each category that has items */}
            <div className="space-y-6">
              {Object.entries(itemsByItemCategory).map(([categoryName, items]) => {
                // Only show categories that have items
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

                    {/* Progress Bar for this category (only if has selection limit) */}
                    {hasSelectionLimit && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              validation.isComplete ? 'bg-green-500' : 'bg-amber-500'
                            }`}
                            style={{ 
                              width: `${Math.min((validation.selectedCount / validation.limit) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Items Grid for this category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {items.map(item => {
                        const isSelected = currentCategoryItems.includes(item.id.toString());
                        const canSelect = !isSelected && (hasSelectionLimit ? validation.canAddMore : true);
                        
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50 shadow-md'
                                : canSelect
                                ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                                : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => {
                              if (isSelected || canSelect) {
                                toggleCategoryItemSelection(categoryName, item.id.toString());
                              }
                            }}
                          >
                            {/* Item Details */}
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                              <div className="text-xs text-gray-400 mt-1">Category: {item.item_category}</div>
                            </div>
                            
                            {/* Selection Indicator */}
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-amber-600" />
                            )}
                            {!canSelect && !isSelected && hasSelectionLimit && (
                              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-gray-500">✕</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Category validation alert (only if has selection limit) */}
                    {hasSelectionLimit && validation.hasError && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please select {validation.limit - validation.selectedCount} more item{validation.limit - validation.selectedCount > 1 ? 's' : ''} from {categoryName.replace('mainCourse', 'Main Course')}.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Category completion indicator (only if has selection limit) */}
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
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h5 className="font-semibold text-gray-800">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h5>
      </div>

      <Tabs defaultValue={activeMeals[0]} className="w-full">
        <TabsList className={`grid w-full ${
          activeMeals.length === 1 ? 'grid-cols-1' : 
          activeMeals.length === 2 ? 'grid-cols-2' : 
          activeMeals.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
        }`}>
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