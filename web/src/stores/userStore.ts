import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';
import { userService } from '../services/api';
import { INITIAL_USERS } from '../services/mockData';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([...INITIAL_USERS]);
  const currentUser = ref<User>(users.value[0]); // default to Sarah Connor (MANAGER)

  async function loadUsers() {
    users.value = await userService.getUsers();
    if (!currentUser.value && users.value.length > 0) {
      currentUser.value = users.value[0];
    }
  }

  function switchUser(userId: number) {
    const found = users.value.find((u) => u.id === userId);
    if (found) {
      currentUser.value = found;
    }
  }

  return {
    users,
    currentUser,
    loadUsers,
    switchUser
  };
});
