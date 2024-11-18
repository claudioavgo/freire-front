"use client";

import { Flame } from "lucide-react";
import { BorderTrail } from "./motion-ui/border-trail";
import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { Pessoa } from "@/types/pessoa.type";

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function PresencaStreak({ className, pessoa }: Props) {
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const pegarCadeiras = async () => {
      const streak = await Api.pegarStreakAluno(pessoa.idPessoa);

      if (streak) {
        setStreak(streak.streak_atual);
      }
    };
    pegarCadeiras();
  }, []);

  return (
    <div className="relative p-3 flex justify-center items-center border rounded-xl space-x-5 w-fit card-shine-effect">
      <BorderTrail
        style={{
          boxShadow:
            "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
        }}
        size={100}
      />
      <div className="rounded-xl bg-orange-600 p-2 text-xl">
        <Flame size={"2rem"} />
      </div>
      <div className="whitespace-nowrap">
        <h1 className="text-2xl font-bold">{streak}</h1>
        <p className="text-sm text-muted-foreground">Sequência de presenças</p>
      </div>
    </div>
  );
}
