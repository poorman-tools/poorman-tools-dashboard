import useSWR from "swr";
import { fetcher, postFetcher } from "./fetcher";
import type { ApiError, MeAPIResponse, SessionsResponse } from "./type";
import useSWRMutation from "swr/mutation";

export default function useApiSession() {
  const result = useSWR<MeAPIResponse>("/v1/me", fetcher);

  return {
    user: result.data?.data,
    isLoading: !result.data && !result.error,
  };
}

export function useSessionList() {
  return useSWR<SessionsResponse>("/v1/auth/sessions", fetcher, {
    shouldRetryOnError: false,
  });
}

export function useRevokeToken() {
  return useSWRMutation<unknown, ApiError, string, { SessionSuffix: string }>(
    "/v1/auth/revoke",
    postFetcher
  );
}

