<template>
  <div class="not-found-container">
    <div class="not-found-card">
      <span class="error-code">404</span>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-desc">
        The route you are looking for does not exist in the PlanFlow prototype.
      </p>
      <router-link to="/projects" class="btn btn-primary">
        Return to Projects Dashboard
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: calc(100vh - 12rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.not-found-card {
  text-align: center;
  max-width: 480px;
}

.error-code {
  font-size: 5rem;
  font-weight: 900;
  color: #cbd5e1;
  line-height: 1;
}

.error-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin: 1rem 0 0.5rem;
}

.error-desc {
  color: #64748b;
  margin-bottom: 1.5rem;
}
</style>
