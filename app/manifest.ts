import type { MetadataRoute } from "next";
import { BASE_PATH } from "./seo-data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nuvem Bombas — Bombas, Motores e Equipamentos",
    short_name: "Nuvem Bombas",
    description: "Manutenção de bombas, motores elétricos e equipamentos em São Paulo e Grande São Paulo.",
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#19335a",
    lang: "pt-BR",
    icons: [{ src: `${BASE_PATH}/favicon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
