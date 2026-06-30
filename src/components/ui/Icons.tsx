import {
  ShieldCheck,
  Leaf,
  Globe2,
  Clock,
  Home,
  Building2,
  Factory,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  TrainFront,
  Landmark,
  Layers,
  Award,
  Truck,
  Users,
  Target,
  Lightbulb,
  Recycle,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  ShieldCheck,
  Leaf,
  Globe2,
  Clock,
  Home,
  Building2,
  Factory,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  TrainFront,
  Landmark,
  Layers,
  Award,
  Truck,
  Users,
  Target,
  Lightbulb,
  Recycle,
};

export function ValueIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Layers;
  return <Icon className={className ?? "h-5 w-5"} />;
}

export function NamedIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Layers;
  return <Icon className={className ?? "h-6 w-6"} />;
}
