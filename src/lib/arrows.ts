export const ARROWS = {
  subset: {
    glyph: "↳",
    codePoint: "U+21B3",
    unicodeName: "Downwards arrow with tip rightwards",
    meaning: "Subset",
    color: "gray-600",
    className: "text-gray-600",
  },
  details: {
    glyph: "→",
    codePoint: "U+2192",
    unicodeName: "Rightwards arrow",
    meaning: "More details",
    color: "inherit",
    className: "",
  },
  external: {
    glyph: "↗",
    codePoint: "U+2197",
    unicodeName: "North east arrow",
    meaning: "External link",
    color: "inherit",
    className: "",
  },
  back: {
    glyph: "←",
    codePoint: "U+2190",
    unicodeName: "Leftwards arrow",
    meaning: "Back",
    color: "inherit",
    className: "",
  },
} as const;

export type ArrowIntent = keyof typeof ARROWS;
