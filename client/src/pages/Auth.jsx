import React, {useContext, useState} from "react"
import {Container, Form, Button, Card, FloatingLabel} from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {signIn, signUp} from "../http/userAPI"
import {observer} from "mobx-react-lite"
import {Context} from ".."

const Auth = observer(() => {
	const { user } = useContext(Context)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
	const location = useLocation()
	const isSignIn = location.pathname === "/sign_in"
	const navigate = useNavigate()

	const signUser = async () => {
		 try {
			let data;
			if (isSignIn) {
				data = await signIn(email, password)
			} else {
				data = await signUp(email, password, name)
			}
      user.setUser(data)
			navigate("/")
      user.setIsAuth(true)
		  } catch (err) {
		  alert(err.response.data.message)
		}
	}

	return (
		<Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: "80vh"}}
    >
			<Card style={{width: 500}} className="p-4">
        <h2 className="m-auto" style={{fontSize: 36, fontWeight: 600}}>
          {isSignIn ? "Sign in" : "Sign up"}
        </h2>
				<Form className="d-flex flex-column mt-4">
    			{!isSignIn &&
             <FloatingLabel label="Full name">
               <Form.Control
                className="mb-3"
                placeholder="Full name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
             </FloatingLabel>
					}	
          <FloatingLabel label="Email address">
            <Form.Control
              type="email"
              className="mb-3"
              placeholder="name@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">	
            <Form.Control
              type="password"
              className="mb-3"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </FloatingLabel>
					<div className="d-flex flex-column pl-3 pr-3">
						{isSignIn ?
							<div className="d-flex justify-content-around">
								Don't have an account ? 
								<NavLink to={"/sign_up"}> Sign up !? </NavLink>
							</div>
							:
							<div className="d-flex justify-content-around">
								Already have an account ?<NavLink to={"/sign_in"}>Sign in !</NavLink>
							</div>
						}
            <Button 
							variant={"outline-primary"} size="lg"
							className="mt-3"
							onClick={signUser}
						>
							{isSignIn ? "Sign in" : "Sign up"}
						</Button>
          </div>
				</Form>
			</Card>
		</Container>		
	);
})        

export default Auth
