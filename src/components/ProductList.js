import React from 'react';
import ProductCard from './ProductCard';
import config from '../config'; // Import config.js

function ProductList({ onOpenModal }) {
  return (
    <div className="flex flex-wrap justify-center">
      {config.products.map((product) => (
        <ProductCard key={product.id} product={product} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}

export default ProductList;