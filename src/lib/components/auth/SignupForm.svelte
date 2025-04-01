<script lang="ts">
  import { registerUser } from "$lib/firebase/auth";
  import { user, loading, error as authError } from "$lib/stores/auth";
  import { auth as clientAuth } from "$lib/firebase/client";
  // import { enhance } from "$app/forms";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let displayName = "";
  let formError = "";
  let isSubmitting = false;

  async function handleSubmit() {
    formError = "";
    isSubmitting = true;

    // Password validation
    if (password !== confirmPassword) {
      formError = "Passwords do not match";
      isSubmitting = false;
      return;
    }

    if (password.length < 6) {
      formError = "Password must be at least 6 characters";
      isSubmitting = false;
      return;
    }

    try {
      await registerUser({ email, password, displayName });

      // Get the ID token
      const idToken = await clientAuth.currentUser?.getIdToken();

      if (idToken) {
        // Send the token to the server to create a session cookie
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to create session");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      formError = err instanceof Error ? err.message : "Failed to sign up";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="signup-form">
  <h2>Sign Up</h2>

  {#if $authError}
    <div class="error">{$authError}</div>
  {/if}

  {#if formError}
    <div class="error">{formError}</div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="displayName">Name (Optional)</label>
      <input
        type="text"
        id="displayName"
        bind:value={displayName}
        disabled={isSubmitting || $loading}
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        disabled={isSubmitting || $loading}
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        required
        disabled={isSubmitting || $loading}
      />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={confirmPassword}
        required
        disabled={isSubmitting || $loading}
      />
    </div>

    <button type="submit" disabled={isSubmitting || $loading}>
      {isSubmitting ? "Signing up..." : "Sign Up"}
    </button>
  </form>

  <p>Already have an account? <a href="/login">Login</a></p>
</div>

<style>
  .signup-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
  }

  .error {
    color: #dc2626;
    margin-bottom: 1rem;
  }
</style>
