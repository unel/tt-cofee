<script lang="ts">
    import { ROUTES, ROUTES_BY_ID } from "$lib/routes";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/navbar.svelte";

    $: currentRoute = ROUTES.find(route => route.path === $page.route.id);
</script>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(html, body) {
        height: 100svh;
        margin: 0;
        padding: 0;
    }

    :global(li, ul) {
        padding: 0;
        margin: 0;
    }

    main {
        height: 100svh;
        display: flex;

        flex-direction: column;
    }

    .content {
        border: 1px solid silver;
        flex-grow: 1;
        padding: 8px 4px;
    }
</style>

<main>
    <header>
        <h1>{ currentRoute?.title ?? '-- unknown route --' }</h1>
    </header>

    <Navbar items={ ROUTES }/>

    <section class="content">
        <slot></slot>
    </section>
</main>