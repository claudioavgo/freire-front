import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Divisor } from "./ui/Divisor";

import { Fatura } from "@/types/fatura.type";
import { ChevronDown } from "lucide-react";
import { Pessoa } from "@/types/pessoa.type";

interface Props {
  className?: string;
  fatura: Fatura;
  pessoa: Pessoa;
  pagarFatura?: (id_pagamento: number) => void;
}

export function FaturaFinanceiro({
  className,
  fatura,
  pessoa,
  pagarFatura,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const num = Number(fatura.data_pagamento.split("-")[1]) - 1;

  const mesNome = meses[num];

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const pagar = () => {
    if (pagarFatura) {
      pagarFatura(fatura.id_pagamento);
    }
  };

  return (
    <div className={`${className} w-full`}>
      <div className="w-full border rounded-xl py-5 px-12">
        <div className="flex justify-between items-center">
          <div>
            <h1
              className={
                "text-xl font-semibold " +
                (fatura.status ? "text-muted-foreground" : "")
              }
            >
              Fatura {mesNome}
            </h1>
            <div
              className={`flex justify-start items-center w-fit px-2 rounded mt-1 ${
                fatura.status ? "bg-muted" : "bg-muted-foreground"
              }`}
            >
              <h1
                className={`text-sm ${
                  fatura.status ? "text-muted-foreground" : "text-muted"
                }`}
              >
                {fatura.status ? "pago" : "pendente"}
              </h1>
            </div>
          </div>
          <div></div>
          <Button onClick={toggle} variant={"outline"} disabled={fatura.status}>
            <ChevronDown
              className={
                isExpanded
                  ? "transition-all duration-500 ease-in-out rotate-180"
                  : "transition-all duration-500 ease-in-out"
              }
            />
          </Button>
        </div>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            height: isExpanded
              ? `${contentRef.current?.scrollHeight}px`
              : "0px",
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <Divisor className="mt-5 mb-5" />
          <div className="flex justify-start space-x-5">
            <div className="flex flex-col space-y-5 w-full">
              <div className="w-full p-5 rounded border-dashed border">
                <h1 className="font-mono">Devedor: {pessoa.nome}</h1>
                <h1 className="font-mono">Emissor: freire.app</h1>
                <h1 className="font-mono">
                  Descrição: Fatura mensal referente ao mês de {mesNome}.
                </h1>
                <h1 className="font-mono">Montante: R$ {fatura.valor}</h1>
              </div>
              <Button variant={"secondary"} onClick={pagar}>
                Pagar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
