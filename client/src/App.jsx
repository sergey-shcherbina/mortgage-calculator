import { Container } from "react-bootstrap"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"

const App = () => {
  return (
    <Container style={{background: "blue", backgroundSize: "cover", minHeight: "95vh"}}>
      <BrowserRouter>
        <NavBar /> 
        <AppRouter />
      </BrowserRouter>
    </Container>
  )
}

export default App
