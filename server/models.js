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
  loanInterest: {type: DataTypes.FLOAT},
  maxLoan: {type: DataTypes.INTEGER},
  minPayment: {type: DataTypes.INTEGER},
  minLoanTerm: {type: DataTypes.INTEGER},
  maxLoanTerm: {type: DataTypes.INTEGER},
  interval: {type: DataTypes.INTEGER}
})

User.hasMany(Bank)
Bank.belongsTo(User)

module.exports = {
  User,
  Bank
}
//