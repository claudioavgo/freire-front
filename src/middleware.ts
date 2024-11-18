import { NextResponse, type NextRequest } from "next/server";
import { pegarSessao } from "./lib/auth";

export default async function authMiddleware(request: NextRequest) {
  const sessao = await pegarSessao();

  if (!sessao) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
