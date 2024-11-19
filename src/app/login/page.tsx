"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApiLogin } from "@/lib/api/useApiLogin";
import { LucideLoader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function LoginPage() {
  const { trigger, error, isMutating } = useApiLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginClicked = useCallback(() => {
    trigger({ email, password, type: "email" }).then((data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    });
  }, [email, password, trigger, router]);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="flex flex-col gap-4 max-w-[300px]">
        <h1 className="text-2xl font-bold">Poorman Tools</h1>
        <p>
          Hate the design? Yes. We are poorman. Help us improve if you hate it
        </p>

        {error && <p className="text-red-500">{error.message}</p>}

        <Input
          placeholder="Email"
          disabled={isMutating}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <Input
          placeholder="Password"
          disabled={isMutating}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button onClick={onLoginClicked} disabled={isMutating}>
          {isMutating && <LucideLoader className="w-4 h-4 mr-1 animate-spin" />}
          Login
        </Button>
      </div>
    </div>
  );
}
