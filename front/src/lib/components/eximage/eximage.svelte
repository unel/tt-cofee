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

<style lang="less">
    .container {
        width: 100%;
        position: relative;
    }

    .image, .placeholder {
        width: 100%;
        aspect-ratio: 1;
        position: absolute;
        left: 0;
        top: 0;

        transition: opacity 250ms linear;
    }

    .container.loading {
        > .image {
            opacity: 0;
        }

        > .placeholder {
            opacity: 1;
        }
    }

    .container.initialized {
        > .placeholder {
            opacity: 0;
        }

        > .image {
            opacity: 1;
        }
    }
</style>