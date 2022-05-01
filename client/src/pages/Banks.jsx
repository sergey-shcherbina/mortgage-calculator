import React, { useContext, useEffect, useState } from "react"
import { Alert, Row, Col, Button, CloseButton, Table } from "react-bootstrap"
import { fetchBanks, removeBank } from "../http/bankAPI"
import { observer } from "mobx-react-lite"
import EditBank from "../components/EditBank"
import { Context } from ".."

const Banks = observer(() => {
  const { bank, user } = useContext(Context)
  const [fsButton, setFsButton] = useState("")
  const [fsTable, setFsTable] = useState("")
  const [border, setBorder] = useState("")
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchBanks(user.user.id).then(data => bank.setBanks(data))
  }, [user.user.id, bank])
  
  return (
    <div className="d-flex flex-column">   
      <div className="mb-2 mt-3" style={{fontSize: 24, fontWeight: "bold"}}>
        List of all earlier created banks
      </div>
      <Table striped bordered hover >
        <thead style={{border:"none"}}>
          <tr>
            <th><div className="d-flex justify-content-center">№</div></th>
            <th><div className="d-flex justify-content-center">Bank's name</div></th>
            <th><div className="d-flex justify-content-center">Interest rate</div></th>
            <th><div className="d-flex justify-content-center">Maximum loan</div></th>
            <th><div className="d-flex justify-content-center">Мin down payment</div></th>
            <th><div className="d-flex justify-content-center">Min loan term</div></th>
            <th><div className="d-flex justify-content-center">Max loan term</div></th>
          </tr>
        </thead>
        {[...bank.banks].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return - 1 
          return 1
        }).map((currentBank, index) =>
          <tbody key={currentBank.id} style={{border:"none"}}>
            <tr>
              <td colSpan={7}>
                {bank.selectedBank.id === currentBank.id && show &&
                  <Row>
                    <div className="d-flex justify-content-end mb-2" >
                      <CloseButton onClick={() => setShow(false)} />
                    </div>
                    <Col md={6}>
                      <Alert variant="success"
                        onMouseOver={() => {
                          setBorder("solid green")
                          setFsTable(24)
                        }}
                        onMouseLeave={() => {
                          setBorder("")
                          setFsTable("")
                        }} 
                      >
                        <Alert.Heading>Change {bank.selectedBank.name} Loan Terms</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button variant="success" size="lg"
                            onClick={() => {
                              setVisible(true)
                              setShow(false) 
                              setBorder("")
                            }} 
                          >
                            Edit
                          </Button>
                        </div>
                      </Alert>
                    </Col>
                    <Col md={6}>
                      <Alert  variant="danger"
                        onMouseOver={() => {
                          setBorder("solid red")
                          setFsTable(24)
                        }}
                        onMouseLeave={() => {
                          setBorder("")
                          setFsTable("")
                        }}
                      >
                        <Alert.Heading>Remove {bank.selectedBank.name} from the list</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button variant="danger" size="lg"
                            onClick={() => {
                              removeBank(bank.selectedBank.id).then(() => fetchBanks(user.user.id)
                              .then(data => bank.setBanks(data))).finally(() => {
                                setBorder("")
                                setShow(false)
                              }) 
                            }}
                          >
                            Delete 
                          </Button>
                        </div>
                      </Alert>
                    </Col>
                  </Row>         
                }
              </td>
            </tr>
            <tr 
              style={{cursor: "pointer", fontSize: bank.selectedBank.id === currentBank.id ? fsTable : "", 
                border: bank.selectedBank.id === currentBank.id ? border : ""}}
              onMouseOver={() => {
                bank.setSelectedBank(currentBank)
                setFsTable(22)
                setShow(false)
              }}
              onMouseLeave={() => {
                setFsTable("")
              }}  
              onClick={() => setShow(true)} 
            >
              <td><div className="d-flex justify-content-center">{index + 1}</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.name}</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.loanInterest} %</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.maxLoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.minPayment} % or {(currentBank.minPayment * .01 * currentBank.maxLoan).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.minLoanTerm} {currentBank.interval === 12 ? "month" : "years"}</div></td>
              <td><div className="d-flex justify-content-center">{currentBank.maxLoanTerm} years</div></td>
            </tr>
          </tbody>
        )} 
        <tbody><tr style={{border: "none"}}><td colSpan={7}></td></tr></tbody><tbody><tr></tr></tbody>
      </Table>
      <Button 
          variant="outline-secondary" size="lg"
          className="mb-4"
          style={{fontSize: fsButton, marginTop: -18, border: "2px solid black", borderRadius: 1}}
          onMouseOver={() => setFsButton(26)} 
          onMouseLeave={() => setFsButton("")}
          onClick={() => {
            bank.setSelectedBank({name: "NAE Bank", loanInterest: 10, maxLoan: 100000, minPayment: 20, minLoanTerm: 12, maxLoanTerm: 20, interval: 12})
            setVisible(true)
          }}
        >
          Create a new bank
        </Button>
      <EditBank show={visible} onHide={() => setVisible(false)}  />
    </div>
  )
})

export default Banks 


               