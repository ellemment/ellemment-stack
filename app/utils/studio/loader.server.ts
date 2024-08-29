// app/utils/studio/loader.server.ts
import { initializeClient } from "./client";
import { queryStore } from "./loader";

export const { loadQuery } = queryStore;

(async () => {
  try {
    const client = await initializeClient();
    queryStore.setServerClient(client);
  } catch (error) {
    console.error("Failed to initialize Sanity client:", error);
  }
})();