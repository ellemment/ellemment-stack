// app/components/ellemment-studio/visual-editing.tsx
import { useState, useEffect } from 'react';
import { VisualEditing } from '@sanity/visual-editing/remix';
import { initializeClient, getClient } from "#app/utils/studio/client";
import { useLiveMode } from '#app/utils/studio/loader';

export default function LiveVisualEditing() {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    async function initClient() {
      try {
        await initializeClient();
        setIsClientReady(true);
      } catch (error) {
        console.error("Failed to initialize Sanity client:", error);
      }
    }

    initClient();
  }, []);

  if (!isClientReady) {
    return null; // Or a loading indicator
  }

  const client = getClient();
  useLiveMode({ client });

  return <VisualEditing />;
}