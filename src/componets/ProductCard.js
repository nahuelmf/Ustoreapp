
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const ProductCard = ({ product }) => {
  // No renderiza el producto si está pausado
  if (product.paused) {
    return null;
  }

  // Lógica para determinar el símbolo de moneda y el formato
  const isHogar = product.category === 'Hogar';
  const currencySymbol = isHogar ? '$' : 'U$';

  // Función para formatear el precio
  const formatPrice = (price) => {
    if (isHogar) {
      // Formatea el número para el idioma 'es-AR' (español de Argentina)
      // Esto añadirá separadores de miles y el símbolo de moneda
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, // No mostrar decimales
        maximumFractionDigits: 0,
      }).format(price);
    }
    // Si no es "Hogar", simplemente devuelve el precio sin formato especial
    return `${currencySymbol}${price}`;
  };

  return (
    <Link className="product-card-link" to={`/product/${product.id}`}>
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {/* Llamamos a la función formatPrice para mostrar el precio */}
          <p className="product-price">Precio: {formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;