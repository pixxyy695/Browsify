import React from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  if (products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
