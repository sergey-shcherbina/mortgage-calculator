import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Main from "../pages/Main"
import Banks from "../pages/Banks"
import Calculator from "../pages/Calculator"
import Auth from "../pages/Auth"
import { Context } from ".."

const AppRouter = () => {
  const { store }  = useContext(Context)
  console.log(store)
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign_up" element={<Auth />} />
      <Route path="/sign_in" element={<Auth />} />
      <Route path="/banks" element={<Banks />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="*" element={<Main />} />
    </Routes>
  )
}

export default AppRouter