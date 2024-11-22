'use client'

import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorExtension from './EditorExtension';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Mention from '@tiptap/extension-mention';
import suggestion from './Suggestion.js'
import Youtube from '@tiptap/extension-youtube';
import { Node } from '@tiptap/core'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

function TextEditor({ fileId }) {

    const notes = useQuery(api.notes.GetNotes, {
        fileId: fileId,
    });

    const StickyNote = Node.create({
        name: 'stickyNote',
        group: 'block',
        content: 'inline*',
        draggable: true,
        addAttributes() {
            return {
                color: {
                    default: '#fef08a'
                }
            }
        },
        parseHTML() {
            return [{ tag: 'div.sticky-note' }]
        },
        renderHTML({ HTMLAttributes }) {
            return ['div', {
                class: 'sticky-note',
                style: `background-color: ${HTMLAttributes.color};`
            }, ['div', { class: 'sticky-note-content' }, 0]]
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Subscript,
            Superscript,
            Image,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            StickyNote,
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
                suggestion,
            }),
            Youtube.configure({
                controls: true,
                nocookie: true,
                allowFullscreen: true,
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                linkOnPaste: true,
                Protocols: ['http', 'https', 'ftp', 'mailto', 'file'], HTMLAttributes: {
                    // Change rel to different value
                    // Allow search engines to follow links(remove nofollow)
                    rel: 'noopener noreferrer',
                    // Remove target entirely so links open in current tab
                    target: null,
                },
            }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                // Use a placeholder:
                placeholder: '✍️ Start writing your questions here... 🤔',

                showOnlyWhenEditable: true,
                showOnlyCurrent: false,
                // Use different placeholders depending on the node type:

                // placeholder: ({ node }) => {
                //   if (node.type.name === 'heading') {
                //     return 'What’s the title?'
                //   }

                //   return 'Can you add some further context?'
                // },
            }),
        ],
        immediatelyRender: false,
        editorProps: {
            // attributes: {
            //     class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:bg-slate-800 max-w-full h-screen p-5'
            // }

            attributes: {
                class: 'focus:outline-none h-[78vh] p-5'
            }
        }
    });

    useEffect(() => {
        editor&&editor.commands.setContent(notes);
    }, [notes&&editor]);

    return (
        <div className='full m-2'>
            <EditorExtension editor={editor} />
            <div className='h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor
