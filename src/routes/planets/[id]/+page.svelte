<script lang="ts">
  import { goto } from "$app/navigation";
  import PlanetDetail from "$lib/components/planets/PlanetDetail.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  async function handleDelete({ detail }: CustomEvent<{ id: string }>) {
    try {
      // Delete the planet
      const response = await fetch(`/api/planets/${detail.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Redirect to the planets list
        goto("/planets");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete planet");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  }
</script>

<svelte:head>
  <title>{data.planet.name} | Solar System Explorer</title>
</svelte:head>

<div class="planet-page">
  <PlanetDetail planet={data.planet} on:delete={handleDelete} />
</div>
