<script lang="ts">
  import { isAdmin } from "$lib/stores/auth";
  import PlanetCard from "$lib/components/planets/PlanetCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Planets | Solar System Explorer</title>
</svelte:head>

<div class="planets-page">
  <div class="header">
    <h1>Explore Planets</h1>

    {#if $isAdmin}
      <a href="/planets/add" class="add-btn">Add New Planet</a>
    {/if}
  </div>

  {#if data.planets.length === 0}
    <div class="empty-state">
      <p>
        No planets found. {$isAdmin
          ? "Add a planet to get started."
          : "Check back later."}
      </p>

      {#if $isAdmin}
        <a href="/planets/add" class="add-btn">Add Planet</a>
      {/if}
    </div>
  {:else}
    <div class="planets-grid">
      {#each data.planets as planet (planet.id)}
        <div class="planet-card-wrapper">
          <PlanetCard {planet} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .planets-page {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
  }

  .add-btn {
    display: inline-block;
    background-color: #4f46e5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 0;
    color: #6b7280;
  }

  .planets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .planet-card-wrapper {
    height: 100%;
  }
</style>
