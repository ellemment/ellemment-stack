// app/ellemment-studio/client.ts

import { createClient } from "@sanity/client";
import { projectId, dataset, studioUrl, stegaEnabled, apiVersion, initEnv } from "./project-details";

// Initialize the environment variables before creating the client
await initEnv();

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId: projectId(),
  dataset: dataset(),
  useCdn: true,
  apiVersion: apiVersion(),
  stega: {
    enabled: stegaEnabled(),
    studioUrl: studioUrl(),
  },
});
