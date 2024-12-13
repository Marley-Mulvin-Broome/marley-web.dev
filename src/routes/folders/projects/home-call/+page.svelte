<script lang="ts">
	import { breadcrums } from "$lib";
	import ProjectLinksList from "$lib/components/ProjectLinksList.svelte";
	import { t } from "$lib/translations";
	import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.fullscreen = true;

    windows.breadcrums = [...breadcrums.projects, {
      title: "Home Call",
      href: "/folders/projects/home-call"
    }]
  })
</script>

<div
  class="flex flex-col items-center justify-center h-full px-20 py-4"
>
  <h1 class="text-3xl font-bold mb-2">
    Home Call
  </h1>

  <p class="text-lg mb-4">
    {$t('common.home-call.description')}
  </p>

  <img src="/projects/home-call-pc.png" alt="Home Call" class="w-full" />

  <ProjectLinksList 
    links={[
      {
        type: "website",
        url: "https://lp.home-call.app"
      }
    ]}
  />

  <!-- <p
    class="pt-1"
  >
    {@html $t('common.home-call.interested')}
  </p> -->
</div>

<div class="w-full h-[2px] bg-gray-600 my-4"></div>

{#snippet h2(title: string)}
  <h2
    class="text-2xl font-bold mb-4"
  >
    {title}
  </h2>
{/snippet}

{#snippet h3(title: string)}
  <h3
    class="text-xl font-semibold mb-2"
  >
    {title}
  </h3>
{/snippet}

<div
  class="flex flex-col"
>

  {@render h2($t('common.home-call.data-management-title'))}

  <p
    class="text-lg mb-6"
  >
    {$t('common.home-call.data-management-content')}
  </p>

  {@render h2($t('common.home-call.notifications-title'))}

  <p
    class="text-lg mb-6"
  >
    {$t('common.home-call.data-management-content')}
  </p>

  {@render h2($t('common.home-call.updates-title'))}

  <p
    class="text-lg mb-6"
  >
     {$t('common.home-call.updates-description')}
  </p>

  {@render h2($t('common.home-call.tech-stack'))}

  <p
    class="text-lg mb-6"
  >
     {$t('common.home-call.tech-stack-description')}
  </p>

  
 
  {@render h3($t('common.home-call.cloud-version'))}

  <ul class="mb-4 list-disc pl-4">
    <li>SvelteKit</li>
    <li>Tailwind CSS</li>
    <li>PostgreSQL</li>
    <li>Hono</li>
    <li>Firebase Authentication</li>
  </ul>

  {@render h3($t('common.home-call.desktop-version'))}

  <ul class="mb-4 list-disc pl-4">
    <li>Svelte</li>
    <li>Electron</li>
    <li>SQLite</li>
    <li>Multicast Dns</li>
    <li>Websocket</li>
  </ul>
</div>