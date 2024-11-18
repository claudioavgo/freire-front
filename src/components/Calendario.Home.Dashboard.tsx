"use client";

import { useEffect, useState } from "react";
import { AulaCalendario } from "./Aula.Calendario.Home.Dashboard";
import { Api } from "@/lib/api";
import { Divisor } from "./ui/Divisor";
import { Pessoa } from "@/types/pessoa.type";
import { Agenda } from "@/types/agenda.type";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function CalendarioDashboard({ pessoa }: Props) {
  const data = {
    dia: new Date().getUTCDate(),
    mes: new Date().getUTCMonth(),
    diaSemana: new Date().getUTCDay(),
  };

  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const diaSemanaNome = diasSemana[data.diaSemana];
  const mesNome = meses[data.mes];

  const [aulas, setAulas] = useState<Agenda[]>([]);

  useEffect(() => {
    const pegarAulas = async () => {
      const aulas = await Api.pegarAgendaPessoa(pessoa.idPessoa);

      if (aulas) {
        setAulas(aulas);
      }
    };

    pegarAulas();
  }, [pessoa.idPessoa]);

  return (
    <div className="flex w-full border rounded-xl p-5 h-full">
      <div className="flex flex-col space-y-5 w-full h-max">
        <div>
          <h1 className="text-xl font-semibold">
            {diaSemanaNome}, {data.dia} de {mesNome}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-muted-foreground text-sm">Hoje</p>
          <Divisor className="border-muted-foreground" />
        </div>
        {aulas.map((aula) => (
          <AulaCalendario
            isProva={aula.is_prova}
            key={aula.disciplina}
            disciplina={aula.disciplina}
            sala={aula.sala}
            horaInicio={aula.hora_inicio}
            horaFim={aula.hora_fim}
            professor={aula.nome_professor}
          />
        ))}
      </div>
    </div>
  );
}
