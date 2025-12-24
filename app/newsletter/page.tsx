"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      .catch(() => setActiveUsers(0));
  }, []);

  const handleFormRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const res = await fetch("/api/newsletter/subscribe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),        
        })

        if(!res.ok){
            console.log('Failed to subscribe');
        }

        router.push("/newsletter/subscribed");
    } catch(e) {
        console.log(e)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center md:p-2">
        <h1 className="text-[#333] font-bold text-xl md:text-4xl max-w-150 w-full text-center">
          Inglês para quem não tem tempo de aprender inglês.
        </h1>
        {activeUsers && (
          <h2 className="text-[#333] text-base md:text-base max-w-150 w-full text-center">
            Junte-se à nossa turma de{" "}
            <b className="font-bold">{activeUsers} learners ativos</b>:
          </h2>
        )}
        <Card className="w-full max-w-md">
          <CardContent>
            <form onSubmit={handleFormRequest}>
              <FieldGroup>
                <Field>
                  <Input
                    id="small-form-email"
                    className="h-14 font-bold"
                    placeholder="Seu email principal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field orientation="horizontal">
                  <Button
                    className="w-full cursor-pointer h-14 bg-green-800 hover:bg-green-900"
                    type="submit"
                    disabled={isLoading}
                  >
                    Inscreva-se (Grátis)
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
