// app/components/TiptapEditor.tsx

import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from './ui/button'

interface TiptapEditorProps {
  title: string
  content: string
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your content here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] px-4 py-3',
      },
    },
  })

  if (!editor) {
    return null
  }

  const handleButtonClick = (action: () => boolean) => (e: React.MouseEvent) => {
    e.preventDefault()
    action()
  }

  return (
    <div className="tiptap-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled"
        className="w-full text-2xl font-bold mb-4 p-2 border bg-card rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="border rounded-md">
        <div className="border-b p-2 flex flex-wrap gap-2">
          <Button
            onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
            className={editor.isActive('bold') ? 'is-active bg-muted' : ''}
            size="sm"
            variant="outline"
          >
            Bold
          </Button>
          <Button
            onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
            className={editor.isActive('italic') ? 'is-active bg-muted' : ''}
            size="sm"
            variant="outline"
          >
            Italic
          </Button>
          <Button
            onClick={handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
            className={editor.isActive('underline') ? 'is-active bg-muted' : ''}
            size="sm"
            variant="outline"
          >
            Underline
          </Button>
        </div>
        <EditorContent editor={editor} className='w-full' />
      </div>
    </div>
  )
}

export default TiptapEditor