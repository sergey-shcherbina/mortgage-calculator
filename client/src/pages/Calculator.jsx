import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Table, Form, ListGroup, Container } from "react-bootstrap"
import { Context } from ".."
import { fetchBanks } from "../http/bankAPI"

const Calculator = () => {
  const { bank,user } = useContext(Context)
  const [loan, setLoan] = useState("100000")
  const [payment, setPayment] = useState("10000")
  const [name, setName] = useState("")
  const [term, setTerm ] = useState(12)
  const [interval, setInterval] = useState(1)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [show, setShow] = useState(false)
  const [showMain, setShowMain]= useState(false)
  const [showPay, setShowPay] = useState(false)
  const [checked, setChecked] = useState("")
  const [fw1, setFw1] = useState(500)
  const [fw2, setFw2] = useState(500)

  useEffect(() => {
    fetchBanks(user.user.id).then(data => bank.setBanks(data))        
  }, [user.user.id, bank])

  const normalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const initMonths = [...normalMonths].slice(new Date().getMonth()).concat([...normalMonths].splice(0, new Date().getMonth()))
  const months = month ? [...initMonths].slice([...initMonths].indexOf(month)).concat([...initMonths].splice(0, [...initMonths].indexOf(month))) : initMonths
  const allMonths = Array(Math.floor(term * interval / 12)).fill(months).flat().concat(...months.slice(0, (term * interval % 12)))
  const years = Array(5).fill(new Date().getFullYear()).map((curYear, i) => curYear + i)

  const newYear = (i, year) => Number(year) + Math.ceil((i - allMonths.indexOf("January") + 1) / 12)
  const pd = (i, year) => new Date(newYear(i, year), normalMonths.indexOf(allMonths[i]) + 1, 0).getDate()
  const interest = (debt) => bank.selectedBank.loanInterest / 100 / 12 * debt

  let monthlyPayment = bank.selectedBank.loanInterest / 12 / 100 * (1 + bank.selectedBank.loanInterest / 12 / 100) ** (
    term * interval) / ((1 + bank.selectedBank.loanInterest / 12 / 100) ** (term * interval) - 1) * (loan - payment), 
    debt = loan - payment, monthlyDebt = (loan - payment) / (term * interval), 
    total = monthlyPayment * term * interval, data
  if (checked === "Annuity") 
    data = allMonths.map((d, i) => d = {currentMonth: d, currentYear: newYear(i, year), pd: pd(i, year), currentPayment: monthlyPayment, currentInterest: 
      interest(debt), currentDebt: monthlyPayment - interest(debt), currentRemainder: debt -= (monthlyPayment - interest(debt))})
  if (checked === "Differentiated") {
    total = 0
    data = allMonths.map((d, i) => d = {currentMonth: d, currentYear: newYear(i, year), pd: pd(i, year), currentPayment: monthlyDebt + interest(loan - payment - monthlyDebt * i), currentInterest:
      interest(loan - payment - monthlyDebt * i), currentDebt: monthlyDebt, currentRemainder:(loan - payment) - monthlyDebt * (i + 1), currentTotal: total += monthlyDebt + interest(loan - payment - monthlyDebt * i)})
    monthlyPayment = data[0].currentPayment
  }   

  return (
    <div className="mb-5">
      <Row className="mt-2">
        <Container style={{fontSize: 20, fontWeight: 700}}>
          Loan request
          <hr style={{margin: 1}} />
        </Container>
        <Col md={4} className="mt-2">
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Initial loan</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={loan.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => setLoan(e.target.value)}
                onFocus={() => {
                  setShowMain(false)
                  setShowPay(false)
                  bank.setSelectedBank({})
                  setName("")
                }}
              />
              <div style={{margin: "5px 0 0 5px",fontWeight: 500}}>$ </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={loan.replace(/\s/g, "")}
              onChange={e => setLoan(e.target.value)}
              onFocus={() => {
                setShowMain(false)
                setShowPay(false)
                bank.setSelectedBank({})
                setName("")
              }}
              min={100000}
              max={1000000} 
              step={1000}
            />  
            </Form.Group>
          </Col>
        <Col md={4} className="mt-2">
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Down payment</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={payment.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => setPayment(e.target.value)}
                onFocus={() => {
                  setShowMain(false)
                  setShowPay(false)
                  bank.setSelectedBank({})
                  setName("")
                }}
              />
              <div style={{margin: "5px 0 0 5px",fontWeight: 500}}>$ or {(payment / Number(loan.toString().replace(/\s/g, "")) * 100).toFixed(2)} %</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={payment.replace(/\s/g, "")}
              onChange={e => setPayment(e.target.value)}
              onFocus={() => {
                setShowMain(false)
                setShowPay(false)
                bank.setSelectedBank({})
                setName("")
              }}
              min={10000}
              max={loan} 
              step={1000}
            />  
            </Form.Group>
        </Col>
        <Col md={4} className="mt-2">
            <Form.Group>
              <Form.Label style={{fontWeight: 700}}>Choose a bank</Form.Label>
              <Form.Control
                style={{marginTop: -6, fontWeight: 500}}
                value={name}
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
        {show &&
          <ListGroup style={{marginTop: -30}}>
            {[...bank.banks].filter(bank => bank.minPayment < payment / loan * 100 && bank.maxLoan > loan)
              .map(currentBank =>
              <ListGroup.Item key={currentBank.id}
                className="d-flex justify-content-end"
                style={{cursor: "pointer", marginLeft: "auto"}}
                active={currentBank.name === bank.selectedBank.name} 
                onMouseOver={() => {
                  bank.setSelectedBank(currentBank)
                  setName(currentBank.name)
                }}
              >
                {currentBank.name}. Loan term from {currentBank.minLoanTerm} {currentBank.interval === 12 ? 
                "month" : "years"} to {currentBank.maxLoanTerm} years at {currentBank.loanInterest} % per annum
              </ListGroup.Item>  
            )}
          </ListGroup>
        }
        {showMain &&
          <Row className="mt-2">
            <div style={{fontSize: 20, fontWeight: 700}}>
              {bank.selectedBank.name} is capable of giving a requested loan at {bank.selectedBank.loanInterest} % per annum
            </div>
            <hr style={{margin: 1}} />
            <Col md={4} className="mt-2">
              <Form.Group>
              <Form.Label style={{fontWeight: 700}}>
                <div className="d-flex"> Loan term 
                  <div className="d-flex" style={{fontWeight: 500, fontSize: 14, margin: "2px 0 0 4px"}}>(
                    <div style={{color: "red"}}>
                      from {bank.selectedBank.minLoanTerm} {bank.selectedBank.interval === 12 ? "month" : "years"} to {bank.selectedBank.maxLoanTerm} years
                    </div>)
                  </div>
                </div>
              </Form.Label>
              <div className="d-flex">
                <Form.Control
                  style={{marginTop: -6, fontWeight: 500, width: 90}}
                  value={term}
                  onChange={e => setTerm(e.target.value)}
                />
                <div style ={{height: 30}}>
                  <Form.Select 
                    style={{width: 120, marginLeft: 15, marginTop: -6, fontWeight: 500}} 
                    value={interval}
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
                  onChange={e => setTerm(e.target.value)}
                  min={1}
                  max={bank.selectedBank.maxLoanTerm}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mt-2">
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
                  }}
                  style={{fontWeight: fw2}}
                />
              </Form.Group>
            </Col> 
            <Col md={4} className="mt-2">
              <Form.Group>
                <Form.Label style={{fontWeight: 700}}>Start of payments</Form.Label>
                <div className="d-flex" style={{marginTop: -5}}>
                  <Form.Select 
                    style={{width: 140, fontWeight: 500}}
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                  >
                    {initMonths.map(currentMonth => <option key={currentMonth}>{currentMonth}</option>)}
                  </Form.Select>
                  <Form.Select 
                    style={{width: 140, marginLeft: 20, fontWeight: 500}}
                    value={year}
                    onChange={e => {setYear(e.target.value)
                    }}
                  >
                    {years.map(currentYear => <option key={currentYear}>{currentYear}</option>)}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>       
          </Row>
        }      
        {showPay &&
          <>
            <div className="mt-2 mb-1" style={{fontSize: 20, fontWeight: 700}}>Payments</div>
            <hr style={{margin: 1}} />
            <Row>
              <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
                {checked === "Differentiated" ? "Maximum mountly payment" : "Mountly payment"}
                  <div style={{fontSize: 24}}>{monthlyPayment && monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div>
              </Col>
              <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
                Overpayment
                <div style ={{fontSize: 24}}>{(Number(total) - (loan - payment)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
              </Col>
              <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
                Return in total
                <div style={{fontSize: 24}}>{total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div>
              </Col>
            </Row>
          </>
        } 
      </Row>
      {showPay &&
        <> 
          <div className="mt-4 mb-1 d-flex" style={{fontSize: 20, fontWeight: 700}}>
            Payment schedule 
            <div style={{fontSize: 14, fontWeight: 500, margin: "5px 0 0 5px"}}>(P.d. - "payment days")</div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><div className="d-flex justify-content-center">№</div></th>
                <th><div className="d-flex justify-content-center">Date</div></th>
                <th><div className="d-flex justify-content-center">P.d.</div></th>
                <th><div className="d-flex justify-content-center">Amount of payment</div></th>
                <th><div className="d-flex justify-content-center">Principal payment</div></th>
                <th><div className="d-flex justify-content-center">Interest charges</div></th>
                <th><div className="d-flex justify-content-center">Balance owed</div></th>
                <th><div className="d-flex justify-content-center">Total balance</div></th>
              </tr>
            </thead>
            <tbody>
              {data.map((currentData, index) =>
                <tr key={index} style={{fontWeight: 500}}>
                  <td><div className="d-flex justify-content-center">{index + 1}</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.currentMonth} {currentData.currentYear}</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.pd}</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.currentPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.currentDebt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.currentInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div></td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {(currentData.currentRemainder + 0.001).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {(total -= currentData.currentPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                </tr>
              )}
              <tr><td colSpan={8} style={{borderTop: "2px solid black"}}></td></tr>
            </tbody>
          </Table>
        </>
      }
    </div>
  )
}

export default Calculator  