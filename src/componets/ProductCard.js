// ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Usaremos este archivo para los estilos

const ProductCard = ({ product }) => (
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
        <p className="product-price">Precio: US${product.price}</p>
      </div>
    </div>
  </Link>
);

export default ProductCard;