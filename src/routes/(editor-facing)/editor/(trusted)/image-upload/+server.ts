import { json } from '@sveltejs/kit';
import { createHash } from 'crypto';
import { writeFile, access } from 'fs/promises';
import { join } from 'path';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('image');

	if (!(file instanceof File)) {
		return json({ message: 'No file provided' }, { status: 400 });
	}

	if (file.size > 25 * 1024 * 1024) {
		return json({ message: 'Image must be under 25MB' }, { status: 400 });
	}

	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
	if (!allowedTypes.includes(file.type)) {
		return json({ message: 'File must be a JPEG, PNG, WEBP, or GIF' }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());

	const hash = createHash('md5').update(buffer).digest('hex');
	const ext = file.name.split('.').at(-1);
	const filename = `${hash}.${ext}`;
	const filepath = join('static', 'user_uploads', filename);
	const url = `/user_uploads/${filename}`;

	try {
		await access(filepath);
		return json({ url });
	} catch {
		// file doesn't exist, continue to write
	}

	try {
		await writeFile(filepath, buffer);
	} catch (e) {
		console.error(e);
		return json({ message: 'Failed to save image' }, { status: 500 });
	}

	return json({ url });
};
