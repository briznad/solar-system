<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { loading, error } from "$lib/stores/auth";
</script>

<svelte:head>
  <title>Solar System Explorer</title>
</svelte:head>

<div class="app">
  <Header />

  <main class="main">
    {#if $loading}
      <div class="loading">Loading...</div>
    {:else if $error}
      <div class="error">{$error}</div>
    {:else}
      <slot />
    {/if}
  </main>

  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
  }

  .loading,
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }

  .error {
    color: #ef4444;
  }
</style>
