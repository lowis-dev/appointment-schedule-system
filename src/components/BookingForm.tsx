import { useState } from 'react';
import { formatDate } from '@/utils/dateUtils';
import { ServiceType } from '@/types/appointment';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (data: { name: string; service: ServiceType }) => void;
}

const services: ServiceType[] = ['Adjustment', 'Cleaning', 'Consultation', 'Follow-up', 'Emergency'];

export const BookingForm = ({ selectedDate, selectedTime, onSubmit }: BookingFormProps) => {
  const [name, setName] = useState('');
  const [service, setService] = useState<ServiceType>('Consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({ name: name.trim(), service });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-card p-6 slide-up">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service *
          </label>
          <div className="relative">
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value as ServiceType)}
              className="form-select"
              required
            >
              {services.map((serviceOption) => (
                <option key={serviceOption} value={serviceOption}>
                  {serviceOption}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          className="w-full mt-6 hover-invert py-3 text-base font-medium"
        >
          {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
        </Button>
      </form>
    </div>
  );
};