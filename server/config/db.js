const sequelize = require('sequelize');

const model = new sequelize('simplyfy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

model.authenticate().then(() => {
  console.log('Connection  successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

module.exports = model;