'use client';
import React, { useContext, useEffect,useState ,useRef} from 'react'
import { VotingContext } from '../context/VotingContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
//import sound from './sound.mp3'

const Navbar = () => {
  const {connectWallet,currentAccount} = useContext(VotingContext);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    // Play the sound on initial launch
    audio.play();
    setIsPlaying(true);
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b-4 border-red-200">
    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <div className="flex items-center">
        <audio autoPlay muted ref={audioRef} src="/sounds/MarioKartSound.mp3" 
        
        />
        <button onClick={toggleSound} className="mr-2">
          {isPlaying ? (
            <FontAwesomeIcon icon={faVolumeHigh} className="text-red-500" />
          ) : (
            <FontAwesomeIcon icon={faVolumeXmark} className="text-red-500" />
          )}
        </button>
        <img
          src="/super-mario.png"
          className="h-8"
          alt="Flowbite Logo"
        />
      </div>
      
      <div className="flex md:order-2">
      {currentAccount.length>0 
                  ? 
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="text-red-600 bg-white hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2 text-center border-2 border-red-600 mr-3 md:mr-0"
                  >
                    <span className="font-bold">Connected:</span> {currentAccount.substring(0, 6)}...{currentAccount.substring(38)}
                  </button>

                  : 
                  <button
                    type="button"
                    onClick={connectWallet}
                    
             className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"     >
                    Connect Wallet
                  </button>
                }
       
      </div>
      <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
     
      </div>
    </div>
  </nav>
  

  )
}

export default Navbar