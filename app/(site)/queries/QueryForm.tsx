'use client';

import { useState } from 'react';
import { User, Mail, FileQuestion, HelpCircle, Send, CheckCircle2 } from 'lucide-react';

export default function QueryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Capture the form element before any await so it isn't lost
    const form = e.currentTarget;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset(); // Clear the form data

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Full Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              required
              className="block w-full rounded-2xl border-white/50 bg-white/60 py-3 pr-4 pl-12 text-gray-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors placeholder:text-gray-500 hover:bg-white/70 focus:border-orange-500 focus:ring-orange-500 sm:text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] dark:placeholder:text-gray-400 dark:hover:bg-white/[0.05] dark:focus:border-orange-500/50 dark:focus:ring-orange-500/50"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-200">
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              required
              className="block w-full rounded-2xl border-white/50 bg-white/60 py-3 pr-4 pl-12 text-gray-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors placeholder:text-gray-500 hover:bg-white/70 focus:border-orange-500 focus:ring-orange-500 sm:text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] dark:placeholder:text-gray-400 dark:hover:bg-white/[0.05] dark:focus:border-orange-500/50 dark:focus:ring-orange-500/50"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="topic" className="text-sm font-medium text-gray-900 dark:text-gray-200">
          Query Topic
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FileQuestion className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="topic"
            required
            defaultValue=""
            className="block w-full appearance-none rounded-2xl border-white/50 bg-white/60 py-3 pr-4 pl-12 text-gray-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors placeholder:text-gray-500 hover:bg-white/70 focus:border-orange-500 focus:ring-orange-500 sm:text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] dark:placeholder:text-gray-400 dark:hover:bg-white/[0.05] dark:focus:border-orange-500/50 dark:focus:ring-orange-500/50"
          >
            <option value="" disabled>
              Select a topic...
            </option>
            <option value="events">Events & Workshops</option>
            <option value="technical">Technical AWS Question</option>
            <option value="membership">Club Membership</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-gray-200">
          Your Message
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute top-3 left-0 flex items-start pl-4">
            <HelpCircle className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="message"
            required
            rows={5}
            className="block w-full rounded-2xl border-white/50 bg-white/60 py-3 pr-4 pl-12 text-gray-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors placeholder:text-gray-500 hover:bg-white/70 focus:border-orange-500 focus:ring-orange-500 sm:text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] dark:placeholder:text-gray-400 dark:hover:bg-white/[0.05] dark:focus:border-orange-500/50 dark:focus:ring-orange-500/50"
            placeholder="How can I get my AWS Educate account approved?"
          />
        </div>
      </div>

      {isSuccess && (
        <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-sm font-medium">
            Query submitted successfully! We&apos;ll get back to you soon.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition-all hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:bg-orange-500 dark:hover:bg-orange-400"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isSubmitting ? 'Sending...' : 'Send Query'}
          {!isSubmitting && (
            <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </span>
        {!isSubmitting && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        )}
      </button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        This form is currently a mockup. Backend integration coming in Phase 3.
      </p>
    </form>
  );
}
