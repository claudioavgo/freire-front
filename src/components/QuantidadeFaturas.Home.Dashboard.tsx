"use client";
import { Api } from "@/lib/api";
import { Pessoa } from "@/types/pessoa.type";
import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function QuantidadeFaturas({ pessoa }: Props) {
  const [faturas, setFaturas] = useState<number>(0);

  useEffect(() => {
    const pegarFaturas = async () => {
      const data = await Api.pegarFaturas(pessoa.idPessoa);

      if (data) {
        setFaturas(data.length);
      }
    };
    pegarFaturas();
  }, []);

  return (
    <div className="p-3 flex justify-center items-center border rounded-xl space-x-5 w-fit">
      <div className="rounded-xl bg-pink-600 p-2 text-xl">
        <Landmark size="2rem" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">3</h1>
        <p className="text-sm text-muted-foreground">Faturas pendentes</p>
      </div>
    </div>
  );
}
