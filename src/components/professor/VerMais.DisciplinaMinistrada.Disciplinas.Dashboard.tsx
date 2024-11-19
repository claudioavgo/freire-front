"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import TabelaPresenca from "./tabelaPresenca"; // Certifique-se de que o caminho está correto
import { AlunoMatriculado } from "@/types/alunoMatriculado.type";

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Avaliações">Avaliações</TabsTrigger>
            <TabsTrigger value="Presença">Presença</TabsTrigger>
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
          <TabsContent value="Presença">
            <Card>
              <CardHeader>
                <CardTitle>Presença</CardTitle>
                <CardDescription>
                  Veja e gerencie a presença dos alunos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {
                  
                }
                <TabelaPresenca alunos={alunos} idProfessor={pessoa.idPessoa} />
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