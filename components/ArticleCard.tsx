'use client'

import { useState, useRef, useEffect } from 'react'
import { ExternalLink, Calendar, MapPin, Tag, Eye } from 'lucide-react'
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
      className={`article-card p-6 group transition-all duration-300 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-8">
        {/* Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div 
              ref={imageRef}
              className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-dark-100 transition-all duration-300 ${
                isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-lg'
              }`}
            >
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className={`object-cover transition-all duration-300 ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 160px, 192px"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className={`text-2xl font-bold text-dark-900 mb-2 transition-colors duration-200 line-clamp-2 ${
                isHovered ? 'text-primary-600' : 'text-dark-900'
              }`}>
                {article.title}
              </h3>
              {article.description && (
                <p className={`text-sm font-medium mb-3 transition-colors duration-200 ${
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
              className={`flex-shrink-0 p-3 rounded-xl transition-all duration-200 ${
                isHovered 
                  ? 'text-primary-600 bg-primary-50 shadow-md' 
                  : 'text-dark-400 hover:text-primary-600 hover:bg-primary-50'
              }`}
              aria-label={`Read full article: ${article.title}`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          
          {/* Extract */}
          <div className="mb-6">
            <p className={`text-dark-700 leading-relaxed transition-all duration-300 ${
              isHovered ? 'text-dark-800' : 'text-dark-700'
            }`}>
              {isExpanded ? article.extract : truncateText(article.extract, 200)}
            </p>
            {article.extract.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`font-semibold text-sm mt-3 transition-all duration-300 ${
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
              <Eye className="w-4 h-4" />
              <span>Wikipedia</span>
            </div>
            
            {article.coordinates && article.coordinates.length > 0 && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {article.coordinates[0].lat.toFixed(2)}, {article.coordinates[0].lon.toFixed(2)}
                </span>
              </div>
            )}
            
            {article.categories && article.categories.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
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
      <div className="mt-8 pt-6 border-t border-dark-100">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 group/btn border ${
            isHovered 
              ? 'bg-primary-500 text-white border-primary-500 shadow-md' 
              : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-50 hover:border-primary-300'
          }`}
        >
          <span>Read Article</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  )
}
