'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ArticleCardProps {
  article: {
    pageid: number
    title: string
    extract: string
    thumbnail?: {
      source: string
      width: number
      height: number
    }
    original?: {
      source: string
      width: number
      height: number
    }
    description?: string
    url: string
    categories?: string[]
    coordinates?: Array<{
      lat: number
      lon: number
    }>
  }
  isFocused?: boolean
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const getImageUrl = () => {
    if (imageError) return null
    return article.thumbnail?.source || article.original?.source || null
  }
  
  const imageUrl = getImageUrl()
  
  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex gap-6">
        {/* Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              {article.description && (
                <p className="text-sm font-medium text-blue-600 mb-3">
                  {article.description}
                </p>
              )}
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              aria-label={`Read full article: ${article.title}`}
            >
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </a>
          </div>
          
          {/* Extract */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {isExpanded ? article.extract : truncateText(article.extract, 200)}
            </p>
            {article.extract.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-medium text-sm mt-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <span>Wikipedia</span>
            </div>
            
            {article.coordinates && article.coordinates.length > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span>
                  {article.coordinates[0].lat.toFixed(2)}, {article.coordinates[0].lon.toFixed(2)}
                </span>
              </div>
            )}
            
            {article.categories && article.categories.length > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <span>{article.categories.length} categories</span>
              </div>
            )}
          </div>
          
          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.slice(0, 3).map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {category.replace('Category:', '')}
                </span>
              ))}
              {article.categories.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  +{article.categories.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
        >
          <span>Read Article</span>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </a>
      </div>
    </div>
  )
}