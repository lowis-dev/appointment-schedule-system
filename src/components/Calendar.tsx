import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfWeek, addDays, isSameMonth } from 'date-fns';
import { generateCalendarDays } from '@/utils/dateUtils';
import { CalendarDay } from '@/types/appointment';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    setDays(generateCalendarDays(currentMonth));
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getDayClass = (day: CalendarDay) => {
    let baseClass = "calendar-day ";
    
    if (day.isToday) {
      baseClass += "calendar-day-today ";
    } else if (selectedDate && day.date.toDateString() === selectedDate.toDateString()) {
      baseClass += "calendar-day-selected ";
    } else if (!day.isAvailable || day.appointmentCount >= 8) {
      baseClass += "calendar-day-booked ";
    } else {
      baseClass += "calendar-day-available ";
    }

    return baseClass;
  };

  // Generate calendar grid with leading/trailing days
  const generateCalendarGrid = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDate = startOfWeek(monthStart);
    const calendarDays = [];

    for (let i = 0; i < 42; i++) {
      const day = addDays(startDate, i);
      const dayData = days.find(d => d.date.toDateString() === day.toDateString()) || {
        date: day,
        isToday: false,
        isAvailable: false,
        appointmentCount: 8,
      };
      
      calendarDays.push(dayData);
    }

    return calendarDays;
  };

  const calendarGrid = generateCalendarGrid();

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-card p-6 fade-in">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousMonth}
          className="hover-invert p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextMonth}
          className="hover-invert p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => (
          <div
            key={index}
            className={`${getDayClass(day)} ${
              !isSameMonth(day.date, currentMonth) ? 'opacity-30' : ''
            }`}
            onClick={() => {
              if (day.isAvailable && day.appointmentCount < 8 && isSameMonth(day.date, currentMonth)) {
                onDateSelect(day.date);
              }
            }}
          >
            {format(day.date, 'd')}
            {!day.isAvailable && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-booked rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-background border border-border rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted rounded"></div>
          <span>Fully Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-today rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};