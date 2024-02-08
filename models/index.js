const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Admin = require('./admin')(sequelize, Sequelize);
const Posting = require('./posting')(sequelize, Sequelize);


module.exports = { sequelize, Admin, Posting };
