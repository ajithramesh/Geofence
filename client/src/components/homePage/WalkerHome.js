import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as sessionMgmt from "../../services/SessionHandler";

export default class WalkerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableJobs: []
        }
    }

    componentDidMount() {
        let self = this
        fetch('http://localhost:4000/jobs', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then(jobs => self.setState({availableJobs: jobs}));
    }

    render() {

        const unassignedJobs = this.state.availableJobs.filter(jobObj => jobObj.status == "UNASSIGNED");
        const unassignedJobContent = unassignedJobs.map(jobs => 
            <tr key={jobs._id}>
                <td>{jobs._id}</td>
                <td>{jobs.owner}</td>
                <td>{jobs.walker}</td>
                <td>{jobs.startTime}</td>
                <td>{jobs.endTime}</td>
                <td>{jobs.status}</td>
                <td>
                    <Button variant="primary" onClick={() => this.acceptJob(jobs._id)}>Accept Job</Button>
                </td>
            </tr>
        );

        const myJobs = this.state.availableJobs.filter(jobObj => jobObj.walker != sessionMgmt.getUserName());
        const myJobsContent = myJobs.map(jobs => 
            <tr key={jobs._id}>
                <td>{jobs._id}</td>
                <td>{jobs.owner}</td>
                <td>{jobs.walker}</td>
                <td>{jobs.startTime}</td>
                <td>{jobs.endTime}</td>
                <td>{jobs.status}</td>
            </tr>
        );
        return (
        <Container>
                <TopBar userName={sessionMgmt.getUserName()}/>
                <h2>Welcome Walker: {sessionMgmt.getUserName()} !!!</h2>
                <Table striped bordered hove>
                <thead>
                        <th>Job Id</th>
                        <th>Owner Name</th>
                        <th>Walker Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {myJobsContent}
                    </tbody>
                </Table>

                <Table striped bordered hove>
                    <thead>
                        <th>Job Id</th>
                        <th>Owner Name</th>
                        <th>Walker Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {unassignedJobContent}
                    </tbody>
                </Table>
        </Container>
        );
    }
}
