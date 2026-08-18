import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout puro — só existe pra dar um <Outlet/> às rotas filhas
 * (/admin exato via admin.index.tsx, /admin/precos via admin.precos.tsx).
 * Sem isso, o TanStack Router trata este arquivo como pai automático de
 * qualquer admin.*.tsx e as rotas filhas nunca aparecem na tela, mesmo
 * navegando com sucesso.
 */
export const Route = createFileRoute("/admin")({
  component: () => <Outlet />,
});
