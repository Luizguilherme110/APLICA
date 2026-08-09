import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converte o preço exibido ("R$ 47,90") no número correspondente (47.9). */
export function parsePriceBRL(price: string): number {
  const value = Number.parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(value) ? value : 0;
}
