import { SmartImage } from "./smart-image";

// Clean framed portrait. Flat, no rings, no glow, no gradient.
export function PortraitRing({ image, alt }: { image: unknown; alt?: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-full border border-line bg-surface-2 sm:max-w-[380px] lg:max-w-[440px]">
      <SmartImage
        image={image}
        alt={alt}
        fill
        priority
        sizes="(max-width: 640px) 320px, 440px"
        className="object-cover"
      />
    </div>
  );
}
