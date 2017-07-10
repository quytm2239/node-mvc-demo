var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Location = sequelize.define('Location', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
});

// force: true will drop the table if it already exists
Location.sync({force: false}).then(() => {
});

module.exports = Location;
