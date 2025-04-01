<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { redirectIfAuthenticated } from "$lib/stores/auth";
  import LoginForm from "$lib/components/auth/LoginForm.svelte";

  // Redirect if already authenticated
  const unsubscribe = redirectIfAuthenticated();

  // Clean up subscription
  import { onDestroy } from "svelte";
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<svelte:head>
  <title>Login | Solar System Explorer</title>
</svelte:head>

<div class="page">
  <h1>Login</h1>
  <LoginForm />
</div>

<style>
  .page {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
