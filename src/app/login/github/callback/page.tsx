"use client";
import { useApiLogin } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GithubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trigger } = useApiLogin();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      trigger({ code, type: "github" }).then((data) => {
        if (data?.data?.token) {
          localStorage.setItem("token", data.data?.token);
          router.push("/");
        }
      });
    }
  }, [searchParams, router, trigger]);

  return <div>Loading</div>;
}
