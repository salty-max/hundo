// The guides and themes the stories run under. Kept apart from guides.ts, which pulls in CSS text a Node-side config can't load.
export const GUIDES = ["koholint", "rdr", "echoes", "lordran", "hallownest", "pharloom", "basement", "tenebrous", "alefgard"] as const;
export const THEMES = ["light", "dark"] as const;
export type GuideId = (typeof GUIDES)[number];
export type ThemeId = (typeof THEMES)[number];
/** How long one look of a story (a guide and a theme: .storybook/every-look.ts) may take to render: it only catches a hang. A render is ~0.1 s
 * alone, and many times that when several checks share the machine. */
export const LOOK_LIMIT = 60_000;
