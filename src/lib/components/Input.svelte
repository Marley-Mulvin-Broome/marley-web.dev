<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?: string;
		validate?: (value: string) => boolean;
		invalidMessage?: string;
	}

	let { value = $bindable(''), invalidMessage, validate, ...props }: Props = $props();

	const isValid = $derived.by(() => {
		return validate?.(value);
	});

	let removedFocus = $state(false);

	let showInvalidator = $derived(!isValid && validate && removedFocus);

	const handleInput = () => {
		removedFocus = false;
	};

	const handleFocus = () => {
		removedFocus = true;
	};
</script>

<div class="relative w-full">
	<input
		class="bg-primary-light border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-400 focus:outline-none focus:border-accent shadow-inne data-[valid=false]:data-[show-validator=true]:border-red-400 w-full"
		onfocusout={handleFocus}
		oninput={handleInput}
		bind:value
		data-valid={isValid}
		data-show-validator={showInvalidator}
		{...props}
	/>

	{#if showInvalidator}
		<p class="text-red-400 text-sm font-light mt-[2px]">
			{invalidMessage || 'Invalid'}
		</p>
	{/if}
</div>
