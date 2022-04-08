const Router = require("express")
const router = new Router()
const {Bank} = require ("../models")

router.post("/", async (req, res) => {
  const {name, loan_interest, max_loan,  min_paymant, loan_term, userId} = req.body
  const bank = await Bank.create({name, loan_interest, max_loan,  min_paymant, loan_term, userId})
  return res.json(bank)
})

router.get("/", async (req, res) => {
  let {userId} = req.query
  let banks
  if (userId) {
    flowers = await Bank.findAll({where: {userId}})
  } else {
    flowers = await Bank.findAll()
  }
  return res.json(banks)
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  const bank = await Bank.findOne({where: {id}}) 
  return res.json(bank)
})

router.put("/:id", async (req, res) => {
  const {id} = req.params
  const {name, loan_interest, max_loan,  min_paymant, loan_term, userId} = req.body
  const bank = await Bank.findOne({where: {id}})
  await bank.update({name, loan_interest, max_loan,  min_paymant, loan_term, userId})
  return res.json(bank)
})

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  await Bank.destroy({where: {id}})
  return res.json({})
})  

module.exports = router