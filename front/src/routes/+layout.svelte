<script lang="ts">
	import { ROUTES, ROUTES_BY_ID } from '$lib/routes';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar.svelte';

	$: currentRoute = ROUTES.find((route) => route.path === $page.route.id);
</script>

<svelte:head>
	<title>
		TA / {currentRoute?.title ?? ''}
	</title>
</svelte:head>

<main class="hg-100 main">
	<header class=".header">
		<h1>{currentRoute?.title ?? '-- unknown route --'}</h1>
		<Navbar items={ROUTES} />
	</header>

	<section class="content">
		<slot />
	</section>
</main>

<style>
	:root {
		--cl-white: #ffffff;
		--cl-black: #000000;
		--cl-black-op: rgba(0, 0, 0, 0.5);
		--cl-silver: #808080;

		/* colors from: https://color.adobe.com/Cup%20Of%20Coffee-color-theme-14406987 */
		--cl-brown-tone-0: #b4966e;
		--cl-brown-tone-1: #b2763d;
		--cl-brown-tone-2: #9a511c;
		--cl-brown-tone-3: #75381b;
		--cl-brown-tone-4: #4a2114;

		--th-bg-color: var(--cl-white);
		--th-fg-color: var(--cl-black);

		--th-backdrop-bg-color: var(--cl-black-op);
		--th-backdrop-fg-color: var(--cl-white);

		--th-border-color: var(--cl-brown-tone-0);

		--th-note-fg-color: var(--cl-silver);
		--th-note-bg-color: var(--cl-white);

		--th-code-fg-color: #00ff00;
		--th-code-bg-color: rgba(0, 0, 0, 0.5);

		--th-nav-item-fg-color: var(--cl-brown-tone-1);
		--th-nav-item-bg-color: var(--cl-white);

		--th-nav-item-hovered-fg-color: var(--cl-brown-tone-2);
		--th-nav-item-hovered-bg-color: var(--cl-white);

		--th-nav-item-active-fg-color: var(var(--cl-brown-tone-2)) --th-nav-item-active-bg-color:
			var(--cl-white);

		--th-placeholder-color: var(--cl-silver);

		--th-label-bg-color-1: var(--cl-brown-tone-1);
		--th-label-bg-color-2: var(--cl-brown-tone-2);
		--th-label-bg-color-3: var(--cl-brown-tone-3);
		--th-label-bg-color-4: var(--cl-brown-tone-4);

		--th-label-fg-color-1: var(--cl-white);
		--th-label-fg-color-2: var(--cl-white);
		--th-label-fg-color-3: var(--cl-white);
		--th-label-fg-color-4: var(--cl-white);
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(.hg-100) {
		height: 100svh;
	}
	:global(.body) {
		margin: 0;
		padding: 0;
	}

	.header {
		position: sticky;
		top: -16px;
		background-color: var(--th-color--bg);
		z-index: 2;
		padding-left: 32px;

		border: none;
		border-bottom: 1px solid var(--th-border-color);
	}

	.main {
		display: flex;

		flex-direction: column;
	}

	.content {
		background-color: var(--th-bg-color);
		border: 1px solid var(--th-border-color);
		flex-grow: 1;
		padding: 8px 4px;
	}
</style>
