'use client'
import React,{useContext} from'react';
import { VotingContext } from '../context/VotingContext'
import Connected from './Connected';
import Card from './Card';

const Welcome = () => {
  const {candidates,votingStatus} = useContext(VotingContext);

  return (
    <div className='flex justify-center items-center'>
    <div className="fix h-screen w-screen bg-cover bg-no-repeat bg-center">
    <div className='pt-20'>
      <Connected />
        
    </div>
    <div className='flex flex-wrap mt-[20px] gap-[26px] justify-center items-center'>
    {
              candidates.map((candidate, index) => (
                <Card name="mario"  key={index} candidate={candidate} votingStatus={votingStatus} />
                ))
              }
    </div>
    </div>
    </div>
    
  )
}

export default Welcome