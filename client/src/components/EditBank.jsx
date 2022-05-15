import React, { useState, useContext } from "react"
import {Modal, Button, CloseButton, Form } from "react-bootstrap"
import { createBank, editBank, fetchBanks } from "../http/bankAPI"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import FormGroup from "./FormGroup"
import LoanTerm from "./LoanTerm"

const EditBank = observer(({ show, onHide }) => {
  const { bank, user } = useContext(Context)
  const [back, setBack] = useState("whitesmoke")
  const [fs, setFs] = useState("")
  const bankState = {...{name: bank.selectedBank.name, loanInterest: bank.selectedBank.loanInterest, maxLoan: bank.selectedBank.maxLoan && 
    bank.selectedBank.maxLoan.toString().replace(/\s/g, ""), minPayment: bank.selectedBank.minPayment, minLoanTerm: bank.selectedBank.minLoanTerm, 
    maxLoanTerm: bank.selectedBank.maxLoanTerm, interval: bank.selectedBank.interval, userId: user.user.id}}

    return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <CloseButton className="d-flex align-self-end" onClick={onHide} />
        <Form style={{width: 330}}>
          <Form.Group style={{marginTop: -5, marginBottom: 10}}>
            <Form.Label style={{fontWeight: 700}}>Bank's name</Form.Label>
            <Form.Control
              style={{marginTop: -6, fontWeight: 500, background: back}}
              onMouseOver={() => setBack("")}
              onMouseLeave={() => setBack("whitesmoke")}
              value={bank.selectedBank.name}
              onFocus={() => bank.setSelectedBank({...bank.selectedBank, name: ""})}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, name: e.target.value})}
            />
          </Form.Group>
          <FormGroup
            label={"Interest rate"}
            valueInput={bank.selectedBank.loanInterest}
            valueRange={bank.selectedBank.loanInterest}
            changeValue={e => bank.setSelectedBank({...bank.selectedBank, loanInterest: e.target.value})}
            min={.1}
            max={30}
            step={.1}
            wc={90}
            addForm={"% per annum"}
          />
          <FormGroup
            label={"Maximum loan"}
            valueInput={bank.selectedBank.maxLoan && bank.selectedBank.maxLoan.toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            valueRange={bank.selectedBank.maxLoan && bank.selectedBank.maxLoan.toString().replace(/\s/g, "")}
            changeValue={e => bank.setSelectedBank({...bank.selectedBank, maxLoan: e.target.value})}
            min={50000}
            max={1000000} 
            step={10000}
            wc={150}
            addForm={"$"}
          /> 
          <FormGroup 
            label={"Мinimum down payment"}
            valueInput={bank.selectedBank.minPayment}
            valueRange={bank.selectedBank.minPayment}
            changeValue={e => bank.setSelectedBank({...bank.selectedBank, minPayment: e.target.value})}
            max={50} 
            wc={90}
            addForm={bank.selectedBank.maxLoan && 
              <div style={{margin: "-5px 0 0 20px"}}>
                {(Number(bank.selectedBank.maxLoan.toString().replace(/\s/g, "")) * Number(bank.selectedBank.minPayment) * .01).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
              </div> 
            }
          /> 
           <LoanTerm 
            label={"Minimum loan term"}
            valueInput={bank.selectedBank.minLoanTerm}
            valueRange={bank.selectedBank.minLoanTerm}
            valueInterval={bank.setSelectedBank.interval}
            changeValue={e => bank.setSelectedBank({...bank.selectedBank, minLoanTerm: e.target.value})}
            changeInterval={e => bank.setSelectedBank({...bank.selectedBank, interval: e.target.value})}
            min={1}
            max={36}
            wc={90}
          />
          <FormGroup
            label={"Maximum loan term"}
            valueInput={bank.selectedBank.maxLoanTerm}
            valueRange={bank.selectedBank.maxLoanTerm}
            changeValue={e => bank.setSelectedBank({...bank.selectedBank, maxLoanTerm: e.target.value})}
            min={1}
            max={50}
            wc={90}
            addForm={"Years"}
          />     
        </Form>
        <Button 
          variant="outline-success" 
          className="d-flex align-self-end mb-3" 
          style={{fontSize: fs, marginRight: 20}}
          onMouseOver={() => setFs(22)}
          onMouseLeave={() => setFs("")} 
          onClick={() => bank.selectedBank.id ? 
            editBank(bank.selectedBank.id, bankState).then(() => fetchBanks(user.user.id)).then(data => bank.setBanks(data)).finally(() => {
              setFs("")
              onHide()
            })
            : 
            createBank(bankState).then(() => fetchBanks(user.user.id)).then(data => bank.setBanks(data)).finally(() => {
              setFs("")
              onHide()
            })
          }
        >
          {bank.selectedBank.id ? `Apply to ${bank.selectedBank.name}` : `Create a ${bank.selectedBank.name}` } 
        </Button>
      </Modal.Body>
    </Modal>
  )
})

export default EditBank