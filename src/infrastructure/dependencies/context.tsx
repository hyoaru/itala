import { useCaseBus, identityProvider } from "@/infrastructure/dependencies";
import { createContext, useContext } from "react";
import type { UseCaseBus } from "../use-case-bus";

export interface Dependencies {
  useCaseBus: UseCaseBus;
  identityProvider: typeof identityProvider;
}

const DependenciesContext = createContext<Dependencies | null>(null);

export function DependenciesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value: Dependencies = { useCaseBus, identityProvider };
  return (
    <DependenciesContext.Provider value={value}>
      {children}
    </DependenciesContext.Provider>
  );
}

export function useDependencies(): Dependencies {
  const context = useContext(DependenciesContext);
  if (!context) {
    throw new Error(
      "useDependencies must be used within a DependenciesProvider",
    );
  }
  return context;
}
