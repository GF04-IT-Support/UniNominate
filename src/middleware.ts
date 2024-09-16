import { NextResponse } from "next/server";
import { auth } from "@/utils/auth/auth";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isAuthenticated = !!req.auth;


  const publicOnlyRoutes = ["/"];

  if (isAuthenticated) {
    if (publicOnlyRoutes.includes(path) || path === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  } else {
    if (path.startsWith("/admin") && path !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
