"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
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
import { useMemo, useState } from "react";
import { AlunoMatriculado } from "@/types/alunoMatriculado.type";
import { Api } from "@/lib/api";
import { toast } from "sonner"; // Para mensagens de feedback

interface Props {
  alunos: AlunoMatriculado[];
  idProfessor: number;
}

export function TabelaPresenca({ alunos, idProfessor }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [presencas, setPresencas] = useState<{ [key: number]: number }>({}); // Armazena 0 (ausente) ou 1 (presente)

  // Toggle presença para o aluno específico usando id (somente para ausentes)
  const togglePresenca = (id: number) => {
    setPresencas((prevState) => ({
      ...prevState,
      [id]: prevState[id] === 0 ? 1 : 0, // Alterna entre 1 (presente) e 0 (ausente)
    }));
  };

  // Função para registrar chamada
  const registrarChamada = async () => {
    console.log("Função registrarChamada chamada");
    try {
      await Api.registrarChamada(
        idProfessor,
        alunos.map((aluno) => ({
          idPessoa: aluno.id,
          status: presencas[aluno.id] ?? 1, // Por padrão, assume 1 (presente) se não estiver definido
        }))
      );
      toast.success("Chamada registrada com sucesso");
    } catch (error) {
      toast.error("Erro ao registrar a chamada");
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Nome",
        accessorKey: "nome_aluno",
        enableSorting: true,
      },
      {
        header: "Email",
        accessorKey: "email_aluno",
        enableSorting: true,
      },
      {
        header: "Presença",
        cell: ({ row }) => {
          const id = row.original.id; // Certifique-se de usar o campo correto para o ID
          return (
            <input
              type="checkbox"
              checked={presencas[id] === 0} // Marcado apenas para ausentes
              onChange={() => togglePresenca(id)}
            />
          );
        },
      },
    ],
    [presencas]
  );

  const table = useReactTable({
    data: alunos,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrando por nome"
          value={
            (table.getColumn("nome_aluno")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("nome_aluno")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const displayName = {
                  nome_aluno: "Nome",
                  email_aluno: "Email",
                  presenca: "Faltou",
                }[column.id] || column.id;

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {displayName}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
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
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} coluna(s) selecionadas.
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
      <div className="py-4">
        <Button onClick={registrarChamada}>Registrar Chamada</Button>
      </div>
    </div>
  );
}

export default TabelaPresenca;