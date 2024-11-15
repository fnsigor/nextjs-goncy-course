import type {NextRequest} from "next/server";

import {revalidatePath} from "next/cache";

//revalidatePath não se usa em qualquer momento, estudar sobre
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);

  return Response.json({success: true});
}
