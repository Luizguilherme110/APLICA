import { randomUUID } from "node:crypto";

const CAKTO_API_BASE = "https://api.cakto.com.br/public_api";

type CaktoTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
};

/**
 * OAuth2 client_credentials contra a Cakto — não documentado com esse nome,
 * mas o fluxo real é POST form-urlencoded de client_id + client_secret, sem
 * grant_type (docs.cakto.com.br/authentication).
 */
export async function getCaktoAccessToken(): Promise<CaktoTokenResponse> {
  const clientId = process.env["CAKTO_CLIENT_ID"];
  const clientSecret = process.env["CAKTO_CLIENT_SECRET"];
  if (!clientId || !clientSecret) {
    throw new Error("CAKTO_CLIENT_ID/CAKTO_CLIENT_SECRET não configurados");
  }

  const response = await fetch(`${CAKTO_API_BASE}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Falha ao obter token Cakto (${response.status}): ${text.slice(0, 500)}`);
  }

  return JSON.parse(text) as CaktoTokenResponse;
}

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type CaktoApiResult = { ok: boolean; status: number; body: Json };

/** Chamada autenticada genérica à API pública da Cakto. Nunca lança — status e corpo sempre voltam pro chamador decidir. */
export async function caktoApiFetch(
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<CaktoApiResult> {
  const response = await fetch(`${CAKTO_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": randomUUID(),
      ...init?.headers,
    },
  });

  const text = await response.text();
  let body: Json = text;
  try {
    body = text ? (JSON.parse(text) as Json) : null;
  } catch {
    // resposta não-JSON (ex: erro HTML de gateway) — devolve texto cru
  }

  return { ok: response.ok, status: response.status, body };
}
