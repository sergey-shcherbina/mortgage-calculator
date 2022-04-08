import React, { useState } from "react"
import { Form } from "react-bootstrap"

const FormGroup = ({ label, min, max, step, valueInput, valueRange, changeValue, wc, loan }) => {
  const [ back, setBack ] = useState("gray")
  const [ color, setColor ] = useState("white")
  const [ fs, setFs ] = useState(20)
  let value = Number(valueRange) * Number(loan) * .01
  return (
    <Form.Group className="mt-2">
      <Form.Label style={{color: "white", fontSize: 20}}>{label}</Form.Label>
        <div className="d-flex">
          <Form.Control 
            value={valueInput}
            onChange={changeValue}
            onMouseOver={() => {
              setColor("")
              setBack("")
              setFs(24)
            }}
            onMouseLeave={() => {
              setColor("white")
              setBack("gray")
              setFs(20)
            }}
            style={{maxWidth: wc, background: back, color: color, fontSize: fs, marginTop: -6}} 
          />
          {loan && 
            <div style={{color: "white", fontSize: 20}} className="d-flex">
              <div style={{margin: "3px 0 0 5px"}}>%</div>
              <div style={{marginLeft: 25}}>
                {Number(valueInput) * Number(loan) * .01}
              </div> 
              <div style={{marginLeft: 5}}>$</div> 
            </div>  
          }
          {/* {label.slice(5, 9) === "term" && 
          <> % <Input valueInput={Number(valueInput) * Number(loan) * .01} changeValue={changeValue} wc={120} /> $ </>  
          } */}
        </div>
        {valueRange && 
          <Form.Range 
            value={valueRange}
            onChange={changeValue}
            style={{background: "gray", marginTop: 8, border: "1px solid white", borderRadius: 3}}
            min={min}
            max={max}
            step={step}
          />
        }
        </Form.Group>
       )
      }
      
    export default FormGroup