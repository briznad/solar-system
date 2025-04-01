<script lang="ts">
  import { page } from "$app/stores";
  import { user, isAuthenticated, isAdmin } from "$lib/stores/auth";
  import { logoutUser } from "$lib/firebase/auth";

  async function handleLogout() {
    try {
      await logoutUser();

      // Call the server to clear session cookie
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
</script>

<header class="header">
  <div class="container">
    <div class="logo">
      <a href="/">Solar System Explorer</a>
    </div>

    <nav class="nav">
      <ul>
        <li class:active={$page.url.pathname === "/"}>
          <a href="/">Home</a>
        </li>

        {#if $isAuthenticated}
          <li
            class:active={$page.url.pathname.startsWith("/planets") &&
              !$page.url.pathname.includes("/add")}
          >
            <a href="/planets">Planets</a>
          </li>

          {#if $isAdmin}
            <li class:active={$page.url.pathname.includes("/planets/add")}>
              <a href="/planets/add">Add Planet</a>
            </li>
          {/if}
        {/if}
      </ul>
    </nav>

    <div class="auth">
      {#if $isAuthenticated}
        <div class="user-info">
          <span>{$user?.email}</span>
          <button on:click={handleLogout}>Logout</button>
        </div>
      {:else}
        <a href="/login" class="login-btn">Login</a>
        <a href="/signup" class="signup-btn">Sign Up</a>
      {/if}
    </div>
  </div>
</header>

<style>
  .header {
    background-color: #1e293b;
    color: white;
    padding: 1rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo a {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  .nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav li {
    margin-left: 1.5rem;
  }

  .nav li:first-child {
    margin-left: 0;
  }

  .nav a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav li.active a,
  .nav a:hover {
    color: white;
  }

  .auth {
    display: flex;
    align-items: center;
  }

  .login-btn,
  .signup-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .login-btn {
    color: white;
    margin-right: 0.5rem;
  }

  .signup-btn {
    background-color: #4f46e5;
    color: white;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-info span {
    font-size: 0.875rem;
  }

  .user-info button {
    background: none;
    border: 1px solid #64748b;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .user-info button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 1rem;
    }

    .nav ul {
      justify-content: center;
    }

    .auth {
      width: 100%;
      justify-content: center;
    }
  }
</style>
