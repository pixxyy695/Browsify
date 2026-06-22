# Product Store - React Frontend

A modern React-based frontend for the Product Store application.

## Features

- Built with React 18
- Component-based architecture
- Responsive CSS styling
- Category filtering
- Cursor-based pagination
- Error handling and loading states

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Running the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm build
```

## Project Structure

```
src/
├── App.js                 # Main app component with state management
├── App.css
├── index.js              # React entry point
├── index.css             # Global styles
└── components/
    ├── FilterBar.js      # Category filter input
    ├── FilterBar.css
    ├── ProductGrid.js    # Grid layout for products
    ├── ProductGrid.css
    ├── ProductCard.js    # Individual product card
    ├── ProductCard.css
    ├── Pagination.js     # Pagination controls
    └── Pagination.css
```

## Configuration

Make sure the backend is running on `http://localhost:5000` before starting the frontend.

If you need to change the API URL, edit the `API_BASE_URL` constant in `src/App.js`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (irreversible)
