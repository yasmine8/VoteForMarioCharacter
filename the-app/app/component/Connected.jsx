'use client'
import React,{useContext} from 'react'
import { VotingContext } from '../context/VotingContext'
import Countdown from 'react-countdown';

const Connected = () => {
    const {remainingTime,currentAccount,hasVoted,votingStatus} = useContext(VotingContext);

      
    return (
    <div className="flex items-center justify-between p-4">
        <div className="text-gray-700 font-semibold">
            Decentralized Voting App
        </div>
        <div className="text-3xl font-bold text-center my-2">
            {
            votingStatus ?
            currentAccount.length > 0
                ? hasVoted ? 'Vote for your favorite character' : 'You have already voted!'
                : 'Connect to vote for your favorite character'
              : 'Vote Ended !'
            }
        </div>
        <div className="text-gray-700 font-semibold  items-center ">
            {/* <p>Time left: {formatTime(timeLeft)}</p> */}
            <p>Time Left</p>
            <p><Countdown date={Date.now() + remainingTime*1000} /></p>
        </div>
    </div>


  )
}

export default Connected