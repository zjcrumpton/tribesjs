<script lang="ts">
    import type { Storage } from '../core/tribe/Camp';

    export let storage: Storage;
</script>

<div>
    <h1>Storage</h1>
    <h2>Wood: {storage.wood_log}</h2>
    <h2>Tall Grass: {storage.tall_grass}</h2>
    <h2>Acorns: {storage.acorn}</h2>
    <h2>Tall Grass Seeds: {storage.tall_grass_seed}</h2>
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