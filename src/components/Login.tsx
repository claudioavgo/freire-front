"use client";

import { login } from "@/lib/auth";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { LoaderCircle } from "lucide-react";
import { TextEffect } from "./motion-ui/text-effect";

interface LoginTipsProps {
  className?: string;
}

export function Login({ className }: LoginTipsProps) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const entrar = async () => {
    setLoading(true);
    const resposta = await login({ email, senha });
    setEmail("");
    setSenha("");

    if (resposta) {
      setError(resposta.message);
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-md p-10 ${className} flex flex-col justify-center items-center animate-fade-left animate-once animate-ease-linear`}
    >
      <div className="w-2/4">
        <div className="mb-10 flex flex-col items-left">
          <TextEffect
            per="char"
            preset="blur"
            className="text-3xl font-semibold mb-2"
          >
            Seja bem-vindo(a) de volta
          </TextEffect>
          <TextEffect per="char" preset="blur" className="">
            Digite seu email e sua senha para continuar.
          </TextEffect>
        </div>
        <div className="w-full flex flex-col space-y-5">
          {error && <h1 className="text-sm text-red-500">*{error}</h1>}
          <div className="space-y-2">
            <Label htmlFor="password">Email</Label>
            <Input
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
            />
          </div>
          <Button onClick={entrar} className="w-full" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin text-muted" />
            ) : (
              "Entrar"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
