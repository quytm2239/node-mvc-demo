var Sequelize = require('sequelize');

const sequelize = new Sequelize('d3req1cv408t06', 'lcrzlfpkqyuezy', '61aa25d46f82cb21ae2a737a79a3e4671e6ba623c46a7032e099d48eea311e30', {
  host: 'ec2-23-21-220-48.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgresql',
  logging: false,
  pool: {
    max: 100, // max pool size, concurrency connection
    min: 0,
    idle: 10000 // will close after 10000 miliseconds if not being used
  },

});

// test connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to ' + sequelize.config.host + ':' + sequelize.config.port + ' has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;
