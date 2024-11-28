"use client";

import WorkspaceContainer from "@/components/containers/workspace-container";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WorkspaceContainer>{children}</WorkspaceContainer>;
}
