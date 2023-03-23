const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const exphbs = require('express-handlebars');
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

 
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
pp.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;