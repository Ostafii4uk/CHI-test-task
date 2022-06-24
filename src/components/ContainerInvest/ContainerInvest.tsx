import React, { useState } from 'react';
import { Loan } from '../../types';
import './ContainerInvest.scss';

type Props = {
  loan: Loan | undefined,
  setVisivleBoxInvestId: any,
  setAvailableAmount: any,
  availableAmount: string,
  setInvested: any
}

export const ContainerInvest: React.FC<Props> = ({ 
  loan,
  setVisivleBoxInvestId,
  setAvailableAmount,
  availableAmount,
  setInvested
}) => {
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);

  const getDaysTime = (seconds: string | undefined): string | undefined => {
    if (seconds !== undefined) {
      const sec = +seconds;
      const mins = sec / 60;
      const hours = mins / 60;
      const days = hours / 24;
      const month = days / 31;

      return `${Math.floor(month)}month ${Math.floor(days)}days`
    }
  }

  const calculateNewSumAmount = (prevValue: string, query: string) => {
    return +prevValue - +query;
  }

  return (
    <div className='invest'>
      <div className='invest__wrapper'>
        <h2 className='invest__title'>
          Invest in Loan
        </h2>
        <div className="invest__description">
          <h3 className='invest__subtitle'>
            {loan?.title}
          </h3>

          <p className='invest__details'>
            {`Amount available: $${loan?.available}`}
          </p>
          <p className='invest__details'>
            Loan ends in: {getDaysTime(loan?.term_remaining)}
          </p>
        </div>

        <h2 className='invest__amount'>
          Investment amount
        </h2>
      </div>
      <div className="invest__value">
        <input 
          type="number"
          className='invest__input'
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            setQueryError(false);
          }}
          placeholder='Type a number'
        />
        <button 
          className='loan__button'
          onClick={() => {
            if (query) {
              setAvailableAmount(calculateNewSumAmount(availableAmount, query));
              setInvested((currentInvested: any) => [...currentInvested, loan?.id]);
              setQuery('');
              setVisivleBoxInvestId();
            } else {
              setQueryError(true)
            }
          }}
        >
          invest
        </button>
      </div>
      {queryError
        &&
          <div className="invest__error">
            Please enter the number
          </div>
      }
      <svg
        onClick={() => setVisivleBoxInvestId('')}
        className='invest__close'
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 8L8 24" stroke="#303247" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 8L24 24" stroke="#303247" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  )
}