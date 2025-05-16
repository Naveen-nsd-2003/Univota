/* 
import React, { useState, useEffect, useContext } from "react";
import Countdown from "react-countdown";

// INTERNAL IMPORTS
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css";
import Card from "../components/card/card";

const Index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    voterLength,
    currentAccount,
    getAllVoterData,
  } = useContext(VotingContext);

  const [votingEnded, setVotingEnded] = useState(false);
  const [votingDeadline, setVotingDeadline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      setLoading(true);
      await checkIfWalletIsConnected();
      await getAllVoterData();
      await getNewCandidate(); // Fetch candidate data

      const savedDeadline = localStorage.getItem("votingDeadline");

       if (savedDeadline && Number(savedDeadline) > Date.now())  {
        setVotingDeadline(Number(savedDeadline));
      } else {
        const newDeadline = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        localStorage.setItem("votingDeadline", newDeadline);
        setVotingDeadline(newDeadline);
      }

      setLoading(false);
    }

    initialize();
  }, []);

  useEffect(() => {
    if (votingDeadline && Date.now() >= votingDeadline) {
      setVotingEnded(true);
    }
  }, [votingDeadline]);

  return (
    <div className={Style.mainDashboard}>
      {loading ? (
        <h2 className={Style.loadingText}>Loading Voting Data...</h2>
      ) : (
        <>
          {currentAccount && (
            <div className={Style.topStatus}>
              <div className={Style.statBox}>
                <p>No. of Candidates</p>
                <h2>{candidateLength}</h2>
              </div>

              <div className={Style.statBox}>
                <p>No. of Voters</p>
                <h2>{voterLength}</h2>
              </div>

              <div className={Style.statBox}>
                <p>Voting Ends In</p>
                {!votingEnded && votingDeadline ? (
                  <Countdown
                    date={votingDeadline}
                    onComplete={() => setVotingEnded(true)}
                  />
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Voting Ended
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={Style.cardSection}>
            <Card
              candidateArray={candidateArray}
              giveVote={giveVote}
              votingEnded={votingEnded}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;






 */

import React, { useState, useEffect, useContext } from "react";
import Countdown from "react-countdown";

// INTERNAL IMPORTS
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css";
import Card from "../components/card/card";

const Index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    voterLength,
    currentAccount,
    getAllVoterData,
  } = useContext(VotingContext);

  const [votingEnded, setVotingEnded] = useState(false);
  const [votingDeadline, setVotingDeadline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function initialize() {
    setLoading(true);
    await checkIfWalletIsConnected();
    await getAllVoterData();
    await getNewCandidate();

    const savedDeadline = localStorage.getItem("votingDeadline");
    const votingHasEnded = localStorage.getItem("votingHasEnded");

    if (votingHasEnded === "true") {
      setVotingEnded(true);
    } else if (savedDeadline) {
      const deadline = Number(savedDeadline);
      if (deadline > Date.now()) {
        setVotingDeadline(deadline);
      } else {
        // Deadline has passed
        setVotingEnded(true);
        localStorage.setItem("votingHasEnded", "true");
      }
    } else {
      // First time setup
      const newDeadline = Date.now() + 5 * 60 * 1000; // 15 minutes from now
      localStorage.setItem("votingDeadline", newDeadline);
      setVotingDeadline(newDeadline);
    }

    setLoading(false);
  }

  initialize();
}, []);


  // Optional safety: Re-check if deadline has passed
  useEffect(() => {
    if (votingDeadline && Date.now() >= votingDeadline) {
      setVotingEnded(true);
      localStorage.setItem("votingHasEnded", "true");
    }
  }, [votingDeadline]);

  return (
    <div className={Style.mainDashboard}>
      {loading ? (
        <h2 className={Style.loadingText}>Loading Voting Data...</h2>
      ) : (
        <>
          {currentAccount && (
            <div className={Style.topStatus}>
              <div className={Style.statBox}>
                <p>No. of Candidates</p>
                <h2>{candidateLength}</h2>
              </div>

              <div className={Style.statBox}>
                <p>No. of Voters</p>
                <h2>{voterLength}</h2>
              </div>

              <div className={Style.statBox}>
                <p>Voting Ends In</p>
                {!votingEnded && votingDeadline ? (
                  <Countdown
                    date={votingDeadline}
                    onComplete={() => {
                      setVotingEnded(true);
                      localStorage.setItem("votingHasEnded", "true");
                    }}
                  />
                ) : (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Voting Ended
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={Style.cardSection}>
            <Card
              candidateArray={candidateArray}
              giveVote={giveVote}
              votingEnded={votingEnded}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
