import { Button } from '@/components/ui/button';
import { Calendar, Clock, Shield, Users } from 'lucide-react';

interface LandingPageProps {
  onBookAppointment: () => void;
}

export const LandingPage = ({ onBookAppointment }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Health Care
            <span className="block text-muted-foreground">Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your appointment instantly with our streamlined scheduling system. 
            Professional care, convenient booking.
          </p>

          <Button
            onClick={onBookAppointment}
            size="lg"
            className="hover-invert text-lg px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Book Appointment
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience healthcare scheduling reimagined with our modern, efficient approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Easy Scheduling',
                description: 'Book appointments in seconds with our intuitive calendar interface'
              },
              {
                icon: Clock,
                title: 'Flexible Hours',
                description: '30-minute slots available from 7:30 AM to 5:00 PM daily'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your personal information is protected with enterprise-grade security'
              },
              {
                icon: Users,
                title: 'Expert Care',
                description: 'Professional healthcare providers committed to your wellbeing'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-card shadow-minimal hover:shadow-card transition-all duration-300 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of patients who trust us with their healthcare needs
          </p>
          <Button
            onClick={onBookAppointment}
            variant="outline"
            size="lg"
            className="hover-invert text-lg px-8 py-4"
          >
            Schedule Your Visit
          </Button>
        </div>
      </section>
    </div>
  );
};