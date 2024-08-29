// app/utils/studio/loader.server.ts

import { queryStore } from "./loader";
import { initializeClient } from "./client";

export const { loadQuery } = queryStore;

// Wrap the async operation in a function
async function initializeServerClient() {
  try {
    const client = await initializeClient();
    queryStore.setServerClient(client);
  } catch (error) {
    console.error("Failed to initialize Sanity client:", error);
  }
}

// Use void to explicitly mark the promise as ignored
void (async () => {
  try {
    await initializeServerClient();
  } catch (error) {
    console.error("Failed to initialize server client:", error);
  }
})();