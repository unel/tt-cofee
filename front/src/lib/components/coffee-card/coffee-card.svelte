<script lang="ts">
	import type { TCoffee } from '$lib/types/tcoffee';
	import CoffeeNotes from './coffee-notes.svelte';
	import CoffeeImage from './coffee-image.svelte';

	export let coffee: TCoffee | undefined = undefined;
</script>

{#if coffee}
	<section class="coffee">
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
	</section>
{:else}
	<section class="placeholder">
		<div class="picture">
			<CoffeeImage />
        </div>

        <div class="field origin" />
		<div class="field blend" />
        <div class="field variety"/>

		<div class="field notes" />
	</section>
{/if}

<style lang="less">
	.coffee {
		display: flex;

        background-color: white;

        flex-direction: column;
        justify-content: stretch;

		border: 1px solid silver;
		border-radius: 4px;
		padding: 8px;

		row-gap: 4px;

		.field {
			display: block;
		}

		.blend {

		}

		.origin {
		}

		.variety {
		}

		.notes {
		}

		.intensifier {
		}

		.picture {
		}
	}

	.placeholder {
		display: flex;

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
		}

		
		.blend {
			background-color: var(--fields-bg);
		}

		.origin {
			background-color: var(--fields-bg);

		}

		.variety {
			background-color: var(--fields-bg);
		}

		.notes {
			background-color: var(--fields-bg);
		}

		.intensifier {
			background-color: var(--fields-bg);
		}

		.picture {
		}
	}
</style>
