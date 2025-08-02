import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Asegúrate de que esta ruta sea correcta
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import './Admin.css';

function ProductForm({ productToEdit, onClose, onProductSaved }) {
  const initialState = React.useMemo(() => ({
    name: '',
    price: '',
    category: '',
    image: '', 
    description: '',
    paused: false,
  }), []);

const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData(initialState);
    }
  }, [productToEdit, initialState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (productToEdit) {
        const productRef = doc(db, 'products', productToEdit.id);
        await updateDoc(productRef, formData);
        alert('Producto actualizado con éxito!');
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          price: parseFloat(formData.price),
        });
        alert('Producto agregado con éxito!');
        setFormData(initialState);
      }
      onProductSaved();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Hubo un error al guardar el producto.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
      </div>
      
      <div className="form-group">
        <label>Precio:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-control" />
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="form-control" 
          required 
        >
          <option value="">Selecciona una categoría</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Hogar">Hogar</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>URL de la Imagen:</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} required className="form-control" />
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="form-control form-control-textarea"
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading} className="admin-button primary-button">
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        {productToEdit && <button type="button" onClick={onClose} className="admin-button secondary-button">Cancelar</button>}
      </div>
    </form>
  );

  return productToEdit ? (
    <div className="product-form-overlay">
      {formContent}
    </div>
  ) : (
    formContent
  );
}

export default ProductForm;