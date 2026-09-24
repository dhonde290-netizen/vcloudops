/**
 * ComingSoon — used by shell pages during Phase 1.
 * Phase 2 replaces each page's content; this component is deleted then.
 */

interface ComingSoonProps {
  pageName: string;
  description: string;
  phase: string;
}

export default function ComingSoon({ pageName, description, phase }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="text-5xl" aria-hidden="true">
        🚧
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">{pageName}</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{description}</p>
      <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">Coming in {phase}</p>
    </div>
  );
}
