import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db'; // use the lazy getter, not db directly
import type { User as DrizzleUser } from '$lib/server/db/schema';

let _auth: ReturnType<typeof betterAuth> | null = null;

// FIXME: play around with the auth and resend https://resend.com/onboarding for email verification

function getAuth() {
	if (_auth) return _auth;

	if (!env.BETTER_AUTH_SECRET) throw new Error('BETTER_AUTH_SECRET is not set');
	if (!env.ORIGIN) throw new Error('ORIGIN is not set');

	_auth = betterAuth({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'sqlite' }),
		emailAndPassword: { enabled: true },
		plugins: [sveltekitCookies(getRequestEvent)],
		user: {
			additionalFields: {
				userType: {
					type: 'string',
					required: true,
					defaultValue: 'unverified',
					input: false
				}
			}
		}
	});

	return _auth;
}

// Proxy keeps `auth.api`, `auth.$Infer` etc working at import sites
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
	get(_, prop) {
		return getAuth()[prop as keyof ReturnType<typeof betterAuth>];
	}
});

type BetterAuthUser = typeof auth.$Infer.Session.user;
export type User = Omit<BetterAuthUser, 'userType'> & Pick<DrizzleUser, 'userType'>;
