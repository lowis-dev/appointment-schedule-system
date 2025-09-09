import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { CalendarDay, TimeSlot } from '@/types/appointment';

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 7;
  const startMinute = 30;
  const endHour = 17;
  const endMinute = 0;

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    const displayTime = format(new Date(2024, 0, 1, currentHour, currentMinute), 'h:mm a');
    
    slots.push({
      time: displayTime,
      available: Math.random() > 0.3, // Mock availability - 70% available
    });

    // Increment by 30 minutes
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour++;
    }
  }

  return slots;
};

export const generateCalendarDays = (currentDate: Date): CalendarDay[] => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return days.map(date => ({
    date,
    isToday: isToday(date),
    isAvailable: Math.random() > 0.2, // Mock availability - 80% available
    appointmentCount: Math.floor(Math.random() * 8), // Random appointment count
  }));
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

export const formatDateShort = (date: Date): string => {
  return format(date, 'MMM d');
};