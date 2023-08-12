// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Voting = await hre.ethers.getContractFactory("Voting");
  const candidateNames = ["Mario",
                        "Luigi",
                        "Bowser",
                        "Princess Peach",
                        "Toad",
                        "Donkey Kong",
                        "Yoshi",
                        "Wario"
                  ];
  const candidateImages = ["https://mario.nintendo.com/static/d783068682f98d6cfec666c747a27793/d6e64/mario.png",
                        "https://mario.wiki.gallery/images/7/72/MPSS_Luigi.png",
                        "https://mario.wiki.gallery/images/thumb/1/1a/NSMBW_Bowser_Artwork.png/800px-NSMBW_Bowser_Artwork.png",
                        "https://mario.wiki.gallery/images/2/21/MPSS_Peach.png",
                        "https://mario.wiki.gallery/images/8/89/MPS_Toad_Artwork.png",
                        "https://mario.wiki.gallery/images/8/84/MPS_Donkey_Kong_Artwork.png",
                        "https://mario.wiki.gallery/images/thumb/9/93/Yoshi_FS.png/800px-Yoshi_FS.png",
                        "https://mario.wiki.gallery/images/thumb/2/29/SMPWario.png/800px-SMPWario.png"
                  ];

  const dateTimeStamp = 1689868800; 
  const votingDurationInDays = 30; 
  const voting = await Voting.deploy(candidateNames,candidateImages,votingDurationInDays);

  await voting.deployed();

  console.log(
    `Voting contract deployed at ${voting.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
