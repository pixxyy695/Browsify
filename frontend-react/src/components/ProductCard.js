import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <span className="price">${product.price.toFixed(2)}</span>
      </div>
      <div className="product-date">
        {new Date(product.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default ProductCard;
