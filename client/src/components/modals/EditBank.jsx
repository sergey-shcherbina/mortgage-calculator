import React, { useState, useContext } from "react"
import {Modal, Button, CloseButton, Form } from "react-bootstrap"
import FormGroup from "../FormGroup"
import { editBank } from "../../http/bankAPI"
import jwt_decode from "jwt-decode"
import { observer } from "mobx-react-lite"
import { Context } from "../.."

const EditBank = observer(({ show, onHide }) => {
  const { bank } = useContext(Context)
  const [fs, setFs] = useState("")
  const [loan, setLoan] = useState(0)
  
  console.log(bank.selectedBank.maxLoan, bank.selectedBank.minPayment, loan)
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton className="d-flex align-self-end" onClick={onHide} />

        <Form style={{width: 330}}>
          <Form.Group style={{marginTop: -5, marginBottom: 10}}>
            <Form.Label style={{fontWeight: 700}}>Bank's name</Form.Label>
            <Form.Control
              style={{marginTop: -6, fontWeight: 500}}
              value={bank.selectedBank.name}
              onChange={e => bank.setSelectedBank({...bank.setSelectedBank, name: e.target.value})}
            />
          </Form.Group>

          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Interest rate</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={bank.selectedBank.loanInterest}
                onChange={e => bank.setSelectedBank({...bank.setSelectedBank, loanInterest: e.target.value})}
              />
              <div style={{margin: "5px 0 0 5px", fontWeight: 500}}>% per annum</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.loanInterest}
              onChange={e => bank.setSelectedBank({...bank.setSelectedBank, loanInterest: e.target.value})}
              max={30}
              step={.1}
            />
          </Form.Group>

          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Maximum loan</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={bank.selectedBank.maxLoan && (bank.selectedBank.maxLoan).toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => {
                  bank.setSelectedBank({...bank.setSelectedBank, maxLoan: e.target.value})
                  setLoan(e.target.value)
                }}
              />
              <div style={{margin: "5px 0 0 5px",fontWeight: 500}}>$</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.maxLoan && (bank.selectedBank.maxLoan)}
              onChange={e => {
                bank.setSelectedBank({...bank.setSelectedBank, maxLoan: e.target.value})
                setLoan(e.target.value)
              }}
              min={50000}
              max={1000000} 
              step={5000}
            />
          </Form.Group>

          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Мinimum down payment</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={bank.selectedBank.minPayment}
                onChange={e => {
                  bank.setSelectedBank({...bank.setSelectedBank, minPayment: e.target.value})
                }}
              />
              <div className="d-flex" style={{margin: "5px 0 0 5px",fontWeight: 500}}>%
                <div style={{margin: "0 3px 0 20px"}}>
                  {/* {bank.selectedBank.maxLoan && (Number(bank.selectedBank.minPayment) * Number(bank.selectedBank.maxLoan) * .01).toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}  */}
                  {(Number(loan) * Number(bank.selectedBank.minPayment) * .01).toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </div> 
              </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.minPayment}
              onChange={e => bank.setSelectedBank({...bank.setSelectedBank, minPayment: e.target.value})}
              max={50} 
            />
          </Form.Group>
        </Form>

        <Button 
          variant="outline-primary" size="lg"
          className="d-flex align-self-end mb-3" 
          style={{fontSize: fs, marginRight: 20, border: "none"}}
          onMouseOver={() => setFs(22)}
          onMouseLeave={() => setFs("")} 
          onClick={() => {
            setFs("")
            onHide()
          }}
        >
          Apply to {"NAE Bank"}
        </Button>
      </Modal.Body>
    </Modal>
  )
})

export default EditBank