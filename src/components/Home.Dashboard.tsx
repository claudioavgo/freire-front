"use client";

import { BlocoDashboard } from "./Bloco.Home.Dashboard";
import { TabelaRendimento } from "./TabelaRendimento.Home.Dashboard";
import { CalendarioDashboard } from "./Calendario.Home.Dashboard";
import { PresencaStreak } from "./PresencaStreak.Home.Dashboard";
import { Pessoa } from "@/types/pessoa.type";
import {
  BookCheck,
  BookOpenCheck,
  GraduationCap,
  Loader,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Disciplina } from "@/types/disciplina.type";
import { Api } from "@/lib/api";
import { IaAlert } from "./IA.Alert.Dashboard";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function HomeDashboard({ className, pessoa }: Props) {
  const [cadeiras, setCadeiras] = useState<Disciplina[]>([]);
  const [faturas, setFaturas] = useState<number>(0);
  const [alunos, setAlunos] = useState<number>(0);

  useEffect(() => {
    const pegarAluno = async () => {
      const cadeiras = await Api.pegarDisciplinas(pessoa?.idPessoa);
      const faturas = await Api.pegarFaturas(pessoa.idPessoa);

      if (cadeiras && faturas) {
        setCadeiras(cadeiras);
        setFaturas(faturas.length);
      }
    };

    const pegarProfessor = async () => {
      const alunos = await Api.pegarQntdAlunos(pessoa?.idPessoa);

      if (alunos) {
        setAlunos(alunos.quantidade_alunos);
      }
    };

    const pegarFuncionario = async () => {};

    if (pessoa.tipo === "aluno") {
      pegarAluno();
    } else if (pessoa.tipo === "professor") {
      pegarProfessor();
    }
  }, []);

  if (!pessoa) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size={"2rem"} className="animate-spin text-muted" />
      </div>
    );
  }

  if (pessoa.tipo === "professor") {
    return (
      <div className={`${className} w-full`}>
        <div className="w-full flex space-x-5">
          <div className="space-y-5 w-1/2">
            <div className="flex items-center space-x-5">
              <BlocoDashboard
                Icone={GraduationCap}
                titulo={alunos}
                descricacao="Estudantes"
              />
              <BlocoDashboard
                Icone={BookOpenCheck}
                titulo={2}
                descricacao="Provas corrigidas"
              />
              <BlocoDashboard
                Icone={BookCheck}
                titulo={30}
                descricacao="Aulas ministradas"
              />
            </div>
            <IaAlert />
          </div>
          <div className="w-1/2">
            <CalendarioDashboard pessoa={pessoa} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${className} w-full`}>
        <div className="flex space-x-5">
          <div className="w-1/2 space-y-5">
            <div className="flex justify-between items-center space-x-5 ">
              <BlocoDashboard
                Icone={GraduationCap}
                titulo={cadeiras.length}
                descricacao="Cadeiras matriculadas"
              />
              <PresencaStreak pessoa={pessoa} />
              <BlocoDashboard
                Icone={GraduationCap}
                titulo={faturas}
                descricacao="Faturas pendentes"
              />
            </div>
            <TabelaRendimento pessoa={pessoa} />
          </div>
          <div className="w-1/2">
            <CalendarioDashboard pessoa={pessoa} />
          </div>
        </div>
      </div>
    );
  }
}
