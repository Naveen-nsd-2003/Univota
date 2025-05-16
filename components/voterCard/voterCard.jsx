/* import React from "react";
import Image from 'next/image';
// internal import

import Style from '../card/card.module.css';
import  images  from "../../assets";
import voterCardStyle from "./voterCard.module.css";

const voterCard = ({voterArray}) => {
  return (
    <div className={Style.card}>
      {voterArray.map((el,i)=>(
        <div className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[4]} alt="profile photo"/>
          </div>
          <div className={Style.card_info}>
              <h2>
                {el[1]} #{el[0].toNumber()}
              </h2>
              <p>Address: {el[3].slice(0,30)}...</p>
              <p>Details</p>
              <p className={voterCardStyle.voter_status}> {el[6]== true ? "You are already voted": "Not voted"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default voterCard; */


/* import React from "react";
import Image from 'next/image';
// internal import

import Style from '../card/card.module.css';
import  images  from "../../assets";
import Style from "./voterCard.module.css";

const VoterCard = ({ voterArray }) => {
  return (
    <div className={Style.voterCardGrid}>
      {voterArray.map((el, i) => (
        <div key={i} className={Style.cardItem}>
          <img src={el[4]} alt="Voter" />
          <h4>{el[1]} #{el[0].toNumber()}</h4>
          <p><strong>Address:</strong> {el[3].slice(0, 30)}...</p>
          <p
            className={`${Style.voter_status} ${!el[6] ? Style.notVoted : ""}`}>
            {el[6] ? "You are already voted" : "Not voted"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VoterCard; */ 

import React from "react";
//import Style from '../card/card.module.css';
import images  from "../../assets";
import Style from "./voterCard.module.css";


 

const VoterCard = ({ voterArray }) => {

  console.log("Voter Array:", voterArray);
  if (!voterArray || voterArray.length === 0) {
    return <p style={{ textAlign: "center" }}>No voters found.</p>;
  }

  return (
    <div className={Style.voterCardGrid}>
      {voterArray.map((el, i) => (
        <div key={i} className={Style.cardItem}>
          <img src={el[4]} alt="Voter" className={Style.image} />
          <h4>{el[1]} #{el[0].toNumber()}</h4>
          <p><strong>Address:</strong> {el[3].slice(0, 20)}....{el[3].slice(-6)}</p>
          <p className={el[6] ? Style.voted : Style.notVoted}>
            {el[6] ? "You have already voted" : "Not Voted"}
          </p>
        </div>
      ))}
    </div>
     

  );
};



export default VoterCard;
