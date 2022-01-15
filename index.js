const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./src/configs/db.js');

require('dotenv').config();
require('express-async-errors');

const errorHandler = require('./src/middlewares/errorHandlerMiddleware.js');

// Console colors package
require('colors');

const userRoutes = require('./src/routes/userRoutes.js');
const postRoutes = require('./src/routes/postRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

// General Middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);

// Error Handling middlewares
app.use('*', (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, msg: 'URL path not found' });
});

app.use(errorHandler);

// Connect DB method
connectDB()
  .then(() => {
    console.log('DB Connected successfully!'.yellow.bold.underline);
    // starting the server when db connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}...`.cyan.bold.underline);
    });
  })
  .catch((err) => {
    console.log(err);
  });
