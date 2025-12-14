import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import type { Task } from '../lib/supabase';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': undefined,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface TaskCalendarProps {
  tasks: Task[];
  onSelectTask?: (task: Task) => void;
}

interface CalendarEvent extends Event {
  resource: Task;
}

export function TaskCalendar({ tasks, onSelectTask }: TaskCalendarProps) {
  const events: CalendarEvent[] = useMemo(() => {
    return tasks.map(task => ({
      title: task.title,
      start: new Date(task.due_date),
      end: new Date(task.due_date),
      resource: task,
    }));
  }, [tasks]);

  const eventStyleGetter = (event: CalendarEvent) => {
    const task = event.resource;
    let backgroundColor = '#3b82f6';

    if (task.is_completed) {
      backgroundColor = '#10b981';
    } else if (task.is_highlighted) {
      backgroundColor = '#f59e0b';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: task.is_completed ? 0.6 : 1,
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event: CalendarEvent) => onSelectTask && onSelectTask(event.resource)}
      />
    </div>
  );
}
