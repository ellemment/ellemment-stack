// app/ellemment-studio/client.ts

import { createClient } from "@sanity/client";
import { projectId, dataset, studioUrl, stegaEnabled, apiVersion, initEnv } from "./project-details";

let client: ReturnType<typeof createClient> | null = null;

export async function initializeClient() {
  if (client) return client;

  await initEnv();

  client = createClient({
    projectId: projectId(),
    dataset: dataset(),
    useCdn: true,
    apiVersion: apiVersion(),
    stega: {
      enabled: stegaEnabled(),
      studioUrl: studioUrl(),
    },
  });

  return client;
}

export function getClient() {
  if (!client) {
    throw new Error("Sanity client has not been initialized. Call initializeClient() first.");
  }
  return client;
}