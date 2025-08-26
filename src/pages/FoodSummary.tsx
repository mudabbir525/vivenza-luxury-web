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
        .map(([mealKey]) => mealKey)
        .sort((a, b) => {
    const aCat = foodCategories.find(cat => cat.key_name === a);
    const bCat = foodCategories.find(cat => cat.key_name === b);
    return (aCat?.sort_order || 0) - (bCat?.sort_order || 0);
  });

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
