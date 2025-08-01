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

  if (!product) return <p className="loading-message">Cargando...</p>;

  const whatsappURL = `https://wa.me/5491159352323?text=Hola!%20Quiero%20comprar%20el%20producto:%20${encodeURIComponent(product.name)}`;

  // Nueva función para procesar la descripción.
  const renderDescription = (descriptionText) => {
    // Dividimos la descripción por saltos de línea
    const lines = descriptionText.split('\n');
    let content = [];
    let currentParagraph = '';

    lines.forEach((line, index) => {
      if (line.trim() === '') {
        // Si la línea está vacía, terminamos el párrafo actual
        if (currentParagraph.trim() !== '') {
          content.push(<p key={`p-${index}`}>{currentParagraph}</p>);
          currentParagraph = '';
        }
      } else if (line.endsWith(':')) {
        // Si la línea termina con ":", es un encabezado
        if (currentParagraph.trim() !== '') {
          content.push(<p key={`p-${index}-before`}>{currentParagraph}</p>);
          currentParagraph = '';
        }
        content.push(<h3 key={`h3-${index}`}>{line}</h3>);
      } else {
        // Si no es un encabezado ni una línea vacía, lo agregamos al párrafo
        currentParagraph += line + ' ';
      }
    });

    // Añade el último párrafo si no está vacío
    if (currentParagraph.trim() !== '') {
      content.push(<p key={`p-last`}>{currentParagraph}</p>);
    }

    return content;
  };

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">
        ← Volver
      </Link>
      
      <div className="product-detail-card">
        <img
          className="app-logo"
          src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo.png?alt=media&token=0731df9e-6863-4cad-870f-ad16bc9d6204"
          alt="imagen"
        />
        
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        
        <div className="product-details-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-description">
            {renderDescription(product.description)}
          </div>
          <p className="product-detail-price">Precio: US${product.price}</p>
          
          <button
            onClick={() => window.open(whatsappURL, '_blank')}
            className="buy-button"
          >
            Comprar
          </button>
        </div>
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
};

export default ProductDetail;