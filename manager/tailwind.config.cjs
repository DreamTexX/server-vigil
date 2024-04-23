/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#F50057",
                    50: "#FFD6E5",
                    100: "#FFC2D8",
                    200: "#FF99BD",
                    300: "#FF70A3",
                    400: "#FF4889",
                    500: "#FF1F6E",
                    600: "#F50057",
                    700: "#BD0043",
                    800: "#85002F",
                    900: "#4D001B",
                    950: "#310011"
                }
            }
        }
    },
    plugins: [require("flowbite/plugin"), require("flowbite-typography")],
    darkMode: "class"
};

module.exports = config;
