import useSWR from "swr";
import { fetcher } from "./fetcher";
import {
  CronDetailAPIResponse,
  CronListAPIResponse,
  CronLogAPIResponse,
  CronLogDetailAPIResponse,
} from "./type";

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
