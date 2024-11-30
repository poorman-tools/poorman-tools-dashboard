import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function Sidebar({ children }: PropsWithChildren) {
  return <div className="w-[250px] bg-secondary flex-shrink-0">{children}</div>;
}

export function SidebarTitle({ text }: { text?: string }) {
  return (
    <div className="p-4 py-3 shadow-lg font-semibold border-b border-b-accent">
      {text}
    </div>
  );
}

export function SidebarContent({ children }: PropsWithChildren) {
  return <div className="p-2 flex flex-col gap-0.5 text-sm">{children}</div>;
}

export function SidebarLabel({ text }: { text?: string }) {
  return (
    <div
      className="mb-1 text-muted-foreground font-semibold"
      style={{ fontSize: 11 }}
    >
      {text}
    </div>
  );
}

export function SidebarSeparator() {
  return <hr className="my-2" />;
}

export function SidebarLink({
  href,
  icon: Icon,
  text,
  selected,
}: {
  href: string;
  text: string;
  icon: LucideIcon;
  selected?: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex gap-2 items-center rounded p-2 text-muted-foreground font-medium hover:bg-background",
        selected && "bg-background-light"
      )}
      href={href}
    >
      <Icon className="w-4 h-4 text-purple-400" />
      <span>{text}</span>
    </Link>
  );
}
