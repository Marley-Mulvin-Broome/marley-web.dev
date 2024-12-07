<script>
	import FolderSidebarItem from "./FolderSidebarItem.svelte";
import FoldersSidebarSection from "./FoldersSidebarSection.svelte";

</script>
<div
  class="flex flex-col gap-8 mt-10 w-full" 
>
  <FoldersSidebarSection title="Folders">
    <FolderSidebarItem
      icon="folder"
      href="/folders/projects"
    >
      Projects
    </FolderSidebarItem>

    <FolderSidebarItem
      icon="folder"
      href="/folders/articles"
    >
      Articles
    </FolderSidebarItem>
  </FoldersSidebarSection>
  <FoldersSidebarSection title="Files">
    <FolderSidebarItem
      icon="file"
      href="/folders/about-me"
    >
      About Me
    </FolderSidebarItem>
  </FoldersSidebarSection>
  <FoldersSidebarSection title="Contact">
    <FolderSidebarItem
      icon="mail"
      href="/folders/contact"
    >
      Contact
    </FolderSidebarItem>
  </FoldersSidebarSection>
</div>