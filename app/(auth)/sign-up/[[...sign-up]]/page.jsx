import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex justify-center items-center">
            <div className="p-1 sm:p-6 md:p-8 lg:p-10 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Join Notewise</h1>
                    <p className="text-gray-700/80 text-lg">Start transforming your PDFs into smart notes</p>
                </div>
                <div className="bg-white sm:bg-white/40 sm:backdrop-blur-md border border-opacity-20 sm:hover:bg-white/50 transition-all duration-300 shadow-lg rounded-2xl p-4">
                    <SignUp 
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all duration-300",
                                formFieldInput: "bg-white/90 sm:bg-white/70 sm:backdrop-blur-md border-gray-200",
                                footerActionLink: "text-purple-600 hover:text-pink-600",
                                dividerLine: "bg-gray-200",
                                dividerText: "text-gray-600",
                                socialButtonsBlockButton: "border border-gray-200 bg-white/90 sm:bg-white/70 hover:bg-white/80 transition-all duration-300",
                                socialButtonsBlockButtonText: "text-gray-700 font-medium",
                                formFieldLabel: "text-gray-700",
                                headerTitle: "text-gray-700",
                                headerSubtitle: "hidden",
                                card: "shadow-none"
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
