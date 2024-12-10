<script lang="ts">
	import { breadcrums } from "$lib";
	import Meta from "$lib/components/Meta.svelte";
	import { t } from "$lib/translations";
	import { windows } from "$lib/windows.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    windows.breadcrums = breadcrums.folders;
  })
</script>

<Meta
	title={$t('common.meta.folders.title')}
	description={$t('common.meta.folders.description')} 
	image={$t('common.meta.folders.image')}
/>