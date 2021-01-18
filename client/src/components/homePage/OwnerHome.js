import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as sessionMgmt from "../../services/SessionHandler";

export default class OwnerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingJobs: []
        }
    }
    componentDidMount() {
        let self = this
        fetch('http://localhost:4000/' + sessionMgmt.getUserName() + '/pendingJobs', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then(jobs => self.setState({pendingJobs: jobs}));
    }

    deleteJob = (jobId) => {
        let self = this;
        fetch('http://localhost:4000/jobs/' + jobId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(res => {
        let jobObj = self.state.pendingJobs.find( element => element._id === jobId)
        let indexOfJob = self.state.pendingJobs.indexOf(jobObj);
        let jobArr = self.state.pendingJobs;
        jobArr.splice(indexOfJob, 1);
        self.setState({pendingJobs: jobArr})
      })
    }

    trackJob = (jobId) => {
        console.log("Job id to track " + jobId);
    }
  
    render() {
        const jobContent = this.state.pendingJobs.map(jobs => 
            <tr key={jobs._id}>
                <td>{jobs._id}</td>
                <td>{jobs.owner}</td>
                <td>{jobs.walker}</td>
                <td>{jobs.startTime}</td>
                <td>{jobs.endTime}</td>
                <td>{jobs.status}</td>
                <td>
                    <Button variant="primary" onClick={() => this.deleteJob(jobs._id)}>Delete Job</Button>
                </td>
            </tr>
        );

        let currentDate = new Date();
        let filteredJobs = this.state.pendingJobs.filter(jobObj => jobObj.startTime < currentDate && jobObj.endTime > currentDate);
        let filteredJobContent = filteredJobs.map(jobs => 
            <tr key={jobs._id}>
                <td>{jobs._id}</td>
                <td>{jobs.owner}</td>
                <td>{jobs.walker}</td>
                <td>{jobs.startTime}</td>
                <td>{jobs.endTime}</td>
                <td>{jobs.status}</td>
                <td>
                    <Button variant="primary" onClick={() => this.trackJob(jobs._id)}>Track</Button>
                </td>
            </tr>
        );

        return (
            <Container>
                <TopBar userName={sessionMgmt.getUserName()}/>
                <h2>Welcome Owner: {sessionMgmt.getUserName()} !!!</h2>
                <Button variant="primary" onClick={() => history.push("/createJob")}>Create Job</Button>
            
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
                        {filteredJobContent}
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
                        {jobContent}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
