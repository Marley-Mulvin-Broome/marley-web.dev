<script lang="ts">
	import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = [
      {
        title: 'Folders',
      },
    ]
  })
</script>