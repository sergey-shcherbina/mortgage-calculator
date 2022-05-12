import React from "react"
import { Table } from "react-bootstrap"

const DataTable = ({ data, total }) => {
  return (
    <div>
      <div className="mt-4 mb-1 d-flex" style={{fontSize: 20, fontWeight: 700}}>
            Payment schedule 
          <div style={{fontSize: 14, fontWeight: 500, margin: "5px 0 0 5px"}}>(P.d. - "payment days")</div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th><div className="d-flex justify-content-center">№</div></th>
                <th><div className="d-flex justify-content-center">Date</div></th>
                <th><div className="d-flex justify-content-center">P.d.</div></th>
                <th><div className="d-flex justify-content-center">Amount of payment</div></th>
                <th><div className="d-flex justify-content-center">Principal payment</div></th>
                <th><div className="d-flex justify-content-center">Interest charges</div></th>
                <th><div className="d-flex justify-content-center">Balance owed</div></th>
                <th><div className="d-flex justify-content-center">Total balance</div></th>
              </tr>
            </thead>
            <tbody>
              {data.map((currentData, index) =>
                <tr key={index} style={{fontWeight: 500}}>
                  <td><div className="d-flex justify-content-center">{index + 1}</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.currentMonth} {currentData.currentYear}</div></td>
                  <td><div className="d-flex justify-content-center">{currentData.pd}</div></td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {currentData.currentPayment && currentData.currentPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {currentData.currentDebt && currentData.currentDebt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {currentData.currentInterest && currentData.currentInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                      </div>
                    </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {(currentData.currentRemainder + 0.001).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {index === data.length - 1 ? - (total -= currentData.currentPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") :
                      (total -= currentData.currentPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $
                    </div>
                  </td>
                </tr>
              )}
              <tr><td colSpan={8} style={{borderTop: "2px solid black"}}></td></tr>
            </tbody>
          </Table>
    </div>
  )
}
//
export default DataTable