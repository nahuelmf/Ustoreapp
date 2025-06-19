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
    
    <div> 
      <Link to="/" className="link-no-decoration" >← Volver a la tienda</Link>
      <img className="App-logo" src="https://firebasestorage.googleapis.com/v0/b/pichuninuni.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo.png?alt=media&token=0731df9e-6863-4cad-870f-ad16bc9d6204" alt='imagen'/>
      <br></br>
      <img src={product.image} alt={product.name} style={{
              border: '2px solid #ccc',
              padding: '20px',
              width: '500px',
              textAlign: 'center',
              marginLeft: '35%'
            }}/>
      <h1 style={{
              padding: '20px',
              width: '500px',
              textAlign: 'center',
              marginLeft: '35%'
            }}>{product.name}</h1>
      <p style={{
              border: '2px solid #ccc',
              padding: '20px',
              width: '500px',
              textAlign: 'center',
              marginLeft: '35%'
            }}>{product.description}  </p>
      <p style={{
              border: '2px solid #ccc',
              padding: '20px',
              width: '500px',
              textAlign: 'center',
              marginLeft: '35%',
            fontSize:'40px'
            }}>Precio: ${product.price}</p>
      <button onClick={() => window.open(whatsappURL, '_blank')} style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#25D366',
                padding: '10px 15px',
                width: '200px',
                borderRadius: '5px',
                display: 'inline-block',
                marginTop: '10px',
                textAlign: 'center',
                marginLeft: '47%'
              }}>
        Comprar 
      </button>
      <br></br>
    </div>
  );
};

export default ProductDetail;
