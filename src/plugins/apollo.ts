import NuxtApollo from "#apollo";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const csrfToken = ref<false | string>(false);
  nuxtApp.provide("csrfToken", () => {
    const onReady = (fn: (token: string) => void) => {
      const stopWatch = watch(
        () => csrfToken.value,
        (token) => {
          if (token) {
            fn(token);
          }
        },
        { immediate: true }
      );
      return stopWatch;
    };
    return {
      token: csrfToken,
      onReady,
    };
  });

  const fetchCsrf =
    process.client &&
    fetch(`${config.public.graphqlBaseUrl}/auth/csrf-token`, {
      ...(config.public.credentialsInclude ? { credentials: "include" } : {}),
    })
      .then(async (res) => {
        const json = await res.clone().json();
        try {
          csrfToken.value = json["x-csrf-token"];
        } catch (e) {
          console.error("Failed to provide csrfToken", e);
        }
        return res;
      })
      .catch((e) => Promise.reject(e));

  const authToken = ref<false | string>(false);
  nuxtApp.provide("authToken", () => {
    const onReady = (fn: (token: string) => void) => {
      const stopWatch = watch(
        () => authToken.value,
        (token) => {
          if (token) {
            fn(token);
          }
        },
        { immediate: true }
      );
      return stopWatch;
    };
    return {
      token: authToken,
      onReady,
    };
  });
  const clientConfig = NuxtApollo.clients.default;

  // add csrf header to apollo link for the default client
  nuxtApp.hook("apollo:csrf", async ({ token, client }) => {
    // Check if client is app graphql, not hygraph
    if (client !== "default") return;
    // Check if SSR
    if (process.server) return;

    // NOTE: we have only one client, so no need to check client here
    const existingToken = csrfToken.value;

    if (existingToken) {
      token.value = existingToken;
      return;
    }

    const res = await fetchCsrf.catch(() => false);
    if (!res) {
      console.error("Failed to fetch csrf token");
      return;
    }
    // TODO: need to handle expire time
    token.value = csrfToken.value;
  });

  // pass token to cms hygraph client
  nuxtApp.hook("apollo:auth", async ({ token, client }) => {
    // check if client is cms hygraph, not app graphql
    if (client !== "cms") return;

    // check if token is managed by application
    if (token.value) return;

    token.value = config.public.cmsHygraphToken;
  });

  // decodeURIComponent token which is encoded when to stored in cookie manually
  nuxtApp.hook("apollo:auth", async ({ token, client }) => {
    // check if client is default (app graphql), not hygraph
    if (client !== "default") return;

    // check if token is already present
    if (token.value) {
      authToken.value = token.value;
      return;
    }

    const tokenName = clientConfig.tokenName!;

    const encodedToken =
      clientConfig?.tokenStorage === "cookie"
        ? useCookie(tokenName).value
        : (process.client && localStorage.getItem(tokenName)) || undefined;

    if (encodedToken) {
      token.value = decodeURIComponent(encodedToken);
      authToken.value = token.value;
    }
  });

  nuxtApp.hook("apollo:link", async ({ context, prevContext, client }) => {
    // check if client is default (app graphql), not hygraph
    if (client !== "default") return;
    // no need extra context on SSR
    if (process.server) return;

    context.value = {
      ...prevContext,
    };
  });

  nuxtApp.hook("apollo:error", (error) => {
    // Handle different error cases
  });
});
