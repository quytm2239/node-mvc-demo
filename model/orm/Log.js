var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Log = sequelize.define('Log', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account: Sequelize.INTEGER, // ref to which account
    amount: Sequelize.STRING,
    detail: Sequelize.STRING,
    member: Sequelize.INTEGER // spent for which member (optional-member_id)
});

// force: true will drop the table if it already exists
Log.sync({force: false}).then(() => {
});

module.exports = Log;
