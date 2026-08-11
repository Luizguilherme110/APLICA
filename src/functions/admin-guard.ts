import { useSession } from "@tanstack/react-start/server";

/**
 * Bloqueia qualquer server function de dado do admin se a sessão não estiver
 * autenticada — necessário porque server functions são endpoints de rede
 * chamáveis diretamente, a proteção não pode depender só da rota do cliente.
 */
export async function adminSessionOrThrow() {
  const session = await useSession<{ isAdmin?: boolean }>({
    password: process.env.SESSION_SECRET!,
    name: "aplica_admin",
  });
  if (session.data.isAdmin !== true) {
    throw new Error("unauthorized");
  }
  return session;
}
