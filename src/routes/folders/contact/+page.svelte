<script lang="ts">
	import { breadcrums } from '$lib';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { t } from '$lib/translations';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';
	import validator from 'validator';

	onMount(() => {
		windows.fullscreen = true;
		windows.breadcrums = breadcrums.contact;
	});

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let loadState: 'idle' | 'sending' | 'success' | 'error' = $state('idle');

	const handleSend = async () => {
		if (loadState !== 'idle' || name.length < 0 || !validator.isEmail(email) || message.length < 0)
			return;

		loadState = 'sending';

		try {
			await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					message
				})
			});

			loadState = 'success';
		} catch (e) {
			console.error(e);
			loadState = 'error';
			return;
		}

		loadState = 'success';
	};
</script>

<h1 class="text-3xl font-bold mb-4">
	{$t('common.contact.title')}
</h1>

{#if loadState === 'idle'}
	<div class="flex flex-row gap-8 pb-4">
		<div class="flex flex-col gap-2 w-1/2">
			<Label>
				{$t('common.contact.name')}
			</Label>

			<Input
				placeholder="Marley Mulvin Broome"
				validate={(value) => {
					return value.length > 0;
				}}
				invalidMessage={$t('common.contact.invalid-name')}
				bind:value={name}
			/>
		</div>

		<div class="flex flex-col gap-2 w-1/2">
			<Label>
				{$t('common.contact.email')}
			</Label>

			<Input
				placeholder="marley@gmai.com"
				type="email"
				validate={(value) => validator.isEmail(value)}
				invalidMessage={$t('common.contact.invalid-email')}
				bind:value={email}
			/>
		</div>
	</div>

	<div class="flex flex-col gap-2 w-full">
		<Label>
			{$t('common.contact.message')}
		</Label>
		<textarea
			class="bg-primary-light border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-400 focus:outline-none focus:border-accent shadow-inner h-[200px] mb-2"
			bind:value={message}
		></textarea>

		<button onclick={handleSend}>
			{$t('common.contact.send')}
		</button>
	</div>
{:else if loadState === 'sending'}
	<div class="w-full py-40 flex items-center justify-center">
		<Loader />
	</div>
{:else if loadState === 'success'}
	<div class="w-full py-40 flex items-center justify-center animate-bounce">
		<p class="text-green-400 text-lg">
			{$t('common.contact.success')}
		</p>
	</div>
{:else}
	<div class="w-full py-40 flex flex-col items-center justify-center">
		<p class="text-red-400 text-lg">
			{$t('common.contact.error')}
		</p>

		<button
			class="bg-primary-light text-white rounded-md px-4 py-2 mt-4"
			onclick={() => {
				loadState = 'idle';
			}}
		>
			{$t('common.contact.try-again')}
		</button>
	</div>
{/if}
