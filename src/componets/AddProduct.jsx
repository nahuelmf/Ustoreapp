import { useState } from 'react';
import { db } from '../firebase/firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: productName,
        price: productPrice,
        // Agrega aquí los demás campos
      });
      console.log('Producto agregado con el ID: ', docRef.id);
      // Limpia el formulario
      setProductName('');
      setProductPrice(0);
    } catch (e) {
      console.error('Error al agregar el producto: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="Nombre del producto" 
      />
      <input 
        type="number" 
        value={productPrice} 
        onChange={(e) => setProductPrice(Number(e.target.value))} 
        placeholder="Precio"
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;