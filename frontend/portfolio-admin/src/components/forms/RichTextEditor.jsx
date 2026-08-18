import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo, Minus,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEffect } from 'react';

export default function RichTextEditor({ label, value, onChange, error, placeholder = 'Start writing...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-indigo-500 underline' } }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none min-h-[240px] focus:outline-none p-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className={cn(
        'rounded-lg border overflow-hidden',
        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
      )}>
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 flex-wrap p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <ToolButton icon={Bold} active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold" />
          <ToolButton icon={Italic} active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic" />
          <ToolButton icon={Strikethrough} active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike" />

          <Divider />

          <ToolButton icon={Heading1} active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1" />
          <ToolButton icon={Heading2} active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2" />
          <ToolButton icon={Heading3} active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="H3" />

          <Divider />

          <ToolButton icon={List} active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List" />
          <ToolButton icon={ListOrdered} active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List" />
          <ToolButton icon={Quote} active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote" />
          <ToolButton icon={Code} active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block" />
          <ToolButton icon={Minus} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule" />

          <Divider />

          <ToolButton icon={LinkIcon} active={editor.isActive('link')} onClick={setLink} title="Add Link" />
          <ToolButton icon={ImageIcon} onClick={addImage} title="Add Image" />

          <Divider />

          <ToolButton icon={Undo} onClick={() => editor.chain().focus().undo().run()} title="Undo" />
          <ToolButton icon={Redo} onClick={() => editor.chain().focus().redo().run()} title="Redo" />
        </div>

        {/* Content */}
        <EditorContent editor={editor} className="bg-white dark:bg-gray-900" />
      </div>

      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}

function ToolButton({ icon: Icon, active, onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'w-8 h-8 rounded flex items-center justify-center transition',
        active
          ? 'bg-indigo-500 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />;
}