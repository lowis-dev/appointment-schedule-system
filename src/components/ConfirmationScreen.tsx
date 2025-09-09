import { Check } from 'lucide-react';
import { Appointment } from '@/types/appointment';
import { formatDate } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';

interface ConfirmationScreenProps {
  appointment: Appointment;
  onNewBooking: () => void;
}

export const ConfirmationScreen = ({ appointment, onNewBooking }: ConfirmationScreenProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-card p-8 text-center fade-in">
      <div className="mb-6">
        <div className="w-16 h-16 bg-available rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
        <p className="text-muted-foreground">
          Your appointment has been successfully booked.
        </p>
      </div>

      <div className="bg-secondary rounded-lg p-4 mb-6 text-left">
        <h3 className="font-semibold mb-3">Appointment Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{appointment.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-medium">{appointment.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{formatDate(new Date(appointment.date))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{appointment.time}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6">
        <p>Please arrive 10 minutes early for your appointment.</p>
        <p>You will receive a confirmation email shortly.</p>
      </div>

      <Button
        onClick={onNewBooking}
        variant="outline"
        className="w-full hover-invert"
      >
        Book Another Appointment
      </Button>
    </div>
  );
};