<script lang="ts">
	import { breadcrums } from '$lib';
	import DesktopIcon from '$lib/components/DesktopIcon.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { t } from '$lib/translations';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		windows.breadcrums = breadcrums.folders;
	});
</script>

<Meta
	title={$t('common.meta.folders.title')}
	description={$t('common.meta.folders.description')}
	image={$t('common.meta.folders.image')}
/>

<section class="flex flex-row flex-wrap gap-x-4 pt-4 px-4">
	<DesktopIcon name={$t('common.folders.algorithms')} type="folder" href="/folders/algorithms"
	></DesktopIcon>

	<DesktopIcon name={$t('common.folders.projects')} type="folder" href="/folders/projects"
	></DesktopIcon>

	<DesktopIcon name={$t('common.folders.articles')} type="folder" href="/folders/articles"
	></DesktopIcon>
</section>
