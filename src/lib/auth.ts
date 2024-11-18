"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Api } from "./api";
import { Pessoa } from "@/types/pessoa.type";

export async function validarCredenciais(email: string, senha: string) {
  const resposta = await Api.autenticar(email, senha);

  return resposta;
}

export async function pegarUsuario(auth: { email: string; senha: string }) {
  const { email, senha } = auth;

  const usuario = await Api.autenticar(email, senha);

  if (!usuario) {
    return null;
  }

  return usuario;
}

export async function login(auth: { email: string; senha: string }) {
  const { email, senha } = auth;

  const credenciaisValidas = await validarCredenciais(email, senha);

  if (!credenciaisValidas) {
    return {
      error: true,
      message: "Credenciais inválidas, tente novamente.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("email", auth.email);
  cookieStore.set("senha", auth.senha);

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("email");
  cookieStore.delete("senha");

  redirect("/");
}

export async function pegarSessao(): Promise<Pessoa | null> {
  const cookieStore = await cookies();

  const email = cookieStore.get("email")?.value;
  const senha = cookieStore.get("senha")?.value;

  const usuarioAtivo = await pegarUsuario({
    email: email || "",
    senha: senha || "",
  });

  if (!usuarioAtivo) {
    return null;
  }

  return usuarioAtivo;
}
