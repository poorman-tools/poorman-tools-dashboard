import Link from "next/link";
import { PropsWithChildren } from "react";
import { buttonVariants } from "./ui/button";

export default function LinkButton({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "default",
      })}
    >
      {children}
    </Link>
  );
}
