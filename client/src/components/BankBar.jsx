import React, { useContext } from "react"
import { Row } from "react-bootstrap"
import { Context } from ".."

const BankBar = ({ loan, rate, term, interval }) => {
  const { bank } = useContext(Context)
  return (
    <>
      <div style={{fontWeight: 700}}>Banks that meet the loan terms </div>
        <Row style={{maxHeight: 350, overflow: "auto"}}>
          {[...bank.banks].filter(bank => bank.maxLoan - bank.minPayment * bank.maxLoan / 100 > loan && bank.loanInterest <= rate &&
            bank.minLoanTerm * bank.interval <= term * interval && bank.maxLoanTerm * 12 >= term * interval)
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return - 1 
              return 1
            }).map((currentBank, index) =>
            <Row key={currentBank.id} style={{background: index % 2 === 0 ? "transparent" : "whitesmoke", padding: "3px 3px 3px 25px"}}>
              {currentBank.name} (rate - {currentBank.loanInterest}%)
            </Row>
          )}
        </Row>
    </>
  )
}

export default BankBar