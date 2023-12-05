<script lang="ts">
	import type { TRoute } from '$lib/types/troute';
	export let items: TRoute[];

	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		{#each items as item}
			<li class="link_item" class:active={$page.route.id === item.path}>
				<a href={item.path}>{item.id}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="less">
	ul {
		display: flex;
		flex-direction: row;
		column-gap: 8px;
	}

	ul > li {
		display: inline-block;
		padding: 8px;
		color: #b2763d;

		font-size: 32px;
	}

	li.link_item {
		&:hover {
			color: #9a511c;
		}

		> a {
			color: inherit;
			text-decoration: none;
		}
	}

	.link_item.active {
		color: #9a511c;
		text-decoration: underline;
	}
</style>
