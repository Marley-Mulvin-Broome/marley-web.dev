<script lang="ts">
	import { breadcrums } from "$lib";
	import ProjectLinksList from "$lib/components/ProjectLinksList.svelte";
	import { t } from "$lib/translations";
	import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.fullscreen = true;

    windows.breadcrums = [...breadcrums.projects, {
      title: "Electron Timer",
      href: "/folders/projects/electron-timer"
    }]
  })
</script>

<div
  class="flex flex-col items-center justify-center h-full px-20 py-4"
>
  <h1 class="text-3xl font-bold mb-2">
    {$t('common.electron-timer.title')}
  </h1>

  <p class="text-lg mb-4">
    {$t('common.electron-timer.description')}
  </p>

  <video defaultmuted playsinline muted autoplay loop class="rounded-md">
    <source src="/projects/electrontimer.webm" type="video/webm" />
    <track kind="captions" />
  </video>

  <ProjectLinksList 
    links={[
      {
        type: "github",
        url: "https://github.com/Marley-Mulvin-Broome/electron-timer/tree/development"
      }
    ]}
  />
  
</div>

<div class="w-full h-[2px] bg-gray-600 my-4"></div>

{#snippet h2(title: string)}
  <h2
    class="text-2xl font-bold mb-4"
  >
    {title}
  </h2>
{/snippet}

<div
  class="flex flex-col"
>
  {@render h2($t('common.electron-timer.description-title'))}

  <p class="text-lg mb-6">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html $t('common.electron-timer.description-content')}
  </p>

  {@render h2($t('common.electron-timer.tech-stack'))}

  <ul class="mb-4 list-disc pl-4 text-lg">
    <li>Electron</li>
    <li>Vanilla JS</li>
  </ul>
</div>