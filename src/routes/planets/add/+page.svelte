<script lang="ts">
  import { goto } from "$app/navigation";
  import { isAdmin } from "$lib/stores/auth";
  import PlanetForm from "$lib/components/planets/PlanetForm.svelte";
  import { page } from "$app/stores";
  import type { PlanetData } from "$lib/models/planet";

  let isSubmitting = false;
  let error: string | null = null;

  // Redirect if not an admin
  $: if (!$isAdmin && !isSubmitting) {
    goto("/planets");
  }

  async function handleSubmit(event: CustomEvent<PlanetData>) {
    error = null;
    isSubmitting = true;

    try {
      const response = await fetch("/api/planets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event.detail),
      });

      if (response.ok) {
        const data = await response.json();
        goto(`/planets/${data.id}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create planet");
      }
    } catch (err) {
      console.error("Submit error:", err);
      error = err instanceof Error ? err.message : "An error occurred";
    } finally {
      isSubmitting = false;
    }
  }

  function handleCancel() {
    goto("/planets");
  }
</script>

<svelte:head>
  <title>Add Planet | Solar System Explorer</title>
</svelte:head>

<div class="add-planet-page">
  <h1>Add New Planet</h1>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <PlanetForm
    {isSubmitting}
    on:submit={handleSubmit}
    on:cancel={handleCancel}
  />
</div>

<style>
  .add-planet-page {
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
