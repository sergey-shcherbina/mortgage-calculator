import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Form, Container } from "react-bootstrap"
import { Context } from ".."
import { fetchBanks } from "../http/bankAPI"
import { initMonths, years, allMonths, newYear, pd, interest, mp } from "../consts"
import DataTable from "../components/DataTable"
import FormGroup from "../components/FormGroup"
import BankList from "../components/BankList"
import FormRadio from "../components/FormRadio"
import Payment from "../components/Payment"
import StartPay from "../components/StartPay" 
import LoanTerm from "../components/LoanTerm"

const Calculator = () => {
  const { bank,user } = useContext(Context)
  const [back, setBack] = useState("whitesmoke")
  const [name, setName] = useState("")
  const [loanInput, setLoanInput] = useState("100000")
  const [interval, setInterval] = useState(1)
  const [paymentInput, setPaymentInput] = useState("10000")
  const [term, setTerm ] = useState(12)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [show, setShow] = useState(false)
  const [showMain, setShowMain]= useState(false)
  const [showPay, setShowPay] = useState(false)
  const [checked, setChecked] = useState("")
  const loan = loanInput.replace(/\s/g, "")
  const payment = paymentInput.replace(/\s/g, "")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [total, setTotal] = useState(0)
  const monthlyDebt = (loan - payment) / (term * interval)
  let debt = loan - payment
  
  useEffect(() => {
    fetchBanks(user.user.id).then(data => bank.setBanks(data))         
  }, [user.user.id, bank])

  const focus = () => {
    setShowMain(false)
    setShowPay(false)
    bank.setSelectedBank({})
    setName("")
  }
  const focusTerm = () => {
    setShowPay(false)
    setChecked("")
  }
  const data = Array(allMonths(month, term, interval).length).fill({}).map((newData, i) => { 
    return {...newData, currentMonth: allMonths(month, term, interval)[i], currentYear: newYear(i, year, month, term, interval),
      pd: pd(i, year, month, term, interval), currentPayment: checked === "Annuity" ? monthlyPayment : checked === "Differentiated" && 
      monthlyDebt + interest(loan - payment - monthlyDebt * i, bank.selectedBank.loanInterest), currentInterest: checked === "Annuity" ? 
      interest(debt, bank.selectedBank.loanInterest) : checked === "Differentiated" && interest(loan - payment - monthlyDebt * i, 
      bank.selectedBank.loanInterest), currentDebt: checked === "Annuity" ? monthlyPayment - interest(debt, bank.selectedBank.loanInterest) : 
      checked === "Differentiated" && monthlyDebt, currentRemainder: checked === "Annuity" ? debt -= (monthlyPayment - 
      interest(debt, bank.selectedBank.loanInterest)) : checked === "Differentiated" && (loan - payment) - monthlyDebt * (i + 1)
    }
  })

  return (
    <div className="mb-5">
      <Row className="mt-2">
        <Container style={{fontSize: 20, fontWeight: 700}}>
          Loan request
          <hr style={{margin: 1}} />
        </Container>
        <Col md={4} className="mt-2">
          <FormGroup
            label={"Loan amount"}
            valueInput={loanInput.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            valueRange={loanInput.replace(/\s/g, "")}
            changeValue={e => setLoanInput(e.target.value)}
            min={10000}
            max={1000000} 
            step={10000}
            wc={150}
            focus={focus}
            addForm={"$"}
          /> 
        </Col>
        <Col md={4} className="mt-2">
          <FormGroup 
            label={"Down payment"}
            valueInput={paymentInput.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            valueRange={paymentInput.replace(/\s/g, "")}
            changeValue={e => setPaymentInput(e.target.value)}
            min={10000}
            max={loan / 2} 
            step={5000}
            wc={150}
            focus={focus}
            addForm={`$ or ${(payment / Number(loan.toString().replace(/\s/g, "")) * 100).toFixed(2)} %`}
          />  
        </Col>
        <Col md={4} className="mt-2">
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Choose a bank</Form.Label>
            <Form.Control
              style={{marginTop: -6, fontWeight: 500, background: back}}
              value={name}
              onMouseOver={() => setBack("")}
              onMouseLeave={() => setBack("whitesmoke")}
              onFocus={() => {
                fetchBanks(user.user.id).then(data => bank.setBanks(data)).then(() => setName(""))
                setShow(true)
                setShowMain(false)
                setShowPay(false)
                setChecked("")
              }}
              onBlur={() => {
                setShow(false)
                bank.selectedBank.name && setShowMain(true) 
              }}
              onChange={e => {
                setName(e.target.value)
                bank.setBanks([...bank.banks].filter(bank => bank.name.indexOf(name) !== -1))
              }}
            />    
          </Form.Group>    
        </Col>
        {show && <BankList loan={loan} payment={payment} changeName={(n) => setName(n)} />}
      </Row>
      {showMain &&
        <Row className="mt-2">
          <div style={{fontSize: 20, fontWeight: 700}}>
            {bank.selectedBank.name} is capable of giving a requested loan at {bank.selectedBank.loanInterest} % per annum
          </div>
          <hr style={{margin: 1}} />
          <Col md={4} className="mt-2">
          <LoanTerm 
            label={showMain && 
              <div className="d-flex"> Loan term 
                <div className="d-flex" style={{fontWeight: 500, fontSize: 14, margin: "2px 0 0 4px"}}>(
                  <div style={{color: "red"}}>
                    from {bank.selectedBank.minLoanTerm} {bank.selectedBank.interval === 12 ? "month" : "years"} to {bank.selectedBank.maxLoanTerm} years
                  </div>)
                </div>
              </div>
            }
            valueInput={term}
            valueRange={term}
            valueInterval={interval}
            changeValue={e => setTerm(e.target.value)}
            changeInterval={e => setInterval(e.target.value)}
            min={1}
            max={bank.selectedBank.maxLoanTerm}
            wc={90}
            focus={focusTerm}
          />
          </Col>
          <Col md={4} className="mt-2">
          <FormRadio 
            checked={checked}
            annuity={() => {
              setChecked("Annuity")
              setShowPay(true)
              setMonthlyPayment(mp(bank.selectedBank.loanInterest, loan, term, interval, payment))
              setTotal(mp(bank.selectedBank.loanInterest, loan, term, interval, payment) * term * interval)  
            }}
            differentiated={() => {
              setChecked("Differentiated")
              setShowPay(true)
              setMonthlyPayment(monthlyDebt + interest(loan - payment, bank.selectedBank.loanInterest))
              setTotal(allMonths(month, term, interval).map((t, i) => t = monthlyDebt + interest(loan - payment -
              monthlyDebt * i  , bank.selectedBank.loanInterest)).reduce((sum, elem) => sum + elem, 0))
            }}
          />
          </Col>
          <Col md={4} className="mt-2">
          <StartPay 
            month={month}
            year={year}
            changeMonth={e => setMonth(e.target.value)}
            changeYear={e => setYear(e.target.value)}
            initMonths={initMonths}
            years={years}
          />
          </Col>
        </Row>
      } 
      {showPay &&
        <>
          <div className="mt-2 mb-1" style={{fontSize: 20, fontWeight: 700}}>Payments</div>
          <hr style={{margin: 1}} />
          <Row>
            <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
            <Payment 
              title={checked === "Differentiated" ? "Maximum monthly payment" : "Monthly payment"} 
              value={showPay && monthlyPayment && monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              addition={" $"}
            />
            </Col>
            <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
              <Payment
                title={"Overpayment"} 
                value={showPay && (total - (loan - payment)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )}
                addition={" $"}
              />
            </Col>
            <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
            <Payment 
              title={"Return in total"} 
              value={showPay && total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )}
              addition={" $"}
            />
            </Col>
          </Row>
          <DataTable data={data} total={total} /> 
        </>
      }     
    </div>
  )
}

export default Calculator 