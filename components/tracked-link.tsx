"use client";

import Link, { type LinkProps } from "next/link";
import posthog from "posthog-js";
import type { ComponentProps } from "react";

type TrackedLinkProps = LinkProps &
  Omit<ComponentProps<typeof Link>, keyof LinkProps> & {
    eventName: string;
    eventProperties?: Record<string, string | number | boolean>;
  };

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        posthog.capture(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
