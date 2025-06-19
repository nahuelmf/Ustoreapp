import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ProductCard = ({ product }) => (
  <Link to={`/product/${product.id}`}>
    <div className="card" style={{   border: '2px solid #ccc',
              padding: '100px',
              width: '200px',
              textAlign: 'center',
            }}>
      
      <img src={product.image} alt={product.name} width={180}/>
      <h3 className="no-underline">{product.name}</h3>
      <p className="no-underline">Precio: ${product.price}</p>
    </div>
    <br></br>
  </Link>
);

export default ProductCard;
    