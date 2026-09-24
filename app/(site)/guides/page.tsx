import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Setup Guides',
  description: 'Step-by-step AWS setup guides for VIT Pune students.',
};

export default function GuidesPage() {
  return (
    <ComingSoon
      pageName="Setup Guides"
      description="AWS account setup, billing alerts, CLI configuration, and more."
      phase="Phase 2"
    />
  );
}
