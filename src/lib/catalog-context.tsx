import { createContext, useContext, useMemo, type ReactNode } from "react";
import { ebooks as baseEbooks, applyPriceOverrides, type Ebook, type PriceOverrideMap } from "@/data/ebooks";

type CatalogContextValue = {
  ebooks: Ebook[];
  getEbook: (slug: string) => Ebook | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

/**
 * Catálogo com os preços editados no admin já aplicados por cima do padrão
 * estático — carregado uma vez no loader raiz, disponível pra qualquer
 * componente sem precisar repassar prop por prop.
 */
export function CatalogProvider({
  overrides,
  children,
}: {
  overrides: PriceOverrideMap;
  children: ReactNode;
}) {
  const value = useMemo<CatalogContextValue>(() => {
    const merged = applyPriceOverrides(baseEbooks, overrides);
    return { ebooks: merged, getEbook: (slug) => merged.find((e) => e.slug === slug) };
  }, [overrides]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog precisa estar dentro de <CatalogProvider>");
  return ctx;
}
