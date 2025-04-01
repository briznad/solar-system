<script>
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="copyright">
      &copy; {year} Solar System Explorer. All rights reserved.
    </div>

    <div class="info">
      <p>A demo app built with SvelteKit and Firebase.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
    padding: 2rem 0;
    margin-top: 3rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    font-size: 0.875rem;
    color: #64748b;
  }

  .info {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .info p {
    margin: 0;
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>
