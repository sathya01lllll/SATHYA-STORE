import React, { useState, useEffect } from 'react';
import config from './config';
import ProductCard from './components/ProductCard';
import OrderModal from './components/OrderModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null); // Menyimpan produk yang dipilih
  const [showModal, setShowModal] = useState(false); // Menyimpan status modal
  const [searchTerm, setSearchTerm] = useState(''); // Menyimpan nilai pencarian
  const [errorMessage, setErrorMessage] = useState(''); // Menyimpan pesan kesalahan

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true); // Menampilkan modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null); // Menghapus produk yang dipilih saat modal ditutup
  };

  const filteredProducts = config.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm && filteredProducts.length === 0) {
      setErrorMessage('No products found!'); // Set pesan kesalahan jika tidak ada produk
    } else {
      setErrorMessage(''); // Hapus pesan kesalahan jika ada produk
    }
  }, [searchTerm, filteredProducts]);

  return (
    <div className="App">
      <header className="bg-blue-600 text-white text-center p-4">
        <h1 className="text-white text-3xl font-extrabold cursor-pointer">{config.siteName}</h1>
      </header>
      <main className="p-4">
        {/* Form Pencarian */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* Menampilkan pesan kesalahan jika ada */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpenModal={handleOpenModal} />
          ))}
        </div>
      </main>

      {showModal && selectedProduct && ( // Menampilkan modal jika ada produk yang dipilih
        <OrderModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;