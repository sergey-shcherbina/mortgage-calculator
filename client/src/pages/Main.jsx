import React, { useContext, useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { Context } from ".."
import { fetchBanks } from "../http/bankAPI"
import { initMonths, years, allMonths, newYear, pd, interest, mp } from "../consts"
import DataTable from "../components/DataTable"
import FormGroup from "../components/FormGroup"
import FormRadio from "../components/FormRadio"
import Payment from "../components/Payment"
import StartPay from "../components/StartPay"
import BankBar from "../components/BankBar"
import LoanTerm from "../components/LoanTerm"

const Main = () => {
  const { bank } = useContext(Context)
  const [loanInput, setLoanInput] = useState("100000")
  const [rate, setRate] = useState(0.1)
  const [term, setTerm ] = useState(12)
  const [interval, setInterval] = useState(1)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [showPay, setShowPay] = useState(false)
  const [checked, setChecked] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [total, setTotal] = useState(0)
  const loan = loanInput.replace(/\s/g, "")
  const monthlyDebt = loan / (term * interval)
  let debt = loan 

  useEffect(() => {
    fetchBanks().then(data => bank.setBanks(data))        
  }, [bank])

  const focus = () => {
    setShowPay(false)
    setChecked("")
  }
  const addition = show => show ? " $" : "0.00 $"
  const data = Array(allMonths(month, term, interval).length).fill({}).map((newData, i) => { 
    return {...newData, currentMonth: allMonths(month, term, interval)[i], currentYear: newYear(i, year, month, term, interval),
      pd: pd(i, year, month, term, interval), currentPayment: checked === "Annuity" ? monthlyPayment : checked === "Differentiated" && 
      monthlyDebt + interest(loan - monthlyDebt * i, rate), currentInterest: checked === "Annuity" ? 
      interest(debt, rate) : checked === "Differentiated" && interest(loan - monthlyDebt * i, 
      rate), currentDebt: checked === "Annuity" ? monthlyPayment - interest(debt, rate) : 
      checked === "Differentiated" && monthlyDebt, currentRemainder: checked === "Annuity" ? debt -= (monthlyPayment - 
      interest(debt, rate)) : checked === "Differentiated" && loan - monthlyDebt * (i + 1)
    }
  })
  
  return (
    <div className="mb-5">
      <div className="mt-3 d-flex justify-content-center"><h1>Mortgage calculator</h1></div>
      <hr style={{margin: 1}} />
      On this page, you can see mortgage payments and the banks available in the general database 
      that are ready to issue a loan under the entered conditions.
      <br />
      In order to create, edit banks and set up personal mortgage options, you need to register.
      <hr style={{margin: 1}} />
      <Row className="mt-3">
        <Col md={4}>
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
          <FormGroup
            label={"Interest rate"}
            valueInput={rate}
            valueRange={rate}
            changeValue={e => setRate(e.target.value)}
            min={.1}
            max={30}
            step={.1}
            wc={90}
            focus={focus}
            addForm={"% per annum"}
          />   
          <LoanTerm 
            label={"Loan term"}
            valueInput={term}
            valueRange={term}
            valueInterval={interval}
            changeValue={e => setTerm(e.target.value)}
            changeInterval={e => setInterval(e.target.value)}
            min={1}
            max={50}
            wc={90}
            focus={focus}
          />
          <FormRadio 
            checked={checked}
            annuity={() => {
              setChecked("Annuity")
              setShowPay(true)
              setMonthlyPayment(mp(rate, loan, term, interval, 0))
              setTotal(mp(rate, loan, term, interval, 0) * term * interval)  
            }}
            differentiated={() => {
              setChecked("Differentiated")
              setShowPay(true)
              setMonthlyPayment(monthlyDebt + interest(loan, rate))
              setTotal(allMonths(month, term, interval).map((t, i) => 
                t = monthlyDebt + interest(loan - monthlyDebt * i, rate)).reduce((sum, elem) => sum + elem, 0))
            }}
          />
        </Col> 
        <Col md={4} className="d-flex flex-column align-items-center justify-content-around" style={{fontWeight: "bold", height: 350}}>
          <Payment 
            title={checked === "Differentiated" ? "Maximum monthly payment" : "Monthly payment"} 
            value={showPay && monthlyPayment && monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            addition={addition(showPay)}
          />
          <Payment 
            title={"Overpayment"} 
            value={showPay && (total - loan).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )}
            addition={addition(showPay)}
          />
          <Payment 
            title={"Return in total"} 
            value={showPay && total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )}
            addition={addition(showPay)}
          />
          <StartPay 
            month={month}
            year={year}
            changeMonth={e => setMonth(e.target.value)}
            changeYear={e => setYear(e.target.value)}
            initMonths={initMonths}
            years={years}
            justify={"center"}
          />
        </Col> 
        <Col md={4} className="d-flex flex-column">
          <BankBar loan={loan} rate={rate} term={term} interval={interval} />
        </Col>      
      </Row>    
      {showPay && <DataTable data={data} total={total} />}
    </div>
  )
}

export default Main