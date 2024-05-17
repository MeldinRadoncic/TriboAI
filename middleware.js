
import { authMiddleware } from "@clerk/nextjs";



export default authMiddleware({
  publicRoutes: ["/","/stripe","/api/stripe","/api/webhook"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
