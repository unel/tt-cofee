<script lang="ts">
	import type { TRoute } from '$lib/types/troute';
	export let items: TRoute[];

	import { page } from '$app/stores';
</script>

<nav>
	<ul class="items">
		{#each items as item}
			<li class="link-item" class:active={$page.route.id === item.path}>
				<a class="link" href={item.path}>{item.id}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="less">
	.items {
		padding: 0;
		margin: 0;

		display: flex;
		flex-direction: row;
		column-gap: 8px;
	}

	.link-item {
		display: inline-block;
		padding: 8px;

		background-color: var(--th-nav-item-bg-color);
		color: var(--th-nav-item-fg-color);
		font-size: 32px;

		&:hover {
			background-color: var(--th-nav-item-hovered-bg-color);
			color: var(--th-nav-item-hovered-fg-color);
		}

		&.active {
			background-color: var(--th-nav-item-active-bg-color);
			color: var(--th-nav-item-active-fg-color);
			text-decoration: underline;
		}

		> .link {
			color: inherit;
			text-decoration: none;
		}
	}
</style>
