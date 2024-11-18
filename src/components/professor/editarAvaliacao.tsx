"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { pt } from "date-fns/locale";
import { Api } from "@/lib/api";
import { toast } from "sonner";
import { AvaliacaoCriada } from "@/types/avaliacaoCriada.type";

interface Props {
  idAvaliacao: number;
  avaliacao: AvaliacaoCriada;
  pegarAvaliacoesCriadas: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const EditarAvaliacao = ({
  idAvaliacao,
  avaliacao,
  pegarAvaliacoesCriadas,
  onClose,
  isOpen,
}: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (avaliacao) {
      const avaliacaoDate = new Date(avaliacao.data);
      avaliacaoDate.setDate(avaliacaoDate.getDate() + 1);
      setDate(avaliacaoDate);
      setName(avaliacao.descricao);
    }
  }, [avaliacao]);

  const enviar = async () => {
    if (date && name) {
      await Api.editarProva(
        idAvaliacao,
        name,
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );

      toast("Prova editada com sucesso", {
        description: `A prova foi edita para ${format(date, "PPP", {
          locale: pt,
        })}.`,
      });

      pegarAvaliacoesCriadas();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar avaliação {avaliacao?.descricao}</DialogTitle>
          <DialogDescription>
            Atualize os campos abaixo para editar a avaliação
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome da avaliação
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Data da avaliação
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date && name ? (
                    format(date, "PPP", { locale: pt })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={(day) => day && setDate(day)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={enviar}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditarAvaliacao;
