import React, { useState, useContext } from "react"
import { Modal, Button, CloseButton, Form } from "react-bootstrap"
import FormGroup from "../FormGroup"
import { createBank, fetchBanks } from "../../http/bankAPI"
import jwt_decode from "jwt-decode"
import { observer } from "mobx-react-lite"
import { Context } from "../.."

// import BankForm from "../BankForm"

const CreateBank = observer(({ show, onHide }) => {

  const { bank } = useContext(Context)
  // console.log(bank.banks)

  const [fs, setFs] = useState("")
  const [name, setName] = useState("NAE Bank")
  const [rate, setRate] = useState(10)
  const [loan, setLoan] = useState("100000")
  const [payment, setPayment] = useState(20)
  const [interval, setInterval] = useState(12)
  const [minTerm, setMinTerm] = useState(12)
  const [maxTerm, setMaxTerm] = useState(10)
  let userId = jwt_decode(localStorage.getItem("token")).id

  const addBank = () => 
    createBank({name, loanInterest: rate, maxLoan: loan, minPayment: payment, minLoanTerm: minTerm, maxLoanTerm: maxTerm, interval, userId })
    .then(() => fetchBanks(userId)).then(data => bank.setBanks(data)).finally(() => {
      // console.log(bank.banks)
      setFs("")
      onHide()
    })
    
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton className="d-flex align-self-end" onClick={onHide} />
        <div style={{width: 320}}>
          <Form>
            <FormGroup
              label={"Bank's name"}
              valueInput={name} 
              changeValue={event => setName(event.target.value)}
            />
            <FormGroup
              label={"Interest rate"}
              max={30} 
              step={0.1} 
              valueInput={rate} 
              valueRange={rate} 
              changeValue={event => setRate(event.target.value)}
              wc={90}
            />
            <FormGroup
              label={"Maximum loan"}
              min={10000}
              max={500000} 
              step={1000} 
              valueRange={loan.replace(/\s/g, "")}
              valueInput={loan.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} 
              changeValue={event => setLoan(event.target.value)}
              wc={150}
            />
            <FormGroup 
              label={"Мinimum down payment"}
              loan={loan}
              max={50}  
              valueInput={payment} 
              valueRange={payment} 
              changeValue={event => setPayment(event.target.value)}
              wc={90}
            />
            <FormGroup
              label={"Minimum loan term"}
              min={1}
              max={36} 
              valueInput={minTerm} 
              valueRange={minTerm}  
              changeValue={event => setMinTerm(event.target.value)}
              interval={interval}
              changeInterval={event => setInterval(event.target.value)}
              wc={90}
            /> 
            <FormGroup
              label={"Maximum loan term"}
              min={(minTerm / interval).toFixed()}
              max={50} 
              valueInput={maxTerm} 
              valueRange={maxTerm}  
              changeValue={event => setMaxTerm(event.target.value)}
              minValue={(minTerm / interval).toFixed()}
              wc={90}
            /> 
          </Form>
        </div>
        <Button 
          type="submit"
          variant="outline-primary" size="lg"
          className="d-flex align-self-end mt-2" 
          style={{fontSize: fs, marginRight: 20, border: "none"}}
          onMouseOver={() => setFs(24)}
          onMouseLeave={() => setFs("")} 
          onClick={addBank}
        >
          Create a new bank
        </Button>
      </Modal.Body>
    </Modal>
  )
})

export default CreateBank