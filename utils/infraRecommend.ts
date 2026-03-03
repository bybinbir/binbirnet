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
    wired: Package;
    wifiReason: string;
    wiredReason: string;
    primaryType: "wifi" | "wired";
};

export function recommendPackage(result: InfraResult, packages: Package[]): RecommendationResult {
    const wireless25 = packages.find((p) => p.id === "wireless25")!;
    const wireless16 = packages.find((p) => p.id === "wireless16")!;
    const vdsl50 = packages.find((p) => p.id === "vdsl50")!;
    const vdsl100 = packages.find((p) => p.id === "vdsl100")!;

    // Fallback if packages missing (sanity check)
    if (!wireless25 || !vdsl50) {
        throw new Error("Packages not defined");
    }

    // Sabit altyapı uygun değilse
    if (!result.available || !result.max_mbps) {
        return {
            wifi: wireless25,
            wired: vdsl50,
            wifiReason:
                "Adresinizde sabit altyapı uygun görünmüyor. Kablosuz paketimiz hemen kurulabilir!",
            wiredReason:
                "Sabit altyapı şu an uygun değil, ancak ileride aktif olursa bu paketi tercih edebilirsiniz.",
            primaryType: "wifi",
        };
    }

    // 100 Mbps ve üzeri destekleniyorsa
    if (result.max_mbps >= 100) {
        return {
            wifi: wireless25,
            wired: vdsl100,
            wifiReason:
                "Kablosuz alternatif olarak sunuyoruz. Altyapı bağımsız, hızlı kurulum!",
            wiredReason: `Adresinizde ${result.tech ?? "sabit"} altyapı ile ${result.max_mbps} Mbps'e kadar destek var.`,
            primaryType: "wired",
        };
    }

    // 50-99 Mbps destekleniyorsa
    if (result.max_mbps >= 50) {
        return {
            wifi: wireless25,
            wired: vdsl50,
            wifiReason:
                "Kablosuz alternatif olarak sunuyoruz. Altyapı bağımsız, hızlı kurulum!",
            wiredReason: `Adresinizde ${result.tech ?? "sabit"} altyapı ile ${result.max_mbps} Mbps'e kadar destek var.`,
            primaryType: "wired",
        };
    }

    // 50 Mbps altı - WiFi öncelikli öner
    return {
        wifi: wireless25,
        wired: vdsl50,
        wifiReason: `Adresinizde sadece ${result.max_mbps} Mbps destek var. Kablosuz paketimiz daha yüksek hız sunabilir!`,
        wiredReason: `Adresinizde ${result.tech ?? "sabit"} altyapı ile ${result.max_mbps} Mbps'e kadar destek görünüyor.`,
        primaryType: "wifi",
    };
}
