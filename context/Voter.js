

import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";
import { VotingAddress, VotingAddressABI } from "./constants";
import { toast } from "react-toastify";
import { BigNumber } from 'ethers';


const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateArray, setCandidateArray] = useState([]);
  const [voterArray, setVoterArray] = useState([]);
  const [candidateLength, setCandidateLength] = useState(0);
  const [voterLength, setVoterLength] = useState(0);
  const [error, setError] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return setError("Please install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllVoterData();
        getNewCandidate();
      }
    } catch (err) {
      setError("Error checking wallet connection");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setError("Please install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      await getAllVoterData(); // may be remove if not works
      await getNewCandidate(); // may be remove if not works
    } catch (err) {
      setError("Error connecting wallet");
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: `3b84c12c994829d24703`,
          pinata_secret_api_key: `8648bc1e13e2d99e423fabda9aa84ce76e61cb94bb64447477b31b59be582a3d`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      return ImgHash;
    } catch (err) {
      setError("Error uploading image to IPFS");
    }
  };

  const uploadToIPFSCandidate = uploadToIPFS;

  const createVoter = async (formInput, fileUrl, router) => {
    const { name, address, position } = formInput;
    if (!name || !address || !position) return setError("All fields are required");

    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const metadata = JSON.stringify({ name, address, position, image: fileUrl });

      const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          pinata_api_key:`3b84c12c994829d24703`,
          pinata_secret_api_key: `8648bc1e13e2d99e423fabda9aa84ce76e61cb94bb64447477b31b59be582a3d`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      const tx = await contract.voterRight(address, name, url, fileUrl);
      await tx.wait();
      await getAllVoterData();
      router.push("/voterList");
    } catch (err) {
      setError("Failed to create voter");
    }
  };

  const setCandidate = async (formInput, fileUrl, router) => {
    const { name, address, age } = formInput;
    if (!name || !address || !age) return setError("All fields are required");

    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const metadata = JSON.stringify({ name, address, age, image: fileUrl });

      const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          pinata_api_key:`3b84c12c994829d24703`,
          pinata_secret_api_key:`8648bc1e13e2d99e423fabda9aa84ce76e61cb94bb64447477b31b59be582a3d`,
          "Content-Type": "application/json",
        },
      });

      const url =`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      const tx = await contract.setCandidate(address, age, name, fileUrl, url);
      await tx.wait();
      await getNewCandidate();
      router.push("/");
    } catch (err) {
      setError("Failed to set candidate");
    }
  };

  const getAllVoterData = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voterList = await contract.getVoterList();
      const voters = await Promise.all(
        voterList.map(async (addr) => {
          return await contract.getVoterData(addr);
        })
      );

      setVoterArray(voters);
      const length = await contract.getVoterLength();
      setVoterLength(length.toNumber());
    } catch (err) {
      setError("Failed to fetch voter data");
    }
  };

  const getNewCandidate = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const candidates = await contract.getCandidate();
      const fullData = await Promise.all(
        candidates.map(async (addr) => {
          return await contract.getCandidatedata(addr);
        })
      );

      setCandidateArray(fullData);
      const length = await contract.getCandidateLength();
      setCandidateLength(length.toNumber());
    } catch (err) {
      setError("Failed to fetch candidates");
    }
  };
  // Get Total Votes Cast
const getTotalVotesCast = async () => {
  try {
    let total = 0;
    for (const candidate of candidateArray) {
      total += BigNumber.from(candidate[4]).toNumber();
    }
    return total;
  } catch (error) {
    console.error("Error calculating total votes:", error);
    return 0;
  }
};




  const giveVote = async ({ id, address }) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.vote(address, id);
      await tx.wait();
      toast.success("Vote submitted successfully");
    } catch (err) {
      toast.error("Vote failed");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <VotingContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        uploadToIPFSCandidate,
        createVoter,
        getAllVoterData,
        setCandidate,
        getNewCandidate,
        getTotalVotesCast,
        giveVote,
        error,
        currentAccount,
        candidateArray,
        voterArray,
        candidateLength,
        voterLength,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default VotingProvider; 








