<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { redirectIfAuthenticated } from "$lib/stores/auth";
  import SignupForm from "$lib/components/auth/SignupForm.svelte";

  // Redirect if already authenticated
  const unsubscribe = redirectIfAuthenticated();

  // Clean up subscription
  import { onDestroy } from "svelte";
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<svelte:head>
  <title>Sign Up | Solar System Explorer</title>
</svelte:head>

<div class="page">
  <h1>Create Account</h1>
  <SignupForm />
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
