<template>
  <the-header
    :isAuthenticated="isAuthenticated"
    @toggle-auth-modal="toggleAuthModal"
    @logout="logout"
  />
  <router-view />
  <auth-modal
    v-if="isAuthModalOpened"
    @close-auth-modal="toggleAuthModal"
    @authenticate="authenticate"
  />
  <div class="modal-backdrop fade" />
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
    toggleAuth() {
      this.isAuthenticated = !this.isAuthenticated;
    },

    toggleAuthModal() {
      this.isAuthModalOpened = !this.isAuthModalOpened;
    },

    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem("jwt");
    },

    authenticate(jwt) {
      localStorage.setItem("jwt", jwt);
      this.isAuthenticated = true;
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
