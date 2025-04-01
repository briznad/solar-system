<script lang="ts">
  import { isAuthenticated } from "$lib/stores/auth";
</script>

<div class="homepage">
  <section class="hero">
    <div class="container">
      <h1>Explore Our Solar System</h1>
      <p>
        Learn about the planets in our solar system with this interactive
        application. Discover fascinating facts, view images, and explore the
        wonders of space.
      </p>

      {#if $isAuthenticated}
        <a href="/planets" class="cta-button">View Planets</a>
      {:else}
        <a href="/login" class="cta-button">Get Started</a>
      {/if}
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2>Features</h2>

      <div class="feature-grid">
        <div class="feature">
          <h3>Learn About Planets</h3>
          <p>
            Access detailed information about each planet in our solar system,
            including physical characteristics, moons, and more.
          </p>
        </div>

        <div class="feature">
          <h3>Interactive Experience</h3>
          <p>
            Explore planets through an intuitive interface designed to make
            learning about our solar system engaging and fun.
          </p>
        </div>

        <div class="feature">
          <h3>Admin Features</h3>
          <p>
            Administrators can manage the planet database by adding new planets,
            updating information, and uploading images.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .homepage {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .hero {
    background-color: #1e293b;
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .hero .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: #cbd5e1;
  }

  .cta-button {
    display: inline-block;
    background-color: #4f46e5;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-size: 1.125rem;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .cta-button:hover {
    background-color: #4338ca;
  }

  .features {
    padding: 2rem 0;
  }

  .features .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature {
    background-color: #f8fafc;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  .feature p {
    color: #64748b;
    line-height: 1.6;
  }
</style>
