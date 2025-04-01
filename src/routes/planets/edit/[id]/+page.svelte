<script lang="ts">
  import { goto } from "$app/navigation";
  import { isAdmin } from "$lib/stores/auth";
  import PlanetForm from "$lib/components/planets/PlanetForm.svelte";
  import type { PageData } from "./$types";
  import type { PlanetData } from "$lib/models/planet";

  export let data: PageData;

  let isSubmitting = false;
  let error: string | null = null;

  // Extract planet data for the form
  const planetData: PlanetData = {
    name: data.planet.name,
    description: data.planet.description,
    diameter: data.planet.diameter,
    distanceFromSun: data.planet.distanceFromSun,
    hasRings: data.planet.hasRings,
    moons: data.planet.moons,
    imageUrl: data.planet.imageUrl,
  };

  // Redirect if not an admin
  $: if (!$isAdmin && !isSubmitting) {
    goto("/planets");
  }

  async function handleSubmit(event: CustomEvent<PlanetData>) {
    error = null;
    isSubmitting = true;

    try {
      const response = await fetch(`/api/planets/${data.planet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event.detail),
      });

      if (response.ok) {
        goto(`/planets/${data.planet.id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update planet");
      }
    } catch (err) {
      console.error("Submit error:", err);
      error = err instanceof Error ? err.message : "An error occurred";
    } finally {
      isSubmitting = false;
    }
  }

  function handleCancel() {
    goto(`/planets/${data.planet.id}`);
  }
</script>

<svelte:head>
  <title>Edit {data.planet.name} | Solar System Explorer</title>
</svelte:head>

<div class="edit-planet-page">
  <h1>Edit {data.planet.name}</h1>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <PlanetForm
    {planetData}
    planetId={data.planet.id}
    {isSubmitting}
    on:submit={handleSubmit}
    on:cancel={handleCancel}
  />
</div>

<style>
  .edit-planet-page {
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 2rem;
  }

  .error {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
  }
</style>
