const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

const config = {
    plugins: [
        //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
        tailwindcss(),
        //But others, like autoprefixer, need to run after,
        autoprefixer
    ]
};

module.exports = config;
