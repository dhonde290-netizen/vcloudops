import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Ask a Query',
  description: 'Submit a question to the AWS Cloud Club VIT Pune team.',
};

export default function QueriesPage() {
  return (
    <ComingSoon
      pageName="Student Queries"
      description="Have a question about AWS, the club, or an upcoming event? Ask the team directly."
      phase="Phase 3"
    />
  );
}
