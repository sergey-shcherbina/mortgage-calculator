import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import BankForm from "../components/BankForm"
import CreateBank from "../components/modals/CreateBank"

const Banks = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="d-flex">
          <Button 
            variant="outline-secondary" size="lg"
            className="d-flex align-self-end mt-2 mb-3"
            style={{color: "white", border: "1px solid white"}}
            onClick={() => setVisible(true)}
          >
            Create bank
          </Button>
      <CreateBank show={visible} onHide={() => setVisible(false)} />
      <BankForm />
    </div>
  )
}

export default Banks