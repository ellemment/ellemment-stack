// app/components/ellemment-studio/visual-editing.tsx

import { VisualEditing } from '@sanity/visual-editing/remix'

import { client } from "#app/utils/studio/client";
import { useLiveMode } from '#app/utils/studio/loader';

export default function LiveVisualEditing() {
  useLiveMode({ client })

  return <VisualEditing />
}