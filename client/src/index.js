import React, { createContext } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import UserStore from "./store/UserStore" 
import BankStore from "./store/BankStore"

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    bank: new BankStore()
  }}>
    <App />
  </Context.Provider>,  
  document.getElementById("root")
)
//