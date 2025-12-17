// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  modules: [
    // "@nuxt/content", // remove if not using markdown yet
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
  ],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Mahmoud El-Shafey | Portfolio",
      meta: [
        {
          name: "description",
          content:
            "Full-Stack Web Developer & Data Analyst building intelligent dashboards and conversion-focused web experiences.",
        },
        // social preview / OG
        { property: "og:title", content: "Mahmoud El-Shafey — Full-Stack Web Dev & Data Analyst" },
        {
          property: "og:description",
          content:
            "I build data-driven web apps, dashboards, and products that actually move metrics.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://YOUR-SITE.netlify.app" },
        { property: "og:image", content: "https://YOUR-SITE.netlify.app/og-card.png" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Mahmoud El-Shafey — Portfolio" },
        {
          name: "twitter:description",
          content: "Full-Stack Web Developer & Data Analyst.",
        },
        { name: "twitter:image", content: "https://YOUR-SITE.netlify.app/og-card.png" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
  },

  image: {
    // dir: "public",
    format: ["webp", "png", "jpg"],
  },

  // quiets Nitro runtime warning
  nitro: {
    compatibilityDate: "2025-10-26",
  },

  // ESLint module can be noisy in prod if you want silence:
  eslint: ({ lintOnStart: false } as any),
})
