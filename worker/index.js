// copied from Usage https://www.npmjs.com/package/cron
// running a node process where importing the library 

var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github');

// the *** are called cron schedule expressions. They are symbols for how often we want to jobs to run.
// Reference: crontab.guru

// Here we are fetching github jobs
var job = new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
job.start();