const mongoose = require('mongoose');
const jobModel = require('../models/job.model');

createJob = (jobInfo) => {
    return jobModel.create(jobInfo);
}

findAllJobs = () => {
    return jobModel.find();
}

finJobById = (jobId) => {
    return jobModel.findById(jobId);
}

findJobByOwnerName = (ownerName) => {
    return jobModel.find({owner: ownerName});
}

updateJobDetails = (jobId, jobInfo) => {
    return jobModel.updateOne({_id: jobId}, {$set: {...jobInfo}})
}

deleteJobById = (id) => {return jobModel.deleteOne({_id: id})}

module.exports = {
    findAllJobs, createJob, updateJobDetails, deleteJobById, finJobById, findJobByOwnerName
}