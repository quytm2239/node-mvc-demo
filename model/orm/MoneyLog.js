var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var MoneyLog = sequelize.define('MoneyLog', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account: Sequelize.INTEGER, // ref to which account
    amount: Sequelize.STRING,
    detail: Sequelize.STRING,
    members: Sequelize.INTEGER // spent for which member (optional-member_id)
});

// force: true will drop the table if it already exists
MoneyLog.sync({force: true}).then(() => {
});

module.exports = MoneyLog;
