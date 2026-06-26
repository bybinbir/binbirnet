import type { Package } from "../types";

export type InfraResult = {
    bbk: string | null;
    available: boolean;
    max_mbps: number | null;
    tech: "FİBER" | "VDSL" | null;
    distance_m: number | null;
};

export type RecommendationResult = {
    wifi: Package;
    wifiReason: string;
};

export function recommendPackage(result: InfraResult, packages: Package[]): RecommendationResult {
    // Kablosuz paketler altyapi bagimsizdir; her durumda kablosuz oneriyoruz.
    const wireless25 = packages.find((p) => p.id === "wireless25");
    const wireless16 = packages.find((p) => p.id === "wireless16");
    const wifi = wireless25 ?? wireless16;

    // Sanity check
    if (!wifi) {
        throw new Error("Packages not defined");
    }

    // Sabit altyapi uygun degilse
    if (!result.available || !result.max_mbps) {
        return {
            wifi,
            wifiReason:
                "Adresinizde sabit altyapı uygun görünmüyor. Kablosuz paketimiz altyapı gerektirmez, hemen kurulur!",
        };
    }

    return {
        wifi,
        wifiReason:
            "Kablosuz paketimiz altyapı bağımsızdır ve hızlı kurulur. Adresinizde sorunsuz çalışır.",
    };
}
