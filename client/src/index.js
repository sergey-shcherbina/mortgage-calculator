import React, { createContext } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Store from "./store"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
export const Context = createContext(null)

root.render(
  <Context.Provider value={{store: new Store()}}>
    <App />
  </Context.Provider>
)