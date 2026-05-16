import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import type { User as DrizzleUser } from '$lib/server/db/schema';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	],

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

type BetterAuthUser = typeof auth.$Infer.Session.user;
export type User = Omit<BetterAuthUser, 'userType'> & Pick<DrizzleUser, 'userType'>;
