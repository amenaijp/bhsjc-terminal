export const GENRES = ['sport', 'cultural', 'opinion', 'school', 'other'] as const;
export type Genre = (typeof GENRES)[number];
