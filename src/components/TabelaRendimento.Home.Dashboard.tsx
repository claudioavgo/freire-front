"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { Avaliacao } from "@/types/avaliacao.type";
import { Pessoa } from "@/types/pessoa.type";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  className?: string;
  pessoa: Pessoa;
}

export function TabelaRendimento({ className, pessoa }: Props) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    const pegarAvaliacoes = async () => {
      const avaliacoes = await Api.pegarAvaliacoes(pessoa.idPessoa);

      if (avaliacoes) {
        setAvaliacoes(avaliacoes);
      }
    };

    pegarAvaliacoes();
  }, []);

  const calcularMediaAvaliacoes = (avaliacoes: Avaliacao[]) => {
    const mediaAvaliacoes: { [key: string]: { total: number; count: number } } =
      {};

    avaliacoes.forEach((avaliacao) => {
      if (!mediaAvaliacoes[avaliacao.nome]) {
        mediaAvaliacoes[avaliacao.nome] = { total: 0, count: 0 };
      }
      mediaAvaliacoes[avaliacao.nome].total += avaliacao.nota;
      mediaAvaliacoes[avaliacao.nome].count += 1;
    });

    return Object.keys(mediaAvaliacoes).map((cadeira) => ({
      cadeira,
      media: mediaAvaliacoes[cadeira].total / mediaAvaliacoes[cadeira].count,
    }));
  };

  const chartData = calcularMediaAvaliacoes(avaliacoes);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu rendimento</CardTitle>
        <CardDescription>
          Sua média de rendimento das disciplinas matriculadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="cadeira"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="media" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
