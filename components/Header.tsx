'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'philosophy', name: 'Philosophy' },
  { id: 'physics', name: 'Physics' },
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'art', name: 'Art' },
  { id: 'history', name: 'History' },
  { id: 'science', name: 'Science' },
  { id: 'technology', name: 'Technology' },
  { id: 'literature', name: 'Literature' },
  { id: 'music', name: 'Music' },
  { id: 'geography', name: 'Geography' },
  { id: 'biology', name: 'Biology' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'psychology', name: 'Psychology' },
  { id: 'economics', name: 'Economics' },
  { id: 'politics', name: 'Politics' },
  { id: 'sports', name: 'Sports' },
  { id: 'medicine', name: 'Medicine' },
]

interface HeaderProps {
  onSearch?: (query: string) => void
  onCategoryChange?: (category: string) => void
  selectedCategory?: string
  onLogoClick?: () => void
}

export default function Header({ onSearch, onCategoryChange, selectedCategory = 'all', onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
    setIsCategoriesOpen(false)
  }

  const selectedCategoryData = CATEGORIES.find(cat => cat.id === selectedCategory)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group flex-shrink-0"
            onClick={() => {
              setSearchQuery('')
              if (onLogoClick) {
                onLogoClick()
              }
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              WikiScroll
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Wikipedia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Categories Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title={`Selected: ${selectedCategoryData?.name || 'All'}`}
              >
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
                  <div className="px-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors duration-200 text-sm ${
                          selectedCategory === category.id 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Menu */}
            <div className="relative">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="About WikiScroll"
              >
                <div className="w-5 h-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </div>
              </button>

              {/* About Dropdown Menu */}
              {isAboutOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                    onClick={() => setIsAboutOpen(false)}
                  >
                    <span className="font-medium">About WikiScroll</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5">
                {isMenuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Wikipedia..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
              </form>

              {/* Mobile About Link */}
              <Link 
                href="/about" 
                className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About WikiScroll
              </Link>

              {/* Mobile Categories */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wide">Categories</h3>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      title={category.name}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        selectedCategory === category.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                      <span className="text-center leading-tight">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for closing dropdowns */}
      {(isCategoriesOpen || isAboutOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsCategoriesOpen(false)
            setIsAboutOpen(false)
          }}
        />
      )}
    </header>
  )
}