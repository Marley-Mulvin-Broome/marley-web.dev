<script lang="ts">
	import { breadcrums } from "$lib";
	import ProjectLinksList from "$lib/components/ProjectLinksList.svelte";
	import { t } from "$lib/translations";
	import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.fullscreen = true;

    windows.breadcrums = [...breadcrums.projects, {
      title: "Omnia",
      href: "/folders/projects/omnia"
    }]
  })
</script>

<div
  class="flex flex-col items-center justify-center h-full px-20 py-4"
>
  <h1 class="text-3xl font-bold mb-2">
    Omnia
  </h1>

  <p class="text-lg mb-4">
    {$t('common.omnia.description')}
  </p>

  <img src="/projects/omnia.png" alt="Home Call" class="w-full object-cover" />

  <ProjectLinksList 
    links={[
      {
        type: "presentation",
        url: "https://docs.google.com/presentation/d/15PTuZaG1NjxgJqFxl_e6LM0fL03UuVqiCUsgjtHDhpk/edit?usp=sharing"
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
  {@render h2($t('common.omnia.description-title'))}

  <p class="text-lg mb-6">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html $t('common.omnia.description-content')}
  </p>

  {@render h2($t('common.omnia.tech-stack'))}

  <ul class="mb-4 list-disc pl-4 text-lg">
    <li>React</li>
    <li>Material UI</li>
    <li>Firebase Authentication</li>
    <li>Firebase Store</li>
    <li>Flutter (Mobile)</li>
    <li>Python (FastAPI)</li>
  </ul>
</div>