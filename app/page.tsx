'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import ArticleCard from '../components/ArticleCard'
import Header from '../components/Header'
import { fetchWikipediaArticles, searchWikipediaArticles } from '../lib/wikipedia-api'

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastArticleRef = useRef<HTMLDivElement | null>(null)

  const loadArticles = useCallback(async (pageNum: number, category: string, query: string = '') => {
    if (loading) return
    
    setLoading(true)
    
    try {
      let newArticles
      if (query.trim()) {
        newArticles = await searchWikipediaArticles(query, pageNum, 10)
        setIsSearching(true)
      } else {
        newArticles = await fetchWikipediaArticles(category, pageNum, 10)
        setIsSearching(false)
      }
      
      if (pageNum === 1) {
        setArticles(newArticles)
      } else {
        setArticles(prev => [...prev, ...newArticles])
      }
      
      setHasMore(newArticles.length > 0)
    } catch (error) {
      console.error('Error loading articles:', error)
    } finally {
      setLoading(false)
    }
  }, [loading])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1)
    setArticles([])
    loadArticles(1, selectedCategory, query)
  }, [selectedCategory, loadArticles])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
    setPage(1)
    setArticles([])
    setSearchQuery('')
    loadArticles(1, category)
  }, [loadArticles])

  const handleLogoClick = useCallback(() => {
    setSelectedCategory('all')
    setPage(1)
    setSearchQuery('')
    setArticles([])
    setHasMore(true)
    setIsSearching(false)
    loadArticles(1, 'all', '')
  }, [loadArticles])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadArticles(nextPage, selectedCategory, searchQuery)
    }
  }, [loading, hasMore, page, selectedCategory, searchQuery, loadArticles])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )
    
    if (lastArticleRef.current) {
      observerRef.current.observe(lastArticleRef.current)
    }
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [loadMore, hasMore, loading])

  // Load initial articles
  useEffect(() => {
    loadArticles(1, selectedCategory)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onLogoClick={handleLogoClick}
      />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {isSearching && searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              Search results for "{searchQuery}"
            </h2>
            <p className="text-sm text-gray-600">
              {articles.length} article{articles.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {articles.map((article, index) => (
            <div
              key={`${article.pageid}-${index}`}
              ref={index === articles.length - 1 ? lastArticleRef : null}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      
        {loading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 animate-spin border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="text-sm">Loading...</span>
            </div>
          </div>
        )}
        
        {!hasMore && articles.length > 0 && !loading && (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">
              {isSearching ? 'No more search results' : 'End of articles'}
            </p>
          </div>
        )}
        
        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 text-gray-300 mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSearching ? 'No articles found' : 'No articles available'}
            </h3>
            <p className="text-sm text-gray-600">
              {isSearching 
                ? 'Try different search terms' 
                : 'Please try again later'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  )
}