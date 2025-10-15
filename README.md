# WikiScroll - Pure Node.js Wikipedia Browser

A clean, simple Wikipedia article browser built with pure Node.js and vanilla JavaScript.

## Features

- **Infinite Scroll**: Browse Wikipedia articles seamlessly
- **Search**: Search through Wikipedia articles
- **Categories**: Filter articles by category
- **Clean Design**: Minimalist, professional interface
- **No Framework**: Pure Node.js + Express + vanilla HTML/CSS/JS

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **API**: Wikipedia REST API
- **Styling**: Custom CSS (no frameworks)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/articles/:category` - Get articles by category
- `GET /api/search?q=query` - Search articles
- `GET /` - Serve the main page

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

The app can be deployed to any Node.js hosting service:

- Heroku
- Railway
- DigitalOcean
- AWS
- Any VPS with Node.js

## Project Structure

```
├── server.js          # Express server
├── package.json       # Dependencies
├── public/            # Static files
│   ├── index.html     # Main page
│   ├── styles.css     # Styles
│   └── script.js      # JavaScript
└── README.md          # Documentation
```

## Why Pure Node.js?

- **No Build Process**: No webpack, babel, or complex tooling
- **Fast Development**: Just edit and refresh
- **Simple Deployment**: Single server file
- **No Dependencies Hell**: Minimal dependencies
- **Easy to Understand**: Straightforward code
