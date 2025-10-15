class WikiScroll {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.currentCategory = 'all';
        this.currentQuery = '';
        this.isLoading = false;
        this.hasMore = true;
        this.isSearching = false;
        
        this.init();
    }
    
    init() {
        this.searchInput = document.getElementById('searchInput');
        this.categorySelect = document.getElementById('categorySelect');
        this.articlesContainer = document.getElementById('articlesContainer');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.endMessage = document.getElementById('endMessage');
        this.noResults = document.getElementById('noResults');
        this.searchResults = document.getElementById('searchResults');
        this.searchTitle = document.getElementById('searchTitle');
        this.searchCount = document.getElementById('searchCount');
        
        this.setupEventListeners();
        this.loadArticles();
    }
    
    setupEventListeners() {
        // Search input
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSearch();
            }
        });
        
        // Category select
        this.categorySelect.addEventListener('change', (e) => {
            this.handleCategoryChange(e.target.value);
        });
        
        // Infinite scroll
        window.addEventListener('scroll', () => {
            if (this.isNearBottom() && !this.isLoading && this.hasMore) {
                this.loadMore();
            }
        });
    }
    
    async loadArticles(category = 'all', page = 1, query = '') {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            let url;
            if (query) {
                url = `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=10`;
                this.isSearching = true;
            } else {
                url = `/api/articles/${category}?page=${page}&limit=10`;
                this.isSearching = false;
            }
            
            const response = await fetch(url);
            const newArticles = await response.json();
            
            if (page === 1) {
                this.articles = newArticles;
                this.articlesContainer.innerHTML = '';
            } else {
                this.articles = [...this.articles, ...newArticles];
            }
            
            this.hasMore = newArticles.length > 0;
            this.currentPage = page;
            
            this.renderArticles();
            this.updateSearchResults();
            
        } catch (error) {
            console.error('Error loading articles:', error);
            this.showError('Failed to load articles');
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    renderArticles() {
        if (this.articles.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideNoResults();
        
        const articlesHTML = this.articles.map(article => this.createArticleHTML(article)).join('');
        this.articlesContainer.innerHTML = articlesHTML;
        
        // Add read more functionality
        this.setupReadMoreButtons();
    }
    
    createArticleHTML(article) {
        const imageHTML = article.thumbnail 
            ? `<img src="${article.thumbnail.source}" alt="${article.title}" class="article-image" onerror="this.style.display='none'">`
            : '';
        
        const descriptionHTML = article.description 
            ? `<div class="article-description">${article.description}</div>`
            : '';
        
        const extract = this.truncateText(article.extract, 150);
        const needsReadMore = article.extract.length > 150;
        
        return `
            <div class="article-card">
                <div class="article-content">
                    ${imageHTML}
                    <div class="article-text">
                        <div class="article-header">
                            <h3 class="article-title">${article.title}</h3>
                            <a href="${article.url}" target="_blank" class="article-link" title="Read full article">
                                ↗
                            </a>
                        </div>
                        ${descriptionHTML}
                        <p class="article-extract">${extract}</p>
                        ${needsReadMore ? '<span class="read-more" data-full-text="' + this.escapeHtml(article.extract) + '">Read more</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    setupReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const fullText = e.target.getAttribute('data-full-text');
                const extract = e.target.previousElementSibling;
                
                if (e.target.textContent === 'Read more') {
                    extract.textContent = fullText;
                    e.target.textContent = 'Show less';
                } else {
                    extract.textContent = this.truncateText(fullText, 150);
                    e.target.textContent = 'Read more';
                }
            });
        });
    }
    
    handleSearch() {
        const query = this.searchInput.value.trim();
        this.currentQuery = query;
        this.currentCategory = 'all';
        this.categorySelect.value = 'all';
        this.currentPage = 1;
        this.hasMore = true;
        
        this.loadArticles('all', 1, query);
    }
    
    handleCategoryChange(category) {
        this.currentCategory = category;
        this.currentQuery = '';
        this.searchInput.value = '';
        this.currentPage = 1;
        this.hasMore = true;
        
        this.loadArticles(category, 1);
    }
    
    loadMore() {
        if (this.currentQuery) {
            this.loadArticles('all', this.currentPage + 1, this.currentQuery);
        } else {
            this.loadArticles(this.currentCategory, this.currentPage + 1);
        }
    }
    
    updateSearchResults() {
        if (this.isSearching && this.currentQuery) {
            this.searchTitle.textContent = `Search results for "${this.currentQuery}"`;
            this.searchCount.textContent = `${this.articles.length} article${this.articles.length !== 1 ? 's' : ''} found`;
            this.searchResults.style.display = 'block';
        } else {
            this.searchResults.style.display = 'none';
        }
    }
    
    showLoading() {
        this.loadingIndicator.style.display = 'flex';
        this.endMessage.style.display = 'none';
    }
    
    hideLoading() {
        this.loadingIndicator.style.display = 'none';
        
        if (!this.hasMore && this.articles.length > 0) {
            this.endMessage.style.display = 'block';
        }
    }
    
    showNoResults() {
        this.noResults.style.display = 'block';
        this.endMessage.style.display = 'none';
    }
    
    hideNoResults() {
        this.noResults.style.display = 'none';
    }
    
    showError(message) {
        this.articlesContainer.innerHTML = `
            <div class="article-card">
                <p style="color: #ef4444; text-align: center;">${message}</p>
            </div>
        `;
    }
    
    isNearBottom() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WikiScroll();
});
