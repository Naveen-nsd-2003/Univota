/* import React,{useState,useEffect,useContext} from "react";

//INTERNAL IMPORTS
import  VoterCard  from "../components/voterCard/voterCard";
import  Style  from "../styles/voterList.module.css";
import { VotingContext } from "../context/Voter";

const voterList = () => {

  const {getAllVoterData,voterArray}=useContext(VotingContext);
  useEffect(() => {
    getAllVoterData();
  }, []);
  
  return(
    <div className={Style.voterList}>
    <h2 className={Style.sectionTitle}> Registered Voters</h2> 
       <VoterCard voterArray={voterArray}/>
     </div>
    
  );
};

export default voterList;
 */


import React, { useEffect, useContext } from "react";
import { VotingContext } from "../context/Voter";
import VoterCard from "../components/voterCard/voterCard"; // 🔼 fixed casing
import Style from "../styles/voterList.module.css";

const VoterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className={Style.voterList}>
      <h2 className={Style.title}>Registered Voters</h2>
      <VoterCard voterArray={voterArray} /> {/* 🔼 fixed casing */}
    </div>
  );
};

export default VoterList;
