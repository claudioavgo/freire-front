import React, { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo para o contexto
type SidebarContextType = {
  selectedButton: string;
  setSelectedButton: (button: string) => void;
};

// Cria o contexto com um valor inicial
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Componente de provedor do contexto
export const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedButton, setSelectedButton] = useState<string>("Home");

  return (
    <SidebarContext.Provider value={{ selectedButton, setSelectedButton }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook para consumir o contexto
export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext deve ser usado dentro de um SidebarProvider"
    );
  }
  return context;
};
