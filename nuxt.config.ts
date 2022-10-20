// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["assets/css/tailwind.css"],
    modules: [
        '@nuxtjs/tailwindcss',
        // '@pinia/nuxt',
    ],
    meta: {
        title: 'Weather App with Nuxt3',
    },
    // server: {
    //     port:3333,
    // },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        }
    },
})
