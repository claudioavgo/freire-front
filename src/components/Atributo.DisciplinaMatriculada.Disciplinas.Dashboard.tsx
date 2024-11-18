interface Props {
  titulo: string | number;
  descricao: string;
}

export function AtributoDisciplinaMatriculada({ titulo, descricao }: Props) {
  return (
    <div className="flex flex-col justify-center items-start border rounded-xl p-6 w-64 h-1/2">
      <h1 className="text-lg">{descricao}</h1>
      <h1 className="text-3xl font-bold">{titulo}</h1>
    </div>
  );
}
