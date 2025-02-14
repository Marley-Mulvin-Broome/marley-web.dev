<script lang="ts">
	interface Props {
		variant: 'close' | 'maximize' | 'minimize';
	}

	let { variant = 'close' }: Props = $props();

	let extraClasses = $derived.by(() => {
		switch (variant) {
			case 'close':
				return 'bg-red-500 border-red-900';
			case 'maximize':
				return 'bg-green-500 border-green-900';
			case 'minimize':
				return 'bg-yellow-500 border-yellow-900';
		}
	});
</script>

<div class={'rounded-full w-[20px] h-[20px] ' + extraClasses}></div>
