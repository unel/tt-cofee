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

    $: amount = $coffee_store?.length ?? 0;


    let placeHolder: HTMLElement;
    let scrollAncor: HTMLElement;

    $: {
        if (placeHolder) {
            scrollAncor?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }
</script>

<section class="root">
    <section class="list" class:list-one={amount === 1} class:list-two={amount === 2} class:list-many={amount > 2}>
        {#each $coffee_store as coffee (coffee.uid)}
            <CoffeeCard coffee={coffee} />
        {/each}

        {#if $is_loading}
            <CoffeeCard bind:root={placeHolder}/>
        {/if}
    </section>
    
    <section class="controls" >
        {#if $is_loading}
            <span class="sidenote">loading..</span>
        {:else}
            {#if $is_loading_available && ($timer_store !== undefined)}
                <span class="sidenote">next item will be loaded automatically after {formatTime($timer_store)} seconds</span>
            {:else}
                <span class="sidenote">loading not available more</span>
            {/if}
        {/if}

        <button class="load" on:click={loadCoffee} disabled={!can_load}>load more</button>

        <span style="height: 0, opacity: 0" bind:this={scrollAncor} />
    </section>
</section>


<style>
    .root {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 16px;
    }

    .list {
        display: flex;
    
    }

    .sidenote {
        color: gray;
    }

    .controls {
        align-self: center;

        row-gap: 4px;
        align-items: stretch;
        display: flex;
        flex-direction: column;
    }

    @media (pointer: fine) {
        .load {
            padding: 8px;
        }
    }

    @media (pointer: coarse) {
        .load {
            padding: 24px;
        }
    }

    @media (pointer: coarse) and (pointer: fine) {
        .load {
            padding: 24px;
        }
    }

 

    @media (max-device-width: 700px) {
        .list {
            max-width: 600px;
            align-items: center;
            flex-direction: column;
            row-gap: 16px;
        }
    }

    @media (min-device-width: 701px) {
        .list {
            max-width: 1460px;
            flex-direction: row;
            column-gap: 16px;
            row-gap: 16px;
            flex-wrap: wrap;
        }

        .list-one {
            justify-content: flex-start;
        }

        .list-two, .list-many {
            justify-content: center;
        }
    }

</style>