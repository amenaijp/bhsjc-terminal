export function debounce<T extends (...args: any[]) => unknown>(fn: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout>;
	return ((...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	}) as T;
}

export function excerpt(input: string): string {
	// Normalize: collapse newlines and surrounding whitespace into a single space
	const normalized = input
		.replace(/\s*\n+\s*/g, ' ')
		.replace(/\s{2,}/g, ' ')
		.trim();

	// Split into sentences
	const sentences: string[] = (normalized.match(/[^.]+\./g) ?? []).map((s) => s.trim());

	// If no sentences found (no full stops), truncate at 147
	if (sentences.length === 0) {
		return normalized.length > 147 ? normalized.slice(0, 147) + '...' : normalized;
	}

	// Build candidates: first, first+second, first+second+third
	const candidates = [1, 2, 3]
		.map((i) => sentences.slice(0, i).join(' ').trim())
		.filter((c) => c.length > 0);

	// Pick the candidate closest to 100 characters
	const best = candidates.reduce((a, b) =>
		Math.abs(a.length - 100) <= Math.abs(b.length - 100) ? a : b
	);

	// Truncate if over 150
	return best.length > 150 ? best.slice(0, 147) + '...' : best;
}
