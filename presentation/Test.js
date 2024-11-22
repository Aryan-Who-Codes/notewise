<footer className={`border-t border-opacity-20 ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'} backdrop-blur-lg mt-auto`}>
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
</footer>