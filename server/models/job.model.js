const mongoose = require('mongoose');
const jobSchema = require('./job.schema');

module.exports = mongoose.model('JobModel', jobSchema);