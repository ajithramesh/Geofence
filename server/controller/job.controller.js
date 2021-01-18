const jobDao = require('../daos/jobDao');

module.exports = function(app, socket) {
    app.get("/jobs", (req, res) => {
        jobDao.findAllJobs()
        .then((jobs) => res.json(jobs))
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/jobs/:ownerName/pendingJobs", (req, res) => {
        jobDao.findJobByOwnerName(req.params.ownerName)
        .then((jobs) => res.json(jobs))
        .catch(() => res.status(400).send("Failed"))
    })

    app.post("/jobs", (req, res) => {
        const jobInfo = {
            endTime: req.body.endTime,
            startTime: req.body.startTime,
            owner: req.body.owner,
            status: req.body.status
        };
    
        if (typeof req.body["walker"] !== 'undefined')
            jobInfo["walker"] = req.body.walker
    
        jobDao.createJob(jobInfo)
        .then((job) => res.json(job))
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/jobs/:jobId", (req, res) => {
        jobDao.finJobById(req.params.jobId)
        .then(job => res.json(job))
        .catch(() => res.status(400).send("Failed to retrieve job by id"))
    })

    app.put("/jobs/:jobId", (req, res) => {
        jobDao.updateJobDetails(req.params.jobId, req.body)
        .then(job => res.json(job))
        .catch(() => res.status(400).send("Failed to update"))
    })

    app.delete("/jobs/:id", (req, res) => {
        jobDao.deleteJobById(req.params.id)
        .then(() => res.send("Success"))
        .catch(() => res.status(400).send("Failed to delete Job"))
    })
}