// src/app/(session)/sessions/page.tsx
"use client";

import PersonalContainer from "@/components/containers/personal-container";
import { fetcher, postFetcher } from "@/lib/api/fetcher";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";

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
  const { data: sessionsResponse, error } = useSWR<SessionsResponse>(
    "/v1/auth/sessions",
    fetcher
  );

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await postFetcher("/v1/auth/revoke", {
        arg: {
          SessionId: sessionId,
        },
      });
      // Revalidate the sessions data after revoking
      mutate("/v1/auth/sessions");
    } catch (error) {
      console.error("Error revoking session:", error);
    }
  };

  if (error) {
    return (
      <PersonalContainer>
        <div className="p-6">
          <div className="text-destructive">Error loading sessions</div>
        </div>
      </PersonalContainer>
    );
  }

  if (!sessionsResponse) {
    return (
      <PersonalContainer>
        <div className="p-6">
          <div className="animate-pulse">Loading sessions...</div>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Session ID: {session.SessionSuffix}
                  </p>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>
                      Created: {new Date(session.CreatedAt).toLocaleString()}
                    </p>
                    <p>
                      Last Active:
                      {new Date(
                        Number.parseInt(session.LastUsedTimestamp)
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs mt-1 text-muted-foreground">
                      {session.UserAgent}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleRevokeSession(session.SessionSuffix)}
                  variant="ghost"
                  className="text-destructive hover:text-destructive/90 text-sm"
                >
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PersonalContainer>
  );
}

