<script lang="ts">
	import LoadingPlaceholder from "./loading-placeholder.svelte";

    export let src: string | undefined = undefined;
    export let alt: string = '';

    let isImageLoaded = false;
    function toggleLoaded() {
        isImageLoaded = true;
    }
</script>

<div class="container" class:initialized={isImageLoaded} class:loading={!isImageLoaded || !src}>
    {#if src}
        <img class="image" src={src} on:load={toggleLoaded} alt={alt} />
    {/if}
    <div class="placeholder">
        <LoadingPlaceholder />
    </div>
</div>

<style>
    .container {
        width: 100%;
    }

    .image, .placeholder {
        width: 100%;
        aspect-ratio: 1;
    }

    .container.loading > .image {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .container.initialized > .placeholder {
        display: none;
    }
</style>