import React, { useContext } from "react"
import { Context } from ".."
import { Button, Container, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import userImg from"../assets/user.png"

const NavBar = () => {
  const { store } = useContext(Context)
  const navigate = useNavigate()
  // style={{background: "blue"}}
  return (
    <Container className="d-flex justify-content-end">
       <div className="mt-2">
       {store.isAuth ? 
       <div>
        <Button
          variant="outline-light" size="lg" 
          style={{border: "none"}} 
          onClick={() => navigate("/")}
        >
          Main
        </Button>
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
              onClick={() => () => {
                store.setUser({})
                store.setIsAuth(false)
              }}
          >
            <Image src={userImg} height={25}/> Sign out
          </Button>
          </div>
          :
          <Button
          variant="outline-light" size="lg" 
          style={{border: "none"}} 
            onClick={() => {navigate("/sign_in"); store.setIsAuth(true)}}
          >
            <Image src={userImg} height={25}/> Sign in
          </Button>
        }  
      </div>
    </Container>
  )
}

export default NavBar