import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Join the Club',
  description: 'How to join AWS Cloud Club at VIT Pune — membership info and application.',
};

export default function JoinPage() {
  return (
    <ComingSoon
      pageName="Join the Club"
      description="Learn how to become a member of AWS Cloud Club VIT Pune."
      phase="Phase 4"
    />
  );
}
