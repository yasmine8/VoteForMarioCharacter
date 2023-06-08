"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
export const VotingContext = React.createContext();
import {contractAddress, contractAbi} from '../Constant/constant';

export const VotingProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [remainingTime, setremainingTime] = useState('');
    const [votingStatus, setVotingStatus] = useState(true);

    useEffect(() => {
      checkIfWalletIsConnect();
      getCandidates();
      getRemainingTime();
      getCurrentStatus();
      canVote() ;
    }, []);
    const getCandidates =async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            try {
                //const data = await contract.getNumber(overrides);
                const candidatesList = await contract.getAllVotesOfCandiates();
                const formattedCandidates = candidatesList.map((candidate, index) => {
                    return {
                        index: index,
                        name: candidate.name,
                        voteCount: candidate.voteCount.toNumber(),
                        image: candidate.image
                    }
                    });
                      setCandidates(formattedCandidates);
            }
            catch(err) {
                setError('There is an error. ',err);
            }
        } else {
            console.log("Ethereum is not present");
        }
        };
      async function getRemainingTime() {
        try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //await provider.send("eth_requestAccounts", []);
        const contractInstance = new ethers.Contract (
          contractAddress, contractAbi, provider
        );
        const time = await contractInstance.getRemainingTime();
        setremainingTime(parseInt(time, 16));
          }catch(e) {
            console.log("There is an error: ",e);
        } 
      }

    const checkIfWalletIsConnect = async () => {
        if(typeof window.ethereum !== 'undefined') {
            try{
              const accounts = await window.ethereum.request({method:'eth_accounts'});
              if (accounts.length>0) {
                setCurrentAccount(accounts[0]);
                console.log(accounts[0]);
              }else{
                console.log("Connect to Metamask using the connect button");
              }
            } catch(err){
              console.error(err);
            }
          }else{
      
          }
      };
      const connectWallet = async () => {
        if(typeof window.ethereum !== 'undefined') {
            try{
              const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
              setCurrentAccount(accounts[0]);
              canVote()
              console.log(accounts[0]);
            } catch(err){
              console.error(err);
            }
          }else{
      
          }
      };
      


    const vote = async(num) => {
      console.log("voting");
      if(typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
      try {
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          
          let voting = await contract.vote(num);
          await voting.wait();
          console.log("You have voted !");
          getHasVoted()
          canVote();
      }
      catch {
          console.log("There is an error");
      }  
    }
    }
    async function canVote() {
      console.log("can vote");
      try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setHasVoted(!voteStatus);
      }catch(e) {
        console.log("There is an error: ",e);
    }  
    }

  

  async function getCurrentStatus() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //await provider.send("eth_requestAccounts", []);
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, provider
      );
      const status = await contractInstance.getVotingStatus();
      console.log(status);
      setVotingStatus(status);
      //setableToVote(status)
    }catch(e) {
      console.log("There is an error: ",e);
    } 
  }

  return (
    <VotingContext.Provider
       value={{connectWallet,
        currentAccount,
        candidates,
        hasVoted,
        vote,
        remainingTime,
        votingStatus

    }}
      >
        {children}
      </VotingContext.Provider>
  )
};
