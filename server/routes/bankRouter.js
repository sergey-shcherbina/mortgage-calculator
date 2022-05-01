const Router = require("express")
const router = new Router()
const {Bank} = require ("../models")

router.post("/", async (req, res) => {
  const {name, loanInterest, maxLoan,  minPayment, minLoanTerm, maxLoanTerm, interval, userId} = req.body
  const bank = await Bank.create({name,loanInterest, maxLoan,  minPayment, minLoanTerm, maxLoanTerm, interval, userId})
  return res.json(bank)
})
router.get("/", async (req, res) => {
  let {userId} = req.query
  let banks
  if (userId) {
    banks = await Bank.findAll({where: {userId}})
  } else {
    banks = await Bank.findAll()
  }
  return res.json(banks)
})

router.put("/:id", async (req, res) => {
  const {id} = req.params
  const {name, loanInterest, maxLoan,  minPayment, minLoanTerm, maxLoanTerm, interval, userId} = req.body
  const bank = await Bank.findOne({where: {id}})
  await bank.update({name, loanInterest, maxLoan,  minPayment, minLoanTerm, maxLoanTerm, interval, userId})
  return res.json(bank)
})
router.delete("/:id", async (req, res) => {
  const {id} = req.params
  await Bank.destroy({where: {id}})
  return res.json({})
})  

module.exports = router