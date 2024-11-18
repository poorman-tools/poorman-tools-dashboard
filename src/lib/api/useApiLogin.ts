import useSWRMutation from "swr/mutation";
import { ApiError } from "./type";

export function useApiLogin() {
  return useSWRMutation<
    { error?: string; token?: string },
    ApiError,
    string,
    { type: "email"; email: string; password: string }
  >(
    "/v1/auth",
    async (url, { arg }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        const errorInfo = await res.json();
        const errorException = new ApiError(errorInfo);
        throw errorException;
      }

      return res.json();
    },
    {
      throwOnError: false,
    }
  );
}
