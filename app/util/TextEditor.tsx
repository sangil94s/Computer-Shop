'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type TextEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="p-4 bg-white border rounded-lg shadow w-full">
      <div className="flex gap-2 mb-2 border-b pb-2">
        <Button onClick={() => editor.chain().focus().toggleBold().run()} variant="outline">
          B
        </Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} variant="outline">
          I
        </Button>
        <Button onClick={() => editor.chain().focus().toggleStrike().run()} variant="outline">
          S
        </Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant="outline">
          H1
        </Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant="outline">
          H2
        </Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} variant="outline">
          H3
        </Button>
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} variant="outline">
          • List
        </Button>
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} variant="outline">
          1. List
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-full min-h-[200px] border p-2 rounded-lg" />
    </div>
  );
}
