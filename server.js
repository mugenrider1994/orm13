const express = require('express');
const routes = require('./routes');
const Sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const sequelize = new Sequelize(/* Your database configuration here */);

sequelize
  .sync({ force: false }) // Use { force: true } to drop tables and re-create them
  .then(() => {
    console.log('Sequelize models synced to the database');

    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });