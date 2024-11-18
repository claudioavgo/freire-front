import { useState, useRef } from "react";
import { ChevronDown, UsersRound } from "lucide-react";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import { Button } from "../ui/button";
import { Divisor } from "../ui/Divisor";
import { VerMaisDisciplinaMinistrada } from "./VerMais.DisciplinaMinistrada.Disciplinas.Dashboard";
import { Pessoa } from "@/types/pessoa.type";

interface Props {
  className?: string;
  disciplina: DisciplinaMinistrada;
  pessoa: Pessoa;
}

export function DisciplinaMinistradaBloco({
  className,
  disciplina,
  pessoa,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${className} w-full`}>
      <div className="w-full border rounded-xl py-10 px-12">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{disciplina.nome}</h1>
            <div className="flex justify-start items-center space-x-2 text-muted-foreground">
              <UsersRound size={"1rem"} />
              <h1>{disciplina.num_alunos} estudantes</h1>
            </div>
          </div>

          <Button onClick={toggle} variant={"outline"}>
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
            <div className="flex flex-col w-full">
              <VerMaisDisciplinaMinistrada
                disciplinaMinistrada={disciplina}
                pessoa={pessoa}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
