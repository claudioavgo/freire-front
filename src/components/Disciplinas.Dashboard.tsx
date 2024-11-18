import { useEffect, useState } from "react";
import { DisciplinaMatriculada } from "./DisciplinaMatriculada.Disciplinas.Dashboard";
import { Api } from "@/lib/api";
import { Disciplina } from "@/types/disciplina.type";
import { Pessoa } from "@/types/pessoa.type";
import { Loader } from "lucide-react";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import { DisciplinaMinistradaBloco } from "./professor/DisciplinaMinistrada.Disciplinas.Dashboard";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function DisciplinasDashboard({ className, pessoa }: Props) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [disciplinasMinistradas, setDisciplinasMinistradas] = useState<
    DisciplinaMinistrada[]
  >([]);
  const [rendimento, setRedimento] = useState<string>("0");

  const [tipo, setTipo] = useState<string>("");

  useEffect(() => {
    setTipo(pessoa.tipo);

    const fetchAluno = async () => {
      const retornoDisciplinas = await Api.pegarDisciplinas(pessoa.idPessoa);
      const retornoRendimento = await Api.pegarRendimentoAluno(
        pessoa?.idPessoa
      );

      if (retornoDisciplinas && retornoRendimento) {
        setDisciplinas(retornoDisciplinas);
        setRedimento(retornoRendimento.rendimento?.toFixed(2));
      }
    };

    const fetchProfessor = async () => {
      const retornoDisciplinas = await Api.pegarDisciplinasMinistradas(
        pessoa.idPessoa
      );

      if (retornoDisciplinas) {
        setDisciplinasMinistradas(retornoDisciplinas);
      }
    };

    if (pessoa.tipo === "aluno") {
      fetchAluno();
    } else if (pessoa.tipo === "professor") {
      fetchProfessor();
    }
  }, [pessoa.idPessoa, pessoa.tipo]);

  if (tipo === "professor") {
    return (
      <div className={`${className} w-full space-y-5`}>
        <div className="w-full justify-between">
          <h1 className="text-2xl font-semibold">
            Suas disciplinas ministradas
          </h1>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5">
            {disciplinasMinistradas &&
              disciplinasMinistradas.map((disciplina) => (
                <DisciplinaMinistradaBloco
                  key={disciplina.id_disciplina}
                  disciplina={disciplina}
                  pessoa={pessoa}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else if (disciplinas.length > 0) {
    return (
      <div className={`${className} w-full space-y-5`}>
        <div className="border rounded-xl w-full px-12 py-10 flex justify-between">
          <h1 className="text-2xl font-semibold">Coeficiente de Rendimento</h1>
          <h1 className="text-2xl font-semibold">{rendimento}</h1>
        </div>
        <div className="flex flex-col space-y-5">
          {disciplinas &&
            disciplinas.map((disciplina) => (
              <DisciplinaMatriculada
                key={disciplina.id_disciplina}
                idDisciplina={disciplina.id_disciplina}
                nomeDisciplina={disciplina.disciplina}
                nomeProfessor={disciplina.professor}
                idPessoa={pessoa?.idPessoa}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader size={"2rem"} className="animate-spin text-muted" />
      </div>
    );
  }
}
