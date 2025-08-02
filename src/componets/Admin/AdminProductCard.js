import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminProductCard({ product, onPause, onDelete, onEdit }) {
  return (
    <div className={`product-card ${product.paused ? 'paused' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
      </Link>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        {product.paused && <span className="paused-badge">Pausado</span>}
      </div>
      <div className="product-actions">
        <button className="admin-button edit-button" onClick={() => onEdit(product)}>Editar</button>
        <button className="admin-button delete-button" onClick={() => onDelete(product.id)}>Eliminar</button>
        <button className="admin-button pause-button" onClick={() => onPause(product.id, product.paused)}>
          {product.paused ? 'Reanudar' : 'Pausar'}
        </button>
      </div>
    </div>
  );
}

export default AdminProductCard;