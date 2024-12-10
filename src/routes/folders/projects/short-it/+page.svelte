<script lang="ts">
  import { breadcrums } from "$lib";
  import { windows } from "$lib/windows.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = [...breadcrums.projects, {
      title: "Short It",
      href: "/folders/projects/short-it"
    }]
  })
</script>