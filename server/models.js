const sequelize = require("./db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING}, 
})
const Bank = sequelize.define("bank", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  loan_interest: {type: DataTypes.FLOAT},
  max_loan: {type: DataTypes.INTEGER},
  min_paymant: {type: DataTypes.INTEGER},
  loan_term: {type: DataTypes.INTEGER}
})

User.hasMany(Bank)
Bank.belongsTo(User)

module.exports = {
  User,
  Bank
}