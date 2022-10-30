const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chatmessage = sequelize.define('chatmessage', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message:{
  type : Sequelize.STRING,
   }
});

module.exports = Chatmessage;