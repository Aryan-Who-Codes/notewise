"use client"

import { useTheme } from '../context/ThemeContext'
import { FileText, Brain, PenLine, Search, Network, Share2, Sparkles, Languages, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import { useEffect } from 'react'

export default function LearnMore() {
    const { theme } = useTheme()

    const sections = [
        {
            title: "AI-Powered Document Analysis",
            icon: Brain,
            description: "Our advanced AI technology transforms static PDFs into interactive knowledge bases. Experience intelligent content extraction and automatic key point identification.",
            features: [
                "Smart content recognition",
                "Automatic key point extraction",
                "Context-aware analysis",
                "Multi-language support"
            ]
        },
        {
            title: "Intelligent Note-Taking",
            icon: PenLine,
            description: "Create dynamic notes that evolve with your understanding. Our AI assists in organizing and connecting information across documents.",
            features: [
                "Real-time AI suggestions",
                "Smart formatting",
                "Cross-document linking",
                "Version history"
            ]
        },
        {
            title: "Seamless PDF Management",
            icon: FileText,
            description: "Keep all your documents organized and accessible in one secure cloud location. Quick access and efficient organization make document management effortless.",
            features: [
                "Cloud storage integration",
                "Quick document retrieval",
                "Folder organization",
                "Search functionality"
            ]
        }
    ]

    const technologies = [
        { name: "Next.js", description: "For lightning-fast performance" },
        { name: "React", description: "Interactive UI components" },
        { name: "Gemini AI", description: "Advanced text analysis" },
        { name: "Convex", description: "Real-time data synchronization" }
    ]

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);


    return (
        <>
            <Header />
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-glass text-dark-text-primary' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
                {/* Hero Section */}
                <div className="pt-24 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Discover Notewise
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'} max-w-2xl mx-auto`}>
                        Explore how our platform revolutionizes document analysis and note-taking
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 pb-24">
                    {/* Feature Sections */}
                    <div className="space-y-24">
                        {sections.map((section, index) => (
                            <div key={section.title} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Icon Section */}
                                <div className="flex-1 flex justify-center">
                                    <div className={`w-48 h-48 rounded-3xl ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg flex items-center justify-center`}>
                                        <section.icon className="w-24 h-24 text-purple-600" />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 space-y-6">
                                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                        {section.title}
                                    </h2>
                                    <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>
                                        {section.description}
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {section.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <span className="text-purple-600">✓</span>
                                                <span className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Technology Stack */}
                    <div className="mt-24 text-center">
                        <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Powered by Modern Technology
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {technologies.map((tech) => (
                                <div key={tech.name} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                                    <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                        {tech.name}
                                    </h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                                        {tech.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className={`mt-24 p-12 rounded-2xl text-center ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Ready to Experience Notewise?
                        </h2>
                        <p className={`mb-8 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                            Start transforming your documents into intelligent notes today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className={`group gap-2 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                                asChild
                            >
                                <Link href="/dashboard">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className={`gap-2 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/20 hover:bg-white/30'}`}
                                asChild
                            >
                                <Link href="/demo">
                                    Watch Demo
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
