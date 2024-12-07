<script lang="ts">
	import Avatar from "./Avatar.svelte";

  interface Props {
    img?: string;
    name?: string;
    title?: string;
  }

  const { img = '/marley.png', name = 'Marley Mulvin Broome', title = 'Web Developer & Sigma Male' }: Props = $props();
</script>

<header
	class="bg-primary-light w-full flex flex-row px-16 py-4 border-b border-gray-600"
>
	<nav class="flex flex-row justify-between items-center w-full">
		<div class="flex flex-row gap-2 items-center font-semibold text-lg tracking-wide">
			<Avatar src={img} alt="Marley" width={32} height={32} />
			{name}
		</div>

		<span
			class="text-sm text-gray-400 font-medium"
		>
			{title}
		</span>
	</nav>
</header>
