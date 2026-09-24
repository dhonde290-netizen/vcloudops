import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from AWS Cloud Club VIT Pune.',
};

export default function EventsPage() {
  return (
    <ComingSoon
      pageName="Events"
      description="Upcoming workshops, sessions, challenges, and meetups will appear here."
      phase="Phase 2"
    />
  );
}
