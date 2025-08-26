import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, isSameDay, isBefore, isAfter } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface DatePickerProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
  durationType: '12_hours' | '24_hours';
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  durationType,
  className = ""
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectingEndDate, setSelectingEndDate] = useState(false);

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
    fetchBlockedDates(currentMonth);
  }, [currentMonth, fetchBlockedDates]);

  // Check if date is blocked
  const isBlocked = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return blockedDates.includes(dateStr);
  };

  // Check if date is selectable (not past, not blocked)
  const isSelectable = (date: Date): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // For today, check if it's after 2 PM (14:00)
    if (isSameDay(date, today)) {
      const currentHour = now.getHours();
      if (currentHour >= 14) { // After 2 PM, block today
        return false;
      }
    }
    
    // Block past dates
    if (isBefore(date, today)) return false;
    
    // Block if already booked
    if (isBlocked(date)) return false;
    
    return true;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (!isSelectable(date)) {
      if (isBlocked(date)) {
        toast.error('This date is already booked!');
      } else {
        toast.error('Cannot select past dates');
      }
      return;
    }

    if (durationType === '12_hours') {
      // For 12 hours, just single date selection
      if (selectedStartDate && isSameDay(date, selectedStartDate)) {
        // Clicking the same date unselects it
        onDateSelect(null, null);
      } else {
        // Select new date
        onDateSelect(date, date);
      }
    } else {
      // For 24 hours, range selection
      if (!selectedStartDate) {
        // First click - select start date
        onDateSelect(date, null);
        setSelectingEndDate(true);
      } else if (!selectedEndDate && selectingEndDate) {
        // Second click - select end date
        if (isSameDay(date, selectedStartDate)) {
          // Clicking same date as start - make it single day
          onDateSelect(selectedStartDate, selectedStartDate);
          setSelectingEndDate(false);
        } else if (isBefore(date, selectedStartDate)) {
          // End date before start - swap them
          onDateSelect(date, selectedStartDate);
          setSelectingEndDate(false);
        } else {
          // Normal case - end after start
          onDateSelect(selectedStartDate, date);
          setSelectingEndDate(false);
        }
      } else {
        // Already have both dates - clicking any date starts new selection
        if ((selectedStartDate && isSameDay(date, selectedStartDate)) || 
            (selectedEndDate && isSameDay(date, selectedEndDate))) {
          // Clicking on selected date - clear selection
          onDateSelect(null, null);
          setSelectingEndDate(false);
        } else {
          // Start new selection
          onDateSelect(date, null);
          setSelectingEndDate(true);
        }
      }
    }
  };

  // Check if date is in selected range
  const isInRange = (date: Date): boolean => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return isSameDay(date, selectedStartDate);
    
    return (isSameDay(date, selectedStartDate) || isAfter(date, selectedStartDate)) &&
           (isSameDay(date, selectedEndDate) || isBefore(date, selectedEndDate));
  };

  // Get date style classes
  const getDateClasses = (date: Date): string => {
    const isToday = isSameDay(date, new Date());
    const isSelected = (selectedStartDate && isSameDay(date, selectedStartDate)) || 
                      (selectedEndDate && isSameDay(date, selectedEndDate));
    const inRange = isInRange(date);
    const blocked = isBlocked(date);
    const selectable = isSelectable(date);

    let classes = "w-8 h-8 flex items-center justify-center text-sm rounded cursor-pointer transition-colors ";

    if (!selectable) {
      classes += "text-gray-400 bg-gray-100 cursor-not-allowed ";
      if (blocked) {
        classes += "!bg-red-100 !text-red-600 ";
      }
    } else if (isSelected) {
      classes += "bg-amber-500 text-white font-bold ";
    } else if (inRange && durationType === '24_hours') {
      classes += "bg-amber-100 text-amber-800 ";
    } else {
      classes += "text-gray-700 hover:bg-amber-50 ";
      if (isToday) {
        classes += "ring-1 ring-amber-300 font-medium ";
      }
    }

    return classes;
  };

  // Generate calendar days for current month only
  const generateCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
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

  const calendarDays = generateCalendarDays();

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-1 hover:bg-gray-100 rounded"
          disabled={loading}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-amber-600" />
          <h3 className="font-medium text-sm">{format(currentMonth, 'MMMM yyyy')}</h3>
        </div>
        
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-1 hover:bg-gray-100 rounded"
          disabled={loading}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="mb-3 p-2 bg-amber-50 rounded text-xs text-amber-800">
        {durationType === '12_hours' 
          ? 'Select your event date'
          : selectingEndDate 
            ? 'Now select check-out date' 
            : 'Select check-in and check-out dates'
        }
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-2 text-xs text-gray-600">
          Loading...
        </div>
      )}

      {/* Days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <div key={index}>
            {date ? (
              <div
                className={getDateClasses(date)}
                onClick={() => handleDateClick(date)}
                title={isBlocked(date) ? 'Already booked' : format(date, 'MMMM d, yyyy')}
              >
                {format(date, 'd')}
              </div>
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
        ))}
      </div>

      {/* Selected dates display */}
      {selectedStartDate && (
        <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-800">
          <strong>Selected:</strong> {format(selectedStartDate, 'MMM d')}
          {selectedEndDate && selectedEndDate !== selectedStartDate && (
            <span> - {format(selectedEndDate, 'MMM d')}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
