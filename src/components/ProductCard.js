import React from 'react';
import {
  motion
} from 'framer-motion'; // Import framer-motion
import config from '../config';

function ProductCard( {
  product, onOpenModal
}) {
  // Variants untuk animasi kartu produk
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    clicked: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    } // Efek saat kartu diklik
  };
  
  const prod = config.products;

  return (
    <motion.div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap="clicked" // Efek saat diklik
      >
      <img className="w-full" src={prod.image} alt={prod.name} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">
        {prod.name}
      </div>
      <p className="text-gray-700 text-base">
        {prod.description}
      </p>
      <div className="flex justify-left mt-4">
        <span className="inline-block bg-gray-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-full">
          {prod.price}
        </span>
      </div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={(e) => {
          e.stopPropagation(); // Mencegah event click propagasi ke kartu
          onOpenModal(product);
        }}
        >
        Order Now
      </button>
    </div>
  </motion.div>
);
}

export default ProductCard;