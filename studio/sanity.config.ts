import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'


export default defineConfig({
  name: 'default',
  title: 'ellemment',

  projectId: '44e275i4',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: 'http://localhost:3000'
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
