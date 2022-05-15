import React, { useState } from "react"
import { Form } from "react-bootstrap"

const StartPay = ({ month, year, changeMonth, changeYear, initMonths, years, justify}) => {
  const [back1, setBack1] = useState("whitesmoke")
  const [back2, setBack2] = useState("whitesmoke")

  return (
    <Form.Group>
      <Form.Label style={{fontWeight: 700, display: "flex", justifyContent: justify}}>
        Start of payments
      </Form.Label>
      <div className="d-flex">
        <Form.Select 
          style={{width: 140, fontWeight: 500, background: back1}}
          value={month}
          onChange={changeMonth}
          onMouseOver={() => setBack1("")}
          onMouseLeave={() => setBack1("whitesmoke")}
        >
          {initMonths.map(currentMonth => <option key={currentMonth}>{currentMonth}</option>)}
        </Form.Select>
        <Form.Select 
          style={{width: 100, marginLeft: 15, fontWeight: 500, background: back2}}
          value={year}
          onChange={changeYear}
          onMouseOver={() => setBack2("")}
          onMouseLeave={() => setBack2("whitesmoke")}
        >
          {years.map(currentYear => <option key={currentYear}>{currentYear}</option>)}
        </Form.Select>
      </div>
    </Form.Group>    
  )
}

export default StartPay