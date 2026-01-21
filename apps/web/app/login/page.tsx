"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function login() {
    const res = await apiFetch("auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    localStorage.setItem("token", res.token);
    router.push("/select-org");
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="mt-4 w-full" onClick={login}>
        Login
      </Button>
    </div>
  );
}
