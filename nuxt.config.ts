import { fileURLToPath, URL } from "url";
import cloudflareHeaders from "@logotip4ik_/nuxt-cloudflare-headers";
import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: false },
  srcDir: "src/",
  app: {
    head: {
      title:
        "GAMBA.COM | A Crypto-based Casino, Sportsbook & Progressive Lottery | Do You Gamba?",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://use.typekit.net/zav4rav.css",
          onload: "this.rel='stylesheet'",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, height=device-height, initial-scale=1, maximum-scale=1"
        },
        {
          hid: "facebook-domain-verification",
          name: "facebook-domain-verification",
          content: "j9cnso493r0mmghbfw8nwtiukbgtz7",
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@gambalabs/apollo",
    cloudflareHeaders,
  ],
  css: [
    "~/assets/css/tailwind.css",
    // "~/public/assets/css/main.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      config.devtool =
        process.env.NODE_ENV === "development" ? "#source-map" : "";
    },
  },
  apollo: {
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: `${process.env.GRAPHQL_BASE_URL!}/@`,
        httpLinkOptions: {
          ...(process.env.CREDENTIALS_INCLUDE === "true"
            ? { credentials: "include" }
            : {}),
        },
        persistedQueries: false,
        inMemoryCacheOptions: {},
        pusher: {
          wsHost: process.env.PUSHER_WS_HOST!,
          cluster: process.env.PUSHER_CLUSTER!,
          channelEndpoint: `${process.env.GRAPHQL_BASE_URL}/broadcasting/auth`,
          pusherAppKey: process.env.PUSHER_APP_KEY!,
          forceTLS: !!process.env.PUSHER_FORCE_TLS!,
          wsPort: process.env.PUSHER_WS_PORT!,
        },
      },
      cms: {
        httpEndpoint: process.env.CMS_HYGRAPH_ENDPOINT!,
        persistedQueries: false,
        httpLinkOptions: {},
      },
    },
  },
  runtimeConfig: {
    public: {
      graphqlBaseUrl: process.env.GRAPHQL_BASE_URL,
      cmsHygraphEndpoint: process.env.CMS_HYGRAPH_ENDPOINT,
      credentialsInclude: process.env.CREDENTIALS_INCLUDE === "true",
      sentry: {
        dsn: process.env.SENTRY_DSN,
        env: process.env.SENTRY_ENV,
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src/", import.meta.url)),
        "@": fileURLToPath(new URL("./src/", import.meta.url)),
        "~~": fileURLToPath(new URL("./", import.meta.url)),
        "@@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
    plugins: [
      {
        apply: "build",
        name: "addCredentialsPlugin",
        enforce: "post",
        generateBundle(_, bundle) {
          const htmlFile = Object.values(bundle).find(
            (file) => file.type === "asset" && file.fileName.endsWith(".html")
          );

          if (htmlFile) {
            const htmlFilePath = path.join(
              __dirname,
              "dist",
              htmlFile.fileName
            );

            fs.readFile(htmlFilePath, "utf-8", (err, data) => {
              if (err) {
                console.error("Error reading HTML file:", err);
                return;
              }

              const modifiedHTML = data.replace(
                /<head>/,
                '<head>\n<meta http-equiv="cross-origin-opener-policy" content="same-origin">\n<meta http-equiv="cross-origin-embedder-policy" content="require-corp">\n<meta http-equiv="content-security-policy" content="cross-origin-embedder-policy; cross-origin-opener-policy;">\n'
              );

              fs.writeFile(htmlFilePath, modifiedHTML, "utf-8", (err) => {
                if (err) {
                  console.error("Error writing modified HTML:", err);
                  return;
                }

                console.log("Modified HTML file:", htmlFilePath);
              });
            });
          }
        },
      },
    ],
    optimizeDeps: {
      // pusher-js is commonJs module, so it should be pre-bundled
      include: ["pusher-js"],
    },
  },
  cloudflareHeaders: {
    "/*": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Expose-Headers": "*",
    },
  },
});
