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
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { AvaliacaoCriada } from "@/types/avaliacaoCriada.type";
import { useMemo, useState, useCallback } from "react";
import VerResultados from "./verResultados";
import { Api } from "@/lib/api";
import { Pessoa } from "@/types/pessoa.type";
import { DisciplinaMinistrada } from "@/types/disciplinaMinistrada.type";
import EditarAvaliacao from "./editarAvaliacao";

interface Props {
  avaliacoes: AvaliacaoCriada[];
  pegarAvaliacoesCriadas: () => void;
  disciplinaMinistrada: DisciplinaMinistrada;
  pessoa: Pessoa;
}

export function TabelaAvaliacoes({
  avaliacoes,
  pegarAvaliacoesCriadas,
  pessoa,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [resultadosVisiveis, setResultadosVisiveis] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<number>(0);
  const [editarVisivel, setEditarVisivel] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] =
    useState<AvaliacaoCriada>();

  const verResultados = useCallback((id_avaliacao: number) => {
    setIdSelecionado(id_avaliacao);
    setResultadosVisiveis(true);
  }, []);

  const editarAvaliacao = useCallback(
    (id_avaliacao: number, avaliacao?: AvaliacaoCriada) => {
      setIdSelecionado(id_avaliacao);
      setAvaliacaoSelecionada(avaliacao);
      setEditarVisivel(true);
    },
    []
  );

  const deletarAvaliacao = useCallback(
    async (id_avaliacao: number) => {
      const response = await Api.deletarAvaliacao(id_avaliacao);

      if (response) {
        pegarAvaliacoesCriadas();
      }
    },
    [pegarAvaliacoesCriadas]
  );

  const fecharResultados = () => {
    setResultadosVisiveis(false);
    setIdSelecionado(0);
  };

  const fecharEditarAvaliacao = () => {
    setEditarVisivel(false);
    setIdSelecionado(0);
  };

  const columns = useMemo(
    () => [
      {
        header: "Descrição",
        accessorKey: "descricao",
      },
      {
        header: "Data",
        accessorKey: "data",
      },
      {
        header: "Ações",
        enableHiding: false,
        cell: ({ row }) => {
          const id_avaliacao = row.original.id_avaliacao;
          const avaliacao = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => verResultados(id_avaliacao)}>
                  Ver Resultados
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editarAvaliacao(id_avaliacao, avaliacao)}
                >
                  Editar Avaliação
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deletarAvaliacao(id_avaliacao)}
                >
                  Deletar Avaliação
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [deletarAvaliacao, verResultados]
  );

  const table = useReactTable({
    data: avaliacoes,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrando por descrição"
          value={
            (table.getColumn("descricao")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("descricao")?.setFilterValue(event.target.value)
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
      </div>
      <div className="rounded-md border">
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

      <VerResultados
        id_professor={pessoa.idPessoa}
        id_avaliacao={idSelecionado}
        isOpen={resultadosVisiveis}
        onClose={fecharResultados}
      />

      <EditarAvaliacao
        avaliacao={avaliacaoSelecionada ?? ({} as AvaliacaoCriada)}
        isOpen={editarVisivel}
        onClose={fecharEditarAvaliacao}
        idAvaliacao={idSelecionado}
        pegarAvaliacoesCriadas={pegarAvaliacoesCriadas}
      />
    </div>
  );
}

export default TabelaAvaliacoes;
