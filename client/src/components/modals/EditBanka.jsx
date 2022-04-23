import React, { useState, useContext } from "react"
import {Modal, Button, CloseButton, Form } from "react-bootstrap"
import FormGroup from "../FormGroup"
import { editBank } from "../../http/bankAPI"
import jwt_decode from "jwt-decode"
import { observer } from "mobx-react-lite"
import { Context } from "../.."

const EditBank = observer(({ show, onHide }) => {
  const { bank } = useContext(Context)
  console.log(bank.selectedBank)

  const [fs, setFs] = useState("")
  const [name, setName] = useState("NAE Bank")
  const [rate, setRate] = useState(10)
  const [loan, setLoan] = useState("100000")
  const [payment, setPayment] = useState(20)
  const [interval, setInterval] = useState(12)
  const [minTerm, setMinTerm] = useState(12)
  const [maxTerm, setMaxTerm] = useState(10)
  const addChanges = () => {
}
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton className="d-flex align-self-end" onClick={onHide} />
        <Form style={{width: 330}}> 
            <FormGroup
              label={"Bank's name"}
              valueInput={bank.selectedBank.name} 
              changeValue={e => bank.setSelectedBank({...bank.setSelectedBank, ...{name: e.target.value}})}
            />
            <FormGroup
              label={"Interest rate"}
              max={30} 
              step={0.1} 
              valueInput={bank.selectedBank.loanInterest} 
              valueRange={bank.selectedBank.loanInterest} 
              changeValue={e => bank.setSelectedBank({...bank.setSelectedBank, ...{loanInterest: e.target.value}})}
              wc={90}
            />
            <FormGroup
              label={"Maximum loan"}
              min={10000}
              max={500000} 
              step={1000} 
              valueInput={bank.selectedBank.maxLoan && (bank.selectedBank.maxLoan).toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              valueRange={bank.selectedBank.maxLoan && (bank.selectedBank.maxLoan).toString().replace(/\s/g, "")}
              // valueRange={bank.selectedBank.maxLoan}
              // valueInput={bank.selectedBank.maxLoan}
              changeValue={e => bank.setSelectedBank({...bank.setSelectedBank, ...{maxLoan: e.target.value}})} 
              wc={150}
            />
            <FormGroup 
              label={"Мinimum down payment"}
              loan={bank.selectedBank.maxLoan}
              max={50}  
              valueInput={bank.selectedBank.minPayment} 
              valueRange={bank.selectedBank.minPayment} 
              changeValue={event => setPayment(event.target.value)}
              wc={90}
            />
            <FormGroup
              label={"Minimum loan term"}
              min={1}
              max={36} 
              valueInput={bank.selectedBank.minLoanTerm} 
              valueRange={bank.selectedBank.minLoanTerm}  
              changeValue={event => setMinTerm(event.target.value)}
              interval={bank.selectedBank.interval}
              changeInterval={event => setInterval(event.target.value)}
              wc={90}
            /> 
            <FormGroup
              label={"Maximum loan term"}
              min={(bank.selectedBank.minLoanTerm / bank.selectedBank.interval).toFixed()}
              max={50} 
              valueInput={bank.selectedBank.maxLoanTerm} 
              valueRange={bank.selectedBank.maxLoanTerm}  
              changeValue={event => setMaxTerm(event.target.value)}
              minValue={(bank.selectedBank.minLoanTerm / bank.selectedBank.interval).toFixed()}
              wc={90}
            /> 
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