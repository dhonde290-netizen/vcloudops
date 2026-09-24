import type { Metadata } from 'next';
import { MessageSquare, Sparkles, Mail, BookOpen, Clock } from 'lucide-react';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import QueryForm from './QueryForm';

export const metadata: Metadata = {
  title: 'Ask a Query',
  description: 'Submit a question to the AWS Cloud Club VIT Pune team.',
};

export default function QueriesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Premium Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <ScrollFade>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600 backdrop-blur-md dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-400">
              <Sparkles className="h-4 w-4" />
              <span>We&apos;re here to help</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Student{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Queries
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Have a question about AWS, the club, or an upcoming event? Ask the team directly.
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </ScrollFade>

        <div className="grid items-stretch gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Info Section (Left) */}
          <ScrollReveal className="h-full lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/[0.04]">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  How it works
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100/80 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)] dark:bg-orange-500/10 dark:text-orange-400 dark:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Submit your query
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Fill out the form with your details and question.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100/80 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)] dark:bg-orange-500/10 dark:text-orange-400 dark:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">We review</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Our core team members monitor queries daily.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100/80 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)] dark:bg-orange-500/10 dark:text-orange-400 dark:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.3)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Get an answer</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        We&apos;ll email you back directly with a detailed response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="group relative mt-auto overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/[0.04]">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  Common Topics
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" /> AWS Educate Accounts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Event Registration
                    Issues
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Certificates &
                    Rewards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Joining the Core Team
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Section (Right) */}
          <ScrollReveal delay={0.1} className="h-full lg:col-span-3">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:p-10 dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:bg-white/[0.04]">
              <QueryForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
