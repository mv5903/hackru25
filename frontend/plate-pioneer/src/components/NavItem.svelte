<script lang="ts">
  import Icon from "@iconify/svelte";
  import type NavItemType from "../assets/NavItemType";

  export let tab: NavItemType;
  export let isActive: boolean;
  export let updateNavItem: (item: NavItemType) => void;
</script>

<button class={`${isActive && "active"}`} aria-label="Active Screen Tab" on:click={() => updateNavItem(tab)}>
  <Icon icon={`mdi-light:${tab.icon}`} />
</button>