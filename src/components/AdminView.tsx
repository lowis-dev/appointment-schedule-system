import { useState, useEffect } from 'react';
import { Appointment } from '@/types/appointment';
import { formatDate } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';

interface AdminViewProps {
  appointments: Appointment[];
}

export const AdminView = ({ appointments }: AdminViewProps) => {
  const [sortedAppointments, setSortedAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');

  useEffect(() => {
    let filtered = [...appointments];
    const today = new Date().toDateString();
    
    switch (filter) {
      case 'today':
        filtered = appointments.filter(apt => new Date(apt.date).toDateString() === today);
        break;
      case 'upcoming':
        filtered = appointments.filter(apt => new Date(apt.date) > new Date());
        break;
      default:
        break;
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setSortedAppointments(filtered);
  }, [appointments, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-available';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-booked';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-card rounded-lg shadow-card p-6 fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage all appointments</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({appointments.length})
        </Button>
        <Button
          variant={filter === 'today' ? 'default' : 'outline'}
          onClick={() => setFilter('today')}
          size="sm"
        >
          Today
        </Button>
        <Button
          variant={filter === 'upcoming' ? 'default' : 'outline'}
          onClick={() => setFilter('upcoming')}
          size="sm"
        >
          Upcoming
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Patient</th>
              <th className="text-left py-3 px-4 font-semibold">Service</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Time</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-border hover:bg-accent transition-colors"
              >
                <td className="py-3 px-4 font-medium">{appointment.name}</td>
                <td className="py-3 px-4">{appointment.service}</td>
                <td className="py-3 px-4">{formatDate(new Date(appointment.date))}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-secondary rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{appointment.name}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                  appointment.status
                )}`}
              >
                {appointment.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.service}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{formatDate(new Date(appointment.date))}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAppointments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No appointments found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};