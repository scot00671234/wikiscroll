'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface DynamicBackgroundProps {
  articles: Array<{
    pageid: number
    title: string
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
  }>
}

export default function DynamicBackground({ articles }: DynamicBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setCurrentImageIndex(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe all article cards
    const cards = document.querySelectorAll('[data-article-index]')
    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [articles])

  const currentArticle = articles[currentImageIndex]
  const currentImageUrl = currentArticle?.thumbnail?.source || currentArticle?.original?.source

  if (!currentImageUrl || !isVisible) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 transition-all duration-1000 ease-out"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark-50/80 via-white/60 to-dark-100/80" />
      <div className="absolute inset-0">
        <Image
          src={currentImageUrl}
          alt={currentArticle?.title || 'Background'}
          fill
          className="object-cover transition-all duration-1000 ease-out"
          style={{
            filter: 'blur(40px) brightness(0.7) saturate(1.2)',
            transform: 'scale(1.1)',
          }}
          priority={false}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-white/20" />
    </div>
  )
}
