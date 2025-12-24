"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewsletterPage() {
  const router = useRouter();

  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    fetch("/api/newsletter/subscribe")
      .then((res) => res.json())
      .then((data) => setActiveUsers(data.result))
      .catch(() => setActiveUsers(null));
  }, []);

  const handleFormRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        console.log("Failed to subscribe");
      }

      router.push("/newsletter/subscribed");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-dvh flex items-center">
      <div className="m-auto flex flex-col gap-3 md:gap-5 justify-center p-4">
        <span className="text-[#333] font-bold text-md md:text-xl max-w-75 md:max-w-xl w-full text-center">
          Daily Ingrish
        </span>
        <h1 className="text-[#333] font-bold text-2xl md:text-4xl max-w-75 md:max-w-xl w-full text-center">
          Inglês para quem não tem tempo de aprender inglês.
        </h1>
        <h2 className="text-[#333] text-sm md:text-base max-w-75 md:max-w-xl w-full text-center">
          Junte-se à nossa turma de{" "}
          <b className="font-bold">{activeUsers}/99 readers ativos</b>:
        </h2>
        <form onSubmit={handleFormRequest} className="w-full max-w-75 md:max-w-xl">
          <FieldGroup>
            <Field>
              <Input
                id="small-form-email"
                className="h-12 md:h-14 font-bold"
                placeholder="Seu email principal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field orientation="horizontal">
              <Button
                className="w-full cursor-pointer md:h-14 h-12 bg-green-800 hover:bg-green-900 font-bold"
                type="submit"
                disabled={isLoading}
              >
                Inscreva-se (Grátis)
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
