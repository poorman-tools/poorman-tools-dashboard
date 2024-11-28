"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { MeAPIResponse } from "../api/type";
import useApiSession from "../api/session";
import { useRouter } from "next/navigation";

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
    return <div>Loading...</div>;
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
