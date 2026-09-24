/**
 * Logo component — the single place to swap the club logo.
 *
 * BRANDING NOTE: The AWS Cloud Clubs logo guidelines are pending from the club lead.
 * Do NOT redesign or alter this component. When the official logo assets arrive:
 *   1. Add the SVG/PNG to /public/logo.*
 *   2. Replace the placeholder below with <Image src="/logo.svg" ... />
 *   3. Remove this comment block.
 *
 * All pages import Logo from here, so one change propagates everywhere.
 */

interface LogoProps {
  /** Controls the rendered width; height scales proportionally. Default: 40 */
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    // Placeholder logo: an orange cloud shape with "ACC" text inside.
    // Replace the entire <svg> block with your actual logo asset.
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS Cloud Club VIT Pune logo"
      role="img"
      className={className}
    >
      {/* Cloud shape */}
      <path
        d="M32 26H10C7.24 26 5 23.76 5 21c0-2.38 1.65-4.38 3.87-4.88C9.25 13.17 12.32 11 16 11c2.38 0 4.54.93 6.15 2.44C22.73 12.55 23.82 12 25 12c2.76 0 5 2.24 5 5 0 .34-.04.67-.1.99C31.16 18.36 33 20.03 33 22c0 2.21-2.24 4-5 4H32z"
        fill="#FF9900"
      />
      {/* "ACC" abbreviation — placeholder text */}
      <text
        x="50%"
        y="70%"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="white"
        fontFamily="system-ui, sans-serif"
      >
        ACC
      </text>
    </svg>
  );
}
