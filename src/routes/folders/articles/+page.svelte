<script lang="ts">
	import ArticleColumnHeader from "$lib/components/desktop-window/ArticleColumnHeader.svelte";
	import ArticleRow from "$lib/components/desktop-window/ArticleRow.svelte";
import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { breadcrums } from "$lib";
	import { t } from "$lib/translations";

  interface Props {
    data: PageData
  }

  let { data }: Props = $props();

  onMount(() => {
    windows.breadcrums = breadcrums.articles
  });
</script>

<div
  class="w-full grid grid-cols-6 items-center mb-2"
>
  <ArticleColumnHeader
    class="col-span-3"
  >
    {$t('common.articles.name')}
  </ArticleColumnHeader>

  <ArticleColumnHeader
    class="col-span-2"
  >
    {$t('common.articles.category')}
  </ArticleColumnHeader>

  <ArticleColumnHeader
    class="col-span-1"
  >
    {$t('common.articles.time-posted')}
  </ArticleColumnHeader>
</div>

<div
  class="w-full flex flex-col gap-2"
>
  {#each data.articles as article}
    <ArticleRow {...article} />
  {/each}
</div>