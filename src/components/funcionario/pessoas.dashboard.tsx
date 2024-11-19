// src/components/Pessoas.Dashboard.tsx

"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Api } from "@/lib/api";
import { Pessoa, adicionarPessoa } from "@/types/pessoa.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePessoaContext } from "@/contexts/pessoa-context";
import { toast } from "sonner";
import axios from "axios";
import { DisciplinaUnica } from "@/types/disciplinaUnica.type";

interface PessoasDashboardProps {
  pessoa: Pessoa;
}

export function PessoasDashboard({ pessoa }) {
  const [data, setData] = useState<Pessoa[]>([]);
  const { pessoa: pessoaLogada } = usePessoaContext();

  useEffect(() => {
    const fetchData = async () => {
      const pessoas = await Api.pegarPessoas();
      if (pessoas) {
        const pessoasConverted = pessoas.map((p) => ({
          idPessoa: p.id_pessoa,
          nome: p.nome,
          rua: p.rua,
          numero: String(p.numero),
          cidade: p.cidade,
          telefone1: p.telefone1 ? String(p.telefone1) : null,
          telefone2: p.telefone2 ? String(p.telefone2) : null,
          email: p.email,
          senha: p.senha,
          dataNascimento: new Date(p.data_nascimento),
          tipo: p.tipo,
        }));
        setData(pessoasConverted);
      }
    };
    fetchData();
  }, []);

  const columns: ColumnDef<Pessoa>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "tipo",
      header: "Função",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tipo")}</div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const pessoa = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  // Implementar ação de visualizar detalhes
                  console.log("Visualizar detalhes de", pessoa.nome);
                }}
              >
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Implementar ação de editar
                  console.log("Editar", pessoa.nome);
                }}
              >
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Estados para controlar a exibição dos campos adicionais
  const [open, setOpen] = useState(false);
  const [novaPessoa, setNovaPessoa] = useState<adicionarPessoa>({
    nome: "",
    rua: "",
    numero: 0,
    cidade: "",
    telefone1: "",
    telefone2: "",
    email: "",
    senha: "",
    dataNascimento: "",
    tipo: 0,
    periodo: null,
    especializacao: "",
    idSecretaria: pessoaLogada?.idPessoa || 0,
  });
  const [mostrarCamposAluno, setMostrarCamposAluno] = useState(false);
  const [mostrarCamposProfessor, setMostrarCamposProfessor] = useState(false);

  // Estados para o diálogo de adicionar aluno
  const [openAdicionarAluno, setOpenAdicionarAluno] = useState(false);
  const [alunos, setAlunos] = useState<Pessoa[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinaUnica[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<number | null>(null);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const disciplinasResponse = await Api.pegarTodasDisciplinas();
        if (disciplinasResponse) setDisciplinas(disciplinasResponse);
      } catch (error) {
        toast.error("Erro ao carregar alunos e disciplinas.");
      }
    };
    fetchDados();
  }, []);

  const handleAdicionarAlunoADisciplina = async () => {
    if (alunoSelecionado && disciplinaSelecionada) {
      try {
        // Chame a API para adicionar o aluno à disciplina
        const response = await Api.adicionarAlunoNaDisciplina(
          alunoSelecionado,
          disciplinaSelecionada
        );
        if (response) {
          toast.success("Aluno adicionado à disciplina com sucesso!");
          setOpenAdicionarAluno(false);
        } else {
          toast.error("Erro ao adicionar aluno à disciplina.");
        }
      } catch (error) {
        toast.error("Erro ao adicionar aluno à disciplina.");
      }
    } else {
      toast.error("Selecione um aluno e uma disciplina.");
    }
  };
  const handleAdicionarPessoa = async () => {
    try {
      if (!novaPessoa.nome || !novaPessoa.email || !novaPessoa.senha) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const formattedPessoa = {
        ...novaPessoa,
        numero: novaPessoa.numero,
        dataNascimento: new Date(novaPessoa.dataNascimento)
          .toISOString()
          .split("T")[0],
        telefone1: novaPessoa.telefone1 || null,
        telefone2: novaPessoa.telefone2 || null,
        periodo: novaPessoa.periodo || null,
        especializacao: novaPessoa.especializacao || null,
      };

      console.log("Dados sendo enviados:", formattedPessoa);

      const response = await Api.adicionarPessoa(formattedPessoa);
      console.log("Resposta completa:", response);

      const statusCodeValue = response?.data?.statusCodeValue;
      console.log("statusCodeValue:", statusCodeValue);
      if (statusCodeValue === 201) {
        toast.success("Pessoa registrada com sucesso!");
        setOpen(false);
        const pessoas = await Api.pegarPessoas();
        if (pessoas) {
          const pessoasConverted = pessoas.map((p) => ({
            idPessoa: p.id_pessoa,
            nome: p.nome,
            rua: p.rua,
            numero: String(p.numero),
            cidade: p.cidade,
            telefone1: p.telefone1 ? String(p.telefone1) : null,
            telefone2: p.telefone2 ? String(p.telefone2) : null,
            email: p.email,
            senha: p.senha,
            dataNascimento: new Date(p.data_nascimento),
            tipo: p.tipo,
          }));
          setData(pessoasConverted);
        }
      } else if (statusCodeValue === 409) {
        toast.error(response?.data?.body || "Email já cadastrado!");
      } else if (statusCodeValue === 401) {
        toast.error("Não autorizado!");
      } else {
        toast.error("Erro ao registrar pessoa.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro detalhado:", {
          message: error.message,
          responseData: error.response?.data,
          status: error.response?.status,
          statusCodeValue: error.response?.data?.statusCodeValue, // Captura adicional de statusCodeValue
        });
        toast.error(
          `Erro ao registrar pessoa: ${
            error.response?.data?.body || error.message || "Erro desconhecido"
          }`
        );
      } else {
        console.error("Erro ao registrar pessoa:", error);
        toast.error("Erro ao registrar pessoa.");
      }
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Colunas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botão para adicionar pessoa */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Adicionar Pessoa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Adicionar nova pessoa</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar uma nova pessoa.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Nome */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    value={novaPessoa.nome}
                    onChange={(e) =>
                      setNovaPessoa({ ...novaPessoa, nome: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Email */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={novaPessoa.email}
                    onChange={(e) =>
                      setNovaPessoa({ ...novaPessoa, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Senha */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="senha" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    value={novaPessoa.senha}
                    onChange={(e) =>
                      setNovaPessoa({ ...novaPessoa, senha: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Data de Nascimento */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="datanascimento" className="text-right">
                    Data de Nascimento
                  </Label>
                  <Input
                    id="datanascimento"
                    type="date"
                    value={novaPessoa.dataNascimento}
                    onChange={(e) =>
                      setNovaPessoa({
                        ...novaPessoa,
                        dataNascimento: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Rua */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rua" className="text-right">
                    Rua
                  </Label>
                  <Input
                    id="rua"
                    value={novaPessoa.rua}
                    onChange={(e) =>
                      setNovaPessoa({ ...novaPessoa, rua: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Número */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="numero" className="text-right">
                    Número
                  </Label>
                  <Input
                    id="numero"
                    value={novaPessoa.numero}
                    onChange={(e) =>
                      setNovaPessoa({
                        ...novaPessoa,
                        numero: Number(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Cidade */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cidade" className="text-right">
                    Cidade
                  </Label>
                  <Input
                    id="cidade"
                    value={novaPessoa.cidade}
                    onChange={(e) =>
                      setNovaPessoa({ ...novaPessoa, cidade: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Telefone 1 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefone_1" className="text-right">
                    Telefone 1
                  </Label>
                  <Input
                    id="telefone_1"
                    value={novaPessoa.telefone1 || ""}
                    onChange={(e) =>
                      setNovaPessoa({
                        ...novaPessoa,
                        telefone1: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Telefone 2 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefone_2" className="text-right">
                    Telefone 2
                  </Label>
                  <Input
                    id="telefone_2"
                    value={novaPessoa.telefone2 || ""}
                    onChange={(e) =>
                      setNovaPessoa({
                        ...novaPessoa,
                        telefone2: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Tipo */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const tipoNumerico = parseInt(value, 10);
                      setNovaPessoa({ ...novaPessoa, tipo: tipoNumerico });
                      setMostrarCamposAluno(tipoNumerico === 0); // Aluno
                      setMostrarCamposProfessor(tipoNumerico === 1); // Professor
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="0">Aluno</SelectItem>
                        <SelectItem value="1">Professor</SelectItem>
                        <SelectItem value="2">Secretaria</SelectItem>
                        <SelectItem value="3">Super Secretaria</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Campos adicionais para Aluno */}
                {mostrarCamposAluno && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="periodo" className="text-right">
                      Período
                    </Label>
                    <Input
                      id="periodo"
                      type="number"
                      value={novaPessoa.periodo || ""}
                      onChange={(e) =>
                        setNovaPessoa({
                          ...novaPessoa,
                          periodo: parseInt(e.target.value, 10),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                )}
                {/* Campos adicionais para Professor */}
                {mostrarCamposProfessor && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="especializacao" className="text-right">
                      Especialização
                    </Label>
                    <Input
                      id="especializacao"
                      value={novaPessoa.especializacao || ""}
                      onChange={(e) =>
                        setNovaPessoa({
                          ...novaPessoa,
                          especializacao: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAdicionarPessoa}>
                  Salvar
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openAdicionarAluno}
            onOpenChange={setOpenAdicionarAluno}
          >
            <DialogTrigger asChild>
              <Button>Adicionar Aluno</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Adicionar Aluno à Disciplina</DialogTitle>
                <DialogDescription>
                  Selecione o aluno e a disciplina para adicionar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Selecionar Aluno */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="aluno" className="text-right">
                    Aluno
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setAlunoSelecionado(Number(value))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Alunos</SelectLabel>
                        {data.map((aluno, index) => (
                          <SelectItem
                            key={index}
                            value={String(aluno.idPessoa)}
                          >
                            {aluno.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Selecionar Disciplina */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="disciplina" className="text-right">
                    Disciplina
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setDisciplinaSelecionada(Number(value))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Disciplinas</SelectLabel>
                        {disciplinas.map((disciplina, index) => (
                          <SelectItem
                            key={disciplina.id_disciplina}
                            value={String(disciplina.id_disciplina)}
                          >
                            {disciplina.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAdicionarAlunoADisciplina}>
                  Adicionar
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setOpenAdicionarAluno(false)}
                >
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
