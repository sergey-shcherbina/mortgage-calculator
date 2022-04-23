import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { Button, Container, Image, Navbar, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Context } from ".."
import userImg from"../assets/user.png"
import CreateBank from "./modals/CreateBank"


const NavBar = observer (() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [show, setShow] = useState(false)
  
  return (
    <Navbar bg="secondary">
      <Container>
        <div className="d-block">
          <Button
            variant="outline-light" size="lg" 
            style={{border: "none"}}
            onClick={() => {
              user.isAuth ? setVisibleCreate(true) : setShow(true)
            }}
          >
            Create bank
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
            Main
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
                  Calculator
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
                  // user.setIsAuth(true)
                  setShow(false)
                }}
              >
                <Image src={userImg} height={25}/> Sign in
              </Button>
            } 
          </div> 
        </div>
      </Container>
      <CreateBank show={visibleCreate} onHide={() => setVisibleCreate(false)} />
    </Navbar>    
  )
})

export default NavBar

