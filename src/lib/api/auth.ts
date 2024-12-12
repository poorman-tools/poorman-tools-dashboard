import useSWRMutation from "swr/mutation";
import { postFetcher } from "./fetcher";
import { ApiError } from "./type";

interface EmailLogin {
  type: "email";
  email: string;
  password: string;
}

interface GithubLogin {
  type: "github";
  code: string;
}

export function useApiLogin() {
  return useSWRMutation<
    { error?: string; token?: string },
    ApiError,
    string,
    GithubLogin | EmailLogin
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

export function useLogout() {
  return useSWRMutation<unknown, ApiError, string, { SessionId: string }>(
    "/v1/auth/revoke",
    postFetcher
  );
}
