import { computed, watch, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useEchoStore } from '@/store/socketsStore';

export const useEcho = () => {
  const authStore = useAuthStore();
  const echoStore = useEchoStore();

  const isAuthenticated = computed(() => authStore.isAuthenticated);

  watch(isAuthenticated, newValue => {
    if (newValue) {
      echoStore.setToken(authStore.token);
      echoStore.initializeEcho();
    } else {
      echoStore.setToken(null);
    }
  });

  onMounted(() => {
    if (isAuthenticated.value) {
      echoStore.setToken(authStore.token);
      echoStore.initializeEcho();
    }
  });
};
