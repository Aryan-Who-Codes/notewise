"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "../../app/context/ThemeContext";

const lightTheme = {
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

const darkTheme = {
  elements: {
    card: "bg-dark-card text-dark-text-primary",
    navbar: "bg-dark-surface",
    headerTitle: "text-dark-text-primary",
    headerSubtitle: "text-dark-text-secondary",
    socialButtonsBlockButton: "bg-dark-card hover:bg-dark-card-hover text-dark-text-primary",
    socialButtonsProviderIcon: "text-dark-text-primary",
    formButtonPrimary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90",
    formFieldInput: "bg-dark-surface text-dark-text-primary border-dark-border",
    formFieldLabel: "text-dark-text-secondary",
    footer: "hidden",
    modalBackdrop: "bg-black/40 backdrop-blur-sm"
  }
};

export function ClerkThemeProvider({ children }) {
  const { theme } = useTheme();
  
  return (
    <ClerkProvider appearance={{ 
      baseTheme: theme === 'dark' ? darkTheme : lightTheme 
    }}>
      {children}
    </ClerkProvider>
  );
}
