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


// ({ label, min, max, step, valueInput, valueRange, changeValue,
//   wc, loan, interval, changeInterval, minValue}) => {
//  const [back, setBack] = useState("whitesmoke")
//  return (
//    <Form.Group style={{marginTop: -5}}>
//      <Form.Label style={{fontWeight: 700}}>{label}</Form.Label>
//      <div className="d-flex"> 
//        <Form.Control 
//          style={{maxWidth: wc, marginTop: -6, background: back, fontWeight: 500}} 
//          value={interval === "12" && valueRange === "1" ? valueInput * interval : 
//            minValue && valueRange === "1" ? minValue : valueInput}
//          onChange={changeValue}
//          onMouseOver={() => setBack("")}
//          onMouseLeave={() => setBack("whitesmoke")} 
//        />
//        {label.substr(-4) === "rate" && 
//          <div style={{margin: "5px 0 0 5px"}}>% per annum</div> 
//        }
//        {step === 1000 &&
//          <div style={{margin: "5px 0 0 5px"}}>$</div> 
//        }
//        {loan && 
//          <div className="d-flex" style={{margin: "5px 0 0 5px"}}>
//            %
//            <div style={{margin: "0 3px 0 20px"}}>
//              {(Number(valueInput) * Number(loan) * .01).toString().replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
//            </div> 
//            $ 
//          </div>  
//        }
//        {interval && 
//          <div style ={{height: 30}}>
//            <Form.Select 
//              style={{width: 120, marginLeft: 15, marginTop: -6, background: back}} 
//              value={interval}
//              onChange={changeInterval}
//              onMouseOver={() => setBack("")}
//              onMouseLeave={() => setBack("whitesmoke")}
//            >
//              <option value={12}>Months</option>
//              <option value={1}>Years</option>
//            </Form.Select>
//          </div>
//        }
//        {minValue && 
//          <div style={{margin: "3px 0 0 15px"}}>Years</div>
//        }
//      </div>
//      {valueRange ?
//        <Form.Range 
//          className="mt-1"
//          value={valueRange}
//          onChange={changeValue}
//          min={interval ? min * interval : min}
//          max={max}
//          step={step}
//          onMouseOver={() => setBack("")}
//          onMouseLeave={() => setBack("whitesmoke")}
//        />
//        : 
//        <div className="mt-3"></div> 
//      }     
//    </Form.Group>
//  )
// }    