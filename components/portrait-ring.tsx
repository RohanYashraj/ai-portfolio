import { SmartImage } from "./smart-image";

// Circular portrait framed by slowly-orbiting dashed ultramarine rings.
// Flat strokes, no glow, no gradient. Rings hold still under reduced-motion.
export function PortraitRing({ image, alt }: { image: unknown; alt?: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]">
      <svg
        viewBox="0 0 100 100"
        className="ring-spin absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="var(--indigo)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="46 10 26 16 8 34 20 22"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="ring-spin-rev absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="44.5"
          fill="none"
          stroke="var(--indigo)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="3 20"
          opacity="0.65"
        />
      </svg>

      <div className="absolute inset-[9%] overflow-hidden rounded-full border-[1.5px] border-outline bg-surface-2">
        <SmartImage
          image={image}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 320px, 440px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
