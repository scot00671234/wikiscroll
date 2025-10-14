import Link from 'next/link'
import { BookOpen, Github, Twitter, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8">
                <img 
                  src="/logo.svg" 
                  alt="WikiScroll Logo" 
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold">WikiScroll</span>
            </div>
            <p className="text-dark-300 mb-6 max-w-md">
              Discover Wikipedia articles with infinite scroll, search functionality, and category filtering. 
              Explore knowledge like never before with our modern, TikTok-inspired interface.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@wikiscroll.app"
                className="p-2 bg-dark-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-dark-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-dark-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-dark-300 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Main_Page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Wikipedia
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Help:Contents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Wikipedia Help
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:About"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  About Wikipedia
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Wikipedia:Contact_us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Contact Wikipedia
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://wikimediafoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Wikimedia Foundation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © {currentYear} WikiScroll. All rights reserved. Content from Wikipedia under Creative Commons license.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-dark-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-dark-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-dark-400 hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
