<script>
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
</script>


<section>
    <div>timer: {$timer_store}</div>
    <hr />

    <section class="list">
        {#each $coffee_store as coffee}
            <CoffeeCard coffee={coffee} />
        {/each}

        {#if 1 || $is_loading}
            <CoffeeCard />
        {/if}
    </section>
    

    <hr />

    <button on:click={loadCoffee} disabled={$is_loading}>load moare</button>
</section>


<style>
    .list {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
    }
</style>