import type { Config } from "tailwindcss";

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#79c02d",
                secondary: "#0b74b5",
                "background-warm": "#FFFBF0",
                "pastel-blue": "#b0cee4",
                "pastel-green": "#e5f2dc",
                "pastel-orange": "#FFF3E0",
                "pastel-purple": "#F3E5F5",
                bn: {
                    blue: "#74a9d0",
                    green: "#9bcf68",
                    blueSoft: "#ACCBE2",
                    greenSoft: "#C0E0A2",
                    "logo-green": "#9fd16c"
                }
            },
            fontFamily: {
                sans: ["Outfit", "sans-serif"]
            },
            borderRadius: {
                "4xl": "2.5rem"
            }
        }
    },
    plugins: [],
} satisfies Config;
