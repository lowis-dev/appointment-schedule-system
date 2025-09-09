import { useState, useEffect } from 'react';
import { generateTimeSlots } from '@/utils/dateUtils';
import { TimeSlot } from '@/types/appointment';
import { formatDate } from '@/utils/dateUtils';

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export const TimeSlotPicker = ({ selectedDate, selectedTime, onTimeSelect }: TimeSlotPickerProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, [selectedDate]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-card p-6 slide-up">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Time</h2>
        <p className="text-muted-foreground">
          Choose an available time slot for {formatDate(selectedDate)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`time-slot ${
              slot.available 
                ? selectedTime === slot.time 
                  ? 'bg-primary text-primary-foreground' 
                  : 'time-slot-available'
                : 'time-slot-booked'
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {timeSlots.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No available time slots for this date.
        </div>
      )}

      <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-available rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-booked rounded"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};