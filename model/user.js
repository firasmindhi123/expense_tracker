
const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const expense= sequelize.define('asad', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:Sequelize.STRING,
   
    
},
  email: {
    type: Sequelize.STRING,
    unique:true
    
    
  },
  password:{
    type:Sequelize.STRING,
   
  },
  ispremium : Sequelize.BOOLEAN,
  totalExpese:Sequelize.INTEGER
});



module.exports =expense;
