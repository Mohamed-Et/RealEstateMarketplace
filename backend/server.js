const express = require('express');
const app = express();
//db instance
const sequelize = require('./db');
//routes
const clientRoutes = require('./src/routes/clientRoutes');
const venteRoutes = require('./src/routes/venteRoutes');
const produitRoutes = require('./src/routes/produitRoutes');
const vendeurProduitRoutes = require('./src/routes/vendeurProduitRoutes');
const associerRoutes = require('./src/routes/associerRoutes');
const recetteRoutes = require('./src/routes/recetteRoutes');
const versementRoutes = require('./src/routes/versementRoutes');
const consistanceRoutes = require('./src/routes/consistanceRoutes');
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
app.use('/api/produit', produitRoutes);
app.use('/api/vendeurP', vendeurProduitRoutes);
app.use('/api/associer', associerRoutes);
app.use('/api/recette', recetteRoutes);
app.use('/api/versement', versementRoutes);
app.use('/api/consistance', consistanceRoutes);
