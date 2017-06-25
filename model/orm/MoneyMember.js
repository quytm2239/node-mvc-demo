var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var MoneyMember = sequelize.define('MoneyMember', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account: Sequelize.INTEGER, // ref to which account
    fullname: Sequelize.STRING,
    gender: Sequelize.STRING,
    total: Sequelize.STRING // total spent amount
});

// force: true will drop the table if it already exists
MoneyMember.sync({force: false}).then(() => {
});

module.exports = MoneyMember;
