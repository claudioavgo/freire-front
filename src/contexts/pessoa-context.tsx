"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Pessoa } from "../types/pessoa.type"; // Certifique-se de ajustar o caminho conforme necessário
import { pegarSessao } from "@/lib/auth";

// Define o tipo para o contexto
type PessoaContextType = {
  pessoa: Pessoa | null;
  setPessoa: (pessoa: Pessoa) => void;
};

// Cria o contexto com um valor inicial
const PessoaContext = createContext<PessoaContextType | undefined>(undefined);

// Componente de provedor do contexto
export const PessoaContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);

  useEffect(() => {
    const usuario = async () => {
      const pessoa = await pegarSessao();

      setPessoa(pessoa);
    };

    usuario();
  }, []);

  return (
    <PessoaContext.Provider value={{ pessoa, setPessoa }}>
      {children}
    </PessoaContext.Provider>
  );
};

// Hook para consumir o contexto
export const usePessoaContext = (): PessoaContextType => {
  const context = useContext(PessoaContext);
  if (!context) {
    throw new Error(
      "usePessoaContext deve ser usado dentro de um PessoaContextProvider"
    );
  }
  return context;
};
