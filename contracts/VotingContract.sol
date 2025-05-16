
/* pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public voterId;
    Counters.Counter public candidateId;

    address public votingOrganizer;

    // Candidate for voting 
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreate(
        uint256 candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;

    // Voter Data
    address[] public voterAddress;
    address[] public votedVoters;

    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(address _address, string memory _age, string memory _name, string memory _image, string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "only organizer can create the candidate");

        candidateId.increment();
        uint256 idNumber = candidateId.current();

        Candidate storage candidate = candidates[_address];
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CandidateCreate(
            idNumber,
            _age,
            _name,
            _image,
            candidate.voteCount,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address) public view returns (string memory, string memory, uint256, string memory, uint256, string memory, address) {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address
        );
    }

    function voterRight(address _address, string memory _name, string memory _image, string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "only organizer can create voter");

        voterId.increment();
        uint256 idNumber = voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0, "voter already exists");

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        voterAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    function vote(address _candidateAddress, uint256 _candidateVoteId) external {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "you have already voted");
        require(voter.voter_allowed != 0, "you have no right to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voteCount += voter.voter_allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getVoterData(address _address) public view returns (uint256, string memory, string memory, address, string memory, uint256, bool) {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_ipfs,
            voters[_address].voter_allowed,
            voters[_address].voter_voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return voterAddress;
    }
}
 */
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public voterId;
    Counters.Counter public candidateId;

    address public votingOrganizer;

    uint256 public votingStartTime;
    uint256 public votingDuration = 5 minutes; // You can increase this if needed

    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreate(
        uint256 candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;

    address[] public voterAddress;
    address[] public votedVoters;

    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    constructor() {
        votingOrganizer = msg.sender;
        votingStartTime = block.timestamp; // Store deployment time
    }

    // ------------------- CANDIDATES -------------------

    function setCandidate(address _address, string memory _age, string memory _name, string memory _image, string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "Only organizer can create the candidate");

        candidateId.increment();
        uint256 idNumber = candidateId.current();

        Candidate storage candidate = candidates[_address];
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CandidateCreate(idNumber, _age, _name, _image, 0, _address, _ipfs);
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address) public view returns (
        string memory, string memory, uint256, string memory, uint256, string memory, address
    ) {
        Candidate memory c = candidates[_address];
        return (
            c.age,
            c.name,
            c.candidateId,
            c.image,
            c.voteCount,
            c.ipfs,
            c._address
        );
    }

    // ------------------- VOTERS -------------------

    function voterRight(address _address, string memory _name, string memory _image, string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "Only organizer can create voter");

        voterId.increment();
        uint256 idNumber = voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0, "Voter already exists");

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        voterAddress.push(_address);

        emit VoterCreated(idNumber, _name, _image, _address, 1, false, 1000, _ipfs);
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getVoterData(address _address) public view returns (
        uint256, string memory, string memory, address, string memory, uint256, bool
    ) {
        Voter memory v = voters[_address];
        return (
            v.voter_voterId,
            v.voter_name,
            v.voter_image,
            v.voter_address,
            v.voter_ipfs,
            v.voter_allowed,
            v.voter_voted
        );
    }

    function getVoterList() public view returns (address[] memory) {
        return voterAddress;
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    // ------------------- VOTING -------------------

    function vote(address _candidateAddress, uint256 _candidateVoteId) external {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed != 0, "You have no right to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voteCount += 1;
    }

    // ------------------- TIMER HELPERS -------------------

    function getVotingDeadline() public view returns (uint256) {
        return votingStartTime + votingDuration;
    }

    function getVotingStartTime() public view returns (uint256) {
        return votingStartTime;
    }

    function isVotingEnded() public view returns (bool) {
        return block.timestamp > votingStartTime + votingDuration;
    }

    // View function to get total number of votes cast
    function getTotalVotesCast() public view returns (uint256) {
    return votedVoters.length;
}

}
