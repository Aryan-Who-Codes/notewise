"use client"

import Header from '@/components/custom/Header'
import { useTheme } from '../context/ThemeContext'
import { FileText, Brain, Code, Database, Shield, Layout, BookOpen, Terminal, Workflow } from "lucide-react"
import Link from "next/link"
import Footer from '@/components/custom/Footer'

export default function Documentation() {
    const { theme } = useTheme()

    const documentationSections = [
        {
            title: "Getting Started",
            icon: BookOpen,
            content: [
                {
                    subtitle: "System Overview",
                    details: `Notewise is a modern PDF analysis and note-taking platform built with Next.js and React. The application provides a dual-panel interface where users can view PDFs and take notes simultaneously. All data is synchronized in real-time using Convex database, ensuring your work is always saved and accessible.`
                },
                {
                    subtitle: "First Steps",
                    details: `Begin by signing in through our secure Clerk authentication system. Once authenticated, you'll land on the dashboard where you can upload PDFs or access your existing documents. The workspace opens in a split-view layout with your PDF on the left and a rich text editor on the right.`
                }
            ]
        },
        {
            title: "Core Functionality",
            icon: Brain,
            content: [
                {
                    subtitle: "PDF Processing",
                    details: `The PDF viewer component provides smooth rendering and navigation of your documents. Built on reliable PDF processing libraries, it supports standard PDF files while maintaining performance. Documents are stored securely in the cloud with immediate access upon upload.`
                },
                {
                    subtitle: "Note Editor",
                    details: `Our note editor is powered by Tiptap, offering a rich text editing experience. Key features include:
          • Markdown-style formatting
          • @mention suggestions from a curated list
          • Sticky note creation with custom colors
          • Real-time synchronization across devices
          • Automatic save functionality`
                },
                {
                    subtitle: "AI Integration",
                    details: `The Gemini AI integration processes your PDFs to provide intelligent insights. The system currently supports:
          • Text extraction and analysis
          • Multi-language document processing
          • Context-aware content understanding
          Note: AI processing speed depends on document size and internet connectivity.`
                }
            ]
        },
        {
            title: "Technical Architecture",
            icon: Terminal,
            content: [
                {
                    subtitle: "Frontend Implementation",
                    details: `Built on Next.js 13+ with the App Router, the frontend implements:
          • React 18 for component management
          • TailwindCSS for responsive styling
          • Dark/light theme support with ThemeContext
          • Clerk components for authentication
          • Real-time data synchronization via Convex`
                },
                {
                    subtitle: "Backend Structure",
                    details: `Convex serves as our primary database, handling:
          • User data storage and retrieval
          • Document metadata management
          • Real-time updates and synchronization
          • Secure data access patterns`
                }
            ]
        },
        {
            title: "Workspace Guide",
            icon: Workflow,
            content: [
                {
                    subtitle: "Interface Layout",
                    details: `The workspace utilizes a responsive split-screen design. The left panel displays your PDF document with zoom and navigation controls. The right panel contains the note editor with formatting tools and AI-assisted features. This layout maintains consistency across screen sizes while adapting for optimal viewing.`
                },
                {
                    subtitle: "Document Interaction",
                    details: `Navigate through your PDF using the built-in controls or scroll functionality. The viewer maintains your position while you take notes, enabling efficient reference and note-taking. The panel separation can be adjusted to optimize your viewing preferences.`
                },
                {
                    subtitle: "Note Taking System",
                    details: `The note editor provides a familiar word processor-like interface with enhanced capabilities:
          • Format text using the toolbar or keyboard shortcuts
          • Create sticky notes for important highlights
          • Use @mentions to reference key terms or concepts
          • Access AI-powered suggestions when available
          All changes save automatically as you type.`
                }
            ]
        }
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <Header className="fixed w-full z-50" />
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-glass text-dark-text-primary' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
                <div className="pt-28 pb-16">
                    <div className="max-w-7xl mx-auto px-8">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 tracking-tight">
                            Documentation
                        </h1>
                        <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/90'} max-w-3xl font-medium`}>
                            Welcome to the Notewise documentation. Here you'll find detailed information about our platform's features, technical implementation, and usage guides.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Navigation Sidebar */}
                        <div className="col-span-12 md:col-span-3 space-y-4">
                            <div className={`sticky top-24 p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                                <nav>
                                    <ul className="space-y-2">
                                        {documentationSections.map((section) => (
                                            <li key={section.title}>
                                                <a
                                                    href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-dark-card-hover' : 'hover:bg-white/30'}`}
                                                >
                                                    <section.icon className="h-4 w-4 text-purple-600" />
                                                    <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}>
                                                        {section.title}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-12 md:col-span-9 space-y-16">
                            {documentationSections.map((section) => (
                                <section
                                    key={section.title}
                                    id={section.title.toLowerCase().replace(/\s+/g, '-')}
                                    className="scroll-mt-24"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <section.icon className="h-8 w-8 text-purple-600" />
                                        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-8">
                                        {section.content.map((subsection) => (
                                            <div
                                                key={subsection.subtitle}
                                                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}
                                            >
                                                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                                    {subsection.subtitle}
                                                </h3>
                                                <div
                                                    className={`prose ${theme === 'dark' ? 'text-dark-text-secondary prose-dark' : 'text-gray-700/80'} max-w-none`}
                                                    style={{ whiteSpace: 'pre-line' }}
                                                >
                                                    {subsection.details}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
