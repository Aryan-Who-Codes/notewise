import { Bold, Heading1, Heading2, Heading3, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Code, Strikethrough, Link, Undo, Redo, Subscript, Superscript, Table, Image, Eraser, Highlighter, Settings, Columns, Minus, Split, Combine, Table2, Trash2, Rows, Video, StickyNote, Sparkles, Save } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from './Tooltip';
import Modal from './Modal';
import { api } from '@/convex/_generated/api';
import { useAction, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { chatSession } from '@/configs/AIModel';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { useTheme } from '../../../context/ThemeContext'

// Move EditorButton outside the main component to avoid recreation on each render
// Helper function to create button with tooltip

const EditorButton = React.memo(({ id, onClick, className, icon, tooltip, activeTooltip, setActiveTooltip }) => {
    const handleTouch = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        // Close other tooltips first
        setActiveTooltip(null);
        // Small delay before showing new tooltip
        setTimeout(() => {
            setActiveTooltip(activeTooltip === id ? null : id);
        }, 100);
    };


    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
        setActiveTooltip(null);
    };

    return (
        <Tooltip
            tooltip={tooltip}
            isVisible={activeTooltip === id}
        >
            <button
                onClick={handleClick}
                onTouchStart={handleTouch}
                onMouseEnter={() => setActiveTooltip(id)}
                onMouseLeave={() => setActiveTooltip(null)}
                className={className}
            >
                {icon}
            </button>
        </Tooltip>
    );
});

EditorButton.displayName = 'EditorButton';
const EditorExtension = ({ editor }) => {
    const { theme } = useTheme()
    const { fileId } = useParams();
    const SearchAI = useAction(api.myAction.search);
    const saveNotes = useMutation(api.notes.AddNotes);
    const { user } = useUser();
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(480);
    const [stickyColor, setStickyColor] = useState('#fef08a');
    const [stickyText, setStickyText] = useState('');

    // Add click handler to hide tooltips when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveTooltip(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // link function for link button
    const setLink = useCallback(() => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({
                href: linkUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
                class: 'text-blue-600 hover:text-blue-800 cursor-pointer underline',
            }).run();
            setLinkUrl('');
            setShowModal(false);
        } else {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        }
    }, [editor, linkUrl]);

    // Image function for image insertion
    const addImage = useCallback(() => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
            setShowModal(false);
        }
    }, [editor, imageUrl]);

    // Video function for video insertion
    const addYoutubeVideo = useCallback(() => {
        if (videoUrl) {
            const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];

            if (videoId) {
                // Use youtube-nocookie.com domain and disable related videos
                const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&origin=${window.location.origin}`;

                editor.commands.setYoutubeVideo({
                    src: embedUrl,
                    width: Math.max(320, parseInt(width, 10)) || 640,
                    height: Math.max(180, parseInt(height, 10)) || 480,
                    HTMLAttributes: {
                        loading: 'lazy',
                        title: 'YouTube video player',
                        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                        allowFullScreen: true
                    }
                });
                setVideoUrl('');
                setShowModal(false);
            }
        }
    }, [editor, videoUrl, width, height]);

    // Sticky note function for sticky note insertion
    const addStickyNote = useCallback(() => {
        if (stickyText) {
            editor.chain().focus().insertContent({
                type: 'stickyNote',
                attrs: { color: stickyColor },
                content: [{ type: 'text', text: stickyText }]
            }).run()
            setStickyText('')
            setShowModal(false)
        }
    }, [editor, stickyText, stickyColor])

    const onAiClick = async () => {
        toast("Generating response...");
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );


        // if (!selectedText || selectedText.trim() === '') {
        //     console.log("No text selected");
        //     return;
        // }

        // console.log("Selected text: " + selectedText)

        try {
            const result = await SearchAI({
                query: selectedText,
                fileId: fileId,
            });

            // const parsedResult = JSON.parse(result);

            // // Get the matched text
            // const matchedContent = parsedResult[0]?.pageContent;
            // // You can now use matchedContent to display or process the result

            // console.log("Matched content:", matchedContent);

            console.log("Result:", result);
            const UnformattedAns = JSON.parse(result);
            let AllUnformattedAns = '';
            UnformattedAns && UnformattedAns.forEach(item => {
                AllUnformattedAns = AllUnformattedAns + item.pageContent;
            });

            const PROMPT = "For question :" + selectedText + " and with the given content as answer," + " Please give appropriate answer to the question in HTML format. The answer content is: " + AllUnformattedAns;

            const AiModelResult = await chatSession.sendMessage(PROMPT);

            console.log("AiModelResult:", AiModelResult.response.text());

            const FinalAns = await AiModelResult.response.text().replace('```', '').replace('html', '').replace('```', '');

            const AllText = editor.getHTML();
            editor.commands.setContent(AllText + '<p>' + FinalAns + ' </p>');

            console.log(AllText);
            saveNotes({
                notes: editor.getHTML(),
                fileId: fileId,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });

        } catch (error) {
            console.error("Error during AI search:", error);
        }
    };

    const saveTextEdit = () => {
        if (editor && user) {
            saveNotes({
                fileId: fileId,
                notes: editor.getHTML(),
                createdBy: user.primaryEmailAddress.emailAddress
            });
            toast.success("Notes saved successfully!");
        }
    };

    useEffect(() => {
        const autoSaveTimer = setTimeout(() => {
            if (editor && user) {
                saveNotes({
                    fileId: fileId,
                    notes: editor.getHTML(),
                    createdBy: user.primaryEmailAddress.emailAddress
                });
            }
        }, 30000); // Autosave every 30 seconds

        return () => clearTimeout(autoSaveTimer);
    }, [editor?.getHTML()]);

    // Update button click handlers
    const handleVideoClick = () => {
        setModalType('video');
        setShowModal(true);
    };

    const handleImageClick = () => {
        setModalType('image');
        setShowModal(true);
    };

    const handleLinkClick = () => {
        setModalType('link');
        setShowModal(true);
    };

    // Add modal content based on type
    const getModalContent = () => {
        switch (modalType) {
            case 'video':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                            <input
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Paste YouTube URL here"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                                <input
                                    type="number"
                                    min="320"
                                    max="1024"
                                    value={width}
                                    onChange={e => setWidth(e.target.value)}
                                    className="w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                                <input
                                    type="number"
                                    min="180"
                                    max="720"
                                    value={height}
                                    onChange={e => setHeight(e.target.value)}
                                    className="w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setVideoUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addYoutubeVideo}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                );

            case 'image':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setImageUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addImage}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                );

            case 'link':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                                type="text"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter URL"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setLinkUrl('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={setLink}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                );

            case 'sticky':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Note Content</label>
                            <textarea
                                value={stickyText}
                                onChange={(e) => setStickyText(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-32"
                                placeholder="Enter your note here..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <div className="flex gap-2">
                                {['#fef08a', '#fecaca', '#bbf7d0', '#bfdbfe'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setStickyColor(color)}
                                        className={`w-8 h-8 rounded-full ${stickyColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setStickyText('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addStickyNote}
                                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                            >
                                Add Note
                            </button>
                        </div>
                    </div>
                );

        }
    };


    if (!editor) {
        return null
    }

    const buttons = [
        {
            id: "heading1",
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            className: `bg-indigo-500 p-1.5 sm:p-2 rounded hover:bg-indigo-600 text-white ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-700 text-yellow-300' : ''}`,
            icon: <Heading1 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Heading 1 - Turn text into a main heading"
        },

        {
            id: "heading2",
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            className: `bg-purple-500 p-1.5 sm:p-2 rounded hover:bg-purple-600 text-white ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-700 text-yellow-300' : ''}`,
            icon: <Heading2 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Heading 2 - Turn text into a subheading"
        },

        {
            id: "heading3",
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            className: `bg-pink-500 p-1.5 sm:p-2 rounded hover:bg-pink-600 text-white ${editor.isActive('heading', { level: 3 }) ? 'bg-pink-700 text-yellow-300' : ''}`,
            icon: <Heading3 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Heading 3 - Turn text into a smaller subheading"
        },

        {
            id: "bold",
            onClick: () => editor.chain().focus().toggleBold().run(),
            className: `bg-cyan-500 p-1.5 sm:p-2 rounded hover:bg-cyan-600 text-white ${editor.isActive('bold') ? 'bg-cyan-700 text-yellow-300' : ''}`,
            icon: <Bold className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Bold - Make text bold"
        },

        {
            id: "italic",
            onClick: () => editor.chain().focus().toggleItalic().run(),
            className: `bg-teal-500 p-1.5 sm:p-2 rounded hover:bg-teal-600 text-white ${editor.isActive('italic') ? 'bg-teal-700 text-yellow-300' : ''}`,
            icon: <Italic className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Italic - Make text italic"
        },

        {
            id: "underline",
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            className: `bg-emerald-500 p-1.5 sm:p-2 rounded hover:bg-emerald-600 text-white ${editor.isActive('underline') ? 'bg-emerald-700 text-yellow-300' : ''}`,
            icon: <Underline className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Underline - Add an underline to text"
        },

        {
            id: "strike",
            onClick: () => editor.chain().focus().toggleStrike().run(),
            className: `bg-emerald-500 p-1.5 sm:p-2 rounded hover:bg-emerald-600 text-white ${editor.isActive('strike') ? 'bg-emerald-700 text-yellow-300' : ''}`,
            icon: <Strikethrough className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Strikethrough - Add a line through text"
        },

        {
            id: "subscript",
            onClick: () => editor.chain().focus().toggleSubscript().run(),
            className: `bg-emerald-500 p-1.5 sm:p-2 rounded hover:bg-emerald-600 text-white ${editor.isActive('subscript') ? 'bg-emerald-700 text-yellow-300' : ''}`,
            icon: <Subscript className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Subscript - Make text appear below the line"
        },

        {
            id: "horizontalRule",
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            className: `bg-gray-500 p-1.5 sm:p-2 rounded hover:bg-gray-600 text-white ${editor.isActive('horizontalRule') ? 'bg-gray-700 text-yellow-300' : ''}`,
            icon: <Minus className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Horizontal Rule - Insert a horizontal line"
        },

        {
            id: "superscript",
            onClick: () => editor.chain().focus().toggleSuperscript().run(),
            className: `bg-emerald-500 p-1.5 sm:p-2 rounded hover:bg-emerald-600 text-white ${editor.isActive('superscript') ? 'bg-emerald-700 text-yellow-300' : ''}`,
            icon: <Superscript className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Superscript - Make text appear above the line"
        },

        {
            id: "alignLeft",
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            className: `bg-blue-500 p-1.5 sm:p-2 rounded hover:bg-blue-600 text-white ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-700 text-yellow-300' : ''}`,
            icon: <AlignLeft className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Align Left - Align text to the left"
        },

        {
            id: "alignCenter",
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            className: `bg-blue-500 p-1.5 sm:p-2 rounded hover:bg-blue-600 text-white ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-700 text-yellow-300' : ''}`,
            icon: <AlignCenter className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Center Align - Center the text"
        },

        {
            id: "alignRight",
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            className: `bg-blue-500 p-1.5 sm:p-2 rounded hover:bg-blue-600 text-white ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-700 text-yellow-300' : ''}`,
            icon: <AlignRight className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Align Right - Align text to the right"
        },

        {
            id: "bulletList",
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            className: `bg-orange-500 p-1.5 sm:p-2 rounded hover:bg-orange-600 text-white ${editor.isActive('bulletList') ? 'bg-orange-700 text-yellow-300' : ''}`,
            icon: <List className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Bullet List - Create a bulleted list"
        },

        {
            id: "numberedList",
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            className: `bg-orange-500 p-1.5 sm:p-2 rounded hover:bg-orange-600 text-white ${editor.isActive('orderedList') ? 'bg-orange-700 text-yellow-300' : ''}`,
            icon: <ListOrdered className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Numbered List - Create a numbered list"
        },

        {
            id: "blockQuote",
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            className: `bg-gray-500 p-1.5 sm:p-2 rounded hover:bg-gray-600 text-white ${editor.isActive('blockquote') ? 'bg-gray-700 text-yellow-300' : ''}`,
            icon: <Quote className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Block Quote - Create a block quote"
        },

        {
            id: "codeBlock",
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            className: `bg-gray-500 p-1.5 sm:p-2 rounded hover:bg-gray-600 text-white ${editor.isActive('codeBlock') ? 'bg-gray-700 text-yellow-300' : ''}`,
            icon: <Code className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Code Block - Create a code block for formatting code"
        },

        {
            id: "insertLink",
            onClick: handleLinkClick,
            className: `bg-green-500 p-1.5 sm:p-2 rounded hover:bg-green-600 text-white ${editor.isActive('link') ? 'bg-green-700 text-yellow-300' : ''}`,
            icon: <Link className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Insert Link - Add a hyperlink to selected text"
        },

        {
            id: "insertImage",
            onClick: handleImageClick,
            className: "bg-green-500 p-1.5 sm:p-2 rounded hover:bg-green-600 text-white",
            icon: <Image className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Insert Image - Add an image from URL"
        },


        {
            id: "youtube",
            onClick: handleVideoClick,
            className: `bg-red-500 p-1.5 sm:p-2 rounded hover:bg-red-600 text-white ${editor.isActive('youtube') ? 'bg-red-700 text-yellow-300' : ''}`,
            icon: <Video className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "YouTube - Add a YouTube video embed"
        },

        {
            id: "stickyNote",
            onClick: () => {
                setModalType('sticky');
                setShowModal(true);
            },
            className: "bg-yellow-400 p-1.5 sm:p-2 rounded hover:bg-yellow-500 text-white",
            icon: <StickyNote className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Add Sticky Note - Insert a colorful note"
        },


        {
            id: "insertTable",
            onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Table className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Insert Table - Add a 3x3 table with header row"
        },

        {
            id: "addColumnBefore",
            onClick: () => editor.chain().focus().addColumnBefore().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Columns className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Add Column - Insert a new column before the current one"
        },

        {
            id: "addColumnAfter",
            onClick: () => editor.chain().focus().addColumnAfter().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Columns className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Add Column - Insert a new column after the current one"
        },

        {
            id: "deleteColumn",
            onClick: () => editor.chain().focus().deleteColumn().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Trash2 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Delete Column - Remove the current column"
        },

        {
            id: "addRowBefore",
            onClick: () => editor.chain().focus().addRowBefore().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Rows className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Add Row Before - Insert a new row before the current one"
        },

        {
            id: "addRowAfter",
            onClick: () => editor.chain().focus().addRowAfter().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Rows className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Add Row After - Insert a new row after the current one"
        },

        {
            id: "deleteRow",
            onClick: () => editor.chain().focus().deleteRow().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Trash2 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Delete Row - Remove the current row"
        },

        {
            id: "deleteTable",
            onClick: () => editor.chain().focus().deleteTable().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Table2 className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Delete Table - Remove the entire table"
        },

        {
            id: "mergeCells",
            onClick: () => editor.chain().focus().mergeCells().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Combine className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Merge Cells - Combine selected cells"
        },

        {
            id: "splitCell",
            onClick: () => editor.chain().focus().splitCell().run(),
            className: `bg-yellow-500 p-1.5 sm:p-2 rounded hover:bg-yellow-600 text-white ${editor.isActive('table') ? 'bg-yellow-700 text-yellow-300' : ''}`,
            icon: <Split className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Split Cell - Divide the current cell"
        },

        {
            id: "clearFormatting",
            onClick: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
            className: "bg-red-500 p-1.5 sm:p-2 rounded hover:bg-red-600 text-white",
            icon: <Eraser className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Clear Formatting - Remove all formatting from selected text"
        },

        {
            id: "undo",
            onClick: () => editor.chain().focus().undo().run(),
            className: "bg-red-500 p-1.5 sm:p-2 rounded hover:bg-red-600 text-white",
            icon: <Undo className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Undo - Undo last change"
        },

        {
            id: "redo",
            onClick: () => editor.chain().focus().redo().run(),
            className: "bg-red-500 p-1.5 sm:p-2 rounded hover:bg-red-600 text-white",
            icon: <Redo className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Redo - Redo last undone change"
        },

        {
            id: "highlight",
            onClick: () => editor.chain().focus().toggleHighlight({ color: '#fef9c3' }).run(),
            className: `bg-yellow-200 p-1.5 sm:p-2 rounded hover:bg-yellow-300 text-white ${editor.isActive('highlight', { color: '#fef9c3' }) ? 'bg-yellow-400 text-yellow-100' : ''}`, icon: <Highlighter className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "yellow Highlight - Add yellow background to text"
        },

        {
            id: "highlightPink",
            onClick: () => editor.chain().focus().toggleHighlight({ color: '#fce7f3' }).run(),
            className: `bg-pink-200 p-1.5 sm:p-2 rounded hover:bg-pink-300 text-white ${editor.isActive('highlight', { color: '#fce7f3' }) ? 'bg-pink-400 text-pink-100' : ''}`,
            icon: <Highlighter className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Pink Highlight - Add pink background to text"
        },

        {
            id: "highlightGreen",
            onClick: () => editor.chain().focus().toggleHighlight({ color: '#dcfce7' }).run(),
            className: `bg-green-200 p-1.5 sm:p-2 rounded hover:bg-green-300 text-white ${editor.isActive('highlight', { color: '#dcfce7' }) ? 'bg-green-400 text-green-100' : ''}`,
            icon: <Highlighter className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Green Highlight - Add green background to text"
        },

        {
            id: "highlightBlue",
            onClick: () => editor.chain().focus().toggleHighlight({ color: '#dbeafe' }).run(),
            className: `bg-blue-200 p-1.5 sm:p-2 rounded hover:bg-blue-300 text-white ${editor.isActive('highlight', { color: '#dbeafe' }) ? 'bg-blue-400 text-blue-100' : ''}`,
            icon: <Highlighter className="w-4 h-4 sm:w-6 sm:h-6" />,
            tooltip: "Blue Highlight - Add blue background to text"
        },

    ];

    const buttonGroups = {
        headings: [
            buttons.find(b => b.id === "heading1"),
            buttons.find(b => b.id === "heading2"),
            buttons.find(b => b.id === "heading3")
        ],
        textFormatting: [
            buttons.find(b => b.id === "bold"),
            buttons.find(b => b.id === "italic"),
            buttons.find(b => b.id === "underline"),
            buttons.find(b => b.id === "strike"),
            buttons.find(b => b.id === "subscript"),
            buttons.find(b => b.id === "superscript"),
        ],
        alignment: [
            buttons.find(b => b.id === "alignLeft"),
            buttons.find(b => b.id === "alignCenter"),
            buttons.find(b => b.id === "alignRight")
        ],
        lists: [
            buttons.find(b => b.id === "bulletList"),
            buttons.find(b => b.id === "numberedList")
        ],
        blocks: [
            buttons.find(b => b.id === "blockQuote"),
            buttons.find(b => b.id === "codeBlock"),
            buttons.find(b => b.id === "horizontalRule")
        ],
        insertions: [
            buttons.find(b => b.id === "insertLink"),
            buttons.find(b => b.id === "insertImage"),
            buttons.find(b => b.id === "youtube"),
            buttons.find(b => b.id === "stickyNote"),
        ],
        table: [
            buttons.find(b => b.id === "insertTable"),
            buttons.find(b => b.id === "deleteTable"),
            buttons.find(b => b.id === "mergeCells"),
            buttons.find(b => b.id === "splitCell")
        ],
        tableOperations: [
            buttons.find(b => b.id === "addColumnBefore"),
            buttons.find(b => b.id === "addColumnAfter"),
            buttons.find(b => b.id === "deleteColumn"),
            buttons.find(b => b.id === "addRowBefore"),
            buttons.find(b => b.id === "addRowAfter"),
            buttons.find(b => b.id === "deleteRow"),
        ],
        highlights: [
            buttons.find(b => b.id === "highlight"),
            buttons.find(b => b.id === "highlightPink"),
            buttons.find(b => b.id === "highlightGreen"),
            buttons.find(b => b.id === "highlightBlue")
        ],
        history: [
            buttons.find(b => b.id === "undo"),
            buttons.find(b => b.id === "redo"),
            buttons.find(b => b.id === "clearFormatting")
        ]
    };

    return editor && (

        <div className="p-2 sm:p-5 sticky top-0 z-50" onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => setIsToolbarVisible(!isToolbarVisible)}
                    className={`p-2 rounded-full transition-colors ${theme === 'dark'
                        ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary'
                        : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                >
                    <Settings className="w-5 h-5" />
                </button>

                <button
                    onClick={() => onAiClick()}
                    className={`p-2 rounded-full transition-colors ${theme === 'dark'
                        ? 'bg-violet-700 hover:bg-violet-800'
                        : 'bg-violet-300 hover:bg-violet-500'
                        }`}
                >
                    <Sparkles className="w-5 h-5" />
                </button>

                <button
                    onClick={() => saveTextEdit()}
                    className={`p-2 rounded-full transition-colors ${theme === 'dark'
                        ? 'bg-blue-700 hover:bg-blue-800'
                        : 'bg-blue-300 hover:bg-blue-500'
                        }`}
                >
                    <Save className="w-5 h-5" />
                </button>
            </div>

            {isToolbarVisible && (
                <div className={`absolute top-full left-0 right-0 control-group flex flex-wrap items-start gap-2 md:gap-4 mt-2 p-2 md:p-4 rounded-lg shadow-lg border border-opacity-20 max-h-[60vh] md:max-h-[70vh] overflow-y-auto ${theme === 'dark'
                    ? 'bg-dark-card border-dark-border'
                    : 'bg-white border-gray-200'
                    }`}>

                    {Object.entries(buttonGroups).map(([groupName, groupButtons]) => (
                        <div key={groupName} className="button-group">
                            <div className={`text-xs mb-1 capitalize ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-500'
                                }`}>
                                {groupName.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className={`flex items-center gap-1 sm:gap-2 pr-2 last:border-r-0 ${theme === 'dark' ? 'border-r border-dark-border' : 'border-r border-gray-200'
                                }`}>
                                {groupButtons.map(button => button && (
                                    <EditorButton
                                        key={button.id}
                                        {...button}
                                        activeTooltip={activeTooltip}
                                        setActiveTooltip={setActiveTooltip}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalType === 'video' ? 'Insert Video' : modalType === 'image' ? 'Insert Image' : 'Insert Link'}
            >
                {getModalContent()}
            </Modal>

        </div>
    )
}

export default EditorExtension