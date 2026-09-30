import Link from "next/link";

function Logo() {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 13.5h3.2L6.6 5l2.9 11 2.6-7.2 1.7 4.7H19"
          stroke="currentColor"
          className="text-[#008654]"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

const brand = {
  name: "ApiMonitor",
  Logo,
} as const;

export function Branding() {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span>{<brand.Logo />}</span>
        <span>{brand.name}</span>
      </Link>
    </>
  );
}
