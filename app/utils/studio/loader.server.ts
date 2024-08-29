// app/utils/studio/loader.server.ts
import { queryStore } from "./loader";
import { initializeClient } from "./client";

export const { loadQuery } = queryStore;

(async () => {
  try {
    const client = await initializeClient();
    queryStore.setServerClient(client);
  } catch (error) {
    console.error("Failed to initialize Sanity client:", error);
  }
})();