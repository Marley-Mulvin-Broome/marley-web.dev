<script lang="ts">
	import ProjectItem from "$lib/components/desktop-window/ProjectItem.svelte";
import GradientText from "$lib/components/GradientText.svelte";
import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = [
      {
        title: 'Folders',
        href: '/folders'
      },
      {
        title: 'About Me',
      }
    ]

    windows.fullscreen = true;
  })
</script>

<article
  class="px-6 py-4 overflow-y-scroll max-h-full"
>
  <h1
    class="text-3xl font-bold mt-6 mb-8"
  >
    I <GradientText tag="em" class="pr-1 from-accent to-violet-500">try</GradientText> to make things that are useful.
  </h1>

  <div
    class="flex flex-row gap-2 mb-2"
  >
    <div class="w-1/2">
      <p class="text-gray-400 text-lg">
        I've been programming since I was 12 years old, and sadly don't seem to be stopping anytime soon. I'm currently not looking for a job, feel free to contact me if you're interested.
      </p>
    </div>

    <img src="/marley.png" alt="Marley Mulvin Broome" class="w-1/2" />
  </div>

  <div>
    <h2
      class="text-2xl font-bold mb-4"
    >
      Currently Working On
    </h2>

    <div
      class="flex flex-row justify-between"
    >
      <ProjectItem 
        title="Home Call"
        href="/folders/projects/home-call"
        img="/projects/home-call.png"
      />

      <ProjectItem 
        title="Short It"
        href="/folders/projects/short-it"
        img="/projects/short-it.svg"
      />

      <ProjectItem 
        title="Pactom DeMo"
        href="/folders/projects/pactom-demo"
        img="/projects/pactom-demo.svg"
      />
    </div>
    
  </div>
</article>
