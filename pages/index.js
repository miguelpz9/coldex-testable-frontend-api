import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Select from 'react-select';
import styles from '../styles/Home.module.css';
import { ethers, providers, utils } from "ethers";

const CosmeticsABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "uri_",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "uri",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const cosmeticsAddress = "0xf6D98AfEB34AC02083114aBdA8fe044dC0371A8A";

const AvatarABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_cosmetics",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_API",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "admin1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "admin2",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "API",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_new",
				"type": "address"
			}
		],
		"name": "changeownersWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cosmetics",
		"outputs": [
			{
				"internalType": "contract ICosmetic",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "flipPauseStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getCosmetics",
		"outputs": [
			{
				"internalType": "uint256[10]",
				"name": "",
				"type": "uint256[10]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getCosmeticsName",
		"outputs": [
			{
				"internalType": "string[10]",
				"name": "cosmeticsName",
				"type": "string[10]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getLevel",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isPaused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[10]",
				"name": "cosmeticIds",
				"type": "uint256[10]"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_delete",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newAPI",
				"type": "string"
			}
		],
		"name": "setAPI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			}
		],
		"name": "setMaxSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_URI",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "setTokenURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "setUpdatePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[10]",
				"name": "cosmeticIds",
				"type": "uint256[10]"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "updateCosmetics",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_cosmetics",
				"type": "address"
			}
		],
		"name": "updateCosmeticsAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];
const avatarAddress = "0x593D3C25f143AcFA5881B1DA5345771CFA3b55a2";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [waitingTx, setWaitingTx] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [idsOwned, setIdsOwned] = useState([]);
  const [trait0, setTrait0] = useState(0);
  const [trait1, setTrait1] = useState(0);
  const [trait2, setTrait2] = useState(0);
  const [trait3, setTrait3] = useState(0);
  const [trait4, setTrait4] = useState(0);
  const [trait5, setTrait5] = useState(0);
  const [trait6, setTrait6] = useState(0);
  const [trait7, setTrait7] = useState(0);
  const [trait8, setTrait8] = useState(0);
  const [image, setImage] = useState("");
  const [trait9, setTrait9] = useState(0);
  const [isReceipt, setReceipt] = useState("");
  const [isTokenid, setTokenid] = useState("");
  // Is the wallet connected? metamask injects the "ethereum" object
  const walletConnected = async () => {

    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please download metamask");
      return;

    } else {
      console.log("Ethereum object found", ethereum);
    }

    // Get chain ID, trhow alert if not connected to Rinkeby
    chainID();

    //If site already connnected to metamask, get user public key
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log(`User account: ${account}`);

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      eventListener();

    } else {
      console.log("Site is not authorized to access metamask")
    }

  }


  // Function to connect site to the metamask wallet
  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        alert("Get metamask!");
        return;
      }
      // Connect to metamask wallet
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(`connected: ${accounts[0]}`)

      setCurrentAccount(accounts[0]);

      eventListener();

      openModal();

    } catch (e) {
      console.log(e)
    }
  }


  // function that listens for smart contract events
  const eventListener = async () => {

    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        // webhook, listening for smart contract events
        const event_name = "nftMinted";
        contract.on(event_name, (from, tokenId) => {
          console.log(`From: ${from} , TokenID: ${tokenId}`)

          var id = tokenId.toNumber();
          setTokenid(id)
          // alert(`It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${contractAddress}/${tokenId.toNumber()}`)

        })

      }
      console.log("Setup event listener!")

    } catch (e) {
      console.log(e);
    }
  }


  // Get user's current chain ID 
  const chainID = async () => {

    const { ethereum } = window;
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);
    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      //alert("You are not connected to the Rinkeby Test Network!");
    }
  }

  // Get user's current chain ID 
  const initPage = async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  }

  const layersOrder = [
    { name: "Background", ids: [0] },
    { name: "Eyeball", ids: [10, 11] },
    { name: "Eye Color", ids: [4, 5, 6, 7, 8, 9] },
    { name: "Iris", ids: [13, 14, 15] },
    { name: "Shine", ids: [16] },
    { name: "Bottom lid", ids: [1, 2, 3] },
    { name: "Top lid", ids: [17, 18, 19] },
    { name: "Goo", ids: [12] },
  ];

  const bgOptions = [
    { label: "Black", value: 0 },
  ];
  const blOptions = [
    { label: "Middle Lid", value: 1 },
    { label: "Lower Lid", value: 2 },
    { label: "Higher Lid", value: 3 },
  ];
  const eyeColorOptions = [
    { label: "Cyan", value: 4 },
    { label: "Green", value: 5 },
    { label: "Pink", value: 6 },
    { label: "Purple", value: 7 },
    { label: "Orange", value: 8 },
    { label: "Yellow", value: 9 },
  ];
  const eyeOptions = [
    { label: "Red", value: 10 },
    { label: "White", value: 11 },
  ];
  const gooOptions = [
    { label: "Green Goo", value: 12 },
  ];
  const irisOptions = [
    { label: "Big Iris", value: 13 },
    { label: "Medium Iris", value: 14 },
    { label: "Small Iris", value: 15 },
  ];
  const shineOptions = [
    { label: "Shiny Shine", value: 16 },
  ];
  const tlOptions = [
    { label: "Upper Lid", value: 17 },
    { label: "Middle Lid", value: 18 },
    { label: "Lower Lid", value: 19 },
  ];
  // Mint an NFT and get tx hash
  const mintNFT = async () => {

    const { ethereum } = window;
    try {
      if (ethereum) {
        chainID();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(avatarAddress, AvatarABI, signer);

        let traits = [
          trait0,
          trait1,
          trait2,
          trait3,
          trait4,
          trait5,
          trait6,
          trait7,
          0,
          0,
        ]

        if(trait0 != 0 || trait1 != 0 || trait2 != 0 || trait3 != 0 || trait4 != 0 || trait5 != 0 || trait6 != 0 || trait7 != 0){
          console.log(traits);
          // pop wallet to pay gas:
          let tx = await contract.mint(traits);
          setLoading(true)

          await tx.wait();

          console.log(`Transaction mined at https://rinkeby.etherscan.io/tx/${tx.hash}`);
          const hash = tx.hash;

          setReceipt(hash)
          setLoading(false)
        } else{
          alert("You must select at least one trait!");
        }
      }

      setLoading(false)

    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const approveCosmetics = async () => {

    const { ethereum } = window;
    try {
      if (ethereum) {
        chainID();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(cosmeticsAddress, CosmeticsABI, signer);

        // pop wallet to pay gas:
        let tx = await contract.setApprovalForAll(avatarAddress, true);
        setWaitingTx(true);
        await tx.wait();

        console.log(`Transaction mined at https://rinkeby.etherscan.io/tx/${tx.hash}`);
        const hash = tx.hash;
        setIsApproved(true)
        setReceipt(hash)
        setWaitingTx(false);
      }

      setLoading(false)

    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  // handle selection
  const handleChangeBg = value => {
    setTrait0(value.value);
    let traits = [
      value.value,
      trait1,
      trait2,
      trait3,
      trait4,
      trait5,
      trait6,
      trait7
    ]
    console.log(value);
    console.log(value.value)
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeTl = value => {
    setTrait6(value.value);
    let traits = [
      trait0,
      trait1,
      trait2,
      trait3,
      trait4,
      trait5,
      value.value,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeIr = value => {
    setTrait3(value.value);
    let traits = [
      trait0,
      trait1,
      trait2,
      value.value,
      trait4,
      trait5,
      trait6,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeEy = value => {
    setTrait1(value.value);
    let traits = [
      trait0,
      value.value,
      trait2,
      trait3,
      trait4,
      trait5,
      trait6,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeSh = value => {
    setTrait4(value.value);
    let traits = [
      trait0,
      trait1,
      trait2,
      trait3,
      value.value,
      trait5,
      trait6,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeGo = value => {
    setTrait7(value.value);
    let traits = [
      trait0,
      trait1,
      trait2,
      trait3,
      trait4,
      trait5,
      trait6,
      value.value
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeBl = value => {
    setTrait5(value.value);
    let traits = [
      trait0,
      trait1,
      trait2,
      trait3,
      trait4,
      value.value,
      trait6,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }
  const handleChangeEc = value => {
    setTrait2(value.value);
    let traits = [
      trait0,
      trait1,
      value.value,
      trait3,
      trait4,
      trait5,
      trait6,
      trait7
    ]
    setImage(`http://localhost:3000/api/generateImage?traits=[${traits}]`);
  }


  const renderMiddle = () => {
    if (isLoading) {
      return (
        <div>
          <p>LOADING</p>
        </div>
      )
    } else {
      if (currentAccount !== "") {
        return (
          <div className='flex flex-col w-full h-screen'>
            <h3 className=''>Your wallet: {currentAccount}</h3>
            <div className='grid w-[40%] mx-auto grid-cols-12 grid-rows-6'>
              <Select className="select col-start-1 col-span-3 mt-12 row-start-2" options={bgOptions} onChange={handleChangeBg} placeholder="Background" />
              <Select className="select col-start-1 col-span-3 mt-12 row-start-3" options={tlOptions} onChange={handleChangeTl} placeholder="Top lid" />
              <Select className="select col-start-1 col-span-3 mt-12 row-start-4" options={eyeColorOptions} onChange={handleChangeEc} placeholder="Eye color" />
              <Select className="select col-start-1 col-span-3 mt-12 row-start-5" options={blOptions} onChange={handleChangeBl} placeholder="Bottom Lid" />
              <Select className="select col-start-4 col-span-6 col-span mt-12 row-start-1" options={bgOptions} placeholder="EMPTY" />
              <img className='col-start-4 col-span-6 row-span-4 mx-auto my-auto row-start-2 p-6' src={image}></img>
              <Select className="select col-start-4 col-span-6 mt-12 row-start-6" options={bgOptions} placeholder="EMPTY" />
              <Select className="select col-start-10 col-span-3 mt-12 row-start-2" options={gooOptions} onChange={handleChangeGo} placeholder="Goo" />
              <Select className="select col-start-10 col-span-3 mt-12 row-start-3" options={irisOptions} onChange={handleChangeIr} placeholder="Iris" />
              <Select className="select col-start-10 col-span-3 mt-12 row-start-4" options={shineOptions} onChange={handleChangeSh} placeholder="Shine" />
              <Select className="select col-start-10 col-span-3 mt-12 row-start-5" options={eyeOptions} onChange={handleChangeEy} placeholder="Eyeball" />
            </div>
            {isApproved ? <button className='bg-blue-600 text-white rounded-2xl w-[40%] mx-auto mt-8 h-12' onClick={mintNFT}>MINT</button> : <button className='bg-orange-600 text-white rounded-2xl w-[40%] mx-auto mt-8 h-12' onClick={approveCosmetics}>Approve Cosmetics</button>}
          </div>
        );
      } else {
        return (
          <button className='bg-blue-600 text-white rounded-2xl w-56 h-12' onClick={initPage}>Connect Wallet</button>
        );
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {renderMiddle()}
      </main>

    </div>
  )
}
