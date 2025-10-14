'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, BookOpen, MoreVertical } from 'lucide-react'

const CATEGORIES = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: 'philosophy', name: 'Philosophy', icon: BookOpen },
  { id: 'physics', name: 'Physics', icon: BookOpen },
  { id: 'mathematics', name: 'Mathematics', icon: BookOpen },
  { id: 'art', name: 'Art', icon: BookOpen },
  { id: 'history', name: 'History', icon: BookOpen },
  { id: 'science', name: 'Science', icon: BookOpen },
  { id: 'technology', name: 'Technology', icon: BookOpen },
  { id: 'literature', name: 'Literature', icon: BookOpen },
  { id: 'music', name: 'Music', icon: BookOpen },
  { id: 'geography', name: 'Geography', icon: BookOpen },
  { id: 'biology', name: 'Biology', icon: BookOpen },
  { id: 'chemistry', name: 'Chemistry', icon: BookOpen },
  { id: 'psychology', name: 'Psychology', icon: BookOpen },
  { id: 'economics', name: 'Economics', icon: BookOpen },
  { id: 'politics', name: 'Politics', icon: BookOpen },
  { id: 'sports', name: 'Sports', icon: BookOpen },
  { id: 'medicine', name: 'Medicine', icon: BookOpen },
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
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-dark-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group flex-shrink-0"
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
            <div className="w-7 h-7 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/logo.svg" 
                alt="WikiScroll Logo" 
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-bold text-dark-900 group-hover:text-primary-600 transition-colors duration-200">
              WikiScroll
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Wikipedia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-200 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white text-dark-900 placeholder-dark-400 text-sm"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Categories Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-center w-10 h-10 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                title={`Selected: ${selectedCategoryData?.name || 'All'}`}
              >
                <BookOpen className="w-5 h-5" />
              </button>

              {/* Categories Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-dark-100/20 py-3 z-50 max-h-96 overflow-y-auto">
                  <div className="px-2">
                    {CATEGORIES.map((category, index) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full flex items-center gap-4 px-4 py-3 text-left rounded-xl transition-all duration-200 text-sm group ${
                            selectedCategory === category.id 
                              ? 'bg-primary-500 text-white shadow-md' 
                              : 'text-dark-700 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-all duration-200 ${
                            selectedCategory === category.id 
                              ? 'bg-white/20' 
                              : 'bg-dark-100 group-hover:bg-primary-100'
                          }`}>
                            <Icon className="w-4 h-4 flex-shrink-0" />
                          </div>
                          <span className="font-medium">{category.name}</span>
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
                className="flex items-center justify-center w-10 h-10 text-dark-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                title="About WikiScroll"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* About Dropdown Menu */}
              {isAboutOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-dark-100/20 py-2 z-50">
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-4 py-3 text-dark-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 text-sm"
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
              className="lg:hidden p-2 text-dark-600 hover:text-primary-600 transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
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
                    const Icon = category.icon
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
                          <Icon className="w-4 h-4" />
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