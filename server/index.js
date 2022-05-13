require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models")
const cors = require("cors")

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/user", require("./routes/userRouter"))
app.use("/api/bank", require("./routes/bankRouter"))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

start()
