'use client'
import React,{useContext} from 'react'
import { VotingContext } from '../context/VotingContext'

const Card = ({candidate}) => {
    const {vote,currentAccount,hasVoted,votingStatus} = useContext(VotingContext);
  return (
    
  <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow card-container card">
    <div className='flex justify-center items-center'>
      <img className="p-4 rounded-t-lg w-48 h-48 object-contain" src={candidate.image} alt="product image" />
    </div>
    <div className="px-4 py-3">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{candidate.name}</h5>
      </a>
        <div className='flex items-center justify-between'> 
        <div className="flex items-center">
        <img className="w-5 h-5 mr-2 object-contain" src="/coin.gif" alt="coin image" />
        <span className=" mx-4 text-base font-semibold text-gray-900">{candidate.voteCount} VOTES</span>
        </div>
        {currentAccount.length>0 && hasVoted && votingStatus
            &&
            <button 
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={() =>vote(candidate.index)}
            >Vote</button>

        }
      </div>
    </div>
  </div>


  )
}

export default Card