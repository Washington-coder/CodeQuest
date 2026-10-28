import {
  siAngular,
  siDjango,
  siGo,
  siJavascript,
  siLaravel,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPython,
  siReact,
  siRust,
  siSharp,
  siSpringboot,
  siTypescript,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { BarChart3, Layers, Monitor, Server, Tag } from "lucide-react";

const brandIcons: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Python: siPython,
  Java: siOpenjdk,
  Go: siGo,
  Rust: siRust,
  "C#": siSharp,
  PHP: siPhp,
  React: siReact,
  "Next.js": siNextdotjs,
  Vue: siVuedotjs,
  Angular: siAngular,
  "Node.js": siNodedotjs,
  Django: siDjango,
  "Spring Boot": siSpringboot,
  Laravel: siLaravel,
};

const focusIcons: Record<string, typeof Tag> = {
  frontend: Monitor,
  backend: Server,
  fullstack: Layers,
  data: BarChart3,
};

function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.3;
}

export function TagIcon({
  label,
  value,
  className = "h-5 w-5",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  const brand = brandIcons[label];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={isDark(brand.hex) ? "currentColor" : `#${brand.hex}`}
        aria-hidden
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = focusIcons[value] ?? Tag;
  return <Icon className={className} />;
}
