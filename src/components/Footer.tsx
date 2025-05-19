'use client'

import { FaGithub, FaLinkedin, FaGlobe, FaSuitcase } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="w-full text-sm text-gray-500 bg-[var(--background)] border-t border-gray-300 dark:border-gray-700 mt-10 py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-center sm:text-left">
                    © 2025 Daily Update App. Built with ❤️ using Next.js, Tailwind, and TypeScript.
                    <br />
                    Developed by Marcos Astudillo. All rights reserved.
                </p>

                <div className="flex gap-6 text-xl">
                    <a
                        href="https://github.com/ThisIsAntonio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="hover:text-black dark:hover:text-white transition" />
                    </a>

                    <a
                        href="https://linkedin.com/in/marcos-antonio-astudillo-carrasco"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="hover:text-blue-700 dark:hover:text-blue-300 transition" />
                    </a>

                    <a
                        href="http://www.marcosastudillo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                    >
                        <FaGlobe className="hover:text-green-700 dark:hover:text-green-300 transition" />
                    </a>

                    <a
                        href="https://marcosastudillo.com/portfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio"
                    >
                        <FaSuitcase className="hover:text-purple-700 dark:hover:text-purple-300 transition" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

