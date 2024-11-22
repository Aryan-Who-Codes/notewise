"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { ArrowRight, FileText, Brain, PenLine, Github, Twitter, Linkedin, Search, Network, Share2, Sparkles, Languages, Download } from "lucide-react";
import { GitHubLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Link from "next/link";
import { useTheme } from './context/ThemeContext';
import Footer from "@/components/custom/Footer";

// Social media configuration
const socialLinks = [
  { Icon: GitHubLogoIcon, href: "#github", label: "GitHub" },
  { Icon: TwitterLogoIcon, href: "#twitter", label: "Twitter" },
  { Icon: LinkedInLogoIcon, href: "#linkedin", label: "LinkedIn" }
];

// Feature cards configuration
const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Smart extraction and summarization of key information from your PDFs",
    badge: "Powered by Gemini",
    available: true,
    ariaLabel: "Learn more about AI analysis",
    route: "/dashboard"
  },
  {
    icon: PenLine,
    title: "Intelligent Notes",
    description: "Create, organize, and link notes with AI-assisted insights",
    badge: "Real-time sync",
    available: true,
    ariaLabel: "Learn more about intelligent notes",
    route: "/dashboard"
  },
  {
    icon: FileText,
    title: "PDF Management",
    description: "Efficiently manage and access your PDF library in one place",
    badge: "Cloud storage",
    available: true,
    ariaLabel: "Learn more about PDF management",
    route: "/dashboard"
  },
  {
    icon: Languages,
    title: "Multi-language",
    description: "Process documents in multiple languages effortlessly",
    badge: "Global ready",
    available: true,
    ariaLabel: "Learn more about multi-language support",
    route: "/dashboard/notes"
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find exactly what you need with context-aware search",
    badge: "Vector DB",
    available: false,
    ariaLabel: "Learn more about semantic search",
    route: "/dashboard/notes"
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    description: "Visualize connections between concepts and documents",
    badge: "Auto-linking",
    available: false,
    ariaLabel: "Learn more about knowledge graph",
    route: "/dashboard/notes"
  },
  {
    icon: Share2,
    title: "Collaboration",
    description: "Work together seamlessly with real-time sharing",
    badge: "Multi-user",
    available: false,
    ariaLabel: "Learn more about collaboration",
    route: "/dashboard/notes"
  },
  {
    icon: Sparkles,
    title: "Auto Summary",
    description: "Generate concise summaries of any document instantly",
    badge: "AI-powered",
    available: false,
    ariaLabel: "Learn more about auto summary",
    route: "/dashboard/notes"
  },
  {
    icon: Download,
    title: "Export Options",
    description: "Export your notes in multiple formats including PDF and Word",
    badge: "Flexible",
    available: false,
    ariaLabel: "Learn more about export options",
    route: "/dashboard/notes"
  }
];

export default function Home() {
  const { user } = useUser();
  const { theme } = useTheme();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName
    });
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-glass border-dark-border text-dark-text-primary' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex flex-col`}>
      {/* Navigation */}
      <nav className={`fixed w-full p-4 md:p-6 border border-opacity-20 ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg z-50 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group cursor-pointer">
            <div className="flex items-center gap-2" aria-label="Notewise Home">
              <FileText className="h-6 w-6 text-purple-600" aria-hidden="true" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">NOTEWISE</h1>
            </div>
          </Link>
          {user ? (
            <UserButton redirectUrl="/" />
          ) : (
            <Button variant="outline"
              className={
                `${theme === 'dark' ?
                  'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm border-opacity-20 transition-all duration-300`}
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-36 md:pt-40 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 py-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
              Transform Your PDFs into
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"> Smart Notes</span>
            </h1>
            <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'} max-w-2xl mx-auto leading-relaxed`}>
              Leverage AI to extract, analyze, and organize information from your PDF documents. Create intelligent notes effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className={`group w-full sm:w-auto gap-2 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-white/20 hover:bg-white/30 text-gray-800'} backdrop-blur-sm border border-x-white border-opacity-20 transition-all duration-300`}
                asChild
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                className={`w-full sm:w-auto gap-2 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary' : 'bg-white/20 hover:bg-white/30 text-gray-800'} backdrop-blur-sm border border-x-white border-opacity-20`}
                asChild
              >
                <Link href="/learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Power Up Your PDFs
              </h2>
              <div className="grid md:grid-cols-3 gap-10">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`group relative p-8 rounded-2xl transition-all duration-500 overflow-hidden
            ${theme === 'dark'
                        ? 'bg-dark-glass border border-dark-border hover:bg-dark-card-hover'
                        : 'bg-white/20 border hover:bg-white/30'}
            backdrop-blur-lg hover:-translate-y-2`}
                    aria-label={feature.ariaLabel}
                  >
                    {!feature.available && (
                      <div className="absolute -left-12 top-6 rotate-[-45deg] bg-purple-600 text-white px-12 py-1 text-sm font-medium">
                        Coming Soon
                      </div>
                    )}

                    <div className="absolute top-0 right-0 mt-6 mr-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
              ${theme === 'dark'
                          ? 'bg-purple-600/20 text-purple-400'
                          : 'bg-purple-100 text-purple-600'}`}>
                        {feature.badge}
                      </span>
                    </div>

                    <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-purple-600" aria-hidden="true" />
                    </div>

                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {feature.title}
                    </h3>

                    <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-purple-600 font-medium group-hover:gap-3 transition-all duration-300">
                      <Link href={user ? feature.route : '#features'}>
                        {user ? 'Try it now' : 'Learn more'} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Workflow Showcase Section */}
          <div className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Your Workflow, Simplified
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    step: "01",
                    title: "Upload & Analyze",
                    description: "Drop your PDF and let our AI analyze the content instantly",
                    icon: "📤"
                  },
                  {
                    step: "02",
                    title: "Smart Extraction",
                    description: "Key points and insights automatically identified",
                    icon: "🎯"
                  },
                  {
                    step: "03",
                    title: "Interactive Notes",
                    description: "Create dynamic notes with AI-powered suggestions",
                    icon: "✨"
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`relative p-8 rounded-2xl transition-all duration-500 group
            ${theme === 'dark'
                        ? 'bg-dark-glass hover:bg-dark-card-hover border border-dark-border'
                        : 'bg-white/20 hover:bg-white/30'} 
            backdrop-blur-lg hover:-translate-y-2`}
                  >
                    <div className="text-6xl mb-6">{item.icon}</div>
                    <div className="absolute top-6 right-6 text-sm font-bold text-purple-600">
                      {item.step}
                    </div>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {item.title}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Metrics Section */}
          <div className={`py-24 ${theme === 'dark' ? 'bg-dark-glass/50' : 'bg-white/5'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { metric: "80%", label: "AI Accuracy Rate" },
                  { metric: "24/7", label: "Cloud-Based Storage" },
                  { metric: "PDF", label: "Native Format Support" },
                  { metric: "Real-time", label: "Note Syncing" }
                ].map((stat) => (
                  <div key={stat.metric} className="text-center group">
                    <div className="mb-4">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        {stat.metric}
                      </span>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Ready to Transform Your Documents?
              </h2>
              <p className={`mb-10 text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                Join thousands of professionals who are already working smarter with Notewise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className={`group gap-2 ${theme === 'dark'
                    ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary'
                    : 'bg-white/20 hover:bg-white/30 text-gray-800'} 
        backdrop-blur-sm border border-opacity-20 transition-all duration-300`}
                  asChild
                >
                  <Link href="/dashboard">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`gap-2 ${theme === 'dark'
                    ? 'bg-dark-card hover:bg-dark-card-hover text-dark-text-primary'
                    : 'bg-white/20 hover:bg-white/30 text-gray-800'}
        backdrop-blur-sm border border-opacity-20`}
                  asChild
                >
                  <Link href="/demo">
                    View Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>


          {/* Features Section */}
          {/* <div id="features" className="grid md:grid-cols-3 gap-6 md:gap-8 py-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`space-y-4 p-6 md:p-8 rounded-xl ${theme === 'dark'
                  ? 'bg-dark-glass border-dark-border hover:bg-dark-card-hover'
                  : 'bg-white/20 hover:bg-white/30'
                  } backdrop-blur-sm border border-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                aria-label={feature.ariaLabel}
              >
                <feature.Icon className="h-12 w-12 text-purple-600" aria-hidden="true" />
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                  {feature.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div> */}

          {/* Features Section */}
          {/* <div id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Powerful Features
              </h2>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered Analysis",
                    description: "Transform complex documents into actionable insights with advanced machine learning",
                    highlight: "Smart extraction"
                  },
                  {
                    icon: PenLine,
                    title: "Intelligent Notes",
                    description: "Create dynamic, interconnected notes that evolve with your understanding",
                    highlight: "Auto-organization"
                  },
                  {
                    icon: FileText,
                    title: "PDF Management",
                    description: "Seamlessly handle your document library with powerful organization tools",
                    highlight: "Quick access"
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className={`group space-y-6 p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-2
            ${theme === 'dark'
                        ? 'bg-dark-glass border border-dark-border hover:bg-dark-card-hover'
                        : 'bg-white/20 hover:bg-white/30'}
            backdrop-blur-lg`}
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-7 w-7 text-purple-600" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                        {feature.title}
                      </h3>
                      <p className={`leading-relaxed ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-purple-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {feature.highlight} <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Impact Metrics - Redesigned with gradient cards and floating effects */}
          {/* <div className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { label: "Processing Speed", value: "10x Faster", icon: "⚡" },
                  { label: "Accuracy Rate", value: "99.9%", icon: "🎯" },
                  { label: "Time Saved", value: "8hrs/week", icon: "⏱️" }
                ].map((stat) => (
                  <div key={stat.label}
                    className={`relative p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-2
             ${theme === 'dark'
                        ? 'bg-dark-glass border border-dark-border hover:bg-dark-card-hover'
                        : 'bg-white/20 hover:bg-white/30'} 
             backdrop-blur-md`}>
                    <span className="text-4xl mb-4 block">{stat.icon}</span>
                    <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {stat.value}
                    </h3>
                    <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Core Features - Elegant cards with subtle interactions */}
          {/* <div className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Elevate Your Workflow
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI Analysis",
                    description: "Extract key insights instantly with advanced machine learning",
                    icon: "🧠"
                  },
                  {
                    title: "Smart Linking",
                    description: "Connect related concepts across all your documents",
                    icon: "🔄"
                  },
                  {
                    title: "Quick Export",
                    description: "Share your insights in any format, anywhere",
                    icon: "💫"
                  }
                ].map((feature) => (
                  <div key={feature.title}
                    className={`group p-8 rounded-2xl transition-all duration-300
             ${theme === 'dark'
                        ? 'bg-dark-glass hover:bg-dark-card-hover border border-dark-border'
                        : 'bg-white/10 hover:bg-white/20'} 
             backdrop-blur-lg hover:shadow-xl`}>
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {feature.title}
                    </h3>
                    <p className={`leading-relaxed ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* User Personas - Modern, clean design with subtle animations */}
          {/* <div className={`py-24 ${theme === 'dark' ? 'bg-dark-glass/50' : 'bg-white/5'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Built For Everyone
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    role: "Researchers",
                    description: "Analyze papers and extract insights with AI assistance",
                    icon: "🔬",
                    highlight: "3x faster literature review"
                  },
                  {
                    role: "Students",
                    description: "Create comprehensive study materials automatically",
                    icon: "📚",
                    highlight: "Better knowledge retention"
                  },
                  {
                    role: "Professionals",
                    description: "Process documents and generate reports efficiently",
                    icon: "💼",
                    highlight: "Save 8 hours weekly"
                  }
                ].map((persona) => (
                  <div key={persona.role}
                    className={`relative overflow-hidden p-8 rounded-2xl transition-all duration-500
             ${theme === 'dark'
                        ? 'bg-dark-glass hover:bg-dark-card-hover border border-dark-border'
                        : 'bg-white/10 hover:bg-white/20'} 
             backdrop-blur-lg hover:-translate-y-2`}>
                    <span className="text-5xl mb-6 block">{persona.icon}</span>
                    <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {persona.role}
                    </h3>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {persona.description}
                    </p>
                    <div className="text-purple-600 font-medium">
                      {persona.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}


          {/* Success Metrics Section */}
          {/* <div className="py-20 bg-white/10 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { label: "Time Saved Weekly", value: "12+ Hours" },
                  { label: "Knowledge Retention", value: "85% Better" },
                  { label: "Faster Research", value: "3x Speed" }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {stat.value}
                    </h3>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Use Cases Showcase */}
          {/* <div className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Perfect For Every Professional
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    role: "Researchers",
                    benefits: ["Quick literature review", "Smart paper summaries", "Citation extraction"],
                    icon: "🔬"
                  },
                  {
                    role: "Students",
                    benefits: ["Better study notes", "Exam preparation", "Knowledge linking"],
                    icon: "📚"
                  },
                  {
                    role: "Business Analysts",
                    benefits: ["Report analysis", "Data extraction", "Quick insights"],
                    icon: "📊"
                  }
                ].map((useCase) => (
                  <div key={useCase.role} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-dark-glass' : 'bg-white/20'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {useCase.role}
                    </h3>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit) => (
                        <li key={benefit} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}`}>
                          <span className="text-purple-600">✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Power Features Section */}
          {/* <div className="py-20 bg-white/10 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Powerful Features at Your Fingertips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Smart Summaries",
                    description: "Get instant AI-powered summaries of any document in seconds",
                    icon: "🤖"
                  },
                  {
                    title: "Knowledge Graph",
                    description: "Connect ideas across documents with intelligent linking",
                    icon: "🕸️"
                  },
                  {
                    title: "Collaboration",
                    description: "Share insights and work together seamlessly",
                    icon: "👥"
                  },
                  {
                    title: "Export Anywhere",
                    description: "Take your notes and insights to your favorite tools",
                    icon: "📤"
                  }
                ].map((feature) => (
                  <div key={feature.title} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-dark-glass' : 'bg-white/20'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                      {feature.title}
                    </h3>
                    <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Statistics Section */}
          {/* <div className="py-20 bg-white/10 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { label: "Active Users", value: "10K+" },
                  { label: "Documents Processed", value: "1M+" },
                  { label: "Time Saved", value: "1000hrs+" }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{stat.value}</h3>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* How It Works Section */}
          {/* <div className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "01", title: "Upload PDF", description: "Simply drag and drop your PDF documents" },
                  { number: "02", title: "AI Analysis", description: "Our AI extracts key information automatically" },
                  { number: "03", title: "Smart Notes", description: "Create and organize intelligent notes effortlessly" }
                ].map((step) => (
                  <div key={step.number} className={`${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/20'
                    } backdrop-blur-sm border border-opacity-20 rounded-xl p-6 transition-all duration-300 hover:scale-105`}>
                    <div className="text-5xl font-bold text-purple-600/20 mb-4">{step.number}</div>
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                      }`}>{step.title}</h3>
                    <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Testimonials Section */}
          {/* <div className="py-20 bg-white/10 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                What Our Users Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Research Student",
                    quote: "Notewise transformed how I analyze research papers. The AI insights are incredible!"
                  },
                  {
                    name: "David Chen",
                    role: "Business Analyst",
                    quote: "Perfect for extracting key data from business documents. Saves hours of work!"
                  }
                ].map((testimonial) => (
                  <div key={testimonial.name} className={`${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/20'
                    } backdrop-blur-sm border border-opacity-20 rounded-xl p-6 transition-all duration-300`}>
                    <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                      }`}>"{testimonial.quote}"</p>
                    <div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                        }`}>{testimonial.name}</h4>
                      <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* FAQ Section */}
          {/* <div className="py-20">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How does the AI-powered analysis work?",
                    answer: "Our advanced AI technology analyzes your PDF documents, extracting key information, main concepts, and important details. It uses natural language processing to understand context and provide meaningful insights."
                  },
                  {
                    question: "What types of PDFs can I upload?",
                    answer: "You can upload any text-based PDF documents including research papers, articles, reports, and business documents. The system works best with clearly formatted text content."
                  },
                  {
                    question: "Is my data secure?",
                    answer: "Yes! We use enterprise-grade encryption and secure cloud storage. Your documents are private and only accessible to you. We never share or sell your data."
                  },
                  {
                    question: "What's included in the free plan?",
                    answer: "The free plan includes up to 5 PDF uploads, unlimited note-taking capabilities, and basic AI analysis features. Perfect for trying out the platform."
                  },
                  {
                    question: "Can I export my notes?",
                    answer: "Yes, you can export your notes in multiple formats including PDF, Word, and plain text. All your annotations and AI-generated insights are included in the export."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className={`${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/20'
                      } backdrop-blur-sm border border-opacity-20 rounded-xl p-6 transition-all duration-300`}
                  >
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                      }`}>
                      {faq.question}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'
                      } leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Newsletter Section */}
          {/* <div className="py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Stay Updated
              </h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
                Get the latest updates on new features and AI improvements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-2 rounded-lg ${theme === 'dark'
                    ? 'bg-dark-card border-dark-border text-dark-text-primary'
                    : 'bg-white/70'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-600`}
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div> */}

        </div>
      </main>

      {/* Footer */}
      <Footer />
      {/* <footer className={`border-t border-opacity-20 ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg mt-auto`}>
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2 w-fit" aria-label="Notewise Home">
                <FileText className="h-6 w-6 text-purple-600" aria-hidden="true" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  NOTEWISE
                </h2>
              </Link>
              <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}>
                Transform your PDFs into smart, interactive notes with the power of AI.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                Product
              </h3>
              <ul className="space-y-3">
                {['Dashboard', 'Features', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className={`text-sm ${theme === 'dark'
                        ? 'text-dark-text-secondary hover:text-dark-text-primary'
                        : 'text-gray-700/80 hover:text-purple-600'
                        } transition-colors duration-200`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                Resources
              </h3>
              <ul className="space-y-3">
                {['Documentation', 'API', 'Support'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className={`text-sm ${theme === 'dark'
                        ? 'text-dark-text-secondary hover:text-dark-text-primary'
                        : 'text-gray-700/80 hover:text-purple-600'
                        } transition-colors duration-200`}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                Connect
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`${theme === 'dark'
                      ? 'text-dark-text-secondary hover:text-dark-text-primary'
                      : 'text-gray-700/80 hover:text-purple-600'
                      } transition-colors duration-200 p-2 hover:bg-white/10 rounded-full`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={`border-t border-opacity-20 ${theme === 'dark' ? 'border-dark-border' : ''} mt-8 pt-8`}>
            <p className={`text-center text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'}`}>
              © {new Date().getFullYear()} NOTEWISE. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
