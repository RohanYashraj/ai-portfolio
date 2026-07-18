import { cx } from "@/lib/utils";

// Seamless infinite ticker. The track is two IDENTICAL halves; the animation
// translates by exactly one half (-50%) and loops with no jump. Each half
// repeats the items enough times to exceed any viewport width, so there is
// never a blank gap at the loop point.
const HALF_REPEAT = 4;

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const half = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {Array.from({ length: HALF_REPEAT }).flatMap((_, r) =>
        items.map((t, i) => (
          <span key={`${r}-${i}`} className="flex items-center">
            <span className="px-6 font-poster text-lg uppercase tracking-wide sm:text-xl">
              {t}
            </span>
            <span className="sparkle text-sm">✦</span>
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className={cx("marquee py-3", className)} role="presentation">
      <div className="marquee__track">
        {half}
        {half}
      </div>
    </div>
  );
}
