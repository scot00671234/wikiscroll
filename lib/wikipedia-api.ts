interface WikipediaArticle {
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

interface WikipediaResponse {
  query: {
    pages: Record<string, WikipediaArticle>
  }
  continue?: {
    gcmcontinue: string
  }
}

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1'

// Test if we can access Wikipedia API
async function testWikipediaAccess(): Promise<boolean> {
  try {
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=test&srlimit=1&origin=*')
    return response.ok
  } catch {
    return false
  }
}

// Fallback sample data for testing
const SAMPLE_ARTICLES: WikipediaArticle[] = [
  {
    pageid: 1,
    title: "Economics",
    extract: "Economics is the social science that studies the production, distribution, and consumption of goods and services. Economics focuses on the behavior and interactions of economic agents and how economies work.",
    thumbnail: undefined,
    original: undefined,
    description: "Social science studying production, distribution, and consumption",
    url: "https://en.wikipedia.org/wiki/Economics",
    categories: ["Economics", "Social sciences"],
    coordinates: []
  },
  {
    pageid: 2,
    title: "Physics",
    extract: "Physics is the natural science that studies matter, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines.",
    thumbnail: undefined,
    original: undefined,
    description: "Natural science studying matter and energy",
    url: "https://en.wikipedia.org/wiki/Physics",
    categories: ["Physics", "Natural sciences"],
    coordinates: []
  },
  {
    pageid: 3,
    title: "Mathematics",
    extract: "Mathematics is the science that deals with the logic of shape, quantity and arrangement. Math is all around us, in everything we do. It is the building block for everything in our daily lives.",
    thumbnail: undefined,
    original: undefined,
    description: "Science of numbers, shapes, and patterns",
    url: "https://en.wikipedia.org/wiki/Mathematics",
    categories: ["Mathematics", "Formal sciences"],
    coordinates: []
  }
]

export async function fetchWikipediaArticles(
  category: string = 'all',
  page: number = 1,
  limit: number = 10
): Promise<WikipediaArticle[]> {
  try {
    console.log('Fetching articles for category:', category)
    
    // Check if we can access Wikipedia API
    const canAccess = await testWikipediaAccess()
    console.log('Can access Wikipedia API:', canAccess)
    
    if (!canAccess) {
      console.log('Using fallback sample data')
      return SAMPLE_ARTICLES.slice(0, limit)
    }
    
    let articles: WikipediaArticle[] = []
    
    if (category === 'all') {
      // Fetch random articles for 'all' category
      console.log('Fetching random articles')
      const promises = Array.from({ length: limit }, () => 
        fetch(`${WIKIPEDIA_API_BASE}/page/random/summary`)
          .then(res => res.json())
          .catch(() => null)
      )
      
      const results = await Promise.all(promises)
      articles = results.filter(Boolean)
      console.log('Random articles fetched:', articles.length)
    } else {
      // For specific categories, search for articles in that category
      const searchQuery = getCategorySearchQuery(category)
      console.log('Category search query:', searchQuery)
      
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=${limit}&sroffset=${(page - 1) * limit}&srprop=snippet&origin=*`
      
      console.log('Category search URL:', searchUrl)
      const searchResponse = await fetch(searchUrl)
      console.log('Category search response status:', searchResponse.status)
      
      const searchData = await searchResponse.json()
      console.log('Category search data:', searchData)
      
      if (searchData.query?.search) {
        // Create articles directly from search results
        articles = searchData.query.search.map((item: any) => ({
          pageid: item.pageid,
          title: item.title,
          extract: item.snippet ? item.snippet.replace(/<[^>]*>/g, '') : 'No summary available.',
          thumbnail: undefined,
          original: undefined,
          description: undefined,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
          categories: [],
          coordinates: []
        }))
        console.log('Category articles created:', articles.length)
      }
    }
    
    const processedArticles = articles
      .filter(article => article && article.pageid)
      .map(article => ({
        pageid: article.pageid,
        title: article.title,
        extract: article.extract || 'No summary available.',
        thumbnail: article.thumbnail,
        original: article.original,
        description: article.description,
        url: article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`,
        categories: article.categories || [],
        coordinates: article.coordinates || []
      }))
    
    console.log('Final processed articles:', processedArticles.length)
    return processedArticles
  } catch (error) {
    console.error('Error fetching Wikipedia articles:', error)
    console.log('Using fallback sample data due to error')
    return SAMPLE_ARTICLES.slice(0, limit)
  }
}

function getCategorySearchQuery(category: string): string {
  const categoryQueries: Record<string, string> = {
    'philosophy': 'philosophy OR philosopher OR philosophical',
    'physics': 'physics OR physicist OR physical',
    'mathematics': 'mathematics OR mathematician OR mathematical',
    'art': 'art OR artist OR artistic',
    'history': 'history OR historical OR historian',
    'science': 'science OR scientist OR scientific',
    'technology': 'technology OR technological OR tech',
    'literature': 'literature OR literary OR author',
    'music': 'music OR musician OR musical',
    'geography': 'geography OR geographic OR country',
    'biology': 'biology OR biologist OR biological',
    'chemistry': 'chemistry OR chemist OR chemical',
    'psychology': 'psychology OR psychologist OR psychological',
    'economics': 'economics OR economist OR economic',
    'politics': 'politics OR political OR government',
    'sports': 'sports OR athlete OR athletic',
    'medicine': 'medicine OR medical OR doctor'
  }
  
  return categoryQueries[category] || category
}

export async function searchWikipediaArticles(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<WikipediaArticle[]> {
  try {
    if (!query.trim()) {
      return []
    }

    console.log('Searching for:', query)
    
    // Check if we can access Wikipedia API
    const canAccess = await testWikipediaAccess()
    console.log('Can access Wikipedia API for search:', canAccess)
    
    if (!canAccess) {
      console.log('Using fallback sample data for search')
      // Filter sample data based on query
      const filtered = SAMPLE_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.extract.toLowerCase().includes(query.toLowerCase())
      )
      return filtered.slice(0, limit)
    }
    
    // Use the search API to get article titles and basic info
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&sroffset=${(page - 1) * limit}&srprop=snippet&origin=*`
    
    console.log('Search URL:', searchUrl)
    const response = await fetch(searchUrl)
    console.log('Search response status:', response.status)
    
    const data = await response.json()
    console.log('Search response data:', data)
    
    if (!data.query?.search || data.query.search.length === 0) {
      console.log('No search results found, using fallback')
      // Filter sample data based on query
      const filtered = SAMPLE_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.extract.toLowerCase().includes(query.toLowerCase())
      )
      return filtered.slice(0, limit)
    }
    
    const searchResults = data.query.search
    console.log('Found search results:', searchResults.length)
    
    // For now, let's create basic articles from search results without detailed API calls
    const articles: WikipediaArticle[] = searchResults.map((item: any) => ({
      pageid: item.pageid,
      title: item.title,
      extract: item.snippet ? item.snippet.replace(/<[^>]*>/g, '') : 'No summary available.',
      thumbnail: undefined,
      original: undefined,
      description: undefined,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
      categories: [],
      coordinates: []
    }))
    
    console.log('Processed articles:', articles)
    return articles
  } catch (error) {
    console.error('Error searching Wikipedia articles:', error)
    console.log('Using fallback sample data due to search error')
    // Filter sample data based on query
    const filtered = SAMPLE_ARTICLES.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.extract.toLowerCase().includes(query.toLowerCase())
    )
    return filtered.slice(0, limit)
  }
}

export async function getArticleDetails(pageId: number): Promise<WikipediaArticle | null> {
  try {
    const response = await fetch(`${WIKIPEDIA_API_BASE}/page/summary/${pageId}`)
    const article = await response.json()
    
    if (!article.pageid) {
      return null
    }
    
    return {
      pageid: article.pageid,
      title: article.title,
      extract: article.extract || 'No summary available.',
      thumbnail: article.thumbnail,
      original: article.original,
      description: article.description,
      url: article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`,
      categories: article.categories || [],
      coordinates: article.coordinates || []
    }
  } catch (error) {
    console.error('Error fetching article details:', error)
    return null
  }
}
