import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = ! !auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false
            }

            if (isLoggedIn) {
                const redirectUrl = new URL('/dashboard', nextUrl);
                return Response.redirect(redirectUrl, 302)
            }
            return true
        }
    },
    providers: []
} satisfies NextAuthConfig;