<template>
  <div
    class="no-outline"
    tabindex="-1"
    @keydown.esc="closeAuthModal"
  >
    <the-header
      :isAuthenticated="isAuthenticated"
      @open-auth-modal="openAuthModal"
      @logout="logout"
    />
    <router-view />
    <auth-modal
      v-if="isAuthModalOpened"
      @close-auth-modal="closeAuthModal"
      @authenticate="authenticate"
    />
    <div class="modal-backdrop fade" />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import authorize from "@/utils/authorize";
import TheHeader from "@/components/the-header.vue";
import AuthModal from "@/components/auth/modal/auth-modal.vue";

export default {
  components: {
    TheHeader,
    AuthModal
  },

  data() {
    return {
      isAuthenticated: false,
      isAuthModalOpened: false,
    };
  },

  created() {
    authorize().then(result => this.isAuthenticated = result);
  },
  
  methods: {
    openAuthModal() {
      this.isAuthModalOpened = true;
    },

    closeAuthModal() {
      this.isAuthModalOpened = false;
    },

    authenticate(jwt) {
      localStorage.setItem("jwt", jwt);
      this.isAuthenticated = true;
    },

    logout() {
      localStorage.removeItem("jwt");
      this.isAuthenticated = false;
    }
  },
}
</script>

<style>
body:has(.modal) {
  overflow: hidden;
  padding-right: 14px;
}

body:not(:has(.modal)) .modal-backdrop {
  display: none;
}

body:has(.modal) .modal-backdrop {
  opacity: var(--bs-backdrop-opacity);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.no-outline {
  outline: none;
}
</style>
