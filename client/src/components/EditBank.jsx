import React, { useState, useContext } from "react"
import {Modal, Button, CloseButton, Form } from "react-bootstrap"
import { createBank, editBank, fetchBanks } from "../http/bankAPI"
import { observer } from "mobx-react-lite"
import { Context } from ".."

const EditBank = observer(({ show, onHide }) => {
  const { bank, user } = useContext(Context)
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
              style={{marginTop: -6, fontWeight: 500}}
              value={bank.selectedBank.name}
              onFocus={() => bank.setSelectedBank({...bank.selectedBank, name: ""})}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Interest rate</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={bank.selectedBank.loanInterest}
                onChange={e => bank.setSelectedBank({...bank.selectedBank, loanInterest: e.target.value})}
              />
              <div style={{margin: "5px 0 0 5px", fontWeight: 500}}>% per annum</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.loanInterest}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, loanInterest: e.target.value})}
              max={30}
              step={.1}
            />
          </Form.Group>
          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Maximum loan</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 150}}
                value={bank.selectedBank.maxLoan && bank.selectedBank.maxLoan.toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={e => {
                  bank.setSelectedBank({...bank.selectedBank, maxLoan: e.target.value})
                }}
              />
              <div style={{margin: "5px 0 0 5px",fontWeight: 500}}>$</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.maxLoan && bank.selectedBank.maxLoan.toString().replace(/\s/g, "")}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, maxLoan: e.target.value})}
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
                  bank.setSelectedBank({...bank.selectedBank, minPayment: e.target.value})
                }}
              />
              <div className="d-flex" style={{margin: "5px 0 0 5px",fontWeight: 500}}>%
                <div style={{margin: "0 3px 0 20px"}}>
                  {bank.selectedBank.maxLoan && (Number(bank.selectedBank.maxLoan.toString().replace(/\s/g, "")) * 
                    Number(bank.selectedBank.minPayment) * .01).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                </div> 
              </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.minPayment}
              onChange={e => {
                bank.setSelectedBank({...bank.selectedBank, minPayment: e.target.value})
              }}
              max={50} 
            />
          </Form.Group>
          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Minimum loan term</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={bank.selectedBank.minLoanTerm}
                onChange={e => bank.setSelectedBank({...bank.selectedBank, minLoanTerm: e.target.value})}
              />
              <div style ={{height: 30}}>
              <Form.Select 
                style={{width: 120, marginLeft: 15, marginTop: -6, fontWeight: 500}} 
                value={bank.setSelectedBank.interval}
                onChange={e => bank.setSelectedBank({...bank.selectedBank, interval: e.target.value})}
              >
                <option value="1">Months</option>
                <option value="12">Years</option>
              </Form.Select>
            </div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.minLoanTerm}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, minLoanTerm: e.target.value})}
              min={1}
              max={36}
            />
          </Form.Group>
          <Form.Group style={{marginTop: -5}}>
            <Form.Label style={{fontWeight: 700}}>Maximum loan term</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{marginTop: -6, fontWeight: 500, width: 90}}
                value={bank.selectedBank.maxLoanTerm}
                onChange={e => bank.setSelectedBank({...bank.selectedBank, maxLoanTerm: e.target.value})}
              />
              <div style={{margin: "3px 0 0 15px", fontWeight: 500}}>Years</div>
            </div>
            <Form.Range 
              className="mt-1"
              value={bank.selectedBank.maxLoanTerm}
              onChange={e => bank.setSelectedBank({...bank.selectedBank, maxLoanTerm: e.target.value})}
              min={1}
              max={50}
            />
          </Form.Group>
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
//
export default EditBank