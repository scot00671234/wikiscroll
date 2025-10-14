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
    <div className="min-h-screen relative overflow-hidden">
      <DynamicBackground articles={articles} />
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onLogoClick={handleLogoClick}
      />

      {/* Articles Feed */}
      <main className="relative z-10">
        <section className="px-4 sm:px-6 lg:px-8 pb-20 pt-24">
          <div className="max-w-6xl mx-auto">
            {isSearching && searchQuery && (
              <div className="mb-8 animate-fade-in">
                <div className="glass-card p-8 rounded-2xl shadow-modern">
                  <h2 className="text-3xl font-bold text-gradient mb-3">
                    Search results for "{searchQuery}"
                  </h2>
                  <p className="text-dark-600 text-lg font-medium">
                    {articles.length} article{articles.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-12">
              {articles.map((article, index) => (
                <div
                  key={`${article.pageid}-${index}`}
                  ref={index === articles.length - 1 ? lastArticleRef : null}
                  data-article-index={index}
                  className="animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          
            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center py-20 animate-fade-in">
                <div className="glass-card p-8 rounded-2xl shadow-modern">
                  <div className="flex items-center gap-4 text-dark-700">
                    <div className="loading-spinner"></div>
                    <span className="font-semibold text-xl">Loading more articles...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* End of Results */}
            {!hasMore && articles.length > 0 && !loading && (
              <div className="text-center py-16 animate-fade-in">
                <div className="glass-card p-10 rounded-2xl shadow-modern max-w-lg mx-auto">
                  <div className="w-16 h-16 text-primary-500 mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4"></path>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
                    </svg>
                  </div>
                  <p className="text-dark-700 text-xl font-semibold">
                    {isSearching ? 'No more search results' : 'You\'ve reached the end!'}
                  </p>
                </div>
              </div>
            )}
            
            {/* No Results */}
            {articles.length === 0 && !loading && (
              <div className="text-center py-24 animate-fade-in">
                <div className="glass-card p-12 rounded-3xl shadow-modern-lg max-w-2xl mx-auto">
                  <div className="w-24 h-24 text-primary-400 mx-auto mb-8">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gradient mb-4">
                    {isSearching ? 'No articles found' : 'No articles available'}
                  </h3>
                  <p className="text-dark-600 text-xl">
                    {isSearching 
                      ? 'Try searching with different keywords' 
                      : 'Please try again later'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
