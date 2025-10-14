'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import ArticleCard from '../components/ArticleCard'
import Header from '../components/Header'
import DynamicBackground from '../components/DynamicBackground'
import { fetchWikipediaArticles, searchWikipediaArticles } from '../lib/wikipedia-api'

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [preloading, setPreloading] = useState(false)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastArticleRef = useRef<HTMLDivElement | null>(null)
  const preloadObserverRef = useRef<IntersectionObserver | null>(null)
  const preloadTriggerRef = useRef<HTMLDivElement | null>(null)

  const loadArticles = useCallback(async (pageNum: number, category: string, query: string = '', isPreload: boolean = false) => {
    if (loading && !isPreload) return
    
    console.log('Loading articles:', { pageNum, category, query, loading, isPreload })
    if (!isPreload) setLoading(true)
    else setPreloading(true)
    
    try {
      let newArticles
      if (query.trim()) {
        console.log('Searching for:', query)
        newArticles = await searchWikipediaArticles(query, pageNum, 15) // Load more per batch
        console.log('Search results:', newArticles)
        setIsSearching(true)
      } else {
        console.log('Fetching category:', category)
        newArticles = await fetchWikipediaArticles(category, pageNum, 15) // Load more per batch
        console.log('Category results:', newArticles)
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
      if (!isPreload) setLoading(false)
      else setPreloading(false)
    }
  }, [loading])

  const handleSearch = useCallback((query: string) => {
    console.log('Search triggered with query:', query)
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
    console.log('Logo clicked - resetting to home feed')
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

  const preloadMore = useCallback(() => {
    if (!preloading && hasMore && articles.length > 0) {
      const nextPage = page + 1
      loadArticles(nextPage, selectedCategory, searchQuery, true)
    }
  }, [preloading, hasMore, articles.length, page, selectedCategory, searchQuery, loadArticles])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Start loading 200px before reaching the end
    )
    
    if (lastArticleRef.current) {
      observerRef.current.observe(lastArticleRef.current)
    }
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [loadMore, hasMore, loading])

  // Preload observer - starts loading when user is 3 articles away from the end
  useEffect(() => {
    if (preloadObserverRef.current) preloadObserverRef.current.disconnect()
    
    preloadObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !preloading && articles.length > 3) {
          preloadMore()
        }
      },
      { threshold: 0.1, rootMargin: '400px' } // Start preloading 400px before reaching trigger
    )
    
    if (preloadTriggerRef.current) {
      preloadObserverRef.current.observe(preloadTriggerRef.current)
    }
    
    return () => {
      if (preloadObserverRef.current) preloadObserverRef.current.disconnect()
    }
  }, [preloadMore, hasMore, preloading, articles.length])

  // Load initial articles
  useEffect(() => {
    loadArticles(1, selectedCategory)
  }, [])

  return (
    <div className="min-h-screen relative">
      <DynamicBackground articles={articles} />
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onLogoClick={handleLogoClick}
      />


      {/* Articles Feed */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 pt-16">
        <div className="max-w-4xl mx-auto">
          {isSearching && searchQuery && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-900 mb-2">
                Search results for "{searchQuery}"
              </h2>
              <p className="text-dark-600">
                {articles.length} article{articles.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}
          
          <div className="space-y-12">
            {articles.map((article, index) => (
              <div
                key={`${article.pageid}-${index}`}
                ref={index === articles.length - 1 ? lastArticleRef : null}
                data-article-index={index}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          
          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center py-12 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 text-dark-600 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-dark-100">
                <div className="w-5 h-5 animate-spin text-primary-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                  </svg>
                </div>
                <span className="font-medium">Loading more articles...</span>
              </div>
            </div>
          )}
          
          {/* End of Results */}
          {!hasMore && articles.length > 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-dark-500">
                {isSearching ? 'No more search results' : 'You\'ve reached the end!'}
              </p>
            </div>
          )}
          
          {/* No Results */}
          {articles.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 text-dark-300 mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-900 mb-2">
                {isSearching ? 'No articles found' : 'No articles available'}
              </h3>
              <p className="text-dark-600">
                {isSearching 
                  ? 'Try searching with different keywords' 
                  : 'Please try again later'
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
