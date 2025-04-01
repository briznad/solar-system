<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { uploadImage, deleteImage } from "$lib/firebase/storage";

  export let imageUrl: string | undefined = undefined;
  export let planetId: string | undefined = undefined;

  let fileInput: HTMLInputElement;
  let isUploading = false;
  let uploadProgress = 0;
  let error: string | null = null;

  const dispatch = createEventDispatcher<{
    upload: { url: string };
    delete: void;
  }>();

  async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) return;

    const file = files[0];

    // Check file type
    if (!file.type.startsWith("image/")) {
      error = "Please select an image file";
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error = "Image size must be less than 5MB";
      return;
    }

    error = null;
    isUploading = true;
    uploadProgress = 0;

    try {
      // Create a unique path for the image
      const path = `planets/${planetId || "temp"}/${Date.now()}_${file.name}`;

      // Delete the old image if exists
      if (imageUrl) {
        const oldPath = imageUrl
          .split("?")[0]
          .split("/o/")[1]
          .replace(/%2F/g, "/");
        await deleteImage(decodeURIComponent(oldPath));
      }

      // Upload the new image
      const url = await uploadImage(file, path);

      // Dispatch the upload event
      dispatch("upload", { url });

      // Reset the file input
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      error = err instanceof Error ? err.message : "Failed to upload image";
    } finally {
      isUploading = false;
    }
  }

  async function handleDeleteImage() {
    if (!imageUrl) return;

    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Get the path from the URL
      const path = imageUrl.split("?")[0].split("/o/")[1].replace(/%2F/g, "/");

      // Delete the image
      await deleteImage(decodeURIComponent(path));

      // Dispatch the delete event
      dispatch("delete");
    } catch (err) {
      console.error("Delete error:", err);
      error = err instanceof Error ? err.message : "Failed to delete image";
    }
  }
</script>

<div class="image-uploader">
  <div class="preview">
    {#if imageUrl}
      <img src={imageUrl} alt="Preview" />
    {:else}
      <div class="no-image">No Image</div>
    {/if}
  </div>

  <div class="controls">
    {#if error}
      <div class="error">{error}</div>
    {/if}

    {#if isUploading}
      <div class="progress">
        <div class="progress-bar" style="width: {uploadProgress}%"></div>
      </div>
      <div class="progress-text">Uploading... {uploadProgress}%</div>
    {:else}
      <div class="buttons">
        <label class="upload-btn">
          {imageUrl ? "Change Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            bind:this={fileInput}
            on:change={handleFileChange}
            disabled={isUploading}
            hidden
          />
        </label>

        {#if imageUrl}
          <button
            class="delete-btn"
            on:click={handleDeleteImage}
            disabled={isUploading}
          >
            Delete Image
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .image-uploader {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preview {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .preview img {
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

  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .error {
    color: #ef4444;
    font-size: 0.875rem;
  }

  .progress {
    width: 100%;
    height: 0.5rem;
    background-color: #e5e7eb;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background-color: #4f46e5;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  .upload-btn,
  .delete-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  .upload-btn {
    background-color: #4f46e5;
    color: white;
    display: inline-block;
  }

  .delete-btn {
    background-color: #ef4444;
    color: white;
    border: none;
  }
</style>
