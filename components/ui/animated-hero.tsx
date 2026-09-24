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
              className="absolute -top-[200px] -left-[200px] h-[400px] w-[400px] animate-pulse rounded-full bg-orange-500/20 blur-[120px]"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="absolute top-[0px] left-[100px] h-[300px] w-[300px] animate-pulse rounded-full bg-purple-500/20 blur-[100px]"
              style={{ animationDuration: '5s' }}
            />
            <div
              className="absolute -top-[100px] left-[200px] h-[350px] w-[350px] animate-pulse rounded-full bg-blue-500/20 blur-[120px]"
              style={{ animationDuration: '6s' }}
            />
          </div>

          {/* Card Wrapper */}
          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-8 overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-8 shadow-2xl backdrop-blur-xl md:p-16 dark:border-white/10 dark:bg-black/40">
            {/* Subtle inner shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20 dark:from-white/5 dark:to-white/5" />

            <div className="relative z-10 flex w-full flex-col items-center gap-8">
              <div>
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-4 py-1.5 text-sm font-medium text-orange-700 shadow-sm backdrop-blur-md dark:border-orange-800/50 dark:bg-orange-950/50 dark:text-orange-300">
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

              <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/events"
                  className="group flex items-center gap-2 rounded-full bg-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-500/40 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
                >
                  Upcoming Events
                  <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/workshops"
                  className="group flex items-center gap-2 rounded-full border border-gray-300/50 bg-white/50 px-8 py-3.5 text-sm font-bold text-gray-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-md focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none dark:border-white/10 dark:bg-black/50 dark:text-gray-200 dark:hover:bg-black/80"
                >
                  Explore Workshops
                  <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
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
