import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard';
import './ProductList.css';
//import { FaInstagram } from 'react-icons/fa';



  const phoneNumber = '5491159352323'; 
  const message = 'Hola, quiero más información!';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;



function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div>
  {/* ENCABEZADO centrado */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
    <img
      className="App-logo"
      src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo.png?alt=media&token=0731df9e-6863-4cad-870f-ad16bc9d6204"
      alt="imagen"
      style={{  height: 'auto', marginBottom: '20px' }}
    />

    <input
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        borderRadius: '10px',
        backgroundColor: 'rgb(187, 187, 187)',
        padding: '10px 20px',
        width: '80%',
        maxWidth: '400px',
        textAlign: 'center',
      }}
      type="text"
      placeholder="Buscar producto"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow-md flex items-start gap-3 max-w-3xl mx-auto mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
      <div style={{  height: 'auto', marginBottom: '20px' }}>
        <h2 className="font-semibold text-lg">¡Nuevos productos importados!</h2>
        <p className="text-sm">
          Explora nuestra selección exclusiva de productos importados. Calidad garantizada, stock limitado y envíos rápidos.
        </p>
      </div>
    </div>

  {/* PRODUCTOS en cuadrícula */}
  <div
    className="product-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      padding: '40px',
      fontFamily: 'Arial',
    }}
  >
{[...filtered]
  .sort((a, b) => a.name.localeCompare(b.name)) // Reemplazá 'name' con el campo correcto si es distinto
  .map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
  </div>

  {/* BOTÓN WHATSAPP FLOTANTE */}
<a
  href={whatsappURL}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    animation: 'pulse 1.2s infinite',
  }}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
    alt="WhatsApp"
    style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
    }}
  />
</a>

<style>
{`
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
`}
</style>




  {/* CUADRO DE MEDIOS DE PAGO */}
<div
  style={{
    margin: '40px auto',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#f9f9f9',
    border: '2px solid #ccc',
    borderRadius: '10px',
    fontFamily: 'Arial',
    textAlign: 'center',
    lineHeight: '1.6',
  }}
>
    <img
      className="App-logo"
      src="https://cdn-icons-png.flaticon.com/512/2036/2036896.png"
      alt="imagen"
      style={{  height: '100px', marginBottom: '20px' }}
    />
  
  <h2 style={{ marginBottom: '10px' }}>Medios de pago</h2>
  <p style={{ margin: 0 }}>
    • Efectivo contra entrega<br />
  </p>
</div>
<div
  style={{
    margin: '40px auto',
    padding: '20px',
    maxWidth: '500px',
    fontFamily: 'Arial',
    textAlign: 'center',
    lineHeight: '1.6',
  }}
>
  <a
    href="https://www.instagram.com/Ustore.import/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <img
      src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/instagram.png?alt=media&token=d3ad52b0-af8d-47cb-b0ec-65e99f2ef38c"
      alt="Instagram"
      style={{ width: '60px', height: '60px', marginBottom: '8px' }}
    />
    Seguinos en Instagram!
  </a>
</div>



</div>

  );
}

export default ProductList;
