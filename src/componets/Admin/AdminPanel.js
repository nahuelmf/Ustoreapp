import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AdminProductCard from './AdminProductCard'; 
import ProductForm from './ProductForm'; 
import './Admin.css'; 

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'products'));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePause = async (productId, currentStatus) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      paused: !currentStatus
    });
    alert(`Producto ${currentStatus ? 'reanudado' : 'pausado'} con éxito.`);
    fetchProducts();
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await deleteDoc(doc(db, 'products', productId));
      alert('Producto eliminado con éxito.');
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const handleCloseEdit = () => {
    setProductToEdit(null);
  };

  if (loading) {
    return <div>Cargando productos del panel de administración...</div>;
  }

  // Filtramos los productos por categoría.
  const homeProducts = products.filter(product => product.category === 'Hogar');
  const electronicProducts = products.filter(product => product.category === 'Electrónica');
  const uncategorizedProducts = products.filter(product => !product.category);

  return (
    <div className="admin-panel-container">
      <h1>Panel de Administración</h1>
      <p>Aquí puedes gestionar tus productos: pausarlos, reanudarlos, editarlos o eliminarlos.</p>
      
      <h2>Agregar Nuevo Producto</h2>
      <ProductForm 
        onClose={() => {}}
        onProductSaved={fetchProducts}
      />

      {/* Sección para productos de Electrónica */}
      <h3>Productos de Electrónica</h3>
      <div className="product-grid">
        {electronicProducts.length > 0 ? (
          electronicProducts.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onPause={handlePause}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No hay productos de electrónica disponibles.</p>
        )}
      </div>

      {/* Sección para productos de Hogar */}
      <h3>Productos de Hogar</h3>
      <div className="product-grid">
        {homeProducts.length > 0 ? (
          homeProducts.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onPause={handlePause}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No hay productos de hogar disponibles.</p>
        )}
      </div>

      {/* Sección para productos sin categoría */}
      <h3>Productos sin Categoría</h3>
      <div className="product-grid">
        {uncategorizedProducts.length > 0 ? (
          uncategorizedProducts.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onPause={handlePause}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>Todos los productos tienen una categoría asignada.</p>
        )}
      </div>
      
      {productToEdit && (
        <ProductForm 
          productToEdit={productToEdit}
          onClose={handleCloseEdit}
          onProductSaved={fetchProducts}
        />
      )}
    </div>
  );
}

export default AdminPanel;