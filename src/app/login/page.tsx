"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApiLogin } from "@/lib/api/auth";
import { Github, LucideLoader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { trigger, error, isMutating } = useApiLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      trigger({ email, password, type: "email" }).then((res) => {
        if (res?.token) {
          localStorage.setItem("token", res.token);
          router.push("/");
        }
      });
    },
    [email, password, trigger]
  );

  return (
    <form onSubmit={onLoginSubmit}>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="flex flex-col gap-4 max-w-[300px]">
          <h1 className="text-2xl font-bold">Poorman Tools</h1>
          <p>
            Hate the design? Yes. We are poorman. Help us improve if you hate it
          </p>

          <Link
            className={buttonVariants()}
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user`}
          >
            <Github className="w-4 h-4" /> Login with Github
          </Link>

          <Input
            autoFocus
            required
            placeholder="Email"
            disabled={isMutating}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <Input
            required
            placeholder="Password"
            disabled={isMutating}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <Button disabled={isMutating}>
            {isMutating && (
              <LucideLoader className="w-4 h-4 mr-1 animate-spin" />
            )}
            Login
          </Button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
    </form>
  );
}
