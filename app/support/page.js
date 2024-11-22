"use client"

import Header from '@/components/custom/Header'
import { useTheme } from '../context/ThemeContext'
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Book, FileQuestion, ArrowRight, Lightbulb, Clock } from "lucide-react"
import Link from "next/link"
import Footer from '@/components/custom/Footer'
import { toast } from 'sonner'

export default function Support() {
    const { theme } = useTheme()
    const phoneNumber = "+1 (555) 123-4567"

    const handleCopyPhone = () => {
        navigator.clipboard.writeText(phoneNumber)
        toast.success("Phone number copied to clipboard!")
    }


    const supportCategories = [
        {
            title: "Getting Started",
            icon: Lightbulb,
            description: "New to Notewise? Learn the basics and quick setup guides",
            links: [
                { text: "Platform Overview", href: "/learn-more" },
                { text: "Quick Start Guide", href: "/demo" },
                { text: "Feature Documentation", href: "#" }
            ]
        },
        {
            title: "Common Questions",
            icon: FileQuestion,
            description: "Find answers to frequently asked questions",
            links: [
                { text: "PDF Requirements", href: "#" },
                { text: "AI Capabilities", href: "#" },
                { text: "Account Management", href: "#" }
            ]
        },
        {
            title: "Live Support",
            icon: MessageCircle,
            description: "Need immediate assistance? Reach out to our team",
            links: [
                { text: "Chat Support", href: "#" },
                { text: "Email Support", href: "#" },
                { text: "Schedule Call", href: "#" }
            ]
        }
    ]

    const quickHelp = [
        {
            question: "How do I upload a PDF?",
            answer: "Navigate to your dashboard and click the 'Upload' button. You can drag and drop files or browse to select them."
        },
        {
            question: "What file types are supported?",
            answer: "Currently, we support PDF files. Make sure your PDFs are text-based and not scanned images for best results."
        },
        {
            question: "How does the AI analysis work?",
            answer: "Our AI processes your PDF content, identifies key information, and helps generate smart notes automatically."
        }
    ]

    return (
        <>
            <Header />
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-glass text-dark-text-primary' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
                {/* Hero Section */}
                <div className="pt-24 pb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        How Can We Help?
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'} max-w-2xl mx-auto`}>
                        Find the support you need to make the most of Notewise
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 pb-24">
                    {/* Support Categories */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {supportCategories.map((category) => (
                            <div
                                key={category.title}
                                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/20 hover:bg-white/30'} 
              backdrop-blur-lg transition-all duration-300`}
                            >
                                <category.icon className="h-8 w-8 text-purple-600 mb-4" />
                                <h2 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                    {category.title}
                                </h2>
                                <p className={`mb-6 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                                    {category.description}
                                </p>
                                <ul className="space-y-2">
                                    {category.links.map((link) => (
                                        <li key={link.text}>
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-2 text-purple-600 hover:gap-3 transition-all duration-300"
                                            >
                                                {link.text}
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Quick Help Section */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Quick Help
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {quickHelp.map((item) => (
                                <div
                                    key={item.question}
                                    className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}
                                >
                                    <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                                        {item.question}
                                    </h3>
                                    <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className={`p-12 rounded-2xl text-center ${theme === 'dark' ? 'bg-dark-card' : 'bg-white/20'} backdrop-blur-lg`}>
                        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Still Need Help?
                        </h2>
                        <p className={`mb-8 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                            Our support team is ready to assist you
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className={`group gap-2 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                                asChild
                            >
                                <Link href="mailto:support@notewise.com">
                                    <Mail className="h-4 w-4" />
                                    Email Support
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className={`gap-2 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/20 hover:bg-white/30'}`}
                                onClick={handleCopyPhone}
                            >
                                <Clock className="h-4 w-4" />
                                Schedule Call ({phoneNumber})
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
