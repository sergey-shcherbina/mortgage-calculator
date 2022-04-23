import React, { useState } from "react"
import { Button, Row, Col, Table, Form, ListGroup, Alert, Container} from "react-bootstrap"
import FormGroup from "../components/FormGroup"

const Calculator = () => {
  const [loan, setLoan] = useState("100000")
  const [payment, setPayment] = useState("10000")
  const [name, setName] = useState("")
  const [show, setShow] = useState(false)
  const [scheme, setScheme] = useState("annuity")

  const [back, setBack] = useState("whitesmoke")

  const [term, setTerm ] = useState(12)
  const [interval, setInterval] = useState(12)

  const [a, setA] = useState(false)
  const [b, setB] = useState(false)
  const [test, setTest] = useState(false)
 
  let w = 4

  return (
    <div>
      <Row className="mt-2">
        <Container style={{fontSize: 20, fontWeight: 700}}>
          Loan request
          <hr style={{margin: 1}} />
        </Container>
        <Col md={4} className="mt-2">
          <FormGroup
            label={"Initial loan"}
            min={10000}
            max={1000000} 
            step={1000} 
            valueRange={loan.replace(/\s/g, "")}
            valueInput={loan.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} 
            changeValue={event => setLoan(event.target.value)}
            wc={180}        
          />
        </Col>
        <Col md={4} className="mt-2">
          <FormGroup
            label={"Down payment"}
            max={100000} 
            step={1000} 
            valueRange={payment.replace(/\s/g, "")}
            valueInput={payment.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} 
            changeValue={event => setPayment (event.target.value)}
            wc={180}
          />       
        </Col>
        <Col md={4} className="mt-2">
          <FormGroup
            label={"Choose a bank"}
            valueInput={name} 
            changeValue={event => setName(event.target.value)}
            focus={() => setShow(true)}
          />
        </Col>
        {show &&
              <ListGroup style={{marginTop: -30}}>
                <ListGroup.Item key={3}
                    // className="d-flex justify-content-end"
                    style={{cursor: "pointer", marginLeft: "auto"}}
                    active={a}
                    // active={bank.id === store.selectedBank.id}
                    // onMouseOver={() => store.setSelectedBank(bank)}
                    onMouseOver={() => setA(true)}
                    onMouseLeave={() => setA(false)}
                    onClick={() => {
                      setShow(false)
                      setTest(true)
                      setA(false)
                    }}
                  >
                    OBE Bank {"10.3% per annum"}, {"loan term from 1.5 to 35 years "}
                  </ListGroup.Item>
                  <ListGroup.Item key={11}
                    // className="d-flex justify-content-end"
                    style={{cursor: "pointer", border: "none", marginLeft: "auto"}}
                    active={b}
                    // active={bank.id === store.selectedBank.id}
                    // onMouseOver={() => store.setSelectedBank(bank)}
                    onMouseOver={() => setB(true)}
                    onMouseLeave={() => setB(false)}
                    onClick={() => {
                      setShow(false)
                      setTest(false)
                      setB(false)
                    }}
                  >
                   NAE Bank: {"10.8% per annum"}, {"loan term from 3 to 25 years "}
                  </ListGroup.Item>
                  <ListGroup.Item key={1} style={{cursor: "pointer", marginLeft: "auto"}}>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item key={2}  style={{cursor: "pointer", marginLeft: "auto"}}>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item key={5} style={{cursor: "pointer", marginLeft: "auto"}}>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item key={6} style={{cursor: "pointer", border: "none", marginLeft: "auto"}}>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            } 
            {/* <hr style={{margin: 1}} />        */}
      </Row>
      <Row className="mt-2">
        {test ?
          <Alert show={test} variant="danger" onClose={() => setTest(false)} dismissible>
            <Alert.Heading>{"NAE Bank"} is unable to provide the requested loan {loan} {payment}</Alert.Heading>
            <hr />
              <div>{loan}<br /><br />{payment}<br />{name}</div>
              <div className="d-flex justify-content-end">
                <Button 
                  variant="danger" size="lg"
                  onClick={() => setTest(false)}
                >
                  Delete {"NAE Bank"} from your list?
                </Button>
              </div>
            </Alert>  
            :
            <div>
              <div style={{fontSize: 20, fontWeight: 700}}>{"NAE Bank"} is capable of giving a requested loan</div>
              <hr style={{margin: 1}} />
              <Row>
                <Col md={4} className="mt-2">
                  <FormGroup
                    label={"Loan term"}
                    min={1}
                    max={36} 
                    valueInput={term} 
                    valueRange={term}  
                    changeValue={event => setTerm(event.target.value)}
                    interval={interval}
                    changeInterval={event => setInterval(event.target.value)}
                    wc={90}
                  />   
              </Col>
              <Col md={4} className="mt-2">
                <Form.Group>
                  <Form.Label style={{fontWeight: 700}}> Loan repayment scheme</Form.Label>
                  <br />
                  <Form.Check
                    inline
                    label="Annuity"
                    name="group1"
                    type="radio"
                    style={{fontWeight: 700}}
                  />
                  <Form.Check
                    inline
                    label="Differentiated"
                    name="group1"
                    type="radio"
                  />
                  </Form.Group>
                </Col>
                <Col md={4} className="mt-2">
                <Form.Group>
                  <Form.Label style={{fontWeight: 700}}>Start of payments</Form.Label>
                  <div className="d-flex" style={{marginTop: -5}}>
                    <Form.Select 
                      style={{width: 140, background: back}}
                      value={scheme}
                      onChange={event => setScheme(event.target.value)}
                      onMouseOver={() => setBack("")}
                      onMouseLeave={() => setBack("whitesmoke")}
                    >
                      {["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"].map(
                          month => 
                            <option key={month}>{month}</option>
                        ) 
                      }
                    </Form.Select>
                    <Form.Select 
                      style={{width: 140, marginLeft: 20, background: back}}
                      value={scheme}
                      onChange={event => setScheme(event.target.value)}
                      onMouseOver={() => setBack("")}
                      onMouseLeave={() => setBack("whitesmoke")}
                    >
                      <option value={1}>2022</option>
                      <option value={2}>2023</option>
                      <option value={3}>2024</option>
                    </Form.Select>
                  </div>
                </Form.Group>
                </Col>
              </Row>
              <div className="mt-2 mb-1" style={{fontSize: 20, fontWeight: 700}}>Payments</div>
              <hr style={{margin: 1}} />
              <Row>
                <Col md={w} className="mt-2" style={{fontWeight: "bold"}}>
                  Monthly payment
                  <div style={{fontSize: 24}}>{(loan + payment) / 10} $</div>
                </Col>
                <Col md={w} className="mt-2" style={{fontWeight: "bold"}}>
                  Overpayment
                  <div style={{fontSize: 24}}>{(loan - payment) * 1.123} $</div>
                </Col>
                <Col md={w} className="mt-2" style={{fontWeight: "bold"}}>
                  Return in total
                  <div style={{fontSize: 24}}>{(loan  + payment) * 1.428} $</div>
                </Col>
              </Row>
            </div>
          }
        </Row>
      <div className="mt-4 mb-1" style={{fontSize: 20, fontWeight: 700}}>
        Payment schedule
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th>Amount of payment</th>
            <th>Main debt</th>
            <th>Interest</th>
            <th>Remainder</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@mdo</td>
            <td>@twitter</td>
            <td>@mdo</td>
            <td>Mark</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Calculator

