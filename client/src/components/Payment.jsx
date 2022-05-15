import React from "react"
import { Card } from "react-bootstrap"

const Payment = ({ title, value, addition }) => {
  return (
    <>
      {title}
      <Card className="p-2 d-flex justify-content-center"style={{fontSize: 24}}>
        {value} {addition}
      </Card>
    </>
  )
}

export default Payment