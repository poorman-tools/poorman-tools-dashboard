import { useSession } from "@/lib/providers/session-provider";
import { PropsWithChildren } from "react";

export default function SessionContainer({ children }: PropsWithChildren) {
  const { user } = useSession();

  return (
    <div className="flex min-h-screen">
      <div className="w-[70px] bg-accent p-[10px] flex flex-col gap-2">
        <div className="w-[50px] h-[50px] rounded-full bg-background cursor-pointer hover:bg-primary"></div>

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

      {children}
    </div>
  );
}
