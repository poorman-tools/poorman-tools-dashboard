"use client";

import PersonalContainer from "@/components/containers/personal-container";
import { fetcher, postFetcher } from "@/lib/api/fetcher";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";

interface Session {
  SessionSuffix: string;
  CreatedAt: string;
  LastUsedTimestamp: string;
  UserAgent: string;
}

interface SessionsResponse {
  data: Session[];
}

export default function SessionsPage() {
  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null);
  const { data: sessionsResponse, error } = useSWR<SessionsResponse>(
    "/v1/auth/sessions",
    fetcher
  );

  const handleRevokeSession = async () => {
    if (!sessionToRevoke) return;

    try {
      await postFetcher("/v1/auth/revoke", {
        arg: {
          SessionSuffix: sessionToRevoke,
        },
      });
      mutate("/v1/auth/sessions");
    } catch (error) {
      console.error("Error revoking session:", error);
    } finally {
      setSessionToRevoke(null);
    }
  };

  const isCurrentSession = (sessionSuffix: string) => {
    const token = localStorage.getItem("token");
    return token ? token.slice(-9) === sessionSuffix : false;
  };

  if (error) {
    return (
      <PersonalContainer>
        <div className="p-6" role="alert">
          <div className="text-destructive">Error loading sessions</div>
        </div>
      </PersonalContainer>
    );
  }

  if (!sessionsResponse) {
    return (
      <PersonalContainer>
        <div className="p-6" aria-busy="true">
          <div className="text-muted-foreground">Loading sessions...</div>
        </div>
      </PersonalContainer>
    );
  }

  const sessions = sessionsResponse.data;

  return (
    <PersonalContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.SessionSuffix}
              className="bg-card p-4 rounded-lg border border-border"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{session.SessionSuffix}</Badge>
                    {isCurrentSession(session.SessionSuffix) && (
                      <Badge variant="success">Current Session</Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      Created: {new Date(session.CreatedAt).toLocaleString()}
                    </p>
                    <p>
                      Last Active:{" "}
                      {new Date(
                        Number.parseInt(session.LastUsedTimestamp)
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs break-all">{session.UserAgent}</p>
                  </div>
                </div>
                {!isCurrentSession(session.SessionSuffix) && (
                  <Button
                    onClick={() => setSessionToRevoke(session.SessionSuffix)}
                    variant="destructive"
                    className="w-full sm:w-auto"
                    aria-label={`Revoke session ${session.SessionSuffix}`}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog
        open={!!sessionToRevoke}
        onOpenChange={() => setSessionToRevoke(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will revoke the session and the user will need to log in
              again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeSession}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PersonalContainer>
  );
}

