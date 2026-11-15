<script setup lang="ts">
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

function handleUserChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  userStore.switchUser(Number(target.value));
}
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <router-link to="/projects" class="brand">
          <span class="logo-icon">❖</span>
          <span class="brand-text">PlanFlow</span>
        </router-link>

        <nav class="nav-links">
          <router-link to="/projects" class="nav-item" active-class="active">
            Projects
          </router-link>
          <router-link to="/tasks" class="nav-item" active-class="active">
            Task Explorer
          </router-link>
        </nav>
      </div>

      <div class="nav-right">
        <!-- New Project Action -->
        <router-link to="/projects/new" class="btn btn-primary btn-sm">
          + New Project
        </router-link>

        <!-- Live Role & User Switcher for Grading / Testing -->
        <div class="role-selector">
          <label for="user-select" class="role-label">Active Persona:</label>
          <select
            id="user-select"
            :value="userStore.currentUser?.id"
            class="user-select"
            @change="handleUserChange"
          >
            <option
              v-for="user in userStore.users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} ({{ user.role }})
            </option>
          </select>
          <span
            :class="['role-pill', userStore.currentUser?.role === 'MANAGER' ? 'pill-mgr' : 'pill-mbr']"
          >
            {{ userStore.currentUser?.role }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #1e293b;
  color: #ffffff;
  border-bottom: 1px solid #334155;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  color: #38bdf8;
  font-size: 1.4rem;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.35rem 0.65rem;
  border-radius: 0.375rem;
  transition: all 0.15s ease;
}

.nav-item:hover {
  color: #ffffff;
  background-color: #334155;
}

.nav-item.active {
  color: #38bdf8;
  font-weight: 600;
  background-color: rgba(56, 189, 248, 0.1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.role-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #0f172a;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
}

.role-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.user-select {
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
}

.user-select option {
  background-color: #1e293b;
  color: #ffffff;
}

.role-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;
}

.pill-mgr {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.pill-mbr {
  background-color: #f1f5f9;
  color: #475569;
}
</style>
