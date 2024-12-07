<script lang="ts">
	import ProjectItem from "$lib/components/desktop-window/ProjectItem.svelte";
import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = [
      {
        title: 'Folders',
        href: '/folders'
      },
      {
        title: 'Projects',
      }
    ]
  })
</script>

<div
  class="flex flex-row flex-wrap gap-4 items-center pt-2"
>
  {#snippet project(title, href, img)}
    <ProjectItem 
      {title}
      {href}
      {img}
    />
  {/snippet}

  {@render project("Home Call", "/folders/projects/home-call", "/projects/home-call.png")}
  {@render project("Short It", "/folders/projects/short-it", "/projects/short-it.svg")}
  {@render project("Pactom DeMo", "/folders/projects/pactom-demo", "/projects/pactom-demo.svg")}
</div>