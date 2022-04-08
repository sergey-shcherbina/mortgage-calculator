import React, { useState } from "react"
import { Form } from "react-bootstrap"
import FormGroup from "./FormGroup"

const BankForm = () => {
  const [ name, setName ] = useState("NAE Bank")
  const [ rate, setRate ] = useState(10)
  const [ loan, setLoan ] = useState("100000")
  const [ payment, setPayment ] = useState(20)
  const [ term, setTerm ] = useState(12)
  
  

  return (
    <Form style={{border: "1px solid white", borderRadius: 5, padding: 10, background: "darkblue"}}>
      <FormGroup 
        style={{width: 400}}
        label={"Bank's name"}
        valueInput={name} 
        changeValue={event => setName(event.target.value)}
      />
      <FormGroup 
        label={"Interest rate, %"}
        max={30} 
        step={0.01} 
        valueInput={rate} 
        valueRange={rate} 
        changeValue={event => setRate(event.target.value)}
        wc={90}
      />

      <FormGroup
        label={"Maximum loan, $"}
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
        wc={54}
      />
      <FormGroup 
        label={"Loan term"}
        max={50} 
        valueInput={term} 
        valueRange={term}  
        changeValue={event => setTerm(event.target.value)}
        wc={54}
      /> 
    </Form>
  )
}

export default BankForm