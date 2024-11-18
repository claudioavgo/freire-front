import { BookText, Clock2, GraduationCap, Shapes } from "lucide-react";

interface Props {
  disciplina: string;
  sala: string;
  professor?: string;
  isProva: boolean;
  horaInicio: string;
  horaFim: string;
}

export function AulaCalendario({
  disciplina,
  horaInicio,
  horaFim,
  sala,
  isProva,
  professor,
}: Props) {
  return (
    <div className="p-3 flex justify-start items-center border rounded-xl space-x-5 w-full">
      <div
        className={`rounded-xl ${
          !isProva ? "bg-blue-600" : "bg-red-600"
        } p-2 text-xl`}
      >
        <BookText />
      </div>
      <div className="w-full">
        <h1 className="font-bold">{disciplina}</h1>
        <div className="flex space-x-5 w-full">
          <div className="flex justify-center items-center space-x-1">
            <Clock2 size={"1rem"} />
            <p className="text-sm text-muted-foreground flex">
              {horaInicio} - {horaFim}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <Shapes size={"1rem"} />
            <p className="text-sm text-muted-foreground flex">Sala {sala}</p>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <GraduationCap size={"1rem"} />
            <p className="text-sm text-muted-foreground flex">
              Prof. {professor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
