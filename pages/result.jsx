import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/result.module.css';
import { VotingContext } from '../context/Voter';
import { BigNumber } from 'ethers';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const Result = () => {
  const {
    candidateArray,
    voterLength,
    getTotalVotesCast,
  } = useContext(VotingContext);

  const [winner, setWinner] = useState(null);
  const [totalVotesCast, setTotalVotesCast] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (candidateArray && candidateArray.length > 0) {
  const sorted = [...candidateArray].sort((a, b) => {
    const votesA = BigNumber.from(a[4]);
    const votesB = BigNumber.from(b[4]);
    return votesB.sub(votesA).toNumber();
  });

  // 🔐 Only show winner if at least one vote was cast
  const hasVotes = sorted.some(candidate => BigNumber.from(candidate[4]).gt(0));

  if (hasVotes) {
    setWinner(sorted[0]);
  } else {
    setWinner(null);
  }
}


      if (getTotalVotesCast) {
        const total = await getTotalVotesCast();
        setTotalVotesCast(total);
      }
    };

    fetchData();
  }, [candidateArray, getTotalVotesCast]);

  const participation = voterLength > 0
    ? ((totalVotesCast / voterLength) * 100).toFixed(1)
    : 0;

  // 🎨 Bar colors for each candidate
  const barColors = ['#52cce8', '#a270f8', '#f47676', '#00c49f', '#ffc658', '#7d84e4'];

  // 🧠 Processed chart data with dynamic color
  const chartData = candidateArray.map((candidate, index) => ({
    name: candidate[1],
    votes: BigNumber.from(candidate[4]).toNumber(),
    fill: barColors[index % barColors.length],
  }));

  return (
    <div className={styles.resultContainer}>
      <h1 className={styles.heading}>Univota</h1>

      {winner ? (
  <div className={styles.winnerBox}>
    <img src={winner[3]} className={styles.winnerImage} alt="Winner" />
    <h2 className={styles.winnerName}>{winner[1]}</h2>
    <p className={styles.winnerVotes}>
      {BigNumber.from(winner[4]).toNumber()} Votes
    </p>
    <span className={styles.winnerBadge}>Winner 🏆</span>
  </div>
) : (
  <p className={styles.noVotesYet}>No votes have been cast yet.</p>
)}


      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Voting Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <h4>Total Registered Voters</h4>
          <p>{voterLength}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Total Votes Cast</h4>
          <p>{totalVotesCast}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Participation</h4>
          <p>{participation}%</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
