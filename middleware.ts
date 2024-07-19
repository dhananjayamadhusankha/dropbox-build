import { authMiddleware, } from "@clerk/nextjs/server";

export default authMiddleware({ publicRoutes: ["/"] });

// export default authMiddleware({ publicRoutes: ["/"] });

// const isProtectedRoute = createRouteMatcher([
//   '/dashboard(.*)/',
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (!auth().userId && isProtectedRoute(req)) {

//     // Add custom logic to run before redirecting

//     return auth().redirectToSignIn();
//   }
// });


export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
