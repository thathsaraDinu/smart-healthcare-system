import React, { useState, useEffect } from 'react';
import {
  Calendar,
  dateFnsLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import useAppointments from '@/hooks/useAppointments';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentsCalendar = () => {
  const { data } = useAppointments();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (data) {
      setEvents(
        data.map((item) => {
          // Parsing the date and time
          const dateStr = item.schedule.date; // E.g., "Wednesday, 23 Oct 2024"
          const timeStr = item.schedule.time; // E.g., "02:00 PM"

          // Parse the date
          const parsedDate = parse(
            dateStr,
            'EEEE, dd MMM yyyy',
            new Date(),
          );

          // Parse the time and combine with parsed date
          const [time, period] = timeStr.split(' ');
          const [hours, minutes] = time.split(':');
          let adjustedHours = parseInt(hours, 10);
          if (period === 'PM' && adjustedHours !== 12)
            adjustedHours += 12;
          if (period === 'AM' && adjustedHours === 12)
            adjustedHours = 0;

          // Set the hours and minutes
          parsedDate.setHours(adjustedHours);
          parsedDate.setMinutes(parseInt(minutes, 10));

          // Create the event object
          const event = {
            title: (
              <div className="text-xs">
                <p>
                  Appointment No: {item.appointmentNumber}
                </p>
                <p>{item.schedule.doctor.fullName}</p>
                <p>{item.schedule.hospital}</p>
                <p>{item.schedule.location}</p>
              </div>
            ),
            start: parsedDate, // Use the parsed date and time for start
            end: new Date(
              parsedDate.getTime() + 2 * 60 * 60 * 1000,
            ), // Example: Add 2 hours for the end time
            allDay: false,
          };

          return event;
        }),
      );
    }
  }, [data]);

  return (
    <div>
      <h2 className="font-semibold mb-4">
        My Appointments
      </h2>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          style={{ height: 700 }}
        />
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
