// app/routes/posts.tsx

import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

import Posts from "#app/components/ellemment-studio/posts";
import { useQuery } from "#app/utils/studio/loader";
import { loadQuery } from "#app/utils/studio/loader.server";
import { POSTS_QUERY } from "#app/utils/studio/queries";

export const loader = async () => {
  const {data} = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  return { data };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return <Posts posts={data} />;
}