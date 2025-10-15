'use client'

import { useState } from 'react'
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
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getImageUrl = () => {
    if (imageError) return null
    return article.thumbnail?.source || article.original?.source || null
  }
  
  const imageUrl = getImageUrl()
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex gap-3">
        {/* Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="64px"
              />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900 leading-tight">
              {article.title}
            </h3>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-1 text-gray-400 hover:text-blue-600 rounded"
              aria-label={`Read full article: ${article.title}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          
          {article.description && (
            <p className="text-sm text-blue-600 mb-2">
              {article.description}
            </p>
          )}
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {isExpanded ? article.extract : truncateText(article.extract, 150)}
          </p>
          
          {article.extract.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-blue-600 hover:text-blue-700 mt-1"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}