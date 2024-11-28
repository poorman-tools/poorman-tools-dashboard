"use client";
import { useSession } from "@/lib/providers/session-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DefaultPage() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user.Workspaces[0]) {
      router.push(`/w/${user.Workspaces[0].Id}`);
      return;
    }
  }, [user, router]);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      Redirecting to your workspace
    </div>
  );
}
