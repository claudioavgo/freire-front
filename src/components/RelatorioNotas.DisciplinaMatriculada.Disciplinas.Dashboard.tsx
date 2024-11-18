"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avaliacao } from "@/types/avaliacao.type";
import { NotaDisciplina } from "./NotaDisciplina.RelatorioNotas.DisciplinaMatriculada.Disciplinas.Dashboard";

interface Props {
  className?: string;
  avaliacoes: Avaliacao[] | null;
}

export function RelatorioNotas({ avaliacoes }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notas das suas avaliações</CardTitle>
        <CardDescription>
          Exibindo todas as notas das avaliações da disciplina
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex flex-col text-sm space-y-2 w-full">
          {avaliacoes &&
            avaliacoes.map((avaliacao) => (
              <NotaDisciplina key={avaliacao.descricao} avaliacao={avaliacao} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
