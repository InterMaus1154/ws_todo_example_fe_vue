import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import router from '@/router/index.js';

export const useAuth = defineStore('auth', () => {
  const token = ref(window.localStorage.getItem('auth-token') || '');
  const user = ref(null);

  const isLoggedIn = computed(() => {
    return token.value.trim().length > 0;
  });

  watch(token, (newValue) => {
    if (newValue.trim().length === 0) {
      window.localStorage.removeItem('auth-token');
      user.value = null;
    } else {
      window.localStorage.setItem('auth-token', newValue);
    }
  }, {immediate: true});

  const setToken = newToken => {
    token.value = newToken;
  }

  const setUser = newUser => {
    user.value = newUser;
  }

  const logout = () =>{
      token.value = "";
      user.value = null;
      router.push("/login");
  };

  return { token, isLoggedIn, user, logout, setToken, setUser };
});
