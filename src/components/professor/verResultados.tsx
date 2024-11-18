"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Api } from "@/lib/api";
import { ResultadoAvaliacao } from "@/types/resultadoAvaliacao.type";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface Props {
  id_avaliacao: number;
  id_professor: number;
  isOpen: boolean;
  onClose: () => void;
}

const VerResultados = ({
  id_avaliacao,
  id_professor,
  isOpen,
  onClose,
}: Props) => {
  const [avaliacoes, setAvaliacoes] = useState<ResultadoAvaliacao[]>([]);
  const [avaliando, setAvaliando] = useState<ResultadoAvaliacao | null>(null);

  const [nota, setNota] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const pegarResultados = async () => {
      const resultados = await Api.pegarResultadoAvaliacoes(id_avaliacao);

      if (resultados) {
        console.log(resultados);
        setAvaliacoes(resultados);
      }
    };

    pegarResultados();
  }, [id_avaliacao]);

  const avaliar = async (resultadoAvaliacao: ResultadoAvaliacao) => {
    setAvaliando(resultadoAvaliacao);
  };

  const fechar = () => {
    setAvaliando(null);
    onClose();
  };

  const enviarAvaliacao = async () => {
    if (!avaliando) return;

    const response = await Api.criarResultadoAvaliacao(
      id_avaliacao,
      avaliando?.id_aluno,
      id_professor,
      nota,
      feedback
    );

    if (response) {
      const resultados = await Api.pegarResultadoAvaliacoes(id_avaliacao);

      if (resultados) {
        setAvaliacoes(resultados);
      }

      toast("Adicionado resultado da avaliação", {
        description: `O resultado da avalição foi adicionado com sucesso.`,
      });

      setNota(0);
      setFeedback("");

      setAvaliando(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resultados da Avaliação</DialogTitle>
          <DialogDescription>
            Veja os resultados detalhados abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col max-h-96 overflow-y-auto border rounded-xl">
          {!avaliando ? (
            avaliacoes.length > 0 ? (
              avaliacoes.map((resultadoAvaliacao) => (
                <div
                  key={resultadoAvaliacao.id_aluno}
                  className="p-4 border-b flex w-full items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {resultadoAvaliacao.nome_aluno}
                    </h2>
                    {resultadoAvaliacao.nota >= 0 && (
                      <div>
                        <p>Nota: {resultadoAvaliacao.nota}</p>
                        <p>Descrição: {resultadoAvaliacao.feedback}</p>
                      </div>
                    )}
                  </div>
                  {resultadoAvaliacao.nota < 0 && (
                    <Button
                      onClick={() => {
                        avaliar(resultadoAvaliacao);
                      }}
                      variant="outline"
                      className="ml-auto"
                    >
                      Avaliar
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p className="p-4">Nenhum resultado encontrado.</p>
            )
          ) : (
            <div className="p-4 flex flex-col space-y-5">
              <h1>
                Avaliando estudante{" "}
                <span className="font-semibold">{avaliando.nome_aluno}</span>.
              </h1>
              <div>
                <Label>Nota da avaliação</Label>
                <Input
                  onChange={(e) => setNota(Number(e.target.value))}
                  value={nota}
                  type="number"
                  placeholder="Digite a nota do estudante."
                />
              </div>
              <div>
                <Label>Feedback da nota</Label>
                <Textarea
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
                  className="resize-none"
                  placeholder="Digite aqui o feedback da avaliação."
                />
              </div>
              <Button
                variant={"secondary"}
                className="w-full"
                onClick={enviarAvaliacao}
              >
                Salvar
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={fechar}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerResultados;
