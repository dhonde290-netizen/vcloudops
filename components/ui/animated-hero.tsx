'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      'cloud architecture',
      'serverless apps',
      'machine learning',
      'DevOps pipelines',
      'your future',
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col items-center justify-center pt-8 pb-16 lg:pt-12 lg:pb-20">
          {/* Animated Background Blobs */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute -top-[250px] -left-[300px] h-[600px] w-[600px] animate-pulse rounded-full bg-orange-500/30 blur-[140px] dark:bg-orange-500/20"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="absolute top-[50px] left-[150px] h-[450px] w-[450px] animate-pulse rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/10"
              style={{ animationDuration: '5s' }}
            />
            <div
              className="absolute -top-[150px] left-[200px] h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/30 blur-[130px] dark:bg-blue-500/20"
              style={{ animationDuration: '6s' }}
            />
          </div>

          {/* Card Wrapper */}
          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-8 overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-b from-white/60 to-white/30 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl md:p-16 dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
            {/* Subtle inner shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20 dark:from-white/5 dark:to-white/5" />

            {/* Inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/50 ring-inset dark:ring-white/10" />

            <div className="relative z-10 flex w-full flex-col items-center gap-8">
              <div>
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-gradient-to-r from-orange-50/50 to-amber-50/50 px-5 py-2 text-sm font-bold text-orange-700 shadow-sm backdrop-blur-md dark:border-orange-800/50 dark:from-orange-950/50 dark:to-amber-950/50 dark:text-orange-300">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                    aria-hidden="true"
                  />
                  VIT Pune&apos;s Official AWS Student Club
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h1 className="font-regular max-w-3xl text-center text-5xl tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="text-gray-900 dark:text-white">Learn how to build</span>
                  <span className="relative flex h-[1.2em] w-full justify-center overflow-hidden text-center text-orange-500 md:pt-1 md:pb-4">
                    &nbsp;
                    {titles.map((title, index) => (
                      <motion.span
                        key={index}
                        className="absolute font-bold drop-shadow-sm"
                        initial={{ opacity: 0, y: '-100' }}
                        transition={{ type: 'spring', stiffness: 50 }}
                        animate={
                          titleNumber === index
                            ? {
                                y: 0,
                                opacity: 1,
                              }
                            : {
                                y: titleNumber > index ? -150 : 150,
                                opacity: 0,
                              }
                        }
                      >
                        {title}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed tracking-tight text-gray-700 md:text-xl dark:text-gray-300">
                  Workshops, hands-on labs, weekly challenges, and a community of cloud enthusiasts
                  — all free for VIT students. Join us to learn real-world cloud skills and prepare
                  for your tech career.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/events"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl ring-1 shadow-orange-500/30 ring-white/20 transition-all duration-300 ring-inset hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
                >
                  Upcoming Events
                  <MoveRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/workshops"
                  className="group flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-b from-white/60 to-white/30 px-8 py-3.5 text-sm font-bold text-gray-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/80 hover:bg-white/50 hover:shadow-xl focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-gray-200 dark:hover:border-white/20 dark:hover:bg-white/10"
                >
                  Explore Workshops
                  <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
