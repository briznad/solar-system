<script lang="ts">
  import type { Planet } from "$lib/models/planet";
  import { isAdmin } from "$lib/stores/auth";

  export let planet: Planet;
</script>

<div class="planet-card">
  <div class="image-container">
    {#if planet.imageUrl}
      <img src={planet.imageUrl} alt={planet.name} />
    {:else}
      <div class="no-image">No Image</div>
    {/if}
  </div>

  <div class="content">
    <h3>{planet.name}</h3>
    <p class="description">{planet.description.substring(0, 100)}...</p>

    <div class="details">
      <span>Diameter: {planet.diameter.toLocaleString()} km</span>
      <span>Moons: {planet.moons}</span>
    </div>

    <div class="actions">
      <a href={`/planets/${planet.id}`} class="view-btn">View Details</a>

      {#if $isAdmin}
        <div class="admin-actions">
          <a href={`/planets/edit/${planet.id}`} class="edit-btn">Edit</a>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .planet-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    height: 100%;
  }

  .planet-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    height: 200px;
    background-color: #f3f4f6;
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
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #111827;
  }

  .description {
    margin-bottom: 0.75rem;
    color: #4b5563;
    flex-grow: 1;
  }

  .details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .view-btn,
  .edit-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .view-btn {
    background-color: #4f46e5;
    color: white;
  }

  .edit-btn {
    background-color: #f59e0b;
    color: white;
  }

  .admin-actions {
    display: flex;
    gap: 0.5rem;
  }
</style>
