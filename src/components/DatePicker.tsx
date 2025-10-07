// import React, { useState, useEffect, useCallback } from 'react';
// import { format, startOfMonth, endOfMonth, isSameDay, isBefore, isAfter } from 'date-fns';
// import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// interface DatePickerProps {
//   selectedStartDate: Date | null;
//   selectedEndDate: Date | null;
//   onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
//   className?: string;
//   isPackageSelected: boolean; // New prop to track if package is selected
// }

// const DatePicker: React.FC<DatePickerProps> = ({
//   selectedStartDate,
//   selectedEndDate,
//   onDateSelect,
//   className = "",
//   isPackageSelected // Receive the package selection status
// }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [blockedDates, setBlockedDates] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectingEndDate, setSelectingEndDate] = useState(false);

//   // Fetch blocked dates for current month
//   const fetchBlockedDates = useCallback(async (month: Date) => {
//     try {
//       setLoading(true);
//       const startDate = startOfMonth(month);
//       const endDate = endOfMonth(month);
      
//       const response = await fetch(
//         `https://admin.webhostdevs.com/api/date-blocks/get-availability.php?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
//       );
      
//       const data = await response.json();
//       if (data.status === 'success') {
//         const blocked = data.data.blocked_dates.map((d: any) => d.blocked_date);
//         setBlockedDates(blocked);
//       }
//     } catch (error) {
//       console.error('Error fetching blocked dates:', error);
//       toast.error('Failed to load availability');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBlockedDates(currentMonth);
//   }, [currentMonth, fetchBlockedDates]);

//   // Check if date is blocked
//   const isBlocked = (date: Date): boolean => {
//     const dateStr = format(date, 'yyyy-MM-dd');
//     return blockedDates.includes(dateStr);
//   };

//   // Check if date is selectable (not past, not blocked)
//   const isSelectable = (date: Date): boolean => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
//     // For today, check if it's after 2 PM (14:00)
//     if (isSameDay(date, today)) {
//       const currentHour = now.getHours();
//       if (currentHour >= 14) { // After 2 PM, block today
//         return false;
//       }
//     }
    
//     // Block past dates
//     if (isBefore(date, today)) return false;
    
//     // Block if already booked
//     if (isBlocked(date)) return false;
    
//     return true;
//   };
  
//   // Add this function to check if any dates in range are blocked
//   const isRangeBlocked = (start: Date, end: Date): boolean => {
//     let current = new Date(start);
//     while (current <= end) {
//       if (isBlocked(current)) {
//         return true;
//       }
//       current.setDate(current.getDate() + 1);
//     }
//     return false;
//   };
  
//   // Handle date click - 24 hours only (range selection)
//   const handleDateClick = (date: Date) => {
//     // Check if package is selected
//     if (!isPackageSelected) {
//       toast.error('Please select a package first');
//       return;
//     }
    
//     if (!isSelectable(date)) {
//       if (isBlocked(date)) {
//         toast.error('This date is already booked!');
//       } else {
//         toast.error('Cannot select past dates');
//       }
//       return;
//     }
    
//     // If clicking on already selected start date, clear selection
//     if (selectedStartDate && isSameDay(date, selectedStartDate)) {
//       onDateSelect(null, null);
//       setSelectingEndDate(false);
//       return;
//     }

//     // If clicking on already selected end date, clear selection
//     if (selectedEndDate && isSameDay(date, selectedEndDate)) {
//       onDateSelect(null, null);
//       setSelectingEndDate(false);
//       return;
//     }
    
//     // For 24 hours only, range selection
//     if (!selectedStartDate) {
//       // First click - select start date
//       onDateSelect(date, null);
//       setSelectingEndDate(true);
//     } else if (!selectedEndDate && selectingEndDate) {
//       // Second click - select end date
//       const rangeStart = isBefore(date, selectedStartDate) ? date : selectedStartDate;
//       const rangeEnd = isBefore(date, selectedStartDate) ? selectedStartDate : date;
      
//       if (isRangeBlocked(rangeStart, rangeEnd)) {
//         toast.error('Some dates in this range are already booked!');
//         return;
//       }
      
//       if (isBefore(date, selectedStartDate)) {
//         // End date before start - swap them
//         onDateSelect(date, selectedStartDate);
//         setSelectingEndDate(false);
//       } else {
//         // Normal case - end after start
//         onDateSelect(selectedStartDate, date);
//         setSelectingEndDate(false);
//       }
//     } else {
//       // Already have both dates - clicking any date starts new selection
//       // Start new selection
//       onDateSelect(date, null);
//       setSelectingEndDate(true);
//     }
//   };

//   // Check if date is in selected range
//   const isInRange = (date: Date): boolean => {
//     if (!selectedStartDate) return false;
//     if (!selectedEndDate) return isSameDay(date, selectedStartDate);
    
//     return (isSameDay(date, selectedStartDate) || isAfter(date, selectedStartDate)) &&
//            (isSameDay(date, selectedEndDate) || isBefore(date, selectedEndDate));
//   };

//   // Get date style classes
//   const getDateClasses = (date: Date): string => {
//     const isToday = isSameDay(date, new Date());
//     const isSelected = (selectedStartDate && isSameDay(date, selectedStartDate)) || 
//                       (selectedEndDate && isSameDay(date, selectedEndDate));
//     const inRange = isInRange(date);
//     const blocked = isBlocked(date);
//     const selectable = isSelectable(date);

//     let classes = "w-8 h-8 flex items-center justify-center text-sm rounded cursor-pointer transition-colors ";

//     if (!selectable) {
//       classes += "text-gray-400 bg-gray-100 cursor-not-allowed ";
//       if (blocked) {
//         classes += "!bg-red-100 !text-red-600 ";
//       }
//     } else if (!isPackageSelected) {
//       classes += "text-gray-400 bg-gray-100 cursor-not-allowed ";
//     } else if (isSelected) {
//       classes += "bg-amber-500 text-white font-bold ";
//     } else if (inRange) {
//       classes += "bg-amber-100 text-amber-800 ";
//     } else {
//       classes += "text-gray-700 hover:bg-amber-50 ";
//       if (isToday) {
//         classes += "ring-1 ring-amber-300 font-medium ";
//       }
//     }

//     return classes;
//   };

//   // Generate calendar days for current month only
//   const generateCalendarDays = () => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);
//     const days = [];

//     // Add empty cells for days before month starts
//     for (let i = 0; i < start.getDay(); i++) {
//       days.push(null);
//     }

//     // Add all days of the month
//     for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
//       days.push(new Date(date));
//     }

//     return days;
//   };

//   const calendarDays = generateCalendarDays();

//   return (
//     <div className={`bg-white rounded-lg border p-4 ${className}`}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
//           className="p-1 hover:bg-gray-100 rounded"
//           disabled={loading}
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>
        
//         <div className="flex items-center space-x-2">
//           <Calendar className="w-4 h-4 text-amber-600" />
//           <h3 className="font-medium text-sm">{format(currentMonth, 'MMMM yyyy')}</h3>
//         </div>
        
//         <button
//           onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
//           className="p-1 hover:bg-gray-100 rounded"
//           disabled={loading}
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Info */}
//       <div className="mb-3 p-2 bg-amber-50 rounded text-xs text-amber-800">
//         {!isPackageSelected 
//           ? 'Please select a package first' 
//           : selectingEndDate 
//             ? 'Now select check-out date' 
//             : 'Select check-in and check-out dates'
//         }
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="text-center py-2 text-xs text-gray-600">
//           Loading...
//         </div>
//       )}

//       {/* Days header */}
//       <div className="grid grid-cols-7 gap-1 mb-2">
//         {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
//           <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Calendar grid */}
//       <div className="grid grid-cols-7 gap-1">
//         {calendarDays.map((date, index) => (
//           <div key={index}>
//             {date ? (
//               <div
//                 className={getDateClasses(date)}
//                 onClick={() => handleDateClick(date)}
//                 title={!isPackageSelected ? 'Select a package first' : isBlocked(date) ? 'Already booked' : format(date, 'MMMM d, yyyy')}
//               >
//                 {format(date, 'd')}
//               </div>
//             ) : (
//               <div className="w-8 h-8"></div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Selected dates display */}
//       {selectedStartDate && (
//         <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-800">
//           <strong>Selected:</strong> {format(selectedStartDate, 'MMM d')}
//           {selectedEndDate && selectedEndDate !== selectedStartDate && (
//             <span> - {format(selectedEndDate, 'MMM d')}</span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatePicker;







import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, isSameDay, isBefore, isAfter } from 'date-fns';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface DatePickerProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
  className?: string;
  isPackageSelected: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  className = "",
  isPackageSelected
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectingEndDate, setSelectingEndDate] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeField, setActiveField] = useState<'checkin' | 'checkout' | null>(null);

  // Fetch blocked dates for current month
  const fetchBlockedDates = useCallback(async (month: Date) => {
    try {
      setLoading(true);
      const startDate = startOfMonth(month);
      const endDate = endOfMonth(month);
      
      const response = await fetch(
        `https://admin.webhostdevs.com/api/date-blocks/get-availability.php?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
      );
      
      const data = await response.json();
      if (data.status === 'success') {
        const blocked = data.data.blocked_dates.map((d: any) => d.blocked_date);
        setBlockedDates(blocked);
      }
    } catch (error) {
      console.error('Error fetching blocked dates:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isCalendarOpen) {
      fetchBlockedDates(currentMonth);
    }
  }, [currentMonth, isCalendarOpen, fetchBlockedDates]);

  // Navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Toggle calendar visibility
  const toggleCalendar = (field?: 'checkin' | 'checkout') => {
    if (!isPackageSelected) {
      toast.error('Please select a package first');
      return;
    }
    
    if (field) {
      setActiveField(field);
      if (field === 'checkout') {
        setSelectingEndDate(true);
      } else {
        setSelectingEndDate(false);
      }
    }
    
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Check if date is blocked
  const isBlocked = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return blockedDates.includes(dateStr);
  };

  // Check if date is selectable
  const isSelectable = (date: Date): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (isSameDay(date, today)) {
      const currentHour = now.getHours();
      if (currentHour >= 11) return false;
    }
    
    if (isBefore(date, today)) return false;
    if (isBlocked(date)) return false;
    
    // NEW LOGIC: If selecting checkout date, it must be after checkin date
    if (selectingEndDate && selectedStartDate) {
      if (isSameDay(date, selectedStartDate) || isBefore(date, selectedStartDate)) {
        return false;
      }
    }
    
    return true;
  };

  // Check if range is blocked
  const isRangeBlocked = (start: Date, end: Date): boolean => {
    let current = new Date(start);
    while (current <= end) {
      if (isBlocked(current)) return true;
      current.setDate(current.getDate() + 1);
    }
    return false;
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!isPackageSelected) {
      toast.error('Please select a package first');
      return;
    }
    
    if (!isSelectable(date)) {
      if (isBlocked(date)) {
        toast.error('This date is already booked!');
      } else if (selectingEndDate && selectedStartDate && isSameDay(date, selectedStartDate)) {
        toast.error('Check-out date must be after check-in date');
      } else if (selectingEndDate && selectedStartDate && isBefore(date, selectedStartDate)) {
        toast.error('Check-out date must be after check-in date');
      } else {
        toast.error('Cannot select past dates');
      }
      return;
    }
    
    // Handle based on active field or current state
    if (activeField === 'checkin' || (!selectedStartDate && !selectingEndDate)) {
      onDateSelect(date, null);
      setSelectingEndDate(true);
      setActiveField('checkout');
      toast.success('Now select your check-out date (must be after check-in)');
      return;
    }
    
    if (activeField === 'checkout' || selectingEndDate) {
      if (selectedStartDate) {
        // UPDATED LOGIC: Don't allow same date selection
        if (isSameDay(date, selectedStartDate)) {
          toast.error('Check-out date must be after check-in date');
          return;
        }
        
        const rangeStart = selectedStartDate;
        const rangeEnd = date;
        
        if (isRangeBlocked(rangeStart, rangeEnd)) {
          toast.error('Some dates in this range are already booked!');
          return;
        }
        
        onDateSelect(rangeStart, rangeEnd);
        setSelectingEndDate(false);
        setActiveField(null);
        toast.success(`Selected: ${format(rangeStart, 'MMM d')} - ${format(rangeEnd, 'MMM d')}`);
        setTimeout(() => setIsCalendarOpen(false), 300);
      } else {
        onDateSelect(date, null);
        setSelectingEndDate(true);
      }
    }
  };

  // Check if date is in range
  const isInRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return (isAfter(date, selectedStartDate) && isBefore(date, selectedEndDate));
  };

  // Check if date is start of range
  const isStartDate = (date: Date): boolean => {
    return selectedStartDate ? isSameDay(date, selectedStartDate) : false;
  };

  // Check if date is end of range
  const isEndDate = (date: Date): boolean => {
    return selectedEndDate ? isSameDay(date, selectedEndDate) : false;
  };

  // Get date styling
  const getDateClasses = (date: Date): string => {
    const isToday = isSameDay(date, new Date());
    const inRange = isInRange(date);
    const isStart = isStartDate(date);
    const isEnd = isEndDate(date);
    const blocked = isBlocked(date);
    const selectable = isSelectable(date);

    let classes = "w-9 h-9 flex items-center justify-center text-sm rounded-md transition-all duration-200 ";

    if (!selectable) {
      classes += "text-gray-300 bg-gray-50 cursor-not-allowed ";
      if (blocked) {
        classes += "!bg-red-50 !text-red-400 line-through ";
      }
      // Special styling for dates that can't be selected due to checkout restriction
      if (selectingEndDate && selectedStartDate && (isSameDay(date, selectedStartDate) || isBefore(date, selectedStartDate))) {
        classes += "!bg-orange-50 !text-orange-400 ";
      }
    } else if (!isPackageSelected) {
      classes += "text-gray-300 bg-gray-50 cursor-not-allowed ";
    } else if (isStart || isEnd) {
      classes += "bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600 ";
    } else if (inRange) {
      classes += "bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 ";
    } else {
      classes += "text-gray-700 hover:bg-blue-50 cursor-pointer hover:text-blue-600 ";
      if (isToday) {
        classes += "ring-2 ring-blue-400 ";
      }
    }

    return classes;
  };

  // Generate days for a month
  const generateCalendarDays = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < start.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  // Format date for display
  const formatDateDisplay = (date: Date | null): string => {
    if (!date) return "Select Date";
    return format(date, 'd MMM yy');
  };

  // Clear selection
  const clearSelection = () => {
    onDateSelect(null, null);
    setSelectingEndDate(false);
    setActiveField(null);
    toast.success('Selection cleared');
  };

  return (
    <div className={`relative bg-white ${className}`}>
      {/* Header Buttons */}
      <div className="flex">
        {/* Check-In Button */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleCalendar('checkin')}
            className={`w-full p-4 text-left border border-gray-300 rounded-l-md transition-all duration-200 ${
              isPackageSelected 
                ? 'hover:border-blue-400 cursor-pointer' 
                : 'cursor-not-allowed opacity-60'
            } ${
              activeField === 'checkin' || (isCalendarOpen && !selectingEndDate)
                ? 'border-blue-500 bg-blue-50 z-10' 
                : selectedStartDate 
                ? 'bg-blue-50 border-blue-300' 
                : 'bg-white'
            }`}
            disabled={!isPackageSelected}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-blue-600 mb-1 flex items-center">
                  Check-In <ChevronDown className="w-3 h-3 ml-1" />
                </div>
                <div className={`text-base font-medium ${
                  selectedStartDate ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {formatDateDisplay(selectedStartDate)}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Check-Out Button */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleCalendar('checkout')}
            className={`w-full p-4 text-left border-l-0 border border-gray-300 rounded-r-md transition-all duration-200 ${
              isPackageSelected 
                ? 'hover:border-blue-400 cursor-pointer' 
                : 'cursor-not-allowed opacity-60'
            } ${
              activeField === 'checkout' || (selectingEndDate && selectedStartDate)
                ? 'border-blue-500 bg-orange-50 z-10 ring-2 ring-orange-200' 
                : selectedEndDate 
                ? 'bg-blue-50 border-blue-300' 
                : 'bg-white'
            }`}
            disabled={!isPackageSelected}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-xs font-medium mb-1 flex items-center ${
                  selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  Check-Out <ChevronDown className="w-3 h-3 ml-1" />
                  {selectingEndDate && selectedStartDate && (
                    <span className="ml-2 text-orange-600 animate-pulse">●</span>
                  )}
                </div>
                <div className={`text-base font-medium ${
                  selectedEndDate ? 'text-gray-900' : 
                  selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-gray-400'
                }`}>
                  {selectedEndDate ? formatDateDisplay(selectedEndDate) : 
                   selectingEndDate && selectedStartDate ? 'Select Checkout Date' : 'Select Date'}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isCalendarOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={loading}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <h3 className="text-lg font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>

              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={loading}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => (
                  <div key={index} className="flex justify-center">
                    {date ? (
                      <div
                        className={getDateClasses(date)}
                        onClick={() => handleDateClick(date)}
                        title={
                          !isPackageSelected ? 'Select a package first' : 
                          isBlocked(date) ? 'Already booked' : 
                          selectingEndDate && selectedStartDate && isSameDay(date, selectedStartDate) ? 'Cannot select same date for check-out' :
                          selectingEndDate && selectedStartDate && isBefore(date, selectedStartDate) ? 'Check-out must be after check-in' :
                          format(date, 'MMMM d, yyyy')
                        }
                      >
                        {format(date, 'd')}
                      </div>
                    ) : (
                      <div className="w-9 h-9" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Dates Summary */}
            {/* {(selectedStartDate || selectedEndDate) && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 text-center">
                  {selectedStartDate && selectedEndDate ? (
                    <>
                      <span className="font-semibold text-green-700">✓ Selected:</span>{' '}
                      {format(selectedStartDate, 'MMM d')} - {format(selectedEndDate, 'MMM d')}
                      <span className="text-blue-600 font-medium">
                        {' '}({Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))} nights)
                      </span>
                    </>
                  ) : selectedStartDate ? (
                    <>
                      <span className="font-semibold text-blue-700">Check-in:</span>{' '}
                      {format(selectedStartDate, 'MMM d')} 
                      <span className="text-orange-600"> → Select check-out date (next day or later)</span>
                    </>
                  ) : null}
                </p>
              </div>
            )} */}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {(selectedStartDate || selectedEndDate) && (
                <button
                  onClick={clearSelection}
                  className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Clear Selection
                </button>
              )}
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="flex-1 py-2 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Close Calendar
              </button>
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 rounded"></div>
                  <span>Range</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-50 rounded border border-red-200"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-50 rounded border border-orange-200"></div>
                  <span>Invalid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
