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
        <div class="field variety"/>
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
		max-width: 500px;

        background-color: white;

        flex-direction: column;
        justify-content: stretch;

		border: 1px solid silver;
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
			color: gray;
		}

		.variety {
			font-size: 14px;
		}

		.intensifier {
			position: absolute;
			right: 32px;
			top: 28px;

			font-size: 20px;
			color: white;
			text-transform: uppercase;
			text-shadow: 4px 4px 10px #808080;

			padding: 16px;

			border-radius: 16px;
			background-color: rgba(0, 0, 0, .2);
		}

		.picture {
		}
	}

	.placeholder {
		display: flex;
		max-width: 500px;

        background-color: white;

        flex-direction: column;
        justify-content: stretch;

		border: 1px solid silver;
		border-radius: 4px;
		padding: 8px;

		--fields-bg: silver;

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

			background-color: white;

			.note {
				flex-grow: 1;
				display: block;
				background-color: var(--fields-bg);
			}
		}
	}
</style>
