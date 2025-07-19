import React from 'react';
import { CalendarBooking } from '@/components/calendar-booking';
import { Navigation } from '@/components/navigation';

export function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <Navigation />
      <div className="pt-20">
        <CalendarBooking />
      </div>
    </div>
  );
}

