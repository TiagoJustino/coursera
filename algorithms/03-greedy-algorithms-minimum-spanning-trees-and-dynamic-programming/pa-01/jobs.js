"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sourceMapSupport = require("source-map-support");
const bignumber_js_1 = require("bignumber.js");
const _ = require("lodash");
sourceMapSupport.install();
const prod = true;
function jobCompDiff(a, b) {
    if (a.diff > b.diff) {
        return -1;
    }
    if (b.diff > a.diff) {
        return 1;
    }
    if (a.weight > b.weight) {
        return -1;
    }
    if (b.weight > a.weight) {
        return 1;
    }
    return 0;
}
function jobCompRatio(a, b) {
    if (a.ratio > b.ratio) {
        return -1;
    }
    if (b.ratio > a.ratio) {
        return 1;
    }
    return 0;
}
const inputT = '5\n1 2\n2 3\n5 4\n4 1\n6 5\n7 2\n';
const inputP = fs
    .readFileSync(path.join(__dirname, '/jobs.txt'))
    .toString();
const input = prod ? inputP.trim() : inputT.trim();
const [_unused, ...strJobs] = input.split('\n');
const unsortedJobs = strJobs.map((strJob) => {
    const [w, l] = strJob.trim().split(' ');
    const job = {
        weight: parseInt(w.trim(), 10),
        length: parseInt(l.trim(), 10),
    };
    job.diff = job.weight - job.length;
    job.ratio = job.weight / job.length;
    return job;
});
const jobsDiff = _.cloneDeep(unsortedJobs).sort(jobCompDiff);
const jobsRatio = _.cloneDeep(unsortedJobs).sort(jobCompRatio);
let totalWeightedCompletionTime = new bignumber_js_1.default(0);
let currentCompletionTime = 0;
let i;
for (i = 0; i < jobsDiff.length; i++) {
    jobsDiff[i].completionTime = currentCompletionTime + jobsDiff[i].length;
    jobsDiff[i].weightedCompletionTime =
        jobsDiff[i].completionTime * jobsDiff[i].weight;
    currentCompletionTime = jobsDiff[i].completionTime;
    const bigWeightedCompletionTime = new bignumber_js_1.default(jobsDiff[i].weightedCompletionTime);
    totalWeightedCompletionTime = totalWeightedCompletionTime.plus(bigWeightedCompletionTime);
}
console.log(totalWeightedCompletionTime.toString(10));
totalWeightedCompletionTime = new bignumber_js_1.default(0);
currentCompletionTime = 0;
for (i = 0; i < jobsRatio.length; i++) {
    jobsRatio[i].completionTime = currentCompletionTime + jobsRatio[i].length;
    jobsRatio[i].weightedCompletionTime =
        jobsRatio[i].completionTime * jobsRatio[i].weight;
    currentCompletionTime = jobsRatio[i].completionTime;
    const bigWeightedCompletionTime = new bignumber_js_1.default(jobsRatio[i].weightedCompletionTime);
    totalWeightedCompletionTime = totalWeightedCompletionTime.plus(bigWeightedCompletionTime);
}
console.log(totalWeightedCompletionTime.toString(10));
//# sourceMappingURL=jobs.js.map