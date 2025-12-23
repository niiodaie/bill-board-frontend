import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarBooking } from '@/components/calendar-booking';
import { Navigation } from '@/components/navigation';
export function BookingPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900", children: [_jsx(Navigation, {}), _jsx("div", { className: "pt-20", children: _jsx(CalendarBooking, {}) })] }));
}
