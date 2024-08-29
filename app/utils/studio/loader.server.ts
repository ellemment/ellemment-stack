// app/utils/studio/loader.server.ts

import { queryStore } from "./loader";
import { client } from "./client";

export const { loadQuery } = queryStore;

queryStore.setServerClient(client);