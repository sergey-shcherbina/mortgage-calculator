import React, { useState } from "react"
import { Form } from "react-bootstrap"

const FormGroup = ({ label, min, max, step, valueInput, valueRange, changeValue, wc, focus, addForm }) => {
  const [back, setBack] = useState("whitesmoke")

  return (
    <Form.Group style={{marginTop: -5}}>
      <Form.Label style={{fontWeight: 700}}>{label}</Form.Label>
      <div className="d-flex" style={{height: 30}}>
        <Form.Control
          style={{marginTop: -6, fontWeight: 500, maxWidth: wc, background: back}}
          value={valueInput}
          onFocus={focus}
          onChange={changeValue}
          onMouseOver={() => setBack("")}
          onMouseLeave={() => setBack("whitesmoke")}
        />
        <div style={{margin: "5px 0 0 5px", fontWeight: 500}}>{addForm}</div>
      </div>
      <Form.Range 
        className="mt-1"
        value={valueRange}
        onFocus={focus}
        onChange={changeValue}
        min={min}
        max={max}
        step={step}
        onMouseOver={() => setBack("")}
        onMouseLeave={() => setBack("whitesmoke")}
     />                   
    </Form.Group>
  )
}

export default FormGroup