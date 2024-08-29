
import { useState, useEffect } from 'react';
import { VisualEditing } from '@sanity/visual-editing/remix';
import { initializeClient } from "#app/utils/studio/client";
import { useLiveMode } from '#app/utils/studio/loader';
import type { SanityClient } from '@sanity/client';

export default function LiveVisualEditing() {
  const [client, setClient] = useState<SanityClient | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initClient = async () => {
      try {
        const initializedClient = await initializeClient();
        if (isMounted) {
          setClient(initializedClient);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize Sanity client'));
          console.error("Failed to initialize Sanity client:", err);
        }
      }
    };

    void initClient();

    return () => {
      isMounted = false;
    };
  }, []);

  useLiveMode({ client: client || undefined });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!client) {
    return <div>Loading...</div>;
  }

  return <VisualEditing />;
}