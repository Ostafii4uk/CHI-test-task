import React, { useState } from 'react';
import './App.scss';
import loansFromServer from './api/current-loans.json'
import { LoansList } from './components/LoansList/LoansList';
import { Loan } from './types';
import { ContainerInvest } from './components/ContainerInvest/ContainerInvest';

export const App: React.FC = () => {
  const [visivleBoxInvestId, setVisivleBoxInvestId] = useState('');

  const getSumAmount = (loans: Loan[]): string => {
    const result: number[] = loans.map((loan) => Number(loan.amount));

    return `${(result.reduce((a: number, b: number) => a + b)).toFixed(3)}`;
  }
  const [availableAmount, setAvailableAmount] = useState(getSumAmount(loansFromServer));


  const getLoanActive = (loans: Loan[], id: string): Loan | undefined => {
    return loans.find(loan => loan.id === id)
  }

  const [invested, setInvested] = useState([]);

  console.log(invested);
  return (
    <div className="app">
      <h1 className='app__title'>
        Current Loans
      </h1>

      <div className="app__content">
        <LoansList
          loans={loansFromServer}
          setVisivleBoxInvestId={setVisivleBoxInvestId}
          invested={invested}
        />
        {visivleBoxInvestId
          &&
            <div className="app__container">
              <ContainerInvest
                loan={getLoanActive(loansFromServer, visivleBoxInvestId)}
                setVisivleBoxInvestId={setVisivleBoxInvestId}
                setAvailableAmount={setAvailableAmount}
                availableAmount={availableAmount}
                setInvested={setInvested}
              />
            </div>
        }
      </div>

      <div className="app__amount">
        <h3 className='app__amount-description'>
          Total amount available for investment:
        </h3>
        <p className='app__amount-value'>
          ${availableAmount}
        </p>
      </div>
    </div>
  )
};

