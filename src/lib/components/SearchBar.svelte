<script lang="ts">
	import { browser } from "$app/environment";
	import type { SearchIndexItem } from "$lib/types";
	import { stopPropagation } from "$lib/utility";
	import Icon from "./Icon.svelte";
	import Spinner from "./Spinner.svelte";
  
  const handleSearch = async (query: string): Promise<SearchIndexItem[]> => {
    if (!browser) return [];

    const results = await fetch('/api/search?q=' + query);
    const searchResults = await results.json();

    return searchResults.results as SearchIndexItem[];
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      open = false;
    }
  }

  const handleBackdropClick = () => {
    open = false;
  }

  interface Props {
    open?: boolean;
  }

  let { open = $bindable(false) }: Props = $props();
  let value = $state('');

  let items = $derived(handleSearch(value));
</script>

<svelte:window onkeydown={handleKeyPress} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex flex-col items-center pt-32"
    onclick={handleBackdropClick}
  >
    <div
      class="flex flex-col gap-4 w-1/2"
      onclick={stopPropagation()}
    >
      <div
        class="bg-primary-light rounded-md p-4 flex flex-row items-center gap-4 w-full"
      >
        <input class="p-2 bg-transparent border-b-2 border-b-accent/50 focus:outline-none focus:border-b-accent transition-colors flex-1 peer" type="text" placeholder="League of Legends" bind:value />

        <Icon
          icon="/icons/search.svg"
          class="text-accent/50 peer-focus:text-accent transition-colors"
          width={32}
          height={32}
        />
      </div>

      <div
        class="bg-primary-light rounded-md p-4 flex flex-col items-center gap-4 w-full h-[400px]"
      >
        {#if value !== ''}
          {#await items}
            <Spinner />
          {:then results}
            {#each results as result}
              <div class="bg-primary-light rounded-md p-4 flex flex-row items-center gap-4 w-full">
                <a href={result.href} onclick={() => { open = false }}>
                  <h2 class="text-xl">
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html result.title}
                  </h2>
                </a>
              </div>
            {/each}
          {/await}
        {/if}
      </div>
      
    </div>
  </div>
{/if}