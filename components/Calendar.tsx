'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import type { Event } from '@/lib/content';

const EVENT_TYPE_LABELS: Record<string, { label: string; className: string }> = {
  workshop: {
    label: 'Workshop',
    className:
      'border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300',
  },
  session: {
    label: 'Session',
    className:
      'border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-300',
  },
  challenge: {
    label: 'Challenge',
    className:
      'border border-green-500/30 bg-green-500/10 text-green-700 dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300',
  },
  meetup: {
    label: 'Meetup',
    className:
      'border border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300',
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
    <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-4 shadow-2xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:from-white/10 dark:to-white/5">
      {/* Inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />
      <div className="relative z-10">
        {/* Header controls */}
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white/60 to-white/30 text-gray-600 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 hover:text-orange-600 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-gray-400 dark:hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={nextMonth}
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white/60 to-white/30 text-gray-600 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 hover:text-orange-600 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-gray-400 dark:hover:text-white"
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
                className={`relative flex h-12 flex-col items-center justify-center overflow-hidden rounded-[1rem] border text-sm transition-all duration-300 sm:h-16 ${
                  !hasEvents
                    ? 'cursor-default border-transparent bg-white/20 text-gray-400 dark:bg-white/5 dark:text-gray-600'
                    : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5'
                } ${
                  hasEvents && !isSelected
                    ? 'border-white/60 bg-gradient-to-b from-white/60 to-white/30 font-bold text-gray-900 shadow-sm backdrop-blur-md hover:border-orange-300 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-white dark:hover:border-orange-500/50'
                    : ''
                } ${
                  isSelected
                    ? 'z-10 border-transparent bg-gradient-to-br from-orange-500 to-amber-500 font-black text-white shadow-xl ring-1 shadow-orange-500/30 ring-white/30 ring-inset'
                    : ''
                } ${
                  today && !isSelected
                    ? 'z-10 border-orange-400 bg-orange-100/50 font-black text-orange-600 ring-1 ring-orange-400 ring-inset dark:bg-orange-500/20 dark:text-orange-400'
                    : ''
                }`}
              >
                <span className="relative z-10">{date.getDate()}</span>
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
                      className="group relative flex flex-col justify-between gap-4 overflow-hidden rounded-[1.25rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 sm:flex-row sm:items-center dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:hover:border-orange-500/50"
                    >
                      {/* Inner highlight */}
                      <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

                      <div className="relative z-10 flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <span
                              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md ${typeInfo.className}`}
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

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white dark:bg-white/10 dark:text-gray-300">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
