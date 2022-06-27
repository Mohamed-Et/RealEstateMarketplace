const express = require('express');
const app = express();
//db instance
const sequelize = require('./db');
//routes
const clientRoutes = require('./src/routes/clientRoutes');
const venteRoutes = require('./src/routes/venteRoutes');
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
//port
const port = process.env.PORT || 5000;
//MySQL testing connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => console.log(`Server Running on port ${port}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
testConnection();

//routes
app.use('/api/client', clientRoutes);
app.use('/api/vente', venteRoutes);
