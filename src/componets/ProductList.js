import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard';
import './styles.css';

const phoneNumber = '5491159352323';
const message = 'Hola, quiero más información!';
const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para la página actual
  const [productsPerPage] = useState(8); // Nuevo estado para productos por página, ajustado a 8

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  // Filtramos los productos según la búsqueda del usuario
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  // Ordenamos los productos filtrados
  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedAndFiltered.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* ENCABEZADO centrado */}
      <div className="header-container">
        <img
          className="App-logo"
          src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo.png?alt=media&token=0731df9e-6863-4cad-870f-ad16bc9d6204"
          alt="imagen"
        />
        <input
          className="search-input"
          type="text"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="info-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Producto importado"
          className="info-card-image"
        />
        <div className="info-card-text">
          <h2 className="info-card-title">¡Nuevos productos importados!</h2>
          <p className="info-card-description">
            Explora nuestra selección exclusiva de productos importados. <strong>Calidad garantizada</strong>, stock limitado y <strong>envíos rápidos</strong>.
          </p>
        </div>
      </div>

      {/* BOTONES DE ORDENAMIENTO */}
      <div className="sort-buttons-container">
        <button
          onClick={() => setSortBy('name')}
          className={`sort-button ${sortBy === 'name' ? 'active-name' : ''}`}
        >
          Orden alfabético
        </button>
        <button
          onClick={() => setSortBy('price-asc')}
          className={`sort-button ${sortBy === 'price-asc' ? 'active-asc' : ''}`}
        >
          Precio: menor a mayor
        </button>
        <button
          onClick={() => setSortBy('price-desc')}
          className={`sort-button ${sortBy === 'price-desc' ? 'active-desc' : ''}`}
        >
          Precio: mayor a menor
        </button>
      </div>

      {/* PRODUCTOS en cuadrícula */}
      {filtered.length === 0 ? (
        <div className="no-products-found-message">
          <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" alt="No products found" className="no-products-found-icon" />
          <p>Lo sentimos, no se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Botones de paginación */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-number-button ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
      
      {/* CUADRO DE MEDIOS DE PAGO */}
      <div className="payment-options">
        <img
          className="payment-icon"
          src="https://cdn-icons-png.flaticon.com/512/2036/2036896.png"
          alt="imagen"
        />
        <h2 className="payment-title">Medios de pago</h2>
        <p className="payment-text">
          • Efectivo contra entrega<br />
        </p>
      </div>

      <div className="instagram-link-container">
        <a
          href="https://www.instagram.com/Ustore.import/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/instagram.png?alt=media&token=d3ad52b0-af8d-47cb-b0ec-65e99f2ef38c"
            alt="Instagram"
            className="instagram-icon"
          />
          Seguinos en Instagram!
        </a>
      </div>
    </div>
  );
}

export default ProductList;
