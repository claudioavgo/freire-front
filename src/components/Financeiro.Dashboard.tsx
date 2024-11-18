import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { Pessoa } from "@/types/pessoa.type";
import { Loader, LoaderCircle } from "lucide-react";
import { Fatura } from "@/types/fatura.type";
import { FaturaFinanceiro } from "./Fatura.Financeiro.Dashboard";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function FinanceiroDashboard({ className, pessoa }: Props) {
  const [faturas, setFaturas] = useState<Fatura[]>([]);

  useEffect(() => {
    const fetchFaturas = async () => {
      if (pessoa?.idPessoa) {
        const retornoFaturas = await Api.pegarFaturas(pessoa?.idPessoa);

        if (retornoFaturas) {
          setFaturas(retornoFaturas);
        }
      }
    };

    fetchFaturas();
  }, [pessoa?.idPessoa]);

  const pagarFatura = async (id_pagamento: number) => {
    const retorno = await Api.pagarFatura(id_pagamento);

    setFaturas((prev) =>
      prev.map((fatura) =>
        fatura.id_pagamento === id_pagamento
          ? { ...fatura, status: true }
          : fatura
      )
    );
  };

  if (faturas?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size={"2rem"} className="animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className={`${className} w-full space-y-5`}>
      <div className="w-full justify-between">
        <h1 className="text-2xl font-semibold">Suas faturas pedentes</h1>
      </div>
      <div className="flex flex-col space-y-5">
        {faturas &&
          faturas.map(
            (fatura) =>
              !fatura.status && (
                <FaturaFinanceiro
                  key={fatura.id_pagamento}
                  fatura={fatura}
                  pessoa={pessoa}
                  pagarFatura={pagarFatura}
                />
              )
          )}
      </div>
      <div className="w-full justify-between">
        <h1 className="text-2xl font-semibold">Suas faturas pagas</h1>
      </div>
      <div className="flex flex-col space-y-5">
        {faturas &&
          faturas.map(
            (fatura) =>
              fatura.status && (
                <FaturaFinanceiro
                  key={fatura.id_pagamento}
                  fatura={fatura}
                  pessoa={pessoa}
                />
              )
          )}
      </div>
    </div>
  );
}
