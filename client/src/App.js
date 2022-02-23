import React, { Component } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";

import Main from "./Main";
class App extends Component {
  state = { web3: null, account: "", contract: null, candidates: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      this.loadBlockChainData();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  async loadBlockChainData() {
    let candidatesCount = await this.state.contract.methods
      .candidatesCount()
      .call();
    // let candidates = await this.state.contract.methods.candidates(2).call();
    let candidates;
    for (var i = 1; i <= candidatesCount; i++) {
      let candidate = await this.state.contract.methods.candidates(i).call();
      var id = candidate[0];
      var name = candidate[1];
      var voteCount = candidate[2];

      this.setState({
        candidates: this.state.candidates.concat({
          id: id,
          name: name,
          voteCount: voteCount,
        }),
      });
    }
  }

  vote = (_candidateId) => {
    this.state.contract.methods
      .vote(_candidateId)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <NavBar account={this.state.account} />
        <Container className="pt-5 allign-center">
          <Main candidates={this.state.candidates} vote={this.vote} />
        </Container>
      </div>
    );
  }
}

export default App;
