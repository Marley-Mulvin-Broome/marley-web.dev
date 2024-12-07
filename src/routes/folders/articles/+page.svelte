<script lang="ts">
	import ArticleColumnHeader from "$lib/components/desktop-window/ArticleColumnHeader.svelte";
	import ArticleRow from "$lib/components/desktop-window/ArticleRow.svelte";
import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

  interface Props {
    data: PageData
  }

  let { data }: Props = $props();

  onMount(() => {
    windows.breadcrums = [
      {
        title: 'Folders',
        href: '/folders'
      },
      {
        title: 'Articles',
      }
    ]
  });
</script>

<div
  class="w-full grid grid-cols-6 items-center mb-2"
>
  <ArticleColumnHeader
    class="col-span-3"
  >
    Name
  </ArticleColumnHeader>

  <ArticleColumnHeader
    class="col-span-2"
  >
    Category
  </ArticleColumnHeader>

  <ArticleColumnHeader
    class="col-span-1"
  >
    Time Posted
  </ArticleColumnHeader>
</div>

<div
  class="w-full flex flex-col gap-2"
>
  {#each data.articles as article}
    <ArticleRow {...article} />
  {/each}
</div>