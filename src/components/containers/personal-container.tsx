"use client";
import { LucideLogOut, LucideSettings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type PropsWithChildren, useState } from "react";
import { Sidebar, SidebarContent, SidebarLink, SidebarTitle } from "../sidebar";
import SessionContainer from "./session-container";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useLogout } from "@/lib/api/auth";

export default function PersonalContainer({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const { trigger: logout } = useLogout();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No session token found");
      }

      await logout({ SessionId: token });
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SessionContainer>
      <Sidebar>
        <SidebarTitle text="Personal Settings" />

        <SidebarContent>
          <SidebarLink
            icon={LucideSettings}
            text="Sessions"
            href="/sessions"
            selected={pathname === "/sessions"}
          />
          <Button
            variant="ghost"
            className="w-full justify-start px-2 text-muted-foreground"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LucideLogOut className="w-4 h-4 text-purple-400" />
            <span>Logout</span>
          </Button>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1">{children}</div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will end your current session and you&apos;ll need to log in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SessionContainer>
  );
}

