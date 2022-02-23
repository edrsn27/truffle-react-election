import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

export default function Main({ candidates, vote }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Vote Count</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => {
          return (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
              <td>
                <Button variant="primary" onClick={() => vote(candidate.id)}>
                  Vote
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
