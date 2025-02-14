<script lang="ts">
	interface ProjectLink {
		type: 'github' | 'pypi' | 'presentation' | 'website';
		url: string;
	}

	interface Props {
		links: ProjectLink[];
		class?: string;
	}

	let { links, class: classes }: Props = $props();
</script>

{#snippet github()}
	<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"
		><rect width="64" height="64" fill="none" /><path
			fill="currentColor"
			d="M32 0C14 0 0 14 0 32c0 21 19 30 22 30c2 0 2-1 2-2v-5c-7 2-10-2-11-5c0 0 0-1-2-3c-1-1-5-3-1-3c3 0 5 4 5 4c3 4 7 3 9 2c0-2 2-4 2-4c-8-1-14-4-14-15q0-6 3-9s-2-4 0-9c0 0 5 0 9 4c3-2 13-2 16 0c4-4 9-4 9-4c2 7 0 9 0 9q3 3 3 9c0 11-7 14-14 15c1 1 2 3 2 6v8c0 1 0 2 2 2c3 0 22-9 22-30C64 14 50 0 32 0"
		/></svg
	>
{/snippet}

{#snippet pypi()}
	<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="-29 0 512 512"
		><rect x="-29" width="512" height="512" fill="none" /><path
			fill="currentColor"
			d="m454 305.83l-91.12 33.691v106.481L181.946 512V298.297l179.884-66.863V58.824L454 92.497zm-177.16 57.555c-15.718 5.724-28.458 23.924-28.453 40.648c.007 16.717 12.753 25.633 28.464 19.92c15.718-5.725 28.46-23.922 28.455-40.647c-.003-16.725-12.75-25.642-28.467-19.921M334.615 212.5l-180.392 66.878l.296 135.76l-64.21 22.992L0 405.26V191.926l90.704-33.692V51.755L232.972 0l101.644 32.464zM215.214 94.833c-15.717 5.722-28.462 23.925-28.458 40.65c.002 16.725 12.75 25.646 28.468 19.925c15.718-5.722 28.462-23.925 28.46-40.65c-.003-16.725-12.752-25.646-28.47-19.925"
		/></svg
	>
{/snippet}

{#snippet presentation()}
	<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
		><rect width="24" height="24" fill="none" /><path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M3 3h1m17 0h-1m0 0v12h-6m6-12H4m0 0v12h6m0 0l-2 6m2-6h4m0 0l2 6m-5-10V7l3 2z"
		/></svg
	>
{/snippet}

{#snippet website()}
	<svg
		class="text-accent"
		xmlns="http://www.w3.org/2000/svg"
		width="64"
		height="64"
		viewBox="0 0 2048 2048"
		><rect width="2048" height="2048" fill="none" /><path
			fill="currentColor"
			d="M1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32m597-880l48-144h75l-85 256h-75l-48-144l-48 144h-75l-85-256h75l48 144l48-144h74zm-464-144h75l-85 256h-75l-48-144l-48 144h-75l-85-256h75l48 144l48-144h74l48 144zm-512 0h75l-85 256h-75l-48-144l-48 144h-75l-85-256h75l48 144l48-144h74l48 144z"
		/></svg
	>
{/snippet}

<div class="flex flex-row gap-8 {classes}">
	{#each links as link}
		<a
			href={link.url}
			rel="noreferrer"
			target="_blank"
			class="text-accent pt-4 hover:opacity-80"
			aria-labelledby={link.type}
		>
			{#if link.type === 'github'}
				{@render github()}
			{:else if link.type === 'pypi'}
				{@render pypi()}
			{:else if link.type === 'presentation'}
				{@render presentation()}
			{:else if link.type === 'website'}
				{@render website()}
			{/if}
		</a>
	{/each}
</div>
