import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ product }) => (
  <Link style={{ textDecoration: 'none', display: 'block' }} to={`/product/${product.id}`}>
    <div className="card"   style={{
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '20px',
    width: '200px',
    height: '500px',
    textAlign: 'center',
    boxSizing: 'border-box',
  }}>
      
      <img  
  src={product.image}
  alt={product.name}
  width={180}
  style={{ display: 'block', margin: '0 auto' }}
/>

      <h3 style={{
              padding: '20px',
              textAlign: 'center',
            fontSize:'25px'
            }} className="no-underline">{product.name}</h3>
      <p style={{
              padding: '20px',
              textAlign: 'center',
            fontSize:'20px',
            fontWeight: 'bold',
            color: '#0f9b0f'
            }} className="no-underline">Precio: US${product.price}</p>
    </div>
  </Link>
);

export default ProductCard;
    