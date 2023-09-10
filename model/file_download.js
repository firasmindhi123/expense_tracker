const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const file_download = sequelize.define('file', {
  
  path:Sequelize.STRING
})

module.exports =file_download;
