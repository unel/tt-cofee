<script lang="ts">
    export let notes: string[] = [];
</script>

<section class="list">
    {#each notes as note}
        <div class="note">
            { note }
        </div>
    {/each}
</section>

<style>
    .list {
        display: flex;
        flex-direction: row;
        max-width: 100%;
        column-gap: 4px;

        overflow-x: auto;
        scrollbar-width: none;
    }

    .list::-webkit-scrollbar {
        display: none;
    }

    .note {
        padding: 4px 4px;
        border-radius: 4px;
        background-color: sienna;
    }
</style>