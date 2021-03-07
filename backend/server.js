const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const itemRouter = require('./routes/item.routes.js');
const userRouter = require('./routes/user.routes.js');

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('APP is running');
});

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan));
