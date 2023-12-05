<script lang="ts" context="module">
    function formatTime(ms: number): string {
        return (ms / 1000).toFixed(0);
    }
</script>

<script lang="ts">
    import { PageLogic } from "$lib/stores/cofee_page";
    import { loadRandomCoffee } from "$lib/api/coffee";

    import CoffeeCard from "$lib/components/coffee-card/coffee-card.svelte";

    const pageLogic = new PageLogic({
        coffeeLoader: () => loadRandomCoffee(),
        loadInterval: 30000,
        checkInterval: 1000,
    });

    function loadCoffee() {
        pageLogic.loadCoffee();
    }

    $: coffee_store = pageLogic.cofeeStore;
    $: timer_store= pageLogic.timeToLoadStore;
    $: is_loading = pageLogic.isLoadingStore;
    $: is_loading_available = pageLogic.isLoadingAvailable;

    $: can_load = !$is_loading && $is_loading_available;


    let placeHolder: HTMLElement;
    let controls: HTMLElement;

    $: {
        if (placeHolder) {
            controls?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }
</script>

<section class="root">
    <section class="list">
        {#each $coffee_store as coffee (coffee.uid)}
            <CoffeeCard coffee={coffee} />
        {/each}

        {#if $is_loading}
            <CoffeeCard bind:root={placeHolder}/>
        {/if}
    </section>
    
    <section class="controls" bind:this={controls}>
        <button class="load" on:click={loadCoffee} disabled={!can_load}>load moare</button>
        
        {#if $is_loading}
            <span class="sidenote">loading..</span>
        {:else}
            {#if $is_loading_available && ($timer_store !== undefined)}
                <span class="sidenote">next item will be loaded automatically after {formatTime($timer_store)} seconds</span>
            {:else}
                <span class="sidenote">loading not available more</span>
            {/if}
        {/if}
    </section>
</section>


<style>
    .root {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    .list {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    .sidenote {
        color: gray;
    }

    .load {
        padding: 8px 4px;
    }
</style>