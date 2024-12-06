import useSWR from "swr";
import { fetcher, postFetcher } from "./fetcher";
import {
  ApiError,
  CronDetailAPIResponse,
  CronListAPIResponse,
  CronLogAPIResponse,
  CronLogDetailAPIResponse,
  CronOptionInput,
} from "./type";
import useSWRMutation from "swr/mutation";

export function useCronGetList(workspaceId: string) {
  return useSWR<CronListAPIResponse>(
    `/v1/workspace/${workspaceId}/cron`,
    fetcher,
    { shouldRetryOnError: false }
  );
}

export function useCronGetDetail(workspaceId: string, cronId: string) {
  const result = useSWR<CronDetailAPIResponse>(
    `/v1/workspace/${workspaceId}/cron/${cronId}`,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    data: result.data?.data,
    error: result.error,
    isLoading: !result.data && !result.error,
  };
}

export async function fetchCronGetLogs(
  workspaceId: string,
  cronId: string,
  limit: number,
  cursor?: string
) {
  return (await fetcher(
    `/v1/workspace/${workspaceId}/cron/${cronId}/logs?` +
      new URLSearchParams({
        limit: limit.toString(),
        ...(cursor ? { cursor } : {}),
      })
  )) as CronLogAPIResponse;
}

export function useCronGetLogs(workspaceId: string, cronId: string) {
  return useSWR<CronLogAPIResponse>(
    `/v1/workspace/${workspaceId}/cron/${cronId}/logs`,
    fetcher,
    { shouldRetryOnError: false }
  );
}

export function useCronGetLogDetail(
  workspaceId: string,
  cronId: string,
  logId: string
) {
  return useSWR<CronLogDetailAPIResponse>(
    `/v1/workspace/${workspaceId}/cron/${cronId}/logs/${logId}`,
    fetcher,
    { shouldRetryOnError: false }
  );
}

export function useCronCreate(workspaceId: string) {
  return useSWRMutation<
    { data: { Id: string } },
    ApiError,
    string,
    CronOptionInput
  >(`/v1/workspace/${workspaceId}/cron`, postFetcher);
}

export function useCronUpdate(workspaceId: string, cronId: string) {
  return useSWRMutation<unknown, ApiError, string, CronOptionInput>(
    `/v1/workspace/${workspaceId}/cron/${cronId}`,
    postFetcher
  );
}

export function useCronUpdateStatus(workspaceId: string, cronId: string) {
  return useSWRMutation<
    unknown,
    ApiError,
    string,
    { status: "ENABLED" | "DISABLED" }
  >(`/v1/workspace/${workspaceId}/cron/${cronId}/status`, postFetcher);
}

export function useCronDetail(workspaceId: string, cronId: string) {
  return useSWR<CronDetailAPIResponse>(
    `/v1/workspace/${workspaceId}/cron/${cronId}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
