import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import config from '../config';

function OrderModal({ product, onClose }) {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerMessage, setBuyerMessage] = useState('');

  const handleOrder = () => {
    if (!buyerName || !buyerPhone || !buyerMessage) {
      alert('Please fill all the fields');
      return;
    }

    const whatsappMessage = `Order Details:
      Product: ${product.name}
      Price: ${product.price}
      Description: ${product.description}

      Buyer Information:
      Name: ${buyerName}
      Phone: ${buyerPhone}
      Message: ${buyerMessage}`;

    const whatsappUrl = `https://wa.me/${config.owner}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Variants untuk animasi modal
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } } // Animasi saat modal ditutup
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Order {product.name}</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-2">
          Phone:
          <input
            type="tel"
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter your phone number"
          />
        </label>

        <label className="block mb-4">
          Message:
          <textarea
            value={buyerMessage}
            onChange={(e) => setBuyerMessage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter your message"
          />
        </label>

        <div className="flex justify-between">
          <button
            onClick={handleOrder}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Order via WhatsApp
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderModal;