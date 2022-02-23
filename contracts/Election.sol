pragma solidity 0.5.0;

contract Election {
    // model the candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    // map the candidate
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;
    // Store account that have voted;
    mapping(address => bool) public voters;

    event voteEvent(uint256 indexed _candidateId);

    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        candidates[_candidateId].voteCount++;

        voters[msg.sender] = true;
        emit voteEvent(_candidateId);
    }
}
