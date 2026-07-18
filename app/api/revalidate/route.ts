import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook → on-demand revalidation.
// Configure a webhook in sanity.io/manage pointing here, with the same secret
// as SANITY_REVALIDATE_SECRET. Payload should include the document _type.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Everything renders under the root layout, so a layout-level revalidate
    // refreshes all published pages that depend on the changed content.
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body?._type ?? "unknown",
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidate error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
