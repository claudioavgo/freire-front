"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import AdicionarAvaliacao from "./adicionarAvaliacao";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { AvaliacaoCriada } from "@/types/avaliacaoCriada.type";
import { TabelaAvaliacoes } from "./tabelaAvaliacoes";
import { Pessoa } from "@/types/pessoa.type";
import TabelaEstudantes from "./tabelaEstudantes";
import { AlunoMatriculado } from "@/types/alunoMatriculado.type";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

interface Props {
  className?: string;
  disciplinaMinistrada: DisciplinaMinistrada;
  pessoa: Pessoa;
}

export function VerMaisDisciplinaMinistrada({
  disciplinaMinistrada,
  pessoa,
}: Props) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoCriada[]>([]);
  const [alunos, setAlunos] = useState<AlunoMatriculado[]>([]);

  useEffect(() => {
    const pegar = async () => {
      const avaliacoes = await Api.pegarAvaliacoesCriadas(
        disciplinaMinistrada.id_disciplina
      );

      const alunos = await Api.pegarAlunosMatriculados(
        disciplinaMinistrada.id_disciplina
      );

      if (avaliacoes && alunos) {
        setAvaliacoes(avaliacoes);
        setAlunos(alunos);
      }
    };

    pegar();
  }, [disciplinaMinistrada.id_disciplina]);

  const pegarAvaliacoesCriadas = async () => {
    const avaliacoes = await Api.pegarAvaliacoesCriadas(
      disciplinaMinistrada.id_disciplina
    );

    if (avaliacoes) {
      setAvaliacoes(avaliacoes);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detalhes da disciplina</CardTitle>
        <CardDescription>
          Veja, crie e edite informações sobre suas disciplina
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-start space-x-5">
        <Tabs defaultValue="Avaliações" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Avaliações">Avaliações</TabsTrigger>
            <TabsTrigger value="Estudantes">Estudantes</TabsTrigger>
          </TabsList>
          <TabsContent value="Avaliações">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações</CardTitle>
                <CardDescription>
                  Veja e crie avaliações para seus estudantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <TabelaAvaliacoes
                  pessoa={pessoa}
                  pegarAvaliacoesCriadas={pegarAvaliacoesCriadas}
                  avaliacoes={avaliacoes}
                  disciplinaMinistrada={disciplinaMinistrada}
                />
                <AdicionarAvaliacao
                  pegarAvaliacoesCriadas={pegarAvaliacoesCriadas}
                  disciplinaMinistrada={disciplinaMinistrada}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Estudantes">
            <Card>
              <CardHeader>
                <CardTitle>Estudantes</CardTitle>
                <CardDescription>
                  Veja todos os estudantes e seu desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabelaEstudantes alunos={alunos} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
