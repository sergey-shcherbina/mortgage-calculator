const Router = require("express")
const router = new Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../models")
const generateJwt = (id, email, name) => {
  return jwt.sign(
    {id, email, name},
    process.env.SECRET_KEY,
    {expiresIn: '2h'}  
  )
}
router.post("/sign_up", async (req, res) => { 
  const {name, email, password} = req.body
  if (!email) {
    return res.status(404).json({message: "Enter email!"}) 
  }
  if (!password) {
    return res.status(404).json({message: "Enter password!"}) 
  }
  const candidate = await User.findOne({where: {email}})
  if (candidate) {
    return res.status(404).json({message: "User with this email already exists"}) 
  }
  const hashPassword = await bcrypt.hash(password, 5)
  const user = await User.create({name, email, password: hashPassword}) 
  const token = generateJwt(user.id, user.email, user.name)

  return res.json({token})  
}) 

router.post("/sign_in", async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({where: {email}})
  if (!user) {
    return res.status(404).json({message: "User is not found!"})
  }
  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    return res.status(404).json({message: "Invalid password!"})
  }
  const token = generateJwt(user.id, user.email, user.name)
  return res.json({token})
})

router.get("/auth", 
  (req, res, next) => {    
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({message: "User not authorized"})
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
    } catch (err) {
      res.status(401).json({message: "User not authorized"})
    } 
  },
  async (req, res) =>  {
    const token = generateJwt(req.user.id, req.user.email, req.user.name)
    return res.json({token})
  }
) 

module.exports = router
