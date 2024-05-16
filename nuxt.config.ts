// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3100,
  },

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "What is Christian Engel up to right now.",
        },
      ],
      noscript: [{ children: "JavaScript is required" }],
      title: "Christian Engel is doing something!",
    },
  },

  runtimeConfig: {
    public: { API_BASE_URL: process.env.API_BASE_URL },
  },

  modules: ["@sidebase/nuxt-auth"],

  auth: {
    baseURL: process.env.API_BASE_URL,
    provider: {
      type: "refresh",
      pages: {
        login: "/login",
      },
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        refresh: { path: "/refreshToken", method: "post" },
        getSession: { path: "/session" },
      },
      token: {
        signInResponseTokenPointer: "/accessToken",
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: "lax",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/refreshToken",
        refreshRequestTokenPointer: "/refreshToken",
      },
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },
});
