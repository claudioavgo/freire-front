"use client";

import { DisciplinasDashboard } from "@/components/Disciplinas.Dashboard";
import { FinanceiroDashboard } from "@/components/Financeiro.Dashboard";
import { HomeDashboard } from "@/components/Home.Dashboard";
import { usePessoaContext } from "@/contexts/pessoa-context";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const { selectedButton } = useSidebarContext();
  const { pessoa } = usePessoaContext();

  if (!pessoa) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size={"2rem"} className="animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="p-10 w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold">{selectedButton}</h1>
        <p>Seja bem-vindo(a) de volta, {pessoa?.nome.split(" ")[0]}!</p>
      </div>
      {selectedButton === "Home" && <HomeDashboard pessoa={pessoa} />}
      {selectedButton === "Disciplinas" && (
        <DisciplinasDashboard pessoa={pessoa} />
      )}
      {selectedButton === "Financeiro" && (
        <FinanceiroDashboard pessoa={pessoa} />
      )}
    </div>
  );
}
