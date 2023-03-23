const fs = require('fs');

const path = 'Productos.json';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readData() || [];
    this.currentId = this.getCurrentId();
  }

  // Lee el archivo en la ruta 'this.path' y retorna los datos en formato JSON
  readData() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
      return null;
    }
  }

  // Guarda los productos en un archivo en la ruta 'this.path'
  saveData() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log(`Archivo guardado en ${this.path}`);
    } catch (error) {
      console.log(`Error al guardar el archivo ${this.path}: ${error}`);
    }
  }

  // Obtiene el último ID utilizado y retorna el siguiente ID disponible
  getCurrentId() {
    const lastProduct = this.products[this.products.length - 1];
    if (lastProduct) {
      return lastProduct.id + 1;
    }
    return 1;
  }

  // Agrega un nuevo producto a la lista de productos
  addProduct(product) {
    product.id = this.currentId++;
    this.products.push(product);
    this.saveData();
    return product.id;
  }

  // Retorna todos los productos de la lista
  getProducts() {
    return this.products;
  }

  // Retorna un producto por su ID o null si no lo encuentra
  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.log(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  // Modifica un producto por su ID y guarda los cambios
  updateProductById(id, updatedProduct) {
    let productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log(`Producto con ID ${id} no encontrado`);
      return false;
    }
    updatedProduct.id = id;
    this.products[productIndex] = updatedProduct;
    this.saveData();
    return true;
  }

  // Elimina un producto por su ID y guarda los cambios
  deleteProductById(id) {
    const filteredProducts = this.products.filter(product => product.id !== id);
    if (filteredProducts.length === this.products.length) {
      console.log(`Producto con ID ${id} no encontrado`);
      return false;
    }
    this.products = filteredProducts;
    this.saveData();
    return true;
  }
}

module.exports = ProductManager;
