/** @type {import('tailwindcss').Config}*/
const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            screens: {
                xsm: "500px"
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["lofi", "business"]
    }
};

module.exports = config;
