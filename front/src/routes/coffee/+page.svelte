<script>
    import { PageLogic } from "$lib/stores/cofee_page";
    import { loadRandomCoffee } from "$lib/api/coffee";

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

    {#each $coffee_store as coffee}
        {coffee.blend_name}
    {/each}

    <hr />

    <button on:click={loadCoffee} disabled={$is_loading}>load moare</button>
</section>