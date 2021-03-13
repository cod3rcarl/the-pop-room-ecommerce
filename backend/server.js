const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const itemRouter = require('./routes/item.routes.js');
const userRouter = require('./routes/user.routes.js');
const orderRouter = require('./routes/order.routes.js');
const uploadRouter = require('./routes/upload.routes.js');
dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
// If using import syntax create function
// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  let root = path.join(__dirname, '..', 'frontend', 'build/');
  app.use(express.static(root));
  app.get('*', (req, res) => res.sendFile('index.html', { root }));
} else {
  app.get('/', (req, res) => {
    res.json('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan));
