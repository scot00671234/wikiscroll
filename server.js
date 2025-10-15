const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Wikipedia API endpoints
app.get('/api/articles/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    
    let articles = [];
    
    if (category === 'all') {
      // Get random articles
      const promises = Array.from({ length: limit }, () => 
        fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
          .then(res => res.json())
          .catch(() => null)
      );
      
      const results = await Promise.all(promises);
      articles = results.filter(Boolean);
    } else {
      // Search by category
      const searchQuery = getCategorySearchQuery(category);
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=${limit}&sroffset=${(page - 1) * limit}&srprop=snippet&origin=*`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      if (searchData.query?.search) {
        const pageIds = searchData.query.search.map(item => item.pageid).join('|');
        const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageIds}&prop=extracts|pageimages|description&exintro=true&explaintext=true&pithumbsize=200&origin=*`;
        
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        
        articles = searchData.query.search.map(item => {
          const pageData = detailsData.query?.pages?.[item.pageid];
          return {
            pageid: item.pageid,
            title: item.title,
            extract: pageData?.extract || (item.snippet ? item.snippet.replace(/<[^>]*>/g, '') : 'No summary available.'),
            thumbnail: pageData?.thumbnail ? {
              source: pageData.thumbnail.source,
              width: pageData.thumbnail.width,
              height: pageData.thumbnail.height
            } : null,
            description: pageData?.description,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
            categories: [],
            coordinates: []
          };
        });
      }
    }
    
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { q: query, page = 1, limit = 10 } = req.query;
    
    if (!query) {
      return res.json([]);
    }
    
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=${limit}&sroffset=${(page - 1) * limit}&srprop=snippet&origin=*`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (!searchData.query?.search || searchData.query.search.length === 0) {
      return res.json([]);
    }
    
    const pageIds = searchData.query.search.map(item => item.pageid).join('|');
    const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageIds}&prop=extracts|pageimages|description&exintro=true&explaintext=true&pithumbsize=200&origin=*`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    
    const articles = searchData.query.search.map(item => {
      const pageData = detailsData.query?.pages?.[item.pageid];
      return {
        pageid: item.pageid,
        title: item.title,
        extract: pageData?.extract || (item.snippet ? item.snippet.replace(/<[^>]*>/g, '') : 'No summary available.'),
        thumbnail: pageData?.thumbnail ? {
          source: pageData.thumbnail.source,
          width: pageData.thumbnail.width,
          height: pageData.thumbnail.height
        } : null,
        description: pageData?.description,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
        categories: [],
        coordinates: []
      };
    });
    
    res.json(articles);
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ error: 'Failed to search articles' });
  }
});

function getCategorySearchQuery(category) {
  const categoryQueries = {
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
  };
  
  return categoryQueries[category] || category;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
