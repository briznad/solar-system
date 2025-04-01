<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { PlanetData } from "$lib/models/planet";
  import ImageUploader from "./ImageUploader.svelte";

  export let planetData: PlanetData = {
    name: "",
    description: "",
    diameter: 0,
    distanceFromSun: 0,
    hasRings: false,
    moons: 0,
  };

  export let planetId: string | undefined = undefined;
  export let isSubmitting = false;

  let errors: Record<string, string> = {};

  const dispatch = createEventDispatcher<{
    submit: PlanetData;
    cancel: void;
  }>();

  function validateForm(): boolean {
    errors = {};

    if (!planetData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!planetData.description.trim()) {
      errors.description = "Description is required";
    }

    if (isNaN(planetData.diameter) || planetData.diameter <= 0) {
      errors.diameter = "Diameter must be a positive number";
    }

    if (isNaN(planetData.distanceFromSun) || planetData.distanceFromSun < 0) {
      errors.distanceFromSun =
        "Distance from Sun must be a non-negative number";
    }

    if (
      isNaN(planetData.moons) ||
      planetData.moons < 0 ||
      !Number.isInteger(planetData.moons)
    ) {
      errors.moons = "Number of moons must be a non-negative integer";
    }

    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validateForm()) {
      dispatch("submit", planetData);
    }
  }

  function handleCancel() {
    dispatch("cancel");
  }

  function handleImageUpload(event: CustomEvent<{ url: string }>) {
    planetData.imageUrl = event.detail.url;
  }

  function handleImageDelete() {
    planetData.imageUrl = undefined;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="planet-form">
  <div class="form-grid">
    <div class="form-left">
      <div class="form-group">
        <label for="name">Planet Name*</label>
        <input
          type="text"
          id="name"
          bind:value={planetData.name}
          disabled={isSubmitting}
          class:error={errors.name}
        />
        {#if errors.name}
          <div class="error-message">{errors.name}</div>
        {/if}
      </div>

      <div class="form-group">
        <label for="description">Description*</label>
        <textarea
          id="description"
          bind:value={planetData.description}
          rows="5"
          disabled={isSubmitting}
          class:error={errors.description}
        ></textarea>
        {#if errors.description}
          <div class="error-message">{errors.description}</div>
        {/if}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="diameter">Diameter (km)*</label>
          <input
            type="number"
            id="diameter"
            bind:value={planetData.diameter}
            min="0"
            step="1"
            disabled={isSubmitting}
            class:error={errors.diameter}
          />
          {#if errors.diameter}
            <div class="error-message">{errors.diameter}</div>
          {/if}
        </div>

        <div class="form-group">
          <label for="distanceFromSun">Distance from Sun (million km)*</label>
          <input
            type="number"
            id="distanceFromSun"
            bind:value={planetData.distanceFromSun}
            min="0"
            step="0.1"
            disabled={isSubmitting}
            class:error={errors.distanceFromSun}
          />
          {#if errors.distanceFromSun}
            <div class="error-message">{errors.distanceFromSun}</div>
          {/if}
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="moons">Number of Moons*</label>
          <input
            type="number"
            id="moons"
            bind:value={planetData.moons}
            min="0"
            step="1"
            disabled={isSubmitting}
            class:error={errors.moons}
          />
          {#if errors.moons}
            <div class="error-message">{errors.moons}</div>
          {/if}
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              bind:checked={planetData.hasRings}
              disabled={isSubmitting}
            />
            Has Rings
          </label>
        </div>
      </div>
    </div>

    <div class="form-right">
      <h3>Planet Image</h3>
      <ImageUploader
        imageUrl={planetData.imageUrl}
        {planetId}
        on:upload={handleImageUpload}
        on:delete={handleImageDelete}
      />
    </div>
  </div>

  <div class="form-actions">
    <button
      type="button"
      class="cancel-btn"
      on:click={handleCancel}
      disabled={isSubmitting}
    >
      Cancel
    </button>
    <button type="submit" class="submit-btn" disabled={isSubmitting}>
      {isSubmitting ? "Saving..." : planetId ? "Update Planet" : "Add Planet"}
    </button>
  </div>
</form>

<style>
  .planet-form {
    max-width: 1000px;
    margin: 0 auto;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  input.error,
  textarea.error {
    border-color: #ef4444;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .checkbox-group {
    display: flex;
    align-items: center;
  }

  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  .cancel-btn,
  .submit-btn {
    padding: 0.5rem 1.5rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .cancel-btn {
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }

  .submit-btn {
    background-color: #4f46e5;
    color: white;
    border: none;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
