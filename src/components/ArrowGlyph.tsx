import { ARROWS, type ArrowIntent } from "@/lib/arrows";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuCornerDownRight } from "react-icons/lu";

interface ArrowGlyphProps {
  intent: ArrowIntent;
  className?: string;
  decorative?: boolean;
}

export default function ArrowGlyph({
  intent,
  className = "",
  decorative = true,
}: ArrowGlyphProps) {
  const arrow = ARROWS[intent];
  const Icon = {
    subset: LuCornerDownRight,
    details: LuArrowRight,
    external: LuArrowUpRight,
    back: LuArrowLeft,
  }[intent];

  return (
    <Icon
      aria-hidden={decorative ? "true" : undefined}
      className={`inline-block h-[1em] w-[1em] align-[-0.125em] font-normal ${arrow.className} ${className}`}
    />
  );
}
