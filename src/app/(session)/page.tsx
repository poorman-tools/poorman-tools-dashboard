"use client";
import PersonalContainer from "@/components/containers/personal-container";
import { useSession } from "@/lib/providers/session-provider";
import Link from "next/link";

export default function DefaultPage() {
  const { user } = useSession();

  return (
    <PersonalContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.Name}</h1>
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Workspaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.Workspaces.map((workspace) => (
                <Link
                  key={workspace.Id}
                  href={`/w/${workspace.Id}`}
                  className="block bg-background p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors"
                >
                  <h3 className="font-medium">{workspace.Name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ID: {workspace.Id}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PersonalContainer>
  );
}
