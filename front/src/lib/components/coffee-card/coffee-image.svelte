<script context="module">
	const BASE_URL = 'https://loremflickr.com/500/500';
</script>

<script lang="ts">
	import Eximage from '$lib/components/eximage/eximage.svelte';

	export let name: string | undefined = undefined;
	const simplifiedName = (name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '_');
	const url = simplifiedName ? `${BASE_URL}/coffee,${simplifiedName}/all` : undefined;
</script>

<div class="image">
	<Eximage src={url} alt={`Image of ${name} coffee`} />
</div>

<style>
	.image {
		width: 100%;
		aspect-ratio: 1;
	}
</style>
