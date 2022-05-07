

export const normalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export  const initMonths = [...normalMonths].slice(new Date().getMonth()).concat([...normalMonths].splice(0, new Date().getMonth()))
export  const years = Array(5).fill(new Date().getFullYear()).map((curYear, i) => curYear + i)

export const months = month => month ? [...initMonths].slice([...initMonths].indexOf(month))
.concat([...initMonths].splice(0, [...initMonths].indexOf(month))) : initMonths
export const allMonths = (month, term, interval) =>  Array(Math.floor(term * interval / 12))
.fill(months(month)).flat().concat(...months(month).slice(0, (term * interval % 12)))

export const newYear = (i, year, month, term, interval) => Number(year) + Math.ceil((i - allMonths(month, term, interval).indexOf("December")) / 12)
export const pd = (i, year,month, term, interval) => new Date(newYear(i, year,month, term, interval), normalMonths.indexOf(allMonths(month, term, interval)[i]) + 1, 0).getDate()
export const interest = (debt, int) => int / 100 / 12 * debt
export const mp = (int, loan, term, interval, payment) => int / 12 / 100 * (1 + int / 12 / 100) ** (
  term * interval) / ((1 + int / 12 / 100) ** (term * interval) - 1) * (loan - payment)

export const data = (month, term, interval, year, monthlyPayment, checked, monthlyDebt, debt, loan, payment, int) => { 
  Array(allMonths(month, term, interval).length).fill({}).map((newData, i) => { 
  return {...newData, currentMonth: allMonths(month, term, interval)[i], currentYear: newYear(i, year, month, term, interval),
    pd: pd(i, year, month, term, interval), currentPayment: checked === "Annuity" ? monthlyPayment : checked === "Differentiated" && 
    monthlyDebt + interest(loan - payment - monthlyDebt * i, int), currentInterest: checked === "Annuity" ? 
    interest(debt, int) : checked === "Differentiated" && interest(loan - payment - monthlyDebt * i, 
    int), currentDebt: checked === "Annuity" ? monthlyPayment - interest(debt, int) : 
    checked === "Differentiated" && monthlyDebt, currentRemainder: checked === "Annuity" ? debt -= (monthlyPayment - 
    interest(debt, int)) : checked === "Differentiated" && (loan - payment) - monthlyDebt * (i + 1)
  }})  
} 

// const normalMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  // const initMonths = [...normalMonths].slice(new Date().getMonth()).concat([...normalMonths].splice(0, new Date().getMonth()))
  // const months = month ? [...initMonths].slice([...initMonths].indexOf(month)).concat([...initMonths].splice(0, [...initMonths].indexOf(month))) : initMonths
  //
  //  const allMonths = Array(Math.floor(term * interval / 12)).fill(months).flat().concat(...months.slice(0, (term * interval % 12)))
  // const years = Array(5).fill(new Date().getFullYear()).map((curYear, i) => curYear + i)

  // const newYear = (i, year) => Number(year) + Math.ceil((i - allMonths(month, term, interval).indexOf("December")) / 12)
  // const pd = (i, year,month, term, interval) => new Date(newYear(i, year,month, term, interval), normalMonths.indexOf(allMonths(month, term, interval)[i]) + 1, 0).getDate()

  // const interest = (debt) => bank.selectedBank.loanInterest / 100 / 12 * debt