import React, { useState, useEffect } from 'react';
import './App.css';
import ProductGrid from './components/ProductGrid';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';

const API_BASE_URL = 'http://localhost:5000/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('');
  const [paginationStack, setPaginationStack] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);

  // Fetch products
  const fetchProducts = async (category = '', cursor = null, cursorId = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = API_BASE_URL;
      const params = new URLSearchParams();

      if (category) {
        params.append('category', category);
      }

      if (cursor && cursorId) {
        params.append('cursor', cursor);
        params.append('cursorId', cursorId);
      }

      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(`Error: ${err.message}. Make sure the backend server is running on http://localhost:5000`);
      console.error('Fetch error:', err);
      return { products: [], nextCursor: null };
    }
  };

  // Initial load
  useEffect(() => {
    const loadInitialProducts = async () => {
      const data = await fetchProducts('');
      setProducts(data.products);
      setNextCursor(data.nextCursor);
      setPaginationStack([]);
      setCurrentPage(0);
    };
    loadInitialProducts();
  }, []);

  // Apply filter
  const handleFilter = async (category) => {
    setCurrentCategory(category);
    setPaginationStack([]);
    setCurrentPage(0);

    const data = await fetchProducts(category);
    setProducts(data.products);
    setNextCursor(data.nextCursor);
  };

  // Next page
  const handleNextPage = async () => {
    const cursor = paginationStack[currentPage]?.cursor || null;
    const cursorId = paginationStack[currentPage]?.cursorId || null;

    const data = await fetchProducts(currentCategory, cursor, cursorId);

    if (data.nextCursor) {
      const newStack = [...paginationStack];
      newStack[currentPage + 1] = {
        cursor: data.nextCursor.createdAt,
        cursorId: data.nextCursor.id,
      };
      setPaginationStack(newStack);
      setCurrentPage(currentPage + 1);
      setProducts(data.products);
      setNextCursor(data.nextCursor);
    }
  };

  // Previous page
  const handlePrevPage = async () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      const prevCursor =
        newPage > 0
          ? {
              cursor: paginationStack[newPage].cursor,
              cursorId: paginationStack[newPage].cursorId,
            }
          : { cursor: null, cursorId: null };

      const data = await fetchProducts(
        currentCategory,
        prevCursor.cursor,
        prevCursor.cursorId
      );

      setCurrentPage(newPage);
      setProducts(data.products);
      setNextCursor(data.nextCursor);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🛍️ Product Store</h1>
        </header>

        <FilterBar onFilter={handleFilter} />

        {error && <div className="error">{error}</div>}

        {loading && <div className="loading">Loading products...</div>}

        {!loading && <ProductGrid products={products} />}

        <Pagination
          currentPage={currentPage}
          hasNextPage={!!nextCursor}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>
    </div>
  );
}

export default App;
