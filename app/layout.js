import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: 'NOTEWISE - Transform PDFs into Smart Notes',
  description: 'AI-powered PDF analysis and note-taking platform. Extract insights, create summaries, and organize your documents intelligently.',
  keywords: ['PDF analysis', 'AI notes', 'document management', 'smart summaries', 'PDF tools'],
  authors: [{ name: 'NOTEWISE' }],
  openGraph: {
    title: 'NOTEWISE - Transform PDFs into Smart Notes',
    description: 'AI-powered PDF analysis and note-taking platform',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOTEWISE',
    description: 'Transform your PDFs into smart, interactive notes',
  }
}

// Clerk theme
const clerkTheme = {
  elements: {
    formButtonPrimary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90",
    formFieldInput: "bg-white/50",
    socialButtonsIconButton: "hover:bg-white/40",
    card: "",
    rootBox: "",
    headerTitle: "text-gray-900",
    headerSubtitle: "text-gray-600"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={clerkTheme}>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
