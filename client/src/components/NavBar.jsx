import React, { useContext, useState } from "react"
import { Button, Container, Image, Navbar, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Context } from ".."
import { observer } from "mobx-react-lite"
import userImg from"../assets/user.png"
import EditBank from "./EditBank"

const NavBar = observer (() => {
  const { user, bank } = useContext(Context)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  
  return (
    <Navbar bg="secondary">
      <Container>
        <div className="d-block">
          <Button
            variant="outline-light" size="lg" 
            style={{border: "none"}}
            onClick={() => {
              user.isAuth && bank.setSelectedBank({name: "A-Bank", loanInterest: 10, maxLoan: 100000, minPayment: 20, minLoanTerm: 12, maxLoanTerm: 20, interval: 1})
              user.isAuth ? setVisible(true) : setShow(true)
            }}
          >
            Create a new bank
          </Button>
          {show &&
            <Alert variant="warning" onClose={() => setShow(false)} dismissible className="mt-3 ml-3">
              <Alert.Heading>Only authorized users are allowed to create banks</Alert.Heading>
            </Alert>
          }
        </div> 
        <div className="d-flex">
          <Button
            variant="outline-light" size="lg" 
            style={{border: "none"}} 
            onClick={() => navigate("/")}
          >
            General page
          </Button>
          <div>
            {user.isAuth ?
              <div>
                <Button
                  variant="outline-light" size="lg" 
                  style={{border: "none"}} 
                  onClick={() => navigate("/banks")}
                >
                  My Banks
                </Button>
                <Button
                  variant="outline-light" size="lg" 
                  style={{border: "none"}}  
                  onClick={() => navigate("/calculator")}
                >
                  My Calculator
                </Button>
                <Button
                  variant="outline-light" size="lg" 
                  style={{border: "none"}} 
                  onClick={() => {
                    user.setUser({})
                    user.setIsAuth(false)
                    navigate("/")
                  }}
                  >
                  <Image src={userImg} height={25}/> Sign out
                </Button>
              </div>
              :
              <Button
                variant="outline-light" size="lg" 
                style={{border: "none", marginLeft: "auto"}} 
                onClick={() => {
                  navigate("/sign_in")
                  setShow(false)
                }}
              >
                <Image src={userImg} height={25}/> Sign in
              </Button>
            } 
          </div> 
        </div>
      </Container>
      <EditBank show={visible} onHide={() => setVisible(false)} />
    </Navbar>    
  )
})
//
export default NavBar

