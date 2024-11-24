"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { DummyAvatar } from "./dummy-avatar";
import { useSession } from "@/lib/providers/session-provider";
import { LucideClock, LucideCone, LucideScanFace } from "lucide-react";

export default function WorkspaceContainer({ children }: PropsWithChildren) {
  const { workspaceId } = useParams();
  const { user } = useSession();

  const currentWorkspace = user.Workspaces.find(
    (workspace) => workspace.Id === workspaceId
  );

  return (
    <div className="flex min-h-screen">
      <div className="w-[70px] bg-accent p-[10px] flex flex-col gap-2">
        <div className="w-[50px] h-[50px] rounded-full bg-background cursor-pointer hover:bg-primary">
          <DummyAvatar className="w-[50px] h-[50px] rounded-full" />
        </div>

        <hr className="bg-border h-[3px] mx-2" />

        {user.Workspaces.map((workspace) => {
          return (
            <div
              key={workspace.Id}
              className="w-[50px] h-[50px] rounded-full bg-border cursor-pointer hover:rounded-xl transition-all flex items-center justify-center font-semibold text-lg"
            >
              {workspace.Name.substring(0, 2).toUpperCase()}
            </div>
          );
        })}
      </div>
      <div className="w-[250px] bg-secondary">
        <div className="p-4 py-3 shadow-lg font-semibold border-b border-b-accent">
          {currentWorkspace?.Name}
        </div>

        <div className="p-2 flex flex-col gap-0.5 text-sm">
          <div
            className="mb-1 text-muted-foreground font-semibold"
            style={{ fontSize: 11 }}
          >
            Tools
          </div>

          <Link
            className="flex gap-2 items-center rounded p-2 text-muted-foreground font-medium hover:bg-background"
            href={`/workspace/${workspaceId}/cron`}
          >
            <LucideClock className="w-4 h-4 text-purple-400" />
            <span>Cronjobs</span>
          </Link>
          <Link
            className="flex gap-2 items-center rounded p-2 bg-background-light font-medium text-white"
            href={`/workspace/${workspaceId}/cron`}
          >
            <LucideCone className="w-4 h-4 text-purple-400" />
            <span>HTTPS Tunnel</span>
          </Link>

          <hr className="my-2" />
          <div className="mb-1 text-muted-foreground font-semibold text-xs">
            Design Tools
          </div>

          <Link
            className="flex gap-2 items-center rounded p-2 font-medium text-muted-foreground"
            href={`/workspace/${workspaceId}/cron`}
          >
            <LucideScanFace className="w-4 h-4 text-purple-400" />
            <span>Avatar Generator</span>
          </Link>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
