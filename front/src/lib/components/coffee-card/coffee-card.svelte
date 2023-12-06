<script lang="ts">
	import type { TCoffee } from '$lib/types/tcoffee';
	import CoffeeNotes from './coffee-notes.svelte';
	import CoffeeImage from './coffee-image.svelte';

	export let coffee: TCoffee | undefined = undefined;
	export let root: HTMLElement | undefined = undefined;
</script>

{#if coffee}
	<section class="coffee" bind:this={root}>
		<div class="picture">
			<CoffeeImage name={coffee.blend_name} />
		</div>

		<div class="field origin">
			{coffee.origin}
		</div>

		<div class="field blend">
			{coffee.blend_name}
		</div>

		<div class="field variety">
			{coffee.variety}
		</div>

		<div class="field notes">
			<CoffeeNotes notes={coffee.notes} />
		</div>

		<div class="intensifier">
			{coffee.intensifier}
		</div>
	</section>
{:else}
	<section class="placeholder" bind:this={root}>
		<div class="picture">
			<CoffeeImage />
		</div>

		<div class="field origin" />
		<div class="field blend" />
		<div class="field variety" />
		<div class="field notes">
			<div class="note" />
			<div class="note" />
			<div class="note" />
			<div class="note" />
			<div class="note" />
		</div>
	</section>
{/if}

<style lang="less">
	.coffee {
		position: relative;
		display: flex;
		flex-grow: 1;

		background-color: var(--th-bg-color);
		color: var(--th-fg-color);

		flex-direction: column;
		justify-content: stretch;

		border: 1px solid var(--th-border-color);
		border-radius: 4px;
		row-gap: 4px;
		padding-bottom: 8px;

		.field {
			margin: 0 8px;
			display: block;
			max-width: 100%;
		}

		.blend {
			font-weight: bold;
			font-size: 18px;
		}

		.origin {
			font-size: 14px;
			background-color: var(--th-note-bg-color);
			color: var(--th-note-fg-color);
		}

		.variety {
			font-size: 14px;
		}

		.intensifier {
			position: absolute;
			right: 0;
			top: 0;

			font-size: 20px;
			text-transform: uppercase;

			padding: 16px;

			border-radius: 0 0 0 16px;
			color: var(--th-backdrop-fg-color);
			background-color: var(--th-backdrop-bg-color);
			text-shadow: 4px 4px 10px var(--th-shadow-color);
		}
	}

	.placeholder {
		display: flex;
		flex-grow: 1;

		background-color: var(--th-bg-color);

		flex-direction: column;
		justify-content: stretch;

		border: 1px solid var(--th-placeholder-color);
		border-radius: 4px;
		padding: 8px;

		--fields-bg: var(--th-placeholder-color);

		row-gap: 8px;

		.field {
			display: block;
			height: 14px;
			background-color: var(--fields-bg);
		}

		.notes {
			display: flex;
			flex-direction: row;
			justify-content: stretch;
			column-gap: 8px;

			background-color: var(--th-bg-color);

			.note {
				flex-grow: 1;
				display: block;
				background-color: var(--fields-bg);
			}
		}
	}

	@media (max-device-width: 700px) {
		.coffee,
		.placeholder {
			width: 100%;
			max-width: 90dvw;
		}
	}

	@media (min-device-width: 701px) {
		.placeholder {
			width: 500px;
		}

		.coffee,
		.placeholder {
			width: 100%;
			max-width: 25dvw;
		}
	}
</style>
