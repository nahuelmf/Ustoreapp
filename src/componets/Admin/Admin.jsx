import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price),
      });
      alert('Producto agregado con éxito!');
      setProduct({ name: '', price: '', description: '', image: '' });
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Hubo un error al agregar el producto.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setProduct(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, 'products', editingId);
      await updateDoc(productRef, {
        ...product,
        price: Number(product.price),
      });
      alert('Producto actualizado con éxito!');
      setEditingId(null);
      setProduct({ name: '', price: '', description: '', image: '' });
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un error al actualizar el producto.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        alert('Producto eliminado con éxito!');
        setProducts(products.filter(item => item.id !== id));
      } catch (error) {
      console.error('Error al eliminar el producto:', error);
        alert('Hubo un error al eliminar el producto.');
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-form-card">
        <h2>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <form onSubmit={editingId ? handleUpdate : handleAdd}>
          <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre" required />
          <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Precio" required />
          <textarea name="description" value={product.description} onChange={handleChange} placeholder="Descripción" required />
          <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="URL de la imagen" required />
          <button type="submit">{editingId ? 'Actualizar Producto' : 'Agregar Producto'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setProduct({ name: '', price: '', description: '', image: '' }); }}>Cancelar</button>}
        </form>
      </div>

      <div className="admin-list-container">
        <h2>Lista de Productos</h2>
        {products.map(item => (
          <div key={item.id} className="admin-item-card">
            <img src={item.image} alt={item.name} />
            <div className="admin-item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="admin-actions">
              <button onClick={() => handleEdit(item)}>Editar</button>
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;