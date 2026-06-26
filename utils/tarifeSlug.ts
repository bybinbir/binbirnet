import type { Package } from "../types";

// Tarife detay sayfasi olan paketlerin id -> slug eslemesi.
// Yalnizca bu paketlerin isimleri tiklanabilir link olur ve
// /tarifeler/<slug> sayfasina yonlendirir.
export const TARIFE_SLUGS: Record<string, string> = {
  wireless16: "kablosuz16",
  wireless25: "kablosuz25",
};

export function tarifeHref(pkg: Pick<Package, "id">): string | null {
  const slug = TARIFE_SLUGS[pkg.id];
  return slug ? `/tarifeler/${slug}` : null;
}
