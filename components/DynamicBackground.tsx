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
      className="fixed inset-0 -z-10 transition-all duration-1500 ease-out"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/60 via-white/40 to-accent-50/60" />
      <div className="absolute inset-0">
        <Image
          src={currentImageUrl}
          alt={currentArticle?.title || 'Background'}
          fill
          className="object-cover transition-all duration-1500 ease-out"
          style={{
            filter: 'blur(60px) brightness(0.6) saturate(1.4) contrast(1.1)',
            transform: 'scale(1.2)',
          }}
          priority={false}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
    </div>
  )
}
