import Link from "next/link";
import { PropsWithChildren } from "react";

export function ResourceDetailSection({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function ResourceDetailItem({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div>
      <label className="text-sm text-gray-300 font-bold">{label}</label>
      <p>{children}</p>
    </div>
  );
}

export function ResourceLink({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="hover:underline text-sky-300">
      {children}
    </Link>
  );
}
