import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { ChevronDown, GraduationCap } from "lucide-react";
import { Divisor } from "./ui/Divisor";
import { RelatorioNotas } from "./RelatorioNotas.DisciplinaMatriculada.Disciplinas.Dashboard";
import { AtributoDisciplinaMatriculada } from "./Atributo.DisciplinaMatriculada.Disciplinas.Dashboard";
import { Avaliacao } from "@/types/avaliacao.type";
import { Api } from "@/lib/api";

interface Props {
  className?: string;
  nomeDisciplina: string;
  nomeProfessor: string;
  idDisciplina: number;
  idPessoa: number | undefined;
}

export function DisciplinaMatriculada({
  className,
  nomeDisciplina,
  nomeProfessor,
  idDisciplina,
  idPessoa,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[] | null>([]);
  const [media, setMedia] = useState<number>(0);
  const [qntdFaltas, setQntdFaltas] = useState<number>(0);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      if (idPessoa) {
        const retornoAvaliacoes = await Api.pegarAvaliacoesPorIdDaDisciplina(
          idPessoa,
          idDisciplina
        );

        const retornoFaltas = await Api.pegarFaltasPorIdDaDisciplina(
          idPessoa,
          idDisciplina
        );

        if (retornoAvaliacoes && retornoFaltas) {
          setAvaliacoes(retornoAvaliacoes);

          let soma = 0;
          retornoAvaliacoes.forEach((avaliacao) => {
            soma += avaliacao.nota;
          });
          const media = soma / retornoAvaliacoes.length;

          setQntdFaltas(retornoFaltas.faltas);
          setMedia(media);
        }
      }
    };

    fetchAvaliacoes();
  }, [idDisciplina, idPessoa]);

  return (
    <div className={`${className} w-full`}>
      <div className="w-full border rounded-xl py-10 px-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{nomeDisciplina}</h1>
            <div className="flex justify-start items-center space-x-1">
              <GraduationCap className="text-muted-foreground" size={"1rem"} />
              <h1 className="text-sm text-muted-foreground">
                Prof. {nomeProfessor}
              </h1>
            </div>
          </div>
          <div></div>
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
            <div className="flex flex-col space-y-5">
              <AtributoDisciplinaMatriculada
                titulo={qntdFaltas}
                descricao="Quantidade de faltas"
              />
              <AtributoDisciplinaMatriculada
                titulo={media}
                descricao="Sua média geral"
              />
            </div>
            <RelatorioNotas avaliacoes={avaliacoes} />
          </div>
        </div>
      </div>
    </div>
  );
}
