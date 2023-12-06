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
		white-space: nowrap;
		user-select: none;
	}

	.note:nth-of-type(1n) {
		background-color: var(--th-label-bg-color-1);
		color: var(--th-label-fg-color-1);
	}

	.note:nth-of-type(2n) {
		background-color: var(--th-label-bg-color-2);
		color: var(--th-label-fg-color-2);
	}

	.note:nth-of-type(3n) {
		background-color: var(--th-label-bg-color-3);
		color: var(--th-label-fg-color-3);
	}

	.note:nth-of-type(4n) {
		background-color: var(--th-label-bg-color-4);
		color: var(--th-label-fg-color-4);
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
