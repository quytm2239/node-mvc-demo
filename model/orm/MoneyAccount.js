var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var MoneyAccount = sequelize.define('MoneyAccount', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    gender: Sequelize.STRING,
    balance: Sequelize.STRING
});

// force: true will drop the table if it already exists
MoneyAccount.sync({force: false}).then(() => {
});

module.exports = MoneyAccount;
