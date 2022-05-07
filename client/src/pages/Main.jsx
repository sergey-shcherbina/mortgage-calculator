import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Form, Card } from "react-bootstrap"
import { Context } from ".."
import { fetchBanks } from "../http/bankAPI"
import { initMonths, years, allMonths, newYear, pd, interest, mp } from "../consts"
import DataTable from "../components/DataTable"

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
  const [fw1, setFw1] = useState(500)
  const [fw2, setFw2] = useState(500)
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [total, setTotal] = useState(0)
  const loan = loanInput.replace(/\s/g, "")
  const monthlyDebt = loan / (term * interval)
  let debt = loan 

  useEffect(() => {
    fetchBanks().then(data => bank.setBanks(data))        
  }, [bank])

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
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Loan amount</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={loanInput.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onFocus={() => { 
                  setShowPay(false)
                  setChecked("")
                }}
                onChange={e => setLoanInput(e.target.value)}
              />
              <div style={{margin: "5px 0 0 5px",fontWeight: 500}}>$ </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={loanInput.replace(/\s/g, "")}
              onFocus={() => { 
                setShowPay(false)
                setChecked("")
              }}
              onChange={e => setLoanInput(e.target.value)}
              min={10000}
              max={1000000} 
              step={10000}
            /> 
          </Form.Group> 
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Interest rate</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={rate}
                onFocus={() => { 
                  setShowPay(false)
                  setChecked("")
                }}
                onChange={e => setRate(e.target.value)}
              />
              <div style={{margin: "5px 0 0 5px", fontWeight: 500}}>% per annum</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={rate}
              onFocus={() => { 
                setShowPay(false)
                setChecked("")
              }}
              onChange={e => setRate(e.target.value)}
              min={.1}
              max={30}
              step={.1}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Loan term</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={term}
                onFocus={() => { 
                  setShowPay(false)
                  setChecked("")
                }}
                onChange={e => setTerm(e.target.value)}
              />
              <div style ={{height: 30}}>
                <Form.Select 
                  style={{width: 120, marginLeft: 15, marginTop: -6, fontWeight: 500}} 
                  value={interval}
                  onFocus={() => { 
                    setShowPay(false)
                    setChecked("")
                  }}
                  onChange={e => setInterval(e.target.value)}
                >
                  <option value={1}>Months</option>
                  <option value={12}>Years</option>
                </Form.Select>
              </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={term}
              onFocus={() => { 
                setShowPay(false)
                setChecked("")
              }}
              onChange={e => setTerm(e.target.value)}
              min={1}
              max={50}
            />
          </Form.Group> 
          <Form.Group> 
            <Form.Label style={{fontWeight: 700}}>Loan repayment scheme</Form.Label>
            <br />
            <Form.Check
              inline
              label="Annuity"
              type="radio"
              checked={checked === "Annuity"}
              onChange={() => {
                setChecked("Annuity")
                setFw1(700)
                setFw2(500)
                setShowPay(true)
                setMonthlyPayment(mp(rate, loan, term, interval, 0))
                setTotal(mp(rate, loan, term, interval, 0) * term * interval)
              }}
              style={{fontWeight: fw1}}
            />
            <Form.Check
              inline
              label="Differentiated"
              type="radio"
              checked={checked === "Differentiated"}
              onChange={() => {
                setChecked("Differentiated")
                setFw1(500)
                setFw2(700)
                setShowPay(true)
                setMonthlyPayment(monthlyDebt + interest(loan, rate))
                setTotal(allMonths(month, term, interval).map((t, i) => t = monthlyDebt + interest(loan - monthlyDebt * i, rate)).reduce((sum, elem) => sum + elem, 0)) 
              }}
              style={{fontWeight: fw2}}
            />
          </Form.Group>   
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-around" style={{fontWeight: "bold", height: 350}}>
          {checked === "Differentiated" ? "Maximum monthly payment" : "Monthly payment"} 
          <Card className="p-2 d-flex justify-content-center"style={{fontSize: 24}}>
            {showPay && monthlyPayment && monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} {showPay ? " $" : "0.00 $"} 
          </Card>
            Overpayment
          <Card className="p-2 d-flex justify-content-center"style={{fontSize: 24}}>
            {showPay && (total - loan).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )} {showPay ? " $" : "0.00 $"}
          </Card>
            Return in total
          <Card className="p-2 d-flex justify-content-center"style={{fontSize: 24}}>
            {showPay && total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " " )} {showPay ? " $" : "0.00 $"}
          </Card>      
          <Form.Group>
            <Form.Label style={{fontWeight: 700, display: "flex", justifyContent: "center"}}>Start of payments</Form.Label>
            <div className="d-flex">
              <Form.Select 
                style={{width: 140, fontWeight: 500}}
                value={month}
                onChange={e => setMonth(e.target.value)}
              >
                {initMonths.map(currentMonth => <option key={currentMonth}>{currentMonth}</option>)}
              </Form.Select>
              <Form.Select 
                style={{width: 100, marginLeft: 20, fontWeight: 500}}
                value={year}
                onChange={e => setYear(e.target.value)}
              >
                {years.map(currentYear => <option key={currentYear}>{currentYear}</option>)}
              </Form.Select>
            </div>
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex flex-column">
          <div style={{fontWeight: 700}}>Banks that meet the loan terms </div>
          <Row style={{maxHeight: 350, overflow: "auto"}}>
          {[...bank.banks].filter(bank => bank.maxLoan - bank.minPayment * bank.maxLoan / 100 > loan && bank.loanInterest <= rate &&
            bank.minLoanTerm * bank.interval <= term * interval && bank.maxLoanTerm * 12 >= term * interval)
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return - 1 
              return 1
            }).map((currentBank, index) =>
            <Row key={currentBank.id} style={{background: index % 2 === 0 ? "transparent" : "whitesmoke", padding: "3px 3px 3px 25px"}}>
              {currentBank.name} (rate - {currentBank.loanInterest}%)
            </Row>
          )}
          </Row>
        </Col>      
      </Row>
      {showPay && <DataTable data={data} total={total} />}
        
    </div>
  )
}

export default Main