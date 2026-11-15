<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useUserStore } from '../stores/userStore';
import { useLangStore } from '../stores/langStore';

const userStore = useUserStore();
const langStore = useLangStore();

const showRoleModal = ref(false);

function handleSelectUser(userId: number) {
  userStore.switchUser(userId);
  showRoleModal.value = false;
}
</script>

<template>
  <header class="app-header">
    <!-- Top Bar with User Profile matching Balsamiq Page 5 -->
    <div class="header-inner">
      <div class="user-profile-section">
        <div class="avatar-circle">
          <Icon icon="mdi:account" width="32" height="32" />
        </div>

        <div class="user-info">
          <div class="user-name-row">
            <span class="user-name">
              {{ langStore.currentLang === 'km' ? userStore.currentUser?.nameKm : userStore.currentUser?.name }}
            </span>
          </div>
          <div class="user-role-title">
            {{ langStore.currentLang === 'km' ? userStore.currentUser?.roleTitleKm : userStore.currentUser?.role }}
          </div>
          <div class="user-contact">
            <Icon icon="mdi:phone" width="14" height="14" class="icon-inline" />
            <span>{{ userStore.currentUser?.phone }}</span>
            <span class="dot-separator">·</span>
            <Icon icon="mdi:email-outline" width="14" height="14" class="icon-inline" />
            <span>{{ userStore.currentUser?.email }}</span>
          </div>
        </div>
      </div>

      <!-- Right Header Actions -->
      <div class="header-actions">
        <!-- Language Switcher -->
        <button
          type="button"
          class="btn-lang"
          @click="langStore.toggleLang()"
          title="Toggle Language"
        >
          <Icon icon="mdi:translate" width="16" height="16" />
          <span>{{ langStore.currentLang === 'km' ? 'ខ្មែរ (KM)' : 'English (EN)' }}</span>
        </button>

        <!-- Switch Role Modal Trigger (Page 11) -->
        <button
          type="button"
          class="btn-role-trigger"
          @click="showRoleModal = true"
        >
          <Icon icon="mdi:account-switch-outline" width="16" height="16" />
          <span>{{ langStore.currentLang === 'km' ? 'តួនាទី និង ភារកិច្ច' : 'Switch Role' }}</span>
        </button>

        <!-- Notification Bell Icon -->
        <div class="icon-btn" title="Notifications">
          <Icon icon="mdi:bell-outline" width="20" height="20" />
        </div>
      </div>
    </div>

    <!-- Main Navigation Tabs matching Balsamiq Page 5 -->
    <nav class="nav-tabs-bar">
      <router-link to="/dashboard" class="tab-item" active-class="tab-active">
        <Icon icon="mdi:view-dashboard-outline" width="16" height="16" class="tab-icon" />
        <span>{{ langStore.currentLang === 'km' ? 'ផ្ទាំងព័ត៌មាន (Dashboard)' : 'Dashboard' }}</span>
      </router-link>
      <router-link to="/tasks" class="tab-item" active-class="tab-active">
        <Icon icon="mdi:clipboard-check-outline" width="16" height="16" class="tab-icon" />
        <span>{{ langStore.currentLang === 'km' ? 'ការងារ (Tasks)' : 'Tasks Explorer' }}</span>
      </router-link>
      <router-link to="/tasks/new" class="tab-item btn-tab-create" active-class="tab-active">
        <Icon icon="mdi:plus-circle-outline" width="16" height="16" class="tab-icon" />
        <span>{{ langStore.currentLang === 'km' ? 'បង្កើតការងារថ្មី' : 'Create Task' }}</span>
      </router-link>
    </nav>

    <!-- Role Switcher Modal (Matches Balsamiq Page 11) -->
    <div v-if="showRoleModal" class="modal-overlay" @click.self="showRoleModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">
            {{ langStore.currentLang === 'km' ? 'ផ្លាស់ប្តូរតួនាទីប្រើប្រាស់' : 'Switch User Role / Persona' }}
          </h3>
          <button type="button" class="close-btn" @click="showRoleModal = false">
            <Icon icon="mdi:close" width="18" height="18" />
          </button>
        </div>
        <p class="modal-subtitle">
          {{ langStore.currentLang === 'km' ? 'ជ្រើសរើសតួនាទីដើម្បីសាកល្បងសិទ្ធិ និង មុខងារប្រព័ន្ធ' : 'Select a persona to test ownership rules and permissions:' }}
        </p>

        <div class="roles-list">
          <div
            v-for="user in userStore.users"
            :key="user.id"
            :class="['role-option', userStore.currentUser?.id === user.id ? 'role-selected' : '']"
            @click="handleSelectUser(user.id)"
          >
            <div class="role-option-info">
              <span class="role-opt-name">
                {{ langStore.currentLang === 'km' ? user.nameKm : user.name }}
              </span>
              <span class="role-opt-title">
                {{ langStore.currentLang === 'km' ? user.roleTitleKm : user.role }}
              </span>
            </div>
            <Icon
              v-if="userStore.currentUser?.id === user.id"
              icon="mdi:check-circle"
              width="20"
              height="20"
              class="check-mark-icon"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" @click="showRoleModal = false">
            {{ langStore.currentLang === 'km' ? 'បិទ' : 'Close' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 2px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-profile-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.avatar-circle {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #f1f5f9;
  border: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
}

.user-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
}

.user-role-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  margin: 0.15rem 0;
}

.user-contact {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.825rem;
  color: #64748b;
  flex-wrap: wrap;
}

.icon-inline {
  color: #64748b;
  flex-shrink: 0;
}

.dot-separator {
  margin: 0 0.25rem;
  color: #94a3b8;
}

.btn-lang {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-lang:hover {
  background-color: #e2e8f0;
}

.btn-role-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #0f172a;
  border: 1px solid #0f172a;
  border-radius: 0.5rem;
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #475569;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.15s ease;
}

.check-mark-icon {
  color: #2563eb;
  flex-shrink: 0;
}

.tab-item:hover {
  color: #0f172a;
}

.tab-active {
  color: #0f172a !important;
  border-bottom-color: #0f172a !important;
}

.btn-tab-create {
  margin-left: auto;
  color: #2563eb;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  background: #ffffff;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 520px;
  padding: 1.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.5rem 0 1.25rem;
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.role-option {
  border: 1.5px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.role-option:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.role-selected {
  border-color: #0f172a !important;
  background-color: #0f172a !important;
  color: #ffffff !important;
}

.role-option-info {
  display: flex;
  flex-direction: column;
}

.role-opt-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.role-opt-title {
  font-size: 0.8rem;
  opacity: 0.85;
}

.check-mark {
  font-size: 1.25rem;
  font-weight: 800;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
