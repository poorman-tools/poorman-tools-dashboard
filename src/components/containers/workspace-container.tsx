"use client";
import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useSession } from "@/lib/providers/session-provider";
import { LucideClock, LucideCone, LucideScanFace } from "lucide-react";
import SessionContainer from "./session-container";
import {
  Sidebar,
  SidebarContent,
  SidebarLabel,
  SidebarLink,
  SidebarSeparator,
  SidebarTitle,
} from "../sidebar";

export default function WorkspaceContainer({ children }: PropsWithChildren) {
  const { workspaceId } = useParams();
  const { user } = useSession();

  const currentWorkspace = user.Workspaces.find(
    (workspace) => workspace.Id === workspaceId
  );

  const pathname = usePathname();
  console.log(pathname);

  return (
    <SessionContainer>
      <Sidebar>
        <SidebarTitle text={currentWorkspace?.Name} />

        <SidebarContent>
          <SidebarLabel text="Tools" />
          <SidebarLink
            icon={LucideClock}
            text="Cronjobs"
            href={`/w/${workspaceId}/cron`}
            selected={!!pathname.match(/\/workspace\/[a-zA-Z0-9]+\/cron/)}
          />

          <SidebarLink
            icon={LucideCone}
            text="HTTPS Tunnel"
            href={`/w/${workspaceId}/tunnel`}
            selected={!!pathname.match(/\/workspace\/[a-zA-Z0-9]+\/tunnel/)}
          />

          <SidebarSeparator />
          <SidebarLabel text="Design Tools" />

          <SidebarLink
            icon={LucideScanFace}
            text="Avatar Generator"
            href={`/w/${workspaceId}/avatar`}
            selected={!!pathname.match(/\/workspace\/[a-zA-Z0-9]+\/avatar/)}
          />
        </SidebarContent>
      </Sidebar>

      <div className="flex-1">{children}</div>
    </SessionContainer>
  );
}
