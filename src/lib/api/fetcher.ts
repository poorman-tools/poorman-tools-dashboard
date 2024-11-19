import { ApiError } from "./type";

export const fetcher = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const errorInfo = await res.json();
    const error = new ApiError(errorInfo);
    throw error;
  }

  return res.json();
};

function fetcherMutation(method: string) {
  return async (url: string, { arg }: { arg: unknown }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    if (!res.ok) {
      const errorInfo = await res.json();
      const error = new ApiError(errorInfo);
      throw error;
    }

    return res.json();
  };
}

export const postFetcher = fetcherMutation("POST");
export const deleteFetcher = fetcherMutation("DELETE");
