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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { pt } from "date-fns/locale";
import { Api } from "@/lib/api";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import { toast } from "sonner";

interface Props {
  disciplinaMinistrada: DisciplinaMinistrada;
  pegarAvaliacoesCriadas: () => void;
}

const AdicionarAvaliacao = ({
  disciplinaMinistrada,
  pegarAvaliacoesCriadas,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState<string>("");

  const enviar = async () => {
    if (date && name) {
      await Api.criarProva(
        disciplinaMinistrada.id_disciplina,
        name,
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );

      toast("Prova criada com sucesso", {
        description: `A prova foi criada em ${format(date, "PPP", {
          locale: pt,
        })}.`,
      });

      pegarAvaliacoesCriadas();
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar avaliação</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar nova avaliação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar uma nova avaliação
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
                  {date ? (
                    format(date, "PPP", { locale: pt })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
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

export default AdicionarAvaliacao;
