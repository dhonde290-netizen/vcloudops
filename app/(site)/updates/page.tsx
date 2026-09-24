import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Updates',
  description:
    'Latest updates — winners, weekend challenges, and announcements from AWS Cloud Club VIT Pune.',
};

export default function UpdatesPage() {
  return (
    <ComingSoon
      pageName="Updates Feed"
      description="Club announcements, challenge winners, and weekly highlights will appear here."
      phase="Phase 2"
    />
  );
}
