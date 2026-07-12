import { createClient } from "next-sanity";

/* Public dataset, CDN, published perspective only (AD-7, AD-10) */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-07-01",
  useCdn: true,
  perspective: "published",
});
