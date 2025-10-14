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
    <header className="sticky top-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-4 group flex-shrink-0"
            onClick={() => {
              // Reset search and category state
              setSearchQuery('')
              if (onLogoClick) {
                onLogoClick()
              }
              // Force scroll to top when clicking logo
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="w-8 h-8 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
              <img 
                src="/logo.svg" 
                alt="WikiScroll Logo" 
                className="w-full h-full drop-shadow-sm"
              />
            </div>
            <span className="text-2xl font-bold text-gradient group-hover:scale-105 transition-all duration-300">
              WikiScroll
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-8">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-primary-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Wikipedia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-12 pr-6 py-4 text-lg focus-ring"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Categories Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-center w-12 h-12 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group shadow-soft hover:shadow-glow"
                title={`Selected: ${selectedCategoryData?.name || 'All'}`}
              >
                <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-4 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft-lg border border-white/30 py-4 z-50 max-h-96 overflow-y-auto animate-scale-in">
                  <div className="px-3">
                    {CATEGORIES.map((category, index) => {
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full flex items-center gap-4 px-5 py-4 text-left rounded-2xl transition-all duration-300 text-base group ${
                            selectedCategory === category.id 
                              ? 'bg-primary-500 text-white shadow-glow scale-105' 
                              : 'text-dark-700 hover:bg-primary-50 hover:text-primary-600 hover:scale-105'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                            selectedCategory === category.id 
                              ? 'bg-white/20' 
                              : 'bg-dark-100 group-hover:bg-primary-100'
                          }`}>
                            <div className="w-5 h-5 flex-shrink-0">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                              </svg>
                            </div>
                          </div>
                          <span className="font-semibold">{category.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* About Menu */}
            <div className="relative">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center justify-center w-12 h-12 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group shadow-soft hover:shadow-glow"
                title="About WikiScroll"
              >
                <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </div>
              </button>

              {/* About Dropdown Menu */}
              {isAboutOpen && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft-lg border border-white/30 py-4 z-50 animate-scale-in">
                  <Link
                    href="/about"
                    className="flex items-center gap-4 px-6 py-4 text-dark-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300 text-base font-semibold hover:scale-105"
                    onClick={() => setIsAboutOpen(false)}
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                    </div>
                    <span>About WikiScroll</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-dark-600 hover:text-primary-600 transition-colors duration-200 flex-shrink-0"
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
          <div className="lg:hidden py-4 border-t border-dark-100">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-200 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white text-dark-900 placeholder-dark-400 text-sm"
                  />
                </div>
              </form>

              {/* Mobile About Link */}
              <Link 
                href="/about" 
                className="flex items-center px-4 py-3 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About WikiScroll
              </Link>

              {/* Mobile Categories */}
              <div>
                <h3 className="text-xs font-semibold text-dark-500 mb-3 px-1 uppercase tracking-wide">Categories</h3>
                <div className="grid grid-cols-4 gap-3">
                  {CATEGORIES.map((category) => {
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-primary-500 text-white shadow-lg scale-105'
                            : 'bg-dark-50 text-dark-700 hover:bg-primary-50 hover:scale-105'
                        }`}
                        title={category.name}
                      >
                        <div className={`p-2 rounded-lg transition-colors duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-white'
                        }`}>
                          <div className="w-4 h-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </div>
                        </div>
                        <span className="text-center leading-tight">{category.name}</span>
                      </button>
                    )
                  })}
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