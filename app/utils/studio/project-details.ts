// app/utils/studio/project-details.ts

// app/utils/studio/project-details.ts

const isBrowser = typeof document !== 'undefined'

let envCache: typeof window.ENV | null = null;

const getEnv = async (): Promise<typeof window.ENV> => {
  if (envCache) return envCache;
  
  if (isBrowser) {
    envCache = window.ENV;
  } else {
    // This will only be used on the server side
    const { getEnv } = await import('../env.server');
    envCache = getEnv();
  }
  return envCache;
}

export const getProjectId = () => getEnv().then(env => env.SANITY_STUDIO_PROJECT_ID);
export const getDataset = () => getEnv().then(env => env.SANITY_STUDIO_DATASET);
export const getStudioUrl = () => getEnv().then(env => env.SANITY_STUDIO_URL || 'http://localhost:3333');
export const getStegaEnabled = () => getEnv().then(env => env.SANITY_STUDIO_STEGA_ENABLED === 'true');
export const getApiVersion = () => getEnv().then(env => env.SANITY_STUDIO_API_VERSION);

// Synchronous getters (will throw an error if called before initialization)
export const projectId = () => envCache?.SANITY_STUDIO_PROJECT_ID ?? '';
export const dataset = () => envCache?.SANITY_STUDIO_DATASET ?? '';
export const studioUrl = () => envCache?.SANITY_STUDIO_URL ?? 'http://localhost:3333';
export const stegaEnabled = () => envCache?.SANITY_STUDIO_STEGA_ENABLED === 'true';
export const apiVersion = () => envCache?.SANITY_STUDIO_API_VERSION ?? '';

// Initialize the environment variables
export const initEnv = async () => {
  if (!envCache) {
    await getEnv();
  }
}