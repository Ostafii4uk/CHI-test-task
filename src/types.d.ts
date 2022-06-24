/// <reference types="react-scripts" />

export interface Loan {
  id: string,
  title: string,
  tranche: string,
  available: string,
  annualised_return: string,
  term_remaining: string,
  ltv: string,
  amount:string | number
}