"use client";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";
import useApiSession from "../api/session";
import { MeAPIResponse } from "../api/type";

const SessionContext = createContext<{ user: MeAPIResponse }>(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error(
          "Attempt to access context value on uninitialized context"
        );
      },
    }
  ) as { user: MeAPIResponse }
);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
  const { user, isLoading } = useApiSession();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}
