// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string name;
        string image;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;

    uint256 public votingEnd;

    constructor(string[] memory _candidateNames,string[] memory _candidateImages, uint256 votingDurationInDays) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                image : _candidateImages[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingEnd = block.timestamp + votingDurationInDays * 1 days;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name,string memory _image) public onlyOwner {
        candidates.push(Candidate({
                name: _name,
                image: _image,
                voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");
        require(block.timestamp <= votingEnd, "Voting period has ended.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingEnd) {
            return 0;
        } else {
            return votingEnd - block.timestamp;
        }
    }
}
