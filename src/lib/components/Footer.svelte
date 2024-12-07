<script lang="ts">
	import FooterSocials from "./FooterSocials.svelte";
	import Icon from "./Icon.svelte";

  interface FooterItem {
    href: string;
    icon: 'mail';
  }

  interface Props {
    footerItems: FooterItem[];
  }

  const { footerItems }: Props = $props();


</script>

<footer
	class="flex flex-row justify-between bg-primary-light border-t border-gray-600 py-4 px-16"
>
	<div>
		{#each footerItems as item (item.href)}
      <a href={item.href}>
        <Icon 
          icon="/icons/{item.icon}.svg"
          class="text-accent"
          overwriteColours={false}
          overwriteDimensions={false}
        />
      </a>
    {/each}
	</div>

  <FooterSocials />
	
</footer>
