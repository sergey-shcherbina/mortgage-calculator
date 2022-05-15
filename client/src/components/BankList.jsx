import React, { useContext } from "react"
import { ListGroup } from "react-bootstrap"
import { Context } from ".."

const BankList = ({ loan, payment, changeName }) => {
  const { bank } = useContext(Context)
  // const [name, setName] = useState("")
  return (
    <ListGroup style={{marginTop: -30}}>
      {[...bank.banks].filter(bank => bank.minPayment <= payment / loan * 100 && bank.maxLoan >= loan)
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return - 1 
          return 1
        }).map(currentBank =>
        <ListGroup.Item key={currentBank.id}
          className="d-flex justify-content-end"
          style={{cursor: "pointer", marginLeft: "auto"}}
          active={currentBank.name === bank.selectedBank.name} 
          onMouseOver={() => {
            bank.setSelectedBank(currentBank)
            changeName(currentBank.name)
          }}
        >
          {currentBank.name}. Loan term from {currentBank.minLoanTerm} {currentBank.interval === 12 ? 
          "month" : "years"} to {currentBank.maxLoanTerm} years at {currentBank.loanInterest} % per annum
        </ListGroup.Item>  
      )}
    </ListGroup>        
  )
}

export default BankList