<style>
  .jobs-container {
    width: 250px;
    height: 50vh;
    position: absolute;
    bottom: 0;
    left: 0;
    border: 5px solid black;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
  }

  .job {
    display: flex;
    flex-direction: column;
    border: 5px solid black;
    justify-content: center;
    align-items: center;
  }

  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
    background-color: black;
    color: white;
  }
</style>

<script lang="ts">
  import type JobList from '../core/tribe/JobList';
  import { createGatherGrassJob, createGatherWoodJob } from '../core/tribe/JobList';

  export let jobList: JobList;

  let i = 0;

  const addJob = () => {
    if (i % 2 === 0) {
      jobList.add(createGatherGrassJob(2));
    } else {
      jobList.add(createGatherWoodJob(2));
    }
    i++;
  };
</script>

<div class="jobs-container">
  <h1>Jobs</h1>
  {#each jobList.jobs as job}
    <div class="job">
      <h2>Job: {job.type}</h2>
      <h2>Member: {job.member ? job.member.name : 'nobody'}</h2>
      {#if job.type === 'GATHER'}
        <h2>Amount: {job.data.quantity}</h2>
        <h2>Resource: {job.data.resource}</h2>
      {/if}
    </div>
  {/each}
  <button on:click={addJob}>Add Job</button>
</div>
