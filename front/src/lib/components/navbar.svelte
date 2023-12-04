<script lang="ts">
    import type { TRoute } from "$lib/types/troute";
    export let items: TRoute[];

    import { page } from "$app/stores";
</script>

<style>
    ul {
        display: inline-block;
    }

    ul > li {
        display: inline-block;
        padding: 4px;
    }

    li.link_item > a {
        color: inherit;
    }

    .link_item.active {
        color: red;
    }
</style>

<nav>
    <ul>
    {#each items as item}
        <li class="link_item" class:active={$page.route.id === item.path}>
            <a href="{ item.path }">{ item.id }</a>
        </li>
    {/each}
    </ul>
</nav>