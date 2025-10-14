import type { Metadata } from 'next'
import Link from 'next/link'
// Icons replaced with inline SVG

export const metadata: Metadata = {
  title: 'WikiScroll Blog - Tips, Tutorials & Wikipedia Insights',
  description: 'Discover tips, tutorials, and insights about Wikipedia exploration, knowledge discovery, and making the most of WikiScroll\'s features. Learn how to navigate the world\'s largest encyclopedia effectively.',
  keywords: ['wikipedia blog', 'knowledge discovery', 'wikipedia tips', 'education blog', 'learning resources', 'wikipedia tutorials', 'research tips'],
  openGraph: {
    title: 'WikiScroll Blog - Tips, Tutorials & Wikipedia Insights',
    description: 'Discover tips, tutorials, and insights about Wikipedia exploration, knowledge discovery, and making the most of WikiScroll\'s features.',
    type: 'website',
    url: 'https://wikiscroll.app/blog',
  },
  twitter: {
    title: 'WikiScroll Blog - Tips, Tutorials & Wikipedia Insights',
    description: 'Discover tips, tutorials, and insights about Wikipedia exploration, knowledge discovery, and making the most of WikiScroll\'s features.',
  },
  alternates: {
    canonical: '/blog',
  },
}

const blogPosts = [
  {
    id: '1',
    title: '10 Tips for Effective Wikipedia Research',
    excerpt: 'Learn how to navigate Wikipedia like a pro with these essential research techniques and strategies for finding reliable information quickly.',
    author: 'WikiScroll Team',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Research Tips',
    featured: true,
  },
  {
    id: '2',
    title: 'Understanding Wikipedia Categories: A Complete Guide',
    excerpt: 'Master Wikipedia\'s categorization system to discover related articles and build comprehensive knowledge on any topic.',
    author: 'WikiScroll Team',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Tutorial',
    featured: false,
  },
  {
    id: '3',
    title: 'The Science Behind Infinite Scroll: Why It Works',
    excerpt: 'Explore the psychology and UX principles that make infinite scroll an effective way to discover and consume content.',
    author: 'WikiScroll Team',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'UX Design',
    featured: false,
  },
  {
    id: '4',
    title: 'Wikipedia\'s Most Fascinating Articles You\'ve Never Heard Of',
    excerpt: 'Discover hidden gems in Wikipedia\'s vast collection of articles that showcase the incredible diversity of human knowledge.',
    author: 'WikiScroll Team',
    date: '2024-01-01',
    readTime: '8 min read',
    category: 'Discovery',
    featured: true,
  },
  {
    id: '5',
    title: 'How to Verify Wikipedia Information: A Critical Thinking Guide',
    excerpt: 'Learn essential skills for evaluating Wikipedia content and using it as a starting point for deeper research.',
    author: 'WikiScroll Team',
    date: '2023-12-28',
    readTime: '9 min read',
    category: 'Critical Thinking',
    featured: false,
  },
  {
    id: '6',
    title: 'Building Better Search Queries for Wikipedia',
    excerpt: 'Master the art of crafting effective search queries to find exactly what you\'re looking for on Wikipedia.',
    author: 'WikiScroll Team',
    date: '2023-12-25',
    readTime: '4 min read',
    category: 'Search Tips',
    featured: false,
  },
]

const categories = [
  'All',
  'Research Tips',
  'Tutorial',
  'UX Design',
  'Discovery',
  'Critical Thinking',
  'Search Tips',
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-dark-900 mb-6 text-balance">
            WikiScroll <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Blog</span>
          </h1>
          <p className="text-xl text-dark-600 mb-8 max-w-3xl mx-auto text-balance">
            Discover tips, tutorials, and insights about Wikipedia exploration, knowledge discovery, 
            and making the most of WikiScroll's features.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-dark-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === 'All'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-dark-100 text-dark-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-dark-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-dark-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-dark-500">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </div>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                          </div>
                          {post.readTime}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        Read More
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12,5 19,12 12,19"></polyline>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-dark-100 text-dark-600 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-dark-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-dark-500">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </div>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                        </div>
                        {post.readTime}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      Read
                      <div className="w-4 h-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12,5 19,12 12,19"></polyline>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest tips, tutorials, and insights about Wikipedia exploration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
