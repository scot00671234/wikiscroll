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
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Unknown date'
    }
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
      className={`article-card group transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isHovered ? 'scale-[1.02] -translate-y-2' : 'scale-100 translate-y-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-8">
        {/* Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div 
              ref={imageRef}
              className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 transition-all duration-500 ${
                isHovered ? 'scale-110 shadow-glow-lg' : 'scale-100 shadow-soft'
              }`}
            >
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 176px, 208px"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h3 className={`text-3xl font-bold text-dark-900 mb-3 transition-all duration-300 line-clamp-2 ${
                isHovered ? 'text-primary-600 drop-shadow-sm' : 'text-dark-900'
              }`}>
                {article.title}
              </h3>
              {article.description && (
                <p className={`text-lg font-semibold mb-4 transition-all duration-300 ${
                  isHovered ? 'text-primary-500' : 'text-primary-600'
                }`}>
                  {article.description}
                </p>
              )}
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 group/link ${
                isHovered 
                  ? 'text-primary-600 bg-primary-50 shadow-glow scale-110' 
                  : 'text-dark-400 hover:text-primary-600 hover:bg-primary-50 hover:scale-105'
              }`}
              aria-label={`Read full article: ${article.title}`}
            >
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </a>
          </div>
          
          {/* Extract */}
          <div className="mb-8">
            <p className={`text-dark-700 leading-relaxed text-lg transition-all duration-300 ${
              isHovered ? 'text-dark-800' : 'text-dark-700'
            }`}>
              {isExpanded ? article.extract : truncateText(article.extract, 250)}
            </p>
            {article.extract.length > 250 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`font-bold text-base mt-4 transition-all duration-300 hover:scale-105 ${
                  isHovered 
                    ? 'text-primary-500 hover:text-primary-600' 
                    : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-500">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <span className="text-sm font-medium">Wikipedia</span>
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
            <div className="mt-4 flex flex-wrap gap-2">
              {article.categories.slice(0, 3).map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded-full"
                >
                  {category.replace('Category:', '')}
                </span>
              ))}
              {article.categories.length > 3 && (
                <span className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded-full">
                  +{article.categories.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
          {/* Action Button */}
      <div className="mt-10 pt-8 border-t border-white/30">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300 group/btn border-2 ${
            isHovered 
              ? 'bg-primary-500 text-white border-primary-500 shadow-glow scale-105' 
              : 'bg-white/80 text-primary-600 border-primary-200 hover:bg-primary-50 hover:border-primary-300 hover:scale-105'
          }`}
        >
          <span>Read Article</span>
          <div className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
