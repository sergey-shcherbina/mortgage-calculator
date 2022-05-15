import React, { useState } from "react"
import { Form } from "react-bootstrap"
import FormGroup from "../components/FormGroup"

const LoanTerm = ({ label,  valueInput, valueRange, changeValue, min, max, wc, focus, valueInterval, changeInterval }) => {
  const [back, setBack] = useState("whitesmoke")
  return (
    <FormGroup 
    label={label}
    valueInput={valueInput}
    valueRange={valueRange}
    valueInterval={valueInterval}
    changeValue={changeValue}
    min={min}
    max={max}
    wc={wc}
    focus={focus}
    addForm={true && 
      <Form.Select 
        style={{width: 120, margin: "-11px 0 0 15px", fontWeight: 500, background: back, height: 36}} 
        value={valueInterval}
        onChange={changeInterval}
        onFocus={focus}
        onMouseOver={() => setBack("")}
        onMouseLeave={() => setBack("whitesmoke")}
      >
        <option value={1}>Months</option>
        <option value={12}>Years</option>
      </Form.Select>
    }
  />
  )
}

export default LoanTerm