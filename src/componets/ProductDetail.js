import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  const whatsappURL = `https://wa.me/5491159352323?text=Hola!%20Quiero%20comprar%20el%20producto:%20${encodeURIComponent(product.name)}`;

  return (
    
    <div className="product-container">
  <Link to="/" className="link-no-decoration back-link">
    ← Volver
  </Link>

  <div className="content-center">
    <img
      className="app-logo"
      src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo.png?alt=media&token=0731df9e-6863-4cad-870f-ad16bc9d6204"
      alt="imagen"
    />

    <img
      src={product.image}
      alt={product.name}
      className="product-image"
    />

    <h1 className="product-name">{product.name}</h1>

    <p className="product-description">{product.description}</p>

    <p className="product-price">Precio: US${product.price}</p>

    <button
      onClick={() => window.open(whatsappURL, '_blank')}
      className="buy-button"
    >
      Comprar
    </button>
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
};

export default ProductDetail;
