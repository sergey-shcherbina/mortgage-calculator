import React, { useContext, useEffect, useState } from "react"
import { Alert, Row, Col, Button, CloseButton, Table } from "react-bootstrap"
import { fetchBanks, removeBank } from "../http/bankAPI"
import jwt_decode from "jwt-decode"
import { observer } from "mobx-react-lite"
import EditBank from "../components/modals/EditBank"
import CreateBank from "../components/modals/CreateBank"
import { Context } from ".."

const Banks = observer(() => {
  const { bank } = useContext(Context)
  const [fsButton, setFsButton] = useState("")
  const [fsTable, setFsTable] = useState("")
  const [show, setShow] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  let userId = jwt_decode(localStorage.getItem("token")).id

  useEffect(() => {
    fetchBanks(userId).then(data => bank.setBanks(data))
  
    // .finally(() => console.log(bank.banks))
  
    }, [bank, userId]) 
  
  return (
    <div className="d-flex flex-column">   
      <div className="mb-2 mt-3" style={{fontSize: 24, fontWeight: "bold"}}>
        List of all earlier created banks
      </div>
      <Table striped bordered hover >
        <thead style={{border:"none"}}>
          <tr>
            <th>№</th>
            <th>Bank's name</th>
            <th>Interest rate</th>
            <th>Maximum loan</th>
            <th>Мin down payment</th>
            <th>Min loan term</th>
            <th>Max loan term</th>
          </tr>
        </thead>
        {bank.banks.map((currentBank, index) =>
          <tbody key={currentBank.id} style={{border:"none"}}>
            <tr>
              <td colSpan={7}>
                {bank.selectedBank.id === currentBank.id && show &&
                  <Row>
                    <div className="d-flex justify-content-end mb-2" >
                      <CloseButton onClick={() => setShow(false)} />
                    </div>
                    <Col md={6}>
                      <Alert variant="success">
                        <Alert.Heading>Change {bank.selectedBank.name} Loan Terms</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button variant="success" size="lg" 
                            onClick={() => {
                              setVisibleEdit(true)
                              setShow(false) 
                            }} 
                          >
                            Edit
                          </Button>
                        </div>
                      </Alert>
                    </Col>
                    <Col md={6}>
                      <Alert  variant="danger">
                        <Alert.Heading>Remove {bank.selectedBank.name} from the list</Alert.Heading>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button variant="danger" size="lg"
                            onClick={() => {

                              setShow(false) 
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
              style={{cursor: "pointer", fontSize: bank.selectedBank.id === currentBank.id ? fsTable : ""}}
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
              <td>{index+1}</td>
              <td>{currentBank.name}</td>
              <td>{currentBank.loanInterest} %</td>
              <td>{currentBank.maxLoan} $</td>
              <td>{currentBank.minPayment} % or {(currentBank.minPayment / 100 * currentBank.maxLoan).toFixed()} $</td>
              <td>{currentBank.minLoanTerm} {currentBank.interval === 12 ? "month" : "years"}</td>
              <td>{currentBank.maxLoanTerm} years</td>
            </tr>
          </tbody>
        )}
        <tbody><tr style={{border: "none"}}><td colSpan={7}></td></tr></tbody><tbody><tr></tr></tbody>
      </Table>
      <Button
          // type="submit" 
          variant="outline-secondary" size="lg"
          className="mb-4"
          style={{fontSize: fsButton, marginTop: -18, border: "solid"}}
          onMouseOver={() => setFsButton(26)} 
          onMouseLeave={() => setFsButton("")}
          onClick={() => setVisibleCreate(true)}
        >
          Create a new bank
        </Button>
      <CreateBank show={visibleCreate} onHide={() => setVisibleCreate(false)} />
      <EditBank show={visibleEdit} onHide={() => setVisibleEdit(false)} />   
    </div>
  )
})
  
export default Banks 
  
      