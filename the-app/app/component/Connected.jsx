'use client'
import React,{useContext,useState,useEffect} from 'react'
import { VotingContext } from '../context/VotingContext'
import Countdown from 'react-countdown';
import { createTimeModel, useTimeModel } from "react-compound-timer";
const Connected = () => {
    const {remainingTime,currentAccount,hasVoted,votingStatus} = useContext(VotingContext);
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(remainingTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(timeLeft.total - 1);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  function calculateTimeLeft(seconds) {
    const total = seconds;
    const days = Math.floor(total / (60 * 60 * 24));
    const hours = Math.floor((total / (60 * 60)) % 24);
    const minutes = Math.floor((total / 60) % 60);
    const secondsLeft = Math.floor(total % 60);

    return { total, days, hours, minutes, seconds: secondsLeft };
  }

  
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
        <p>Remaining Time:</p>
        <div>
      {timeLeft.total > 0 ? (
        <div>
            {timeLeft.days} d {timeLeft.hours} h {timeLeft.minutes} m {' '}
            {timeLeft.seconds} s
          </div>
        ) : (
          <div>Voting has ended!</div>
        )}
      </div>
   
        </div>
    </div>


  )
}

export default Connected