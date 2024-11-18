"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { workspaceId } = useParams();

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] border-r p-4">
        <h1 className="text-lg font-bold">Poorman Tool</h1>
        <ul>
          <li>
            <Link href={`/workspace/${workspaceId}/cron`}>Cron</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
