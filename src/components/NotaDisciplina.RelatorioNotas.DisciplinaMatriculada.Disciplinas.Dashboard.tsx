"use client";

import { MessageSquareReply } from "lucide-react";
import { Avaliacao } from "@/types/avaliacao.type";

interface Props {
  className?: string;
  avaliacao: Avaliacao;
}

export function NotaDisciplina({ avaliacao }: Props) {
  return (
    <div className="rounded-xl p-6 w-full border flex items-center justify-between">
      <div className="flex flex-col justify-center items-start space-y-2">
        <h1 className="text-xl font-semibold">{avaliacao.descricao}</h1>
        <div>
          <div className="flex justify-start items-center space-x-1">
            <MessageSquareReply
              size={"1rem"}
              className="text-muted-foreground"
            />
            <p className="text-muted-foreground">Comentário do professor</p>
          </div>
          <p className="text-lg">{avaliacao.feedback}</p>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{avaliacao.nota}</h1>
      </div>
    </div>
  );
}
