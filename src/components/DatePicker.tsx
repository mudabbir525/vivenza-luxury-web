// import React, { useState, useEffect, useCallback } from 'react';
// import { format, startOfMonth, endOfMonth, addMonths, isSameDay, isBefore, isAfter } from 'date-fns';
// import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// interface DatePickerProps {
//   selectedStartDate: Date | null;
//   selectedEndDate: Date | null;
//   onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
//   className?: string;
//   isPackageSelected: boolean;
// }

// const DatePicker: React.FC<DatePickerProps> = ({
//   selectedStartDate,
//   selectedEndDate,
//   onDateSelect,
//   className = "",
//   isPackageSelected
// }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [blockedDates, setBlockedDates] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectingEndDate, setSelectingEndDate] = useState(false);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [activeField, setActiveField] = useState<'checkin' | 'checkout' | null>(null);

//   // Fetch blocked dates for current month
//   const fetchBlockedDates = useCallback(async (month: Date) => {
//     try {
//       setLoading(true);
//       const startDate = startOfMonth(month);
//       const endDate = endOfMonth(month);
      
//       const response = await fetch(
//         `https://vivenza.adminmahaspice.in/api/date-blocks/get-availability.php?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
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
//     if (isCalendarOpen) {
//       fetchBlockedDates(currentMonth);
//     }
//   }, [currentMonth, isCalendarOpen, fetchBlockedDates]);

//   // Navigation
//   const handlePreviousMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, -1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1));
//   };

//   // Toggle calendar visibility
//   const toggleCalendar = (field?: 'checkin' | 'checkout') => {
//     if (!isPackageSelected) {
//       toast.error('Please select a package first');
//       return;
//     }
    
//     if (field) {
//       setActiveField(field);
//       if (field === 'checkout') {
//         setSelectingEndDate(true);
//       } else {
//         setSelectingEndDate(false);
//       }
//     }
    
//     setIsCalendarOpen(!isCalendarOpen);
//   };

//   // Check if date is blocked
//   const isBlocked = (date: Date): boolean => {
//     const dateStr = format(date, 'yyyy-MM-dd');
//     return blockedDates.includes(dateStr);
//   };

//   // Check if date is selectable
//   const isSelectable = (date: Date): boolean => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
//     if (isSameDay(date, today)) {
//       const currentHour = now.getHours();
//       if (currentHour >= 11) return false;
//     }
    
//     if (isBefore(date, today)) return false;
//     if (isBlocked(date)) return false;
    
//     // NEW LOGIC: If selecting checkout date, it must be after checkin date
//     if (selectingEndDate && selectedStartDate) {
//       if (isSameDay(date, selectedStartDate) || isBefore(date, selectedStartDate)) {
//         return false;
//       }
//     }
    
//     return true;
//   };

//   // Check if range is blocked
//   const isRangeBlocked = (start: Date, end: Date): boolean => {
//     let current = new Date(start);
//     while (current <= end) {
//       if (isBlocked(current)) return true;
//       current.setDate(current.getDate() + 1);
//     }
//     return false;
//   };

//   // Handle date selection
//   const handleDateClick = (date: Date) => {
//     if (!isPackageSelected) {
//       toast.error('Please select a package first');
//       return;
//     }
    
//     if (!isSelectable(date)) {
//       if (isBlocked(date)) {
//         toast.error('This date is already booked!');
//       } else if (selectingEndDate && selectedStartDate && isSameDay(date, selectedStartDate)) {
//         toast.error('Check-out date must be after check-in date');
//       } else if (selectingEndDate && selectedStartDate && isBefore(date, selectedStartDate)) {
//         toast.error('Check-out date must be after check-in date');
//       } else {
//         toast.error('Cannot select past dates');
//       }
//       return;
//     }
    
//     // Handle based on active field or current state
//     if (activeField === 'checkin' || (!selectedStartDate && !selectingEndDate)) {
//       onDateSelect(date, null);
//       setSelectingEndDate(true);
//       setActiveField('checkout');
//       toast.success('Now select your check-out date (must be after check-in)');
//       return;
//     }
    
//     if (activeField === 'checkout' || selectingEndDate) {
//       if (selectedStartDate) {
//         // UPDATED LOGIC: Don't allow same date selection
//         if (isSameDay(date, selectedStartDate)) {
//           toast.error('Check-out date must be after check-in date');
//           return;
//         }
        
//         const rangeStart = selectedStartDate;
//         const rangeEnd = date;
        
//         if (isRangeBlocked(rangeStart, rangeEnd)) {
//           toast.error('Some dates in this range are already booked!');
//           return;
//         }
        
//         onDateSelect(rangeStart, rangeEnd);
//         setSelectingEndDate(false);
//         setActiveField(null);
//         toast.success(`Selected: ${format(rangeStart, 'MMM d')} - ${format(rangeEnd, 'MMM d')}`);
//         setTimeout(() => setIsCalendarOpen(false), 300);
//       } else {
//         onDateSelect(date, null);
//         setSelectingEndDate(true);
//       }
//     }
//   };

//   // Check if date is in range
//   const isInRange = (date: Date): boolean => {
//     if (!selectedStartDate || !selectedEndDate) return false;
//     return (isAfter(date, selectedStartDate) && isBefore(date, selectedEndDate));
//   };

//   // Check if date is start of range
//   const isStartDate = (date: Date): boolean => {
//     return selectedStartDate ? isSameDay(date, selectedStartDate) : false;
//   };

//   // Check if date is end of range
//   const isEndDate = (date: Date): boolean => {
//     return selectedEndDate ? isSameDay(date, selectedEndDate) : false;
//   };

//   // Get date styling
//   const getDateClasses = (date: Date): string => {
//     const isToday = isSameDay(date, new Date());
//     const inRange = isInRange(date);
//     const isStart = isStartDate(date);
//     const isEnd = isEndDate(date);
//     const blocked = isBlocked(date);
//     const selectable = isSelectable(date);

//     let classes = "w-9 h-9 flex items-center justify-center text-sm rounded-md transition-all duration-200 ";

//     if (!selectable) {
//       classes += "text-gray-300 bg-gray-50 cursor-not-allowed ";
//       if (blocked) {
//         classes += "!bg-red-50 !text-red-400 line-through ";
//       }
//       // Special styling for dates that can't be selected due to checkout restriction
//       if (selectingEndDate && selectedStartDate && (isSameDay(date, selectedStartDate) || isBefore(date, selectedStartDate))) {
//         classes += "!bg-orange-50 !text-orange-400 ";
//       }
//     } else if (!isPackageSelected) {
//       classes += "text-gray-300 bg-gray-50 cursor-not-allowed ";
//     } else if (isStart || isEnd) {
//       classes += "bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600 ";
//     } else if (inRange) {
//       classes += "bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 ";
//     } else {
//       classes += "text-gray-700 hover:bg-blue-50 cursor-pointer hover:text-blue-600 ";
//       if (isToday) {
//         classes += "ring-2 ring-blue-400 ";
//       }
//     }

//     return classes;
//   };

//   // Generate days for a month
//   const generateCalendarDays = (month: Date) => {
//     const start = startOfMonth(month);
//     const end = endOfMonth(month);
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

//   const calendarDays = generateCalendarDays(currentMonth);

//   // Format date for display - MODIFIED FUNCTION
//   const formatDateDisplay = (date: Date | null, type: 'checkin' | 'checkout' = 'checkin'): string => {
//     if (!date) return "Select Date";
//     const time = type === 'checkin' ? '12:00 PM' : '11:00 AM';
//     return `${format(date, 'd MMM yy')} • ${time}`;
//   };

//   // Clear selection
//   const clearSelection = () => {
//     onDateSelect(null, null);
//     setSelectingEndDate(false);
//     setActiveField(null);
//     toast.success('Selection cleared');
//   };

//   return (
//     <div className={`relative bg-white ${className}`}>
//       {/* Header Buttons */}
//       <div className="flex">
//         {/* Check-In Button */}
//         <div className="flex-1 relative">
//           <button
//             onClick={() => toggleCalendar('checkin')}
//             className={`w-full p-4 text-left border border-gray-300 rounded-l-md transition-all duration-200 ${
//               isPackageSelected 
//                 ? 'hover:border-blue-400 cursor-pointer' 
//                 : 'cursor-not-allowed opacity-60'
//             } ${
//               activeField === 'checkin' || (isCalendarOpen && !selectingEndDate)
//                 ? 'border-blue-500 bg-blue-50 z-10' 
//                 : selectedStartDate 
//                 ? 'bg-blue-50 border-blue-300' 
//                 : 'bg-white'
//             }`}
//             disabled={!isPackageSelected}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-xs font-medium text-blue-600 mb-1 flex items-center">
//                   Check-In <ChevronDown className="w-3 h-3 ml-1" />
//                 </div>
//                 <div className={`text-base font-medium ${
//                   selectedStartDate ? 'text-gray-900' : 'text-gray-400'
//                 }`}>
//                   {formatDateDisplay(selectedStartDate, 'checkin')}
//                 </div>
//               </div>
//             </div>
//           </button>
//         </div>

//         {/* Check-Out Button */}
//         <div className="flex-1 relative">
//           <button
//             onClick={() => toggleCalendar('checkout')}
//             className={`w-full p-4 text-left border-l-0 border border-gray-300 rounded-r-md transition-all duration-200 ${
//               isPackageSelected 
//                 ? 'hover:border-blue-400 cursor-pointer' 
//                 : 'cursor-not-allowed opacity-60'
//             } ${
//               activeField === 'checkout' || (selectingEndDate && selectedStartDate)
//                 ? 'border-blue-500 bg-orange-50 z-10 ring-2 ring-orange-200' 
//                 : selectedEndDate 
//                 ? 'bg-blue-50 border-blue-300' 
//                 : 'bg-white'
//             }`}
//             disabled={!isPackageSelected}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className={`text-xs font-medium mb-1 flex items-center ${
//                   selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-blue-600'
//                 }`}>
//                   Check-Out <ChevronDown className="w-3 h-3 ml-1" />
//                   {selectingEndDate && selectedStartDate && (
//                     <span className="ml-2 text-orange-600 animate-pulse">●</span>
//                   )}
//                 </div>
//                 <div className={`text-base font-medium ${
//                   selectedEndDate ? 'text-gray-900' : 
//                   selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-gray-400'
//                 }`}>
//                   {selectedEndDate ? formatDateDisplay(selectedEndDate, 'checkout') : 
//                    selectingEndDate && selectedStartDate ? 'Select Checkout Date' : 'Select Date'}
//                 </div>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Calendar Dropdown */}
//       {isCalendarOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
//           <div className="p-4">
//             {/* Month Navigation */}
//             <div className="flex items-center justify-between mb-4">
//               <button
//                 onClick={handlePreviousMonth}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 disabled={loading}
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               </button>
              
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {format(currentMonth, 'MMMM yyyy')}
//               </h3>

//               <button
//                 onClick={handleNextMonth}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 disabled={loading}
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Calendar Grid */}
//             <div className="mb-4">
//               <div className="grid grid-cols-7 gap-1 mb-2">
//                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
//                   <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
//                     {day}
//                   </div>
//                 ))}
//               </div>
              
//               <div className="grid grid-cols-7 gap-1">
//                 {calendarDays.map((date, index) => (
//                   <div key={index} className="flex justify-center">
//                     {date ? (
//                       <div
//                         className={getDateClasses(date)}
//                         onClick={() => handleDateClick(date)}
//                         title={
//                           !isPackageSelected ? 'Select a package first' : 
//                           isBlocked(date) ? 'Already booked' : 
//                           selectingEndDate && selectedStartDate && isSameDay(date, selectedStartDate) ? 'Cannot select same date for check-out' :
//                           selectingEndDate && selectedStartDate && isBefore(date, selectedStartDate) ? 'Check-out must be after check-in' :
//                           format(date, 'MMMM d, yyyy')
//                         }
//                       >
//                         {format(date, 'd')}
//                       </div>
//                     ) : (
//                       <div className="w-9 h-9" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-2">
//               {(selectedStartDate || selectedEndDate) && (
//                 <button
//                   onClick={clearSelection}
//                   className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                 >
//                   Clear Selection
//                 </button>
//               )}
//               <button
//                 onClick={() => setIsCalendarOpen(false)}
//                 className="flex-1 py-2 px-4 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
//               >
//                 Close Calendar
//               </button>
//             </div>

//             {/* Legend */}
//             <div className="mt-4 pt-3 border-t border-gray-200">
//               <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                   <span>Selected</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 bg-blue-100 rounded"></div>
//                   <span>Range</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 bg-red-50 rounded border border-red-200"></div>
//                   <span>Booked</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 bg-orange-50 rounded border border-orange-200"></div>
//                   <span>Invalid</span>
//                 </div>
//               </div>
//             </div>
//           </div>
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
        `https://vivenza.adminmahaspice.in/api/date-blocks/get-availability.php?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
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

    let classes = "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-xs sm:text-sm rounded-md transition-all duration-200 ";

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
        classes += "ring-1 sm:ring-2 ring-blue-400 ";
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

  // Format date for display - MODIFIED FUNCTION
  const formatDateDisplay = (date: Date | null, type: 'checkin' | 'checkout' = 'checkin'): string => {
    if (!date) return "Select Date";
    const time = type === 'checkin' ? '12:00 PM' : '11:00 AM';
    return `${format(date, 'd MMM yy')} • ${time}`;
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
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        {/* Check-In Button */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleCalendar('checkin')}
            className={`w-full p-3 sm:p-4 text-left border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none transition-all duration-200 ${
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
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-blue-600 mb-1 flex items-center">
                  Check-In <ChevronDown className="w-3 h-3 ml-1 flex-shrink-0" />
                </div>
                <div className={`text-sm sm:text-base font-medium truncate ${
                  selectedStartDate ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {formatDateDisplay(selectedStartDate, 'checkin')}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Check-Out Button */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleCalendar('checkout')}
            className={`w-full p-3 sm:p-4 text-left border border-gray-300 rounded-md sm:rounded-r-md sm:rounded-l-none sm:border-l-0 transition-all duration-200 ${
              isPackageSelected 
                ? 'hover:border-blue-400 cursor-pointer' 
                : 'cursor-not-allowed opacity-60'
            } ${
              activeField === 'checkout' || (selectingEndDate && selectedStartDate)
                ? 'border-blue-500 bg-orange-50 z-10 ring-1 sm:ring-2 ring-orange-200' 
                : selectedEndDate 
                ? 'bg-blue-50 border-blue-300' 
                : 'bg-white'
            }`}
            disabled={!isPackageSelected}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium mb-1 flex items-center ${
                  selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  Check-Out <ChevronDown className="w-3 h-3 ml-1 flex-shrink-0" />
                  {selectingEndDate && selectedStartDate && (
                    <span className="ml-2 text-orange-600 animate-pulse">●</span>
                  )}
                </div>
                <div className={`text-sm sm:text-base font-medium truncate ${
                  selectedEndDate ? 'text-gray-900' : 
                  selectingEndDate && selectedStartDate ? 'text-orange-600' : 'text-gray-400'
                }`}>
                  {selectedEndDate ? formatDateDisplay(selectedEndDate, 'checkout') : 
                   selectingEndDate && selectedStartDate ? 'Select Checkout Date' : 'Select Date'}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isCalendarOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mx-2 sm:mx-0">
          <div className="p-3 sm:p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <button
                onClick={handlePreviousMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                disabled={loading}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center px-2">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>

              <button
                onClick={handleNextMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                disabled={loading}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-3 sm:mb-4">
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-1 sm:py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
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
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              {(selectedStartDate || selectedEndDate) && (
                <button
                  onClick={clearSelection}
                  className="flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation"
                >
                  Clear Selection
                </button>
              )}
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors touch-manipulation"
              >
                Close Calendar
              </button>
            </div>

            {/* Legend */}
            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 sm:space-x-4 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded flex-shrink-0"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-100 rounded flex-shrink-0"></div>
                  <span>Range</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-50 rounded border border-red-200 flex-shrink-0"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-50 rounded border border-orange-200 flex-shrink-0"></div>
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
