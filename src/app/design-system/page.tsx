import ArrowGlyph from "@/components/ArrowGlyph";
import { ARROWS, type ArrowIntent } from "@/lib/arrows";

const arrowRows: Array<{
  intent: ArrowIntent;
  use: string;
  example: string;
}> = [
  {
    intent: "subset",
    use: "Subset",
    example: "Browser instruments belongs under Web",
  },
  {
    intent: "details",
    use: "More details",
    example: "Open a project detail page",
  },
  {
    intent: "external",
    use: "External link",
    example: "Open a live project URL",
  },
  {
    intent: "back",
    use: "Back",
    example: "Return to a project list",
  },
];

const colorRows = [
  {
    token: "black",
    value: "#000000 / rgba(0, 0, 0, 255)",
    swatch: "#000000",
    usage: "Primary action text, sidebar text, borders, card outlines, hamburger bars, map marker stroke, dither dark pixels.",
    state: "Default for clickable text; action arrows inherit this unless their parent changes color.",
  },
  {
    token: "gray-900",
    value: "#111827",
    swatch: "#111827",
    usage: "Headings, primary body text, and status stamp text.",
    state: "Social icons hover to gray-900.",
  },
  {
    token: "gray-600",
    value: "#4b5563",
    swatch: "#4b5563",
    usage: "Project descriptions, tags, dates, metadata labels, subset arrows, design-system secondary table text, Crunch label/buttons, HTMLPG empty/loading text, device list, social icons at rest.",
    state: "Crunch buttons hover to black; social icons hover to gray-900.",
  },
  {
    token: "gray-200",
    value: "#e5e7eb",
    swatch: "#e5e7eb",
    usage: "Tag pill backgrounds, home left accent borders, and disabled Crunch buttons.",
    state: "Static surface utility and disabled state.",
  },
  {
    token: "gray-100",
    value: "#f3f4f6",
    swatch: "#f3f4f6",
    usage: "Page background, card interior, status stamp background, HTMLPG map frame background.",
    state: "Static base surface.",
  },
  {
    token: "blue-800",
    value: "#1e40af",
    swatch: "#1e40af",
    usage: "Home page inline Desire Path Radio link hover.",
    state: "Hover only; link is underlined at rest.",
  },
  {
    token: "yellow-400",
    value: "#facc15",
    swatch: "#facc15",
    usage: "HTMLPG device map marker fill.",
    state: "Static marker fill.",
  },
  {
    token: "transparent gray",
    value: "rgba(240, 240, 240, 0)",
    swatch: "rgba(240, 240, 240, 0)",
    usage: "Dither image light pixels.",
    state: "Transparent image treatment.",
  },
];

const hoverRows = [
  {
    element: "Sidebar nav",
    rest: "black text; subset icon gray-600",
    hover: "Label text underlines only; icon does not underline or change color.",
  },
  {
    element: "Active sidebar item",
    rest: "black text, bold",
    hover: "No additional color change.",
  },
  {
    element: "Card action links",
    rest: "black text and inherited black Lucide icon",
    hover: "Label text underlines only; icon does not underline.",
  },
  {
    element: "Project detail back link",
    rest: "black text and inherited black Lucide icon",
    hover: "Label text underlines only; icon does not underline.",
  },
  {
    element: "Home inline link",
    rest: "gray-900 parent text, underlined link",
    hover: "Link text changes to blue-800.",
  },
  {
    element: "Home social icons",
    rest: "gray-600",
    hover: "gray-900",
  },
  {
    element: "Crunch controls",
    rest: "gray-600",
    hover: "black; disabled is gray-200.",
  },
];

const inactiveColorRows = [
  {
    token: "gray-50",
    value: "#f9fafb",
    swatch: "#f9fafb",
    source: "Commented bioinformatics call-to-action block.",
  },
  {
    token: "blue-600",
    value: "#2563eb",
    swatch: "#2563eb",
    source: "Commented bioinformatics call-to-action button.",
  },
  {
    token: "blue-700",
    value: "#1d4ed8",
    swatch: "#1d4ed8",
    source: "Commented bioinformatics call-to-action button hover.",
  },
  {
    token: "white",
    value: "#ffffff",
    swatch: "#ffffff",
    source: "Commented bioinformatics call-to-action button text.",
  },
  {
    token: "red",
    value: "#ff0000",
    swatch: "#ff0000",
    source: "Defined in .prose but no active prose usage found.",
  },
  {
    token: "blue",
    value: "#0000ff",
    swatch: "#0000ff",
    source: "Defined in .prose h1 but no active prose usage found.",
  },
];

export default function DesignSystemPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Design System</h1>
      </div>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Arrows</h2>
        <div className="border border-black">
          <div className="grid grid-cols-[4rem_1fr] md:grid-cols-[5rem_10rem_8rem_8rem_1fr] border-b border-black text-sm font-bold">
            <div className="p-3 border-r border-black">Icon</div>
            <div className="p-3 md:border-r md:border-black">Meaning</div>
            <div className="hidden md:block p-3 border-r border-black">Fallback</div>
            <div className="hidden md:block p-3 border-r border-black">Color</div>
            <div className="hidden md:block p-3">Use</div>
          </div>

          {arrowRows.map(({ intent, use, example }) => {
            const arrow = ARROWS[intent];

            return (
              <div
                key={intent}
                className="grid grid-cols-[4rem_1fr] md:grid-cols-[5rem_10rem_8rem_8rem_1fr] border-b border-black last:border-b-0"
              >
                <div className="p-3 border-r border-black text-2xl leading-none">
                  <ArrowGlyph intent={intent} decorative={false} />
                </div>
                <div className="p-3 md:border-r md:border-black">
                  <div>{use}</div>
                  <div className="md:hidden text-sm text-gray-600 mt-1">
                    {arrow.glyph} / {arrow.color}
                  </div>
                </div>
                <div className="hidden md:block p-3 border-r border-black">
                  {arrow.glyph} {arrow.codePoint}
                </div>
                <div className="hidden md:block p-3 border-r border-black">
                  {arrow.color}
                </div>
                <div className="hidden md:block p-3 text-gray-600">{example}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Colors</h2>
        <div className="border border-black">
          <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[5rem_8rem_1fr_1fr] border-b border-black text-sm font-bold">
            <div className="p-3 border-r border-black">Swatch</div>
            <div className="p-3 md:border-r md:border-black">Token</div>
            <div className="hidden md:block p-3 border-r border-black">Use</div>
            <div className="hidden md:block p-3">State</div>
          </div>

          {colorRows.map((color) => (
            <div
              key={color.token}
              className="grid grid-cols-[5rem_1fr] md:grid-cols-[5rem_8rem_1fr_1fr] border-b border-black last:border-b-0"
            >
              <div className="p-3 border-r border-black">
                <div
                  className="h-8 w-8 border border-black"
                  style={{ backgroundColor: color.swatch }}
                />
              </div>
              <div className="p-3 md:border-r md:border-black">
                <div>{color.token}</div>
                <div className="text-sm text-gray-600 mt-1">{color.value}</div>
                <div className="md:hidden text-sm text-gray-600 mt-2">{color.usage}</div>
                <div className="md:hidden text-sm text-gray-600 mt-2">{color.state}</div>
              </div>
              <div className="hidden md:block p-3 border-r border-black text-gray-600">
                {color.usage}
              </div>
              <div className="hidden md:block p-3 text-gray-600">{color.state}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hover And State Rules</h2>
        <div className="border border-black">
          <div className="grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr] border-b border-black text-sm font-bold">
            <div className="p-3 md:border-r md:border-black">Element</div>
            <div className="hidden md:block p-3 border-r border-black">Rest</div>
            <div className="hidden md:block p-3">Hover / State</div>
          </div>

          {hoverRows.map((row) => (
            <div
              key={row.element}
              className="grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr] border-b border-black last:border-b-0"
            >
              <div className="p-3 md:border-r md:border-black font-bold md:font-normal">
                {row.element}
              </div>
              <div className="p-3 md:border-r md:border-black text-gray-600">
                {row.rest}
              </div>
              <div className="p-3 text-gray-600">{row.hover}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Arrow comparison</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-black">
            <div className="border-b border-black p-3 text-sm font-bold">Current Lucide</div>
            <div className="p-3">
              <div className="py-2">Web</div>
              <div className="py-2 pl-4">
                <ArrowGlyph intent="subset" className="mr-1.5" />
                Browser instruments
              </div>
              <div className="group py-2">
                <span className="group-hover:underline">More Details</span>
                <ArrowGlyph intent="details" className="ml-1" />
              </div>
              <div className="group py-2">
                <span className="group-hover:underline">Live Link</span>
                <ArrowGlyph intent="external" className="ml-1" />
              </div>
            </div>
          </div>

          <div className="border border-black">
            <div className="border-b border-black p-3 text-sm font-bold">Unicode fallback</div>
            <div className="p-3">
              <div className="py-2">Web</div>
              <div className="py-2 pl-4">
                <span className={`${ARROWS.subset.className} mr-1.5`}>{ARROWS.subset.glyph}</span>
                Browser instruments
              </div>
              <div className="group py-2">
                <span className="group-hover:underline">More Details</span>
                <span className="ml-1">{ARROWS.details.glyph}</span>
              </div>
              <div className="group py-2">
                <span className="group-hover:underline">Live Link</span>
                <span className="ml-1">{ARROWS.external.glyph}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Defined But Not Active</h2>
        <div className="border border-black">
          <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[5rem_8rem_1fr] border-b border-black text-sm font-bold">
            <div className="p-3 border-r border-black">Swatch</div>
            <div className="p-3 md:border-r md:border-black">Token</div>
            <div className="hidden md:block p-3">Source</div>
          </div>

          {inactiveColorRows.map((color) => (
            <div
              key={color.token}
              className="grid grid-cols-[5rem_1fr] md:grid-cols-[5rem_8rem_1fr] border-b border-black last:border-b-0"
            >
              <div className="p-3 border-r border-black">
                <div
                  className="h-8 w-8 border border-black"
                  style={{ backgroundColor: color.swatch }}
                />
              </div>
              <div className="p-3 md:border-r md:border-black">
                <div>{color.token}</div>
                <div className="text-sm text-gray-600 mt-1">{color.value}</div>
                <div className="md:hidden text-sm text-gray-600 mt-2">{color.source}</div>
              </div>
              <div className="hidden md:block p-3 text-gray-600">{color.source}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
