import React from 'react';
import { Loan } from '../../types';
import './LoansList.scss';

type Props = {
  loans: Loan[],
  setVisivleBoxInvestId: any,
  invested: string[]
}

export const LoansList: React.FC<Props> = ({ 
  loans,
  setVisivleBoxInvestId,
  invested
}) => {

  return (
    <div className='loan'>
      {loans.map((loan) => (
        <div 
          className='loan__item'
          key={loan.id}
        >
          <div className="loan__description">
            <h2 className='loan__title'>
              {loan.title}
            </h2>

            <p className='loan__details'>
              Annualised return: {loan.annualised_return}
            </p>
            <p className='loan__details'>
              Amount: {loan.amount}
            </p>
            <p className='loan__details'>
              Available: {loan.available}
            </p>
          </div>
          {invested.find(el => el === loan.id)
              &&
                <p
                  className='loan__invested'
                >
                  Invested
                </p>
          }
          <div className="loan__interaction">
            <button 
              className='loan__button'
              onClick={() => {
                  setVisivleBoxInvestId(loan.id);
                }
              }>
              invest
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}