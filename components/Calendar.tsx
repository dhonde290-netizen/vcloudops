'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import type { Event } from '@/lib/content';

const EVENT_TYPE_LABELS: Record<string, { label: string; className: string }> = {
  workshop: {
    label: 'Workshop',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  session: {
    label: 'Session',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  },
  challenge: {
    label: 'Challenge',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  meetup: {
    label: 'Meetup',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
};

interface CalendarProps {
  events: Event[];
}

export function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    // Start at current month, or the month of the next upcoming event if future
    const now = new Date();
    const upcoming = events.filter((e) => new Date(e.date) >= now);
    return upcoming.length > 0 ? new Date(upcoming[0].date) : now;
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Month navigation
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  // Calendar math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  // Padding for start of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Find events for a specific day
  const getEventsForDay = (date: Date | null) => {
    if (!date) return [];
    return events.filter((e) => {
      const eDate = new Date(e.date);
      return (
        eDate.getFullYear() === date.getFullYear() &&
        eDate.getMonth() === date.getMonth() &&
        eDate.getDate() === date.getDate()
      );
    });
  };

  const selectedEvents = getEventsForDay(selectedDate);
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="mt-6 rounded-3xl border border-white/40 bg-white/40 p-4 shadow-xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-black/40">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/50 text-gray-500 shadow-sm transition-all hover:bg-gray-100 hover:text-gray-900 dark:border-white/10 dark:bg-black/20 dark:text-gray-400 dark:hover:border-white/20 dark:hover:bg-black/40 dark:hover:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={nextMonth}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/50 text-gray-500 shadow-sm transition-all hover:bg-gray-100 hover:text-gray-900 dark:border-white/10 dark:bg-black/20 dark:text-gray-400 dark:hover:border-white/20 dark:hover:bg-black/40 dark:hover:text-white"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Grid header */}
      <div className="grid grid-cols-7 gap-1 pb-2 text-center text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Grid days */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="h-12 sm:h-16" />;

          const dayEvents = getEventsForDay(date);
          const hasEvents = dayEvents.length > 0;
          const isSelected = selectedDate?.getTime() === date.getTime();
          const today = isToday(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(isSelected ? null : date)}
              disabled={!hasEvents}
              className={`relative flex h-12 flex-col items-center justify-center rounded-xl border text-sm transition-all sm:h-16 ${
                !hasEvents
                  ? 'cursor-default border-white/20 bg-white/20 text-gray-400 dark:border-white/5 dark:bg-white/5 dark:text-gray-600'
                  : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
              } ${
                hasEvents && !isSelected
                  ? 'border-white/60 bg-white/60 font-semibold text-gray-900 shadow-sm hover:border-orange-300 dark:border-white/10 dark:bg-black/50 dark:text-white dark:hover:border-orange-500/50'
                  : ''
              } ${
                isSelected
                  ? 'z-10 border-orange-500 bg-gradient-to-br from-orange-400 to-orange-600 font-bold text-white shadow-lg ring-2 shadow-orange-500/25 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900'
                  : ''
              } ${
                today && !isSelected
                  ? 'z-10 border-orange-500 bg-orange-50 font-black text-orange-600 ring-2 ring-orange-500 ring-offset-2 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-offset-gray-900'
                  : ''
              }`}
            >
              <span>{date.getDate()}</span>
              {hasEvents && (
                <span className="absolute bottom-2 flex gap-1">
                  {dayEvents.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-orange-500'}`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="animate-in slide-in-from-top-2 fade-in mt-8 duration-200">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </h3>
          </div>
          <ul className="space-y-3">
            {selectedEvents.map((event) => {
              const typeInfo = EVENT_TYPE_LABELS[event.type];
              return (
                <li key={event.slug}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group flex flex-col justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-orange-300 hover:bg-white/60 hover:shadow-md sm:flex-row sm:items-center dark:border-white/10 dark:bg-black/40 dark:hover:border-orange-500/50 dark:hover:bg-black/60"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${typeInfo.className}`}
                        >
                          {typeInfo.label}
                        </span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleTimeString('en-IN', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                        {event.title}
                      </h4>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400">
                        <MapPin className="h-3.5 w-3.5 text-orange-500" />
                        {event.location}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors group-hover:bg-orange-500 group-hover:text-white dark:bg-black dark:text-gray-500">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
