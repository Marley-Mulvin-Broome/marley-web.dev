<script lang="ts">
	import { breadcrums } from "$lib";
	import ProjectItem from "$lib/components/desktop-window/ProjectItem.svelte";
import GradientText from "$lib/components/GradientText.svelte";
	import { t } from "$lib/translations";
import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = breadcrums.about;

    windows.fullscreen = true;
  })
</script>

<article
  class="px-2 lg:px-6 py-4 overflow-y-scroll max-h-full"
>
  <h1
    class="text-3xl font-bold mt-6 mb-8"
  >
    I <GradientText tag="em" class="pr-1 from-accent to-violet-500">try</GradientText> to make things that are useful.
  </h1>

  <div
    class="flex flex-col lg:flex-row gap-2 mb-2"
  >
    <div class="lg:w-1/2">
      <p class="text-gray-400 text-lg">
        {$t('common.about.description')}
      </p>
    </div>

    <img src="/marley.png" alt="Marley Mulvin Broome" class="lg:w-1/2" />
  </div>

  <div>
    <h2
      class="text-2xl font-bold mb-4 mt-8 lg:mt-0 text-center lg:text-left"
    >
      {$t('common.about.working-on')}
    </h2>

    <div
      class="flex flex-row flex-wrap justify-center lg:justify-start lg:gap-20"
    >
      <ProjectItem 
        title={$t('common.projects.home-call')}
        href="/folders/projects/home-call"
        img="/projects/home-call.png"
      />

      <ProjectItem 
        title={$t('common.projects.short-it')}
        href="/folders/projects/short-it"
        img="/projects/penguin.gif"
      />
    </div>
    
  </div>

  <div
    class="mt-16"
  >
    <h2
      class="text-2xl font-bold mb-4"
    >
      {$t('common.about.timeline.title')}
    </h2>

    <div
      class="w-full border-l-2 border-gray-500 pl-4 flex flex-col gap-6 max-w-[600px]"
    >
      {#snippet item(title: string, date: string, description: string)}
        <div class="relative">
          <div class="absolute -translate-x-1/2 -left-[17px] top-1 w-4 h-4 rounded-full border-2 border-gray-500 bg-primary"></div>

          <h3 class="text-lg font-semibold mb-1">{title}</h3>

          <p class="text-gray-400 text-sm mb-2">
            {date}
          </p>

          <p class="text-gray-400 text-sm">
            {description}
          </p>
        </div>
      {/snippet}

      {@render item($t('common.about.timeline.jouhou-exam.title'), $t('common.about.timeline.jouhou-exam.date'), $t('common.about.timeline.jouhou-exam.description'))}

      {@render item($t('common.about.timeline.exchange.title'), $t('common.about.timeline.exchange.date'), $t('common.about.timeline.exchange.description'))}

      {@render item($t('common.about.timeline.familye.title'), $t('common.about.timeline.familye.date'), $t('common.about.timeline.familye.description'))}

      {@render item($t('common.about.timeline.pactom.title'), $t('common.about.timeline.pactom.date'), $t('common.about.timeline.pactom.description'))}

      {@render item($t('common.about.timeline.jlpt.title'), $t('common.about.timeline.jlpt.date'), $t('common.about.timeline.jlpt.description'))}

      {@render item($t('common.about.timeline.freelance.title'), $t('common.about.timeline.freelance.date'), $t('common.about.timeline.freelance.description'))}

      {@render item($t('common.about.timeline.unsw.title'), $t('common.about.timeline.unsw.date'), $t('common.about.timeline.unsw.description'))}
    </div>
</article>
