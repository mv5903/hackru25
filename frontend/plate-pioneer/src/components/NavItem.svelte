<script lang="ts">
  import { clientAPIInstance } from "$lib/stores/clientAPIStore";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import type NavItemType from "../assets/NavItemType";

  export let tab: NavItemType;
  export let isActive: boolean;
  export let updateNavItem: (item: NavItemType) => void;

  let isFormComplete = false;

  onMount(async () => {
    if ($clientAPIInstance) {
      isFormComplete = await $clientAPIInstance.intakeFormComplete();
    }
  });
</script>

<button class={`${isActive && "active"} ${!isFormComplete && "disabled"}`} aria-label="Active Screen Tab" on:click={() => updateNavItem(tab)}>
  <Icon icon={`mdi-light:${tab.icon}`} />
</button>