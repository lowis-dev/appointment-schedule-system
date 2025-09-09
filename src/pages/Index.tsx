import { useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { LandingPage } from '@/pages/LandingPage';
import { Calendar } from '@/components/Calendar';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { BookingForm } from '@/components/BookingForm';
import { ConfirmationScreen } from '@/components/ConfirmationScreen';
import { AdminView } from '@/components/AdminView';
import { Appointment, ServiceType } from '@/types/appointment';
import { Button } from '@/components/ui/button';

type Step = 'landing' | 'calendar' | 'time' | 'form' | 'confirmation' | 'admin';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Mock data for demo
    {
      id: '1',
      name: 'John Smith',
      service: 'Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      service: 'Cleaning',
      date: '2024-01-15',
      time: '2:30 PM',
      status: 'confirmed'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      service: 'Adjustment',
      date: '2024-01-16',
      time: '9:00 AM',
      status: 'pending'
    }
  ]);
  const [currentBooking, setCurrentBooking] = useState<Appointment | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep('form');
  };

  const handleBookingSubmit = (data: { name: string; service: ServiceType }) => {
    if (!selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      name: data.name,
      service: data.service,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'confirmed'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setCurrentBooking(newAppointment);
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentBooking(null);
    setCurrentStep('landing');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onBookAppointment={() => setCurrentStep('calendar')} />;
      
      case 'calendar':
        return (
          <div className="py-12 px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Select Date</h1>
              <p className="text-muted-foreground">Choose an available date for your appointment</p>
            </div>
            <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          </div>
        );
      
      case 'time':
        return selectedDate ? (
          <div className="py-12 px-4">
            <TimeSlotPicker 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
            />
          </div>
        ) : null;
      
      case 'form':
        return selectedDate && selectedTime ? (
          <div className="py-12 px-4">
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleBookingSubmit}
            />
          </div>
        ) : null;
      
      case 'confirmation':
        return currentBooking ? (
          <div className="py-12 px-4">
            <ConfirmationScreen
              appointment={currentBooking}
              onNewBooking={handleNewBooking}
            />
          </div>
        ) : null;
      
      case 'admin':
        return (
          <div className="py-12 px-4">
            <AdminView appointments={appointments} />
          </div>
        );
      
      default:
        return <LandingPage onBookAppointment={() => setCurrentStep('calendar')} />;
    }
  };

  return (
    <Layout>
      {/* Navigation */}
      {currentStep !== 'landing' && (
        <nav className="bg-card border-b border-border px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep('landing')}
                className="hover-invert"
              >
                ← Home
              </Button>
              
              {currentStep !== 'admin' && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={currentStep === 'calendar' ? 'text-foreground font-medium' : ''}>
                    Date
                  </span>
                  <span>→</span>
                  <span className={currentStep === 'time' ? 'text-foreground font-medium' : ''}>
                    Time
                  </span>
                  <span>→</span>
                  <span className={currentStep === 'form' ? 'text-foreground font-medium' : ''}>
                    Details
                  </span>
                  <span>→</span>
                  <span className={currentStep === 'confirmation' ? 'text-foreground font-medium' : ''}>
                    Confirm
                  </span>
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentStep('admin')}
              className="hover-invert text-sm"
            >
              Admin View
            </Button>
          </div>
        </nav>
      )}

      {renderStep()}
    </Layout>
  );
};

export default Index;
