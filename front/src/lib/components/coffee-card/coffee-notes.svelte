<script lang="ts">
	export let notes: string[] = [];
</script>

<section class="list">
	{#each notes as note}
		<div class="note">
			{note}
		</div>
	{/each}
</section>

<style lang="less">
	.list {
		display: flex;
		flex-direction: row;
		max-width: 100%;
		column-gap: 4px;

		overflow-x: auto;
	}

	.note {
		padding: 8px 8px;
		border-radius: 4px;
		color: white;
		white-space: nowrap;

		user-select: none;
	}

	// colors from: https://color.adobe.com/Cup%20Of%20Coffee-color-theme-14406987
	.note:nth-of-type(1n) {
		background-color: #4a2114;
	}

	.note:nth-of-type(2n) {
		background-color: #75381b;
	}

	.note:nth-of-type(3n) {
		background-color: #9a511c;
	}

	.note:nth-of-type(4n) {
		background-color: #b2763d;
	}

	@media (pointer: fine) {
	}

	@media (pointer: coarse) {
		.list {
			scrollbar-width: none;
		}

		::-webkit-scrollbar {
			display: none;
		}
	}

	@media (pointer: coarse) and (pointer: fine) {
	}
</style>
