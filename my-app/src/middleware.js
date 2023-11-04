import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLES } from "./roles/roles";
// Without a defined matcher, this one line applies next-auth to entire project
// export { default } from "next-auth/middleware"

export const ADMIN_ROUTES = [
  "/admin",
  "/manage-organizations",
  // "/experimental"
];

export default withAuth(
  function middleware(request) {
    // console.log("middleware", request.nextauth.token);
    // If the user's role is not admin, redirect to the denied page
    if (
      ADMIN_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      request.nextauth.token?.role !== ROLES.ADMIN
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    // If there isn't a token, then user can't access item page
    if (
      request.nextUrl.pathname.startsWith("/items") &&
      !request.nextauth.token?.role
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorize: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/uploadthing|).*)",
    "/admin",
    "/items",
    "/experimental",
    "/manage-organizations"
  ],
};
