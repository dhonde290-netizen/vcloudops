import type { Metadata } from 'next';
import { getAllTeamMembers } from '@/lib/content';
import type { TeamMember } from '@/lib/content';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the core team and alumni of AWS Cloud Club VIT Pune.',
};

// SVG Icons
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.7 5.4 5.4 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
      <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
    </svg>
  );
}

// Initials avatar — used until the club has real profile photos
function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = size === 'lg' ? 'h-20 w-20 text-2xl' : 'h-16 w-16 text-lg';

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 font-bold text-white`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex h-full flex-col items-center rounded-2xl border border-white/40 bg-white/40 p-6 text-center shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/50 dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20 dark:hover:bg-black/50">
      <div className="relative mb-2 transition-transform duration-300 group-hover:scale-105">
        <Avatar name={member.name} />
      </div>
      <h2 className="mt-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
        {member.name}
      </h2>
      <p className="mt-1 text-sm font-bold text-orange-600 dark:text-orange-400">{member.role}</p>
      <p className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">{member.year}</p>

      {/* Social links */}
      <div className="mt-5 flex gap-4">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
            aria-label={`${member.name} on LinkedIn`}
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
            aria-label={`${member.name} on GitHub`}
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function TeamPage() {
  const allMembers = getAllTeamMembers();
  const core = allMembers.filter((m) => m.group === 'core');
  const alumni = allMembers.filter((m) => m.group === 'alumni');

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Our Team<span className="text-orange-500">.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            The people who make AWS Cloud Club VIT Pune happen.
          </p>
        </div>
      </ScrollReveal>

      {/* Core team */}
      <section className="mt-10" aria-labelledby="core-heading">
        <ScrollReveal delay={0.1}>
          <h2
            id="core-heading"
            className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Core Team {new Date().getFullYear()}–{new Date().getFullYear() + 1}
          </h2>
        </ScrollReveal>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4" role="list">
          {core.map((member, i) => (
            <ScrollReveal key={member.slug} delay={0.1 + i * 0.05}>
              <li className="h-full">
                <MemberCard member={member} />
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Alumni */}
      {alumni.length > 0 && (
        <section className="mt-16" aria-labelledby="alumni-heading">
          <ScrollReveal delay={0.1}>
            <h2
              id="alumni-heading"
              className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Alumni
            </h2>
          </ScrollReveal>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4" role="list">
            {alumni.map((member, i) => (
              <ScrollReveal key={member.slug} delay={0.1 + i * 0.05}>
                <li className="h-full">
                  <MemberCard member={member} />
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
