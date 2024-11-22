"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from '../context/ThemeContext'
import { FileText, Brain, PenLine, ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/custom/Header"
import Footer from "@/components/custom/Footer"

export default function Demo() {
    const { theme } = useTheme()

    const demoSteps = [
        {
            title: "PDF Upload & Analysis",
            description: "Watch as our AI instantly processes your document",
            video: "/demo/upload-analysis.mp4",
            features: [
                "Drag & drop interface",
                "Instant processing",
                "Smart content extraction"
            ]
        },
        {
            title: "Smart Note Generation",
            description: "See how AI helps create intelligent notes",
            video: "/demo/note-generation.mp4",
            features: [
                "AI-powered suggestions",
                "Real-time editing",
                "Auto-formatting"
            ]
        },
        {
            title: "Interactive Workspace",
            description: "Experience our dual-panel workspace",
            video: "/demo/workspace.mp4",
            features: [
                "Side-by-side view",
                "Synchronized scrolling",
                "Quick navigation"
            ]
        }
    ]

    return (
        <>
            <Header />
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-glass text-dark-text-primary' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
                {/* Header */}
                <div className="pt-24 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        See Notewise in Action
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'} max-w-2xl mx-auto`}>
                        Watch how our AI-powered platform transforms PDFs into intelligent notes
                    </p>
                </div>

                {/* Demo Sections */}
                <div className="max-w-7xl mx-auto px-6 pb-24">
                    {demoSteps.map((step, index) => (
                        <div key={step.title} className={`mb-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex-row gap-12 items-center`}>
                            {/* Video/Preview Section */}
                            <div className="flex-1">
                                <div className={`aspect-video rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                                    {/* Replace with actual video player or preview */}
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className={`text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                                            Demo Video Preview
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="flex-1 space-y-6">
                                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                    {step.title}
                                </h2>
                                <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>
                                    {step.description}
                                </p>
                                <ul className="space-y-3">
                                    {step.features.map((feature) => (
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

                    {/* Call to Action */}
                    <div className={`p-12 rounded-2xl text-center ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Ready to Get Started?
                        </h2>
                        <p className={`mb-8 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                            Transform your document workflow today with Notewise
                        </p>
                        <Button
                            size="lg"
                            className={`group gap-2 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                            asChild
                        >
                            <Link href="/dashboard">
                                Try It Free
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
