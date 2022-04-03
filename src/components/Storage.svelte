<script lang="ts">
  import type { Storage } from "../core/tribe/Camp";
  import { Item } from "../core/tribe/Items";

  export let storage: Storage;
</script>

<div>
  <h1>Storage</h1>
  {#each Object.entries(storage) as [key, val]}
    {#if val}
      <h2>{key}: {val}</h2>
    {/if}
  {/each}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 300px;
    height: 200px;
    position: absolute;
    top: 100px;
  }
</style>
