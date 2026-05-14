import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { user } from '$lib/server/db/auth.schema';
import type { Genre } from '$lib/genres';

export const article = sqliteTable('article', {
	id: text('id').notNull().primaryKey(),
	date: integer('date').notNull(),
	hook: text('hook').notNull(),
	fullText: text('full_text').notNull(),
	frontImage: text('front_image').notNull(),
	title: text('title').notNull(),
	owner_id: text('owner_id')
		.notNull()
		.references(() => user.id)
});

export const articleGenre = sqliteTable(
	'article_genre',
	{
		articleId: text('article_id')
			.notNull()
			.references(() => article.id),
		genre: text('genre').$type<Genre>().notNull()
	},
	(table) => [primaryKey({ columns: [table.articleId, table.genre] })]
);

export const articleAuthor = sqliteTable(
	'article_author',
	{
		articleId: text('article_id')
			.notNull()
			.references(() => article.id),
		editorId: text('editor_id')
			.notNull()
			.references(() => user.id)
	},
	(table) => [primaryKey({ columns: [table.articleId, table.editorId] })]
);

export * from './auth.schema';
