import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';

export const actions: Actions = {
	signOut: async ({ request }) => {
		await auth.api.signOut({
			headers: request.headers
		});
		return redirect(302, resolve('/editor/login'));
	},
	changeName: async ({ request, locals }) => {
		if (!locals.user) return fail(403);

		const form = await request.formData();
		const name = form.get('name') as string;

		if (!name) return fail(400, { error: 'Missing name' });

		await db.update(user).set({ name: name }).where(eq(user.id, locals.user.id));
	},
	changePassword: async ({ request, locals }) => {
		if (!locals.user) return fail(403);

		const form = await request.formData();
		const currentPassword = form.get('currentPassword') as string;
		const newPassword = form.get('newPassword') as string;
		if (!currentPassword || !newPassword) return fail(400, { error: 'Malformed form' });

		try {
			await auth.api.changePassword({
				body: { newPassword, currentPassword, revokeOtherSessions: true },
				headers: request.headers
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'password change failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}
	}
	// resendVerification: async ({ request, locals }) => {
	// 	if (!locals.user) return fail(403);
	// 	if (locals.user.emailVerified) return fail(400, { message: 'Email is already verified' });
	//
	// 	try {
	// 		await auth.api.sendVerificationEmail({
	// 			body: { email: locals.user.email },
	// 			headers: request.headers
	// 		});
	// 	} catch (error) {
	// 		if (error instanceof APIError) {
	// 			return fail(400, { message: error.message || 'Failed to send verification email' });
	// 		}
	// 		return fail(500, { message: 'Unexpected error' });
	// 	}
	// }
};
