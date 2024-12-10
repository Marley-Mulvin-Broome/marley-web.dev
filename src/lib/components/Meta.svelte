<script lang="ts">
	import { page } from "$app/stores";
	import { config } from "$lib";

  interface Props {
    title: string;
    description: string;
    image?: string;
    type?: string;
  }

  
  const canonicalURL = new URL($page.url.pathname, config.site);

  const { title, description, type, image = '/marley.png' }: Props = $props();
</script>



<svelte:head>
  <!-- Global Metadata -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL.toString()} />

  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type ?? 'website'} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, $page.url).toString()} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={$page.url.toString()} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={new URL(image, config.site).toString()} />
</svelte:head>






