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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {foodCategories
      .filter(category => category.is_active === 1) // Only active meals
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(category => {
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
