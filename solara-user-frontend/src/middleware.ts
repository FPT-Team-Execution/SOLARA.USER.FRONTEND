import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { SIGNIN_ROUTE } from "./constants/routes";

const isPublicRoute = createRouteMatcher(['/', '/signin(.*)', '/signup(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            const host = req.headers.get('host');
            const proto = req.headers.get('x-forwarded-proto');
            const redirectUrl = `${proto}://${host}${SIGNIN_ROUTE}`
            return new Response('', {
                status: 302,
                headers: { Location: redirectUrl },
            });
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};