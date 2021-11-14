import * as fs from 'fs';
import * as path from 'path';
import * as sourceMapSupport from 'source-map-support';
import BigNumber from 'bignumber.js';
import * as _ from 'lodash';

sourceMapSupport.install();

const prod: boolean = true;

interface Job {
  weight: number;
  length: number;
  diff?: number;
  ratio?: number;
  completionTime?: number;
  weightedCompletionTime?: number;
}

function jobCompDiff(a: Job, b: Job): number {
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

function jobCompRatio(a: Job, b: Job): number {
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (b.ratio > a.ratio) {
    return 1;
  }
  return 0;
}

const inputT: string = '5\n1 2\n2 3\n5 4\n4 1\n6 5\n7 2\n';
const inputP: string = fs
  .readFileSync(path.join(__dirname, '/jobs.txt'))
  .toString();
const input: string = prod ? inputP.trim() : inputT.trim();

const [_unused, ...strJobs]: Array<string> = input.split('\n');

const unsortedJobs: Array<Job> = strJobs.map((strJob) => {
  const [w, l]: Array<string> = strJob.trim().split(' ');
  const job: Job = {
    weight: parseInt(w.trim(), 10),
    length: parseInt(l.trim(), 10),
  };
  job.diff = job.weight - job.length;
  job.ratio = job.weight / job.length;
  return job;
});

const jobsDiff = _.cloneDeep(unsortedJobs).sort(jobCompDiff);
const jobsRatio = _.cloneDeep(unsortedJobs).sort(jobCompRatio);

let totalWeightedCompletionTime: BigNumber = new BigNumber(0);
let currentCompletionTime: number = 0;
let i: number;
for (i = 0; i < jobsDiff.length; i++) {
  jobsDiff[i].completionTime = currentCompletionTime + jobsDiff[i].length;
  jobsDiff[i].weightedCompletionTime =
    jobsDiff[i].completionTime * jobsDiff[i].weight;

  currentCompletionTime = jobsDiff[i].completionTime;
  const bigWeightedCompletionTime: BigNumber = new BigNumber(
    jobsDiff[i].weightedCompletionTime,
  );
  totalWeightedCompletionTime = totalWeightedCompletionTime.plus(
    bigWeightedCompletionTime,
  );
}

console.log(totalWeightedCompletionTime.toString(10));

totalWeightedCompletionTime = new BigNumber(0);
currentCompletionTime = 0;
for (i = 0; i < jobsRatio.length; i++) {
  jobsRatio[i].completionTime = currentCompletionTime + jobsRatio[i].length;
  jobsRatio[i].weightedCompletionTime =
    jobsRatio[i].completionTime * jobsRatio[i].weight;

  currentCompletionTime = jobsRatio[i].completionTime;
  const bigWeightedCompletionTime: BigNumber = new BigNumber(
    jobsRatio[i].weightedCompletionTime,
  );
  totalWeightedCompletionTime = totalWeightedCompletionTime.plus(
    bigWeightedCompletionTime,
  );
}

console.log(totalWeightedCompletionTime.toString(10));
