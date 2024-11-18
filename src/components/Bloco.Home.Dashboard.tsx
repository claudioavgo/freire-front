"use client";

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Props {
  className?: string;
  titulo: string | number;
  descricacao: string;
  Icone: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export function BlocoDashboard({ titulo, descricacao, Icone }: Props) {
  return (
    <div className="p-3 flex justify-center items-center border rounded-xl space-x-5 w-full">
      <div className="rounded-xl bg-blue-600 p-2 text-xl border border-white/10">
        <Icone size="2rem" />
      </div>
      <div className="whitespace-nowrap">
        <h1 className="text-2xl font-bold">{titulo}</h1>
        <p className="text-sm text-muted-foreground">{descricacao}</p>
      </div>
    </div>
  );
}
