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
