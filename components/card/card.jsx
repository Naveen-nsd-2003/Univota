/* import React from "react";
import Image from "next/image";

// internal imports
import Style from "../card/card.module.css";
import images from "../../assets";

const Card = ({ candidateArray , giveVote }) => {
  //console.log("📦 Candidate Array:", candidateArray); // 👈 Step 1: Check what's coming from context

  return (
    <div className={Style.card}>
      {candidateArray.map((el, i) => (
        <div className={Style.card_box}>
          <div className={Style.images}>
          <img src={el[3]} alt="profile photo" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          </div>
          <div className={Style.card_info}>
            <h2>
              {el[1]} #{el[2].toNumber()}
            </h2>
            <p>{el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            <p className={Style.total}>Total Vote</p>
          </div>
          <div className={Style.card_vote}>
            <p>{el[4].toNumber()}</p>
          </div>
          <div className={Style.card_button}>
            <button
              onClick={() =>
                giveVote({ id: el[2].toNumber(), address: el[6] })
              }
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
 */


import React from "react";
import Image from "next/image";
import { FaVoteYea } from "react-icons/fa"; // Icon for voting
import Style from "../card/card.module.css";

const Card = ({ candidateArray, giveVote, votingEnded }) => {
  return (
    <div className={Style.card}>
      {candidateArray.map((el, i) => (
        <div key={i} className={Style.card_box}>
          {/* Candidate Image */}
          <div className={Style.images}>
            <img
              src={el[3]}
              alt="profile photo"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>

          {/* Candidate Info */}
          <div className={Style.card_info}>
            <h2>{el[1]} #{el[2].toNumber()}</h2>
            <p>{el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            <p className={Style.total}>Total Vote</p>
          </div>

          {/* LIVE Vote Count */}
          <div className={Style.voteCountBox}>
            <span className={Style.voteIcon}><FaVoteYea /></span>
            <span className={Style.voteCount}>{el[4].toNumber()} Votes</span>
          </div>

          {/* Vote Button */}
          <div className={Style.card_button}>
            <button
              onClick={() =>
                giveVote({ id: el[2].toNumber(), address: el[6] })
              }
              disabled={votingEnded}
            >
              {votingEnded ? "Voting Closed" : "Vote Now"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;


