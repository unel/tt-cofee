<script lang="ts">
    const data = [
        { key: "project", value: "test assignment", link: "https://github.com/unel/tt-coffee" },
        { key: "author", value: "unel", link: "https://github.com/unel" },
    ];
</script>

<section class="root">
    <section class="shorts">
        <h2>short info</h2>
        {#each data as line}
            <div class="line">
                <div>{ line.key }:</div>

                <div>
                    {#if line.link}
                        <a href={ line.link } target="_blank">
                            { line.value }
                        </a>
                    {:else}
                        { line.value }
                    {/if}
                </div>
            </div>
        {/each}
    </section>

    <section>
        <h2>Description</h2>
        <p>
            This is a test project which load information about coffee flavours from api and render it.
            There is two ways to start it: 1. by <code>docker compose up</code> command in root folder and by <code>npm run idev</code> command in front folder. 
        </p>
    </section>
</section>


<style lang="less">
    .root {
        padding: 16px;
        max-width: 600px;
    }
    .shorts {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
    }

    .line {
        display: flex;
        flex-direction: row;
        column-gap: 16px;
    }

    code {
        background-color: rgba(0,0,0, .5);
        color: lime;
        padding: 4px;
    }
</style>