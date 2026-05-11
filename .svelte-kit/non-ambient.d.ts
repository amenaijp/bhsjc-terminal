
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/article" | "/article/[article_id]" | "/genre" | "/genre/[genre]";
		RouteParams(): {
			"/article/[article_id]": { article_id: string };
			"/genre/[genre]": { genre: string }
		};
		LayoutParams(): {
			"/": { article_id?: string; genre?: string };
			"/article": { article_id?: string };
			"/article/[article_id]": { article_id: string };
			"/genre": { genre?: string };
			"/genre/[genre]": { genre: string }
		};
		Pathname(): "/" | `/article/${string}` & {} | `/genre/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/robots.txt" | string & {};
	}
}