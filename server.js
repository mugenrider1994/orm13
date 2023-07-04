const express = require('express');
const routes = require('./routes');
// import sequelize connection
import Sequelize from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

sequelize.sync({ force: false }) // Use { force: true } to drop tables and re-create them
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







