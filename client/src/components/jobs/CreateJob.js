import React, { Component } from "react";
import history from "../../services/History";
import * as sessionMgmt from '../../services/SessionHandler';
import {Alert} from "react-bootstrap";

export default class CreateJob extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showAlert: false
        }

        this.startTimeRef = React.createRef();
        this.endTimeRef = React.createRef();
    }

    handleCreateJob = () => {
        var self = this;
        let newJob = {};
        newJob.startTime = this.startTimeRef.current.value;
        newJob.endTime = this.endTimeRef.current.value;
        newJob.owner = sessionMgmt.getUserName();
        newJob.status = "UNASSIGNED";


        fetch('http://localhost:4000/jobs', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob)
        })
        .then(resp => resp.json())
        .then(resp => {
            history.push("/")
        })
        .catch(() => self.setState({showAlert: true}));
    }

    render() {
        let self = this;
        return (
            <div className="container">
                {
                    this.state.showAlert ? <Alert variant="danger" onClose={() => self.setState({showAlert: false})} dismissible>
                                                <Alert.Heading>Unable to create job. Check the details</Alert.Heading>
                                            </Alert> : null
                }
                <div className="form-group">
                    <h1>Create Job</h1>
                </div>
                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="startTime"
                               className="control-label">
                            Start Time
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               ref={this.startTimeRef}
                               id="startTime"
                               placeholder="YYYY-MM-DD HH:mm:ss"
                               required/>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="endTime"
                               className="control-label">
                            End Time
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               ref={this.endTimeRef}
                               id="endTime"
                               placeholder="YYYY-MM-DD HH:mm:ss"
                               required/>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => this.handleCreateJob()}>
                            Create
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => history.goBack()}>
                             Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}