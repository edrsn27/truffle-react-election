var Election = artifacts.require("./Election.sol");

contract("Election", async ([deployer, voter]) => {
  let election;

  before(async () => {
    election = await Election.new();
  });
  describe("has candidate", async () => {
    it("check if there are candidates", async () => {
      // check candidate count
      const candidatesCount = await election.candidatesCount();
      assert.equal(candidatesCount.toString(), "2");
      // console.log(result);
      let candidate;
      // Check for values for Candidate 1
      candidate = await election.candidates(1);
      assert.equal(
        candidate.name,
        "Candidate 1",
        "correct name for Candidate 1"
      );
      assert.equal(candidate.id.toString(), "1", "correct id for Candidate 1");
      assert.equal(
        candidate.voteCount.toString(),
        "0",
        "correct voteCount for Candidate 1"
      );
      // Check for values for Candidate 2
      candidate = await election.candidates(2);
      assert.equal(
        candidate.name,
        "Candidate 2",
        "correct name for Candidate 2"
      );
      assert.equal(candidate.id.toString(), "2", "correct id for Candidate 2");
      assert.equal(
        candidate.voteCount.toString(),
        "0",
        "correct voteCount for Candidate 2"
      );
    });
  });

  describe("vote()", async () => {
    let result;
    before(async () => {
      result = await election.vote(1, { from: voter });
    });

    it("check if vote is counted", async () => {
      let candidate = await election.candidates(1);
      assert.equal(candidate.voteCount.toString(), "1");
    });
    it("check if voter is flag as voted", async () => {
      let flag = await election.voters(voter);
      assert.equal(flag, true);
    });
    it("check if voter event is emitted", async () => {
      const event = result.logs[0].args;
      assert.equal(event._candidateId.toString(), "1");
    });
  });
});
