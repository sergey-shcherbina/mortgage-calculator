import React, { useContext, useState, useEffect } from "react"
import { Row, Col, Form, ListGroup, Container } from "react-bootstrap"
import { Context } from ".."
import { fetchBanks } from "../http/bankAPI"
import { initMonths, years, allMonths, newYear, pd, interest, mp } from "../consts"
import DataTable from "../components/DataTable" 

const Calculator = () => {
  const { bank,user } = useContext(Context)
  const [loanInput, setLoanInput] = useState("100000")
  const [paymentInput, setPaymentInput] = useState("10000")
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
  const loan = loanInput.replace(/\s/g, "")
  const payment = paymentInput.replace(/\s/g, "")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [total, setTotal] = useState(0)
  const monthlyDebt = (loan - payment) / (term * interval)
  let debt = loan - payment
  
  useEffect(() => {
    fetchBanks(user.user.id).then(data => bank.setBanks(data))         
  }, [user.user.id, bank])
  
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
          <Form.Group>
            <Form.Label style={{fontWeight: 700}}>Initial loan</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={loanInput.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => setLoanInput(e.target.value)}
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
              value={loanInput.replace(/\s/g, "")}
              onChange={e => setLoanInput(e.target.value)}
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
                value={paymentInput.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => setPaymentInput(e.target.value)}
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
              value={paymentInput.replace(/\s/g, "")}
              onChange={e => setPaymentInput(e.target.value)}
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
            {[...bank.banks].filter(bank => bank.minPayment <= payment / loan * 100 && bank.maxLoan >= loan)
              .sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return - 1 
                return 1
              }).map(currentBank =>
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
                      <option value="1">Months</option>
                      <option value="12">Years</option>
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
                    setMonthlyPayment(mp(bank.selectedBank.loanInterest, loan, term, interval, payment))
                    setTotal(mp(bank.selectedBank.loanInterest, loan, term, interval, payment) * term * interval)
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
                    setMonthlyPayment(monthlyDebt + interest(loan - payment, bank.selectedBank.loanInterest))
                    setTotal(allMonths(month, term, interval).map((t, i) => t = monthlyDebt + interest(loan - payment -
                      monthlyDebt * i  , bank.selectedBank.loanInterest)).reduce((sum, elem) => sum + elem, 0))  
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
                    style={{width: 100, marginLeft: 20, fontWeight: 500}}
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
                {checked === "Differentiated" ? "Maximum monthly payment" : "Monthly payment"}
                  <div style={{fontSize: 24}}>
                    {monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                  </div>
              </Col>
              <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
                Overpayment
                <div style ={{fontSize: 24}}>{(total - (loan - payment)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</div>
              </Col>
              <Col md={4} className="mt-2" style={{fontWeight: "bold"}}>
                Return in total
                <div style={{fontSize: 24}}>{total && total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div>
              </Col>
            </Row>
          </>
        } 
      </Row>
      {showPay && <DataTable data={data} total={total} />}
    </div>
  )
}

export default Calculator  