import React, { useState } from "react"
import { Form } from "react-bootstrap"

const FormRadio = ({ checked, annuity, differentiated }) => {
  const [fw1, setFw1] = useState(500)
  const [fw2, setFw2] = useState(500)
  return (
    <Form.Group> 
      <Form.Label style={{fontWeight: 700}}>Loan repayment scheme</Form.Label>
      <br />
      <Form.Check
        inline
        label="Annuity"
        type="radio"
        checked={checked === "Annuity"}
        onFocus={() => {
          setFw1(700)
          setFw2(500)
        }}
        onChange={annuity}
        style={{fontWeight: fw1}}
      />
      <Form.Check
        inline
        label="Differentiated"
        type="radio"
        checked={checked === "Differentiated"}
        onFocus={() => {
          setFw1(500)
          setFw2(700)  
        }}
        onChange={differentiated}
        style={{fontWeight: fw2}}
      />
    </Form.Group>           
  )
}

export default FormRadio