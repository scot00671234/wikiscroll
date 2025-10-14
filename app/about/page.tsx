import type { Metadata } from 'next'
import { BookOpen, Search, Filter, Zap, Users, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About WikiScroll - Discover Wikipedia Articles with Infinite Scroll',
  description: 'Learn about WikiScroll, the modern Wikipedia browsing experience with infinite scroll, search functionality, and category filtering. Discover how we make knowledge exploration engaging and accessible.',
  keywords: ['about wikiscroll', 'wikipedia browser', 'infinite scroll', 'knowledge discovery', 'education technology', 'wikipedia interface'],
  openGraph: {
    title: 'About WikiScroll - Discover Wikipedia Articles with Infinite Scroll',
    description: 'Learn about WikiScroll, the modern Wikipedia browsing experience with infinite scroll, search functionality, and category filtering.',
    type: 'website',
    url: 'https://wikiscroll.app/about',
  },
  twitter: {
    title: 'About WikiScroll - Discover Wikipedia Articles with Infinite Scroll',
    description: 'Learn about WikiScroll, the modern Wikipedia browsing experience with infinite scroll, search functionality, and category filtering.',
  },
  alternates: {
    canonical: '/about',
  },
}

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find exactly what you\'re looking for with our powerful search functionality that queries Wikipedia\'s vast database in real-time.',
  },
  {
    icon: Filter,
    title: 'Category Filtering',
    description: 'Browse articles by categories like Featured, Recent, and Popular to discover content that matches your interests.',
  },
  {
    icon: Zap,
    title: 'Infinite Scroll',
    description: 'Experience seamless browsing with our infinite scroll feature that loads new articles as you explore, just like modern social media apps.',
  },
  {
    icon: Globe,
    title: 'Global Knowledge',
    description: 'Access Wikipedia\'s extensive collection of articles from around the world, covering every topic imaginable.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built on Wikipedia\'s community-driven content, ensuring accurate, up-to-date, and comprehensive information.',
  },
  {
    icon: Heart,
    title: 'Free & Open',
    description: 'Completely free to use with no registration required. Built with open-source principles and Wikipedia\'s open content.',
  },
]

const stats = [
  { number: '6M+', label: 'Articles Available' },
  { number: '300+', label: 'Languages Supported' },
  { number: '100%', label: 'Free to Use' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-dark-900 mb-6 text-balance">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">WikiScroll</span>
          </h1>
          <p className="text-xl text-dark-600 mb-8 max-w-3xl mx-auto text-balance">
            WikiScroll revolutionizes how you discover and explore Wikipedia articles. 
            Built with modern web technologies and inspired by the engaging interfaces of social media platforms, 
            we make knowledge exploration both fun and efficient.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">Our Mission</h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              To make Wikipedia's vast knowledge accessible and engaging through modern, intuitive interfaces 
              that encourage exploration and learning.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">Key Features</h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Discover what makes WikiScroll the best way to explore Wikipedia articles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 mb-3">{feature.title}</h3>
                  <p className="text-dark-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">By the Numbers</h2>
            <p className="text-lg text-dark-600">
              Wikipedia's incredible reach and our commitment to making it accessible.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-dark-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-4">Ready to Explore?</h2>
          <p className="text-lg text-dark-600 mb-8 max-w-2xl mx-auto">
            Start discovering Wikipedia articles with our modern, intuitive interface. 
            No registration required - just start exploring!
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-200 text-lg"
          >
            <BookOpen className="w-5 h-5" />
            Start Exploring Now
          </a>
        </div>
      </section>
    </div>
  )
}
