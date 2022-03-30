<script lang="ts">
    import type JobList from "../core/tribe/JobList";

    export let jobList: JobList;

</script>

<div class="jobs-container">
    <h1>Jobs</h1>
    <button>Add Job</button>

</div>

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

    h1 {
        text-align: center;
        padding: 0;
        margin: 0;
        background-color: black;
        color: white;
    }
</style>