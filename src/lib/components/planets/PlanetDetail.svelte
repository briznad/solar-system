<script lang="ts">
  import type { Planet } from "$lib/models/planet";
  import { isAdmin } from "$lib/stores/auth";
  import { createEventDispatcher } from "svelte";

  export let planet: Planet;

  const dispatch = createEventDispatcher<{
    delete: { id: string };
  }>();

  function handleDelete() {
    if (confirm(`Are you sure you want to delete ${planet.name}?`)) {
      dispatch("delete", { id: planet.id });
    }
  }
</script>

<div class="planet-detail">
  <div class="header">
    <h1>{planet.name}</h1>

    {#if $isAdmin}
      <div class="admin-actions">
        <a href={`/planets/edit/${planet.id}`} class="edit-btn">Edit</a>
        <button class="delete-btn" on:click={handleDelete}>Delete</button>
      </div>
    {/if}
  </div>

  <div class="content">
    <div class="image-container">
      {#if planet.imageUrl}
        <img src={planet.imageUrl} alt={planet.name} />
      {:else}
        <div class="no-image">No Image Available</div>
      {/if}
    </div>

    <div class="info">
      <div class="description">
        <h2>Description</h2>
        <p>{planet.description}</p>
      </div>

      <div class="details">
        <h2>Details</h2>
        <ul>
          <li>
            <strong>Diameter:</strong>
            {planet.diameter.toLocaleString()} km
          </li>
          <li>
            <strong>Distance from Sun:</strong>
            {planet.distanceFromSun.toLocaleString()} million km
          </li>
          <li>
            <strong>Has Rings:</strong>
            {planet.hasRings ? "Yes" : "No"}
          </li>
          <li>
            <strong>Number of Moons:</strong>
            {planet.moons}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .planet-detail {
    max-width: 800px;
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
    font-size: 2rem;
    color: #111827;
  }

  .admin-actions {
    display: flex;
    gap: 0.5rem;
  }

  .edit-btn,
  .delete-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #f59e0b;
    color: white;
    text-decoration: none;
  }

  .delete-btn {
    background-color: #ef4444;
    color: white;
    border: none;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #9ca3af;
    font-size: 1.25rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: #111827;
  }

  .description p {
    margin: 0;
    line-height: 1.6;
    color: #4b5563;
  }

  .details ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .details li {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }

  .details strong {
    color: #111827;
  }

  @media (max-width: 640px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
</style>
