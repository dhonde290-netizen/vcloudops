import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Workshop archive — recordings, slides, and resources from AWS Cloud Club VIT Pune.',
};

export default function WorkshopsPage() {
  return (
    <ComingSoon
      pageName="Workshops Archive"
      description="Past workshop recordings, slides, and resources will be searchable here."
      phase="Phase 2"
    />
  );
}
