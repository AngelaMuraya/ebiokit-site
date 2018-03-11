(function(){var app=angular.module("jobs.services.job-list",[]);app.factory("JobList",["$rootScope",function($rootScope){var jobs=[];var old=new Date(0);return{getJobs:function(){return jobs},setJobs:function(_jobs){jobs=this.adaptJobsInformation(_jobs);old=new Date;return this},getJob:function(job_id){for(var i in jobs){if(jobs[i].id===job_id){return jobs[i]}}return null},addJob:function(job){jobs.push(this.adaptJobInformation(job));return this},deleteJob:function(job_id){for(var i in jobs){if(jobs[i].id===job_id){jobs.splice(i,1);return jobs}}return null},adaptJobsInformation:function(jobs){for(var i in jobs){this.adaptJobInformation(jobs[i])}return jobs},adaptJobInformation:function(job){var erroneous=0,finished=0,waiting=0;for(i in job.tasks){if(job.tasks[i].status==="FAILED"||job.tasks[i].status==="NOT_QUEUED"){erroneous++}else if(job.tasks[i].status==="FINISHED"){finished++}else if(job.tasks[i].status==="QUEUED"){waiting++}}job.progress=Math.round(finished/job.tasks.length*100);if(finished===job.tasks.length){job.status="Done"}else if(erroneous>0){job.status="Failed"}else if(waiting===job.tasks.length){job.status="Waiting"}else{job.status="Running"}return job},getOld:function(){return(new Date-old)/12e4}}}])})();