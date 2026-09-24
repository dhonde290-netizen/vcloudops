import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the core team and alumni of AWS Cloud Club VIT Pune.',
};

export default function TeamPage() {
  return (
    <ComingSoon
      pageName="Our Team"
      description="Meet the core team members and alumni who run the club."
      phase="Phase 2"
    />
  );
}
