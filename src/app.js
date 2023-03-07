const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
    const limit = req.query.limit || null;
    const products = ProductManager.getAllProducts(limit);
    res.json({ products });
  });

  app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = ProductManager.getProductById(productId);
    res.json({ product });
  });

  pp.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  module.exports = app;
