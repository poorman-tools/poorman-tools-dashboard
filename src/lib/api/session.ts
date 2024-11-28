import useSWR from "swr";
import { fetcher } from "./fetcher";
import { MeAPIResponse } from "./type";

export default function useApiSession() {
  const result = useSWR<MeAPIResponse>("/v1/me", fetcher);

  return {
    user: result.data,
    isLoading: !result.data && !result.error,
  };
}
