import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import type { Genre } from '$lib/genres';

// FIXME: user generated content tables from better auth tables

export const article = sqliteTable('article', {
	id: text('id').notNull().primaryKey(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	userWrittenHook: text('user_written_hook').notNull(),
	hook: text('hook').notNull(),
	openToFeedback: integer('open_to_feedback', { mode: 'boolean' }).default(false).notNull(),
	published: integer('published', { mode: 'boolean' }).default(false).notNull(),
	fullText: text('full_text').notNull(),
	frontImage: text('front_image').notNull(),
	title: text('title').notNull(),
	ownerId: text('owner_id')
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

export const articleRelations = relations(article, ({ one, many }) => ({
	owner: one(user, {
		fields: [article.ownerId],
		references: [user.id]
	}),
	genres: many(articleGenre),
	authors: many(articleAuthor)
}));

export const articleGenreRelations = relations(articleGenre, ({ one }) => ({
	article: one(article, {
		fields: [articleGenre.articleId],
		references: [article.id]
	})
}));

export const articleAuthorRelations = relations(articleAuthor, ({ one }) => ({
	article: one(article, {
		fields: [articleAuthor.articleId],
		references: [article.id]
	}),
	editor: one(user, {
		fields: [articleAuthor.editorId],
		references: [user.id]
	})
}));

// betterAuth schemas

// MODIFY IN ../auth.ts IF MODIFYING THIS SCHEMA
export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).default(false).notNull(),
	userType: text('user_type')
		.$type<'admin' | 'editor' | 'unverified'>()
		.notNull()
		.default('unverified'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const session = sqliteTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		token: text('token').notNull().unique(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [index('session_userId_idx').on(table.userId)]
);

export const account = sqliteTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: integer('access_token_expires_at', {
			mode: 'timestamp_ms'
		}),
		refreshTokenExpiresAt: integer('refresh_token_expires_at', {
			mode: 'timestamp_ms'
		}),
		scope: text('scope'),
		password: text('password'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = sqliteTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
);

export const layoutSlot = sqliteTable(
	'layout_slot',
	{
		page: text('page').$type<'front' | Genre>().notNull(), // 'front' or a Genre value
		slotType: text('slot_type').$type<'main' | 'side' | 'very_side'>().notNull(),
		position: integer('position').notNull(), // for disambiguating multiple side slots
		articleId: text('article_id').references(() => article.id)
		// null = auto
	},
	(table) => [primaryKey({ columns: [table.page, table.slotType, table.position] })]
);

export const adCampaign = sqliteTable('ad_campaign', {
	id: text('id').notNull().unique().primaryKey(),
	name: text('name').notNull(),
	image: text('image').notNull(),
	link: text('link').notNull(),
	active: integer('active', { mode: 'boolean' }).notNull(),
	views: integer('views').notNull().default(0)
});

// FIXME: these scaffols should probably be in their respective files than here

export type MainArticleScaffold = {
	title: string;
	hook: string;
	frontImage: string;
	id: string;
} | null;

export type SideArticleScaffold = {
	title: string;
	hook: string;
	id: string;
} | null;

export type VerySideArticleScaffold = {
	title: string;
	hook: string;
	id: string;
} | null;

export type User = typeof user.$inferSelect;
// export type NewArticle = typeof article.$inferInsert;
