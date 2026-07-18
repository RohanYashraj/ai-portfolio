import { defineLive } from "next-sanity";
import { client } from "./client";
import { readToken } from "../env";

// Live content API — powers real-time updates in the Presentation tool and
// tag-based revalidation in production. Tokens are only used in draft mode.
const token = readToken || undefined;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
