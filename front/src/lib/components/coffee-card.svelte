<script lang="ts">
	import type { TCoffee } from "$lib/types/tcoffee";

    export let coffee: TCoffee;
</script>

<section class:coffee={!!coffee} class:placeholder={!coffee}>
    <div class="blend">
            {coffee?.blend_name}
    </div>
</section>

<style>
    
</style>