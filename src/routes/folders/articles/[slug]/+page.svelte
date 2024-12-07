<script lang="ts">
	import { meta } from "$lib/meta.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { windows } from "$lib/windows.svelte";
	import Avatar from "$lib/components/Avatar.svelte";

  interface Props {
    data: PageData
  }

  let { data }: Props = $props();

  const { article } = data;

  meta.title = article.meta.title;
  meta.description = article.meta.description;
  meta.image = article.meta.img;

  onMount(() => {
    windows.fullscreen = true;

    windows.breadcrums = [
      {
        title: 'Folders',
        href: '/folders'
      },
      {
        title: 'Articles',
        href: '/folders/articles'
      },
      {
        title: article.meta.title,
      }
    ]
  })
</script>


<article class="prose px-6 py-4 overflow-y-scroll max-h-full flex flex-col justify-center self-center w-full">
  <h1 class="text-3xl font-bold mb-4">{article.meta.title}</h1>

  <div
    class="flex flex-row justify-between items-center mb-4"
  >
    <div
      class="flex flex-row gap-2 items-center"
    >
      <Avatar 
        src="/marley.png"
        alt="Marley Mulvin Broome"
        width={40}
        height={40}
      />

      <div class="flex flex-col justify-between">
        <span class="text-lg">
          Marley Mulvin Broome
        </span>

        <span
          class="text-gray-500"
        >
          {article.meta.lastUpdate.toLocaleDateString()}
        </span>
      </div>
    </div>

    <div
      class="rounded-full bg-gray-600/20 px-2 py-1 text-sm text-white border border=gray-600"
    >
      {article.meta.category}
    </div>
  </div>

  <p
    class="text-lg text-gray-400 mb-4"
  >
    {article.meta.description}
  </p>
  
  <img src={article.meta.img} alt={article.meta.title} class="rounded-md">

  <div>
    <article.content />
  </div>
</article>