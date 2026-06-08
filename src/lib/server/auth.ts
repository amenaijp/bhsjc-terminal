import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import type { User as DrizzleUser } from '$lib/server/db/schema';
// import { Resend } from 'resend';

let _auth: ReturnType<typeof betterAuth> | null = null;
// let _resend: Resend | null = null;

// function getResend() {
// 	if (_resend) return _resend;
// 	if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');
// 	_resend = new Resend(env.RESEND_API_KEY);
// 	return _resend;
// }

function getAuth() {
	if (_auth) return _auth;

	if (!env.BETTER_AUTH_SECRET) throw new Error('BETTER_AUTH_SECRET is not set');
	if (!env.ORIGIN) throw new Error('ORIGIN is not set');

	_auth = betterAuth({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'sqlite' }),
		emailAndPassword: {
			enabled: true
		},
		// emailVerification: {
		// 	sendOnSignUp: true,
		// 	autoSignInAfterVerification: true,
		// 	sendVerificationEmail: async ({ user, url }) => {
		// 		await getResend().emails.send({
		// 			from: 'onboarding@resend.dev', // TODO: replace with your verified Resend sender
		// 			to: user.email,
		// 			subject: 'Terminal: Verify your email address',
		// 			html: `
		//         <p>Hi ${user.name ?? user.email},</p>
		//         <p>Click the link below to verify your email address:</p>
		//         <p><a href="${url}">Verify email</a></p>
		//         <p>If you didn't create an account, you can safely ignore this email.</p>
		//       `
		// 		});
		// 	}
		// },
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

export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
	get(_, prop) {
		return getAuth()[prop as keyof ReturnType<typeof betterAuth>];
	}
});

type BetterAuthUser = typeof auth.$Infer.Session.user;
export type User = Omit<BetterAuthUser, 'userType'> & Pick<DrizzleUser, 'userType'>;
