<script lang="ts">
	import type { Snippet } from "svelte";

  interface Props {
    tag: string;
    children: Snippet;
    class?: string;
  }

  let { tag, children, class: classes }: Props = $props();
</script>

<svelte:element
  this={tag}
  class={"inline-block bg-gradient-to-r  text-transparent bg-clip-text " + classes}
>
  {@render children()}
</svelte:element>