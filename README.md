# Ustore (Tienda de Productos)

¡Bienvenido a Ustore! Esta es una aplicación de demostración construida con React que simula una tienda en línea. Permite a los usuarios explorar productos, filtrarlos por categoría y ordenar los precios. También cuenta con un panel de administración para gestionar el inventario.

## Características Principales

### 1. Interfaz de Usuario
- **Productos en cuadrícula**: La página principal muestra los productos en una cuadrícula con imágenes, nombres y precios.
- **Filtrado por categoría**: Los usuarios pueden ver productos de "Electrónica" o "Hogar" de forma independiente.
- **Ordenamiento de precios**: Los productos se pueden ordenar por nombre (alfabético) o por precio (menor a mayor y viceversa).
- **Detalle del producto**: Al hacer clic en un producto, se accede a una vista detallada con información específica y una opción para comprar a través de WhatsApp.
- **Formato de precios dinámico**: Los precios se muestran en `US$` para productos de "Electrónica" y en `$AR` para productos de "Hogar", con el formato de moneda correcto.

### 2. Panel de Administración
- **Vista de productos**: El panel de administración muestra todos los productos, incluyendo los que están pausados.
- **Gestión de productos**: Se pueden agregar, editar, eliminar y pausar productos.
- **Validación de categorías**: El panel agrupa los productos por categorías y muestra aquellos que no tienen una categoría asignada.
- **Estilos consistentes**: El panel de administración tiene un diseño limpio y funcional, con tarjetas de tamaño uniforme y mensajes estilizados para facilitar la gestión.

## Tecnologías Utilizadas
- **Frontend**: React.js
- **Base de Datos**: Google Firebase (Firestore)
- **Estilos**: CSS puro

## Cómo Instalar y Ejecutar el Proyecto

1.  **Clonar el repositorio**:
    ```bash
    git clone 
    cd ustore-app
    ```
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Configuración de Firebase**:
    -   Crea un nuevo proyecto en Firebase Console.
    -   Copia tu configuración (apiKey, authDomain, etc.).
    -   Crea un archivo llamado `firebase.js` en la carpeta `src/`.
    -   Pega tu configuración de Firebase en este archivo.
4.  **Ejecutar la aplicación**:
    ```bash
    npm start
    ```
    La aplicación se abrirá en `http://localhost:3000`.
