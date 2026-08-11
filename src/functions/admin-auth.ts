import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

type AdminSessionData = { isAdmin?: boolean };

/**
 * Sessão assinada/criptografada (cookie httpOnly) pro painel admin. Não usa
 * provedor de auth externo de propósito — é um usuário só (o dono da loja),
 * não faz sentido provisionar Clerk/Auth0 pra isso.
 */
function adminSession() {
  return useSession<AdminSessionData>({
    password: process.env.SESSION_SECRET!,
    name: "aplica_admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  });
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    if (!process.env.ADMIN_PASSWORD || data.password !== process.env.ADMIN_PASSWORD) {
      return { ok: false as const };
    }
    const session = await adminSession();
    await session.update({ isAdmin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await adminSession();
  await session.clear();
  return { ok: true };
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await adminSession();
  return { authenticated: session.data.isAdmin === true };
});
