<template>
  <div class="container-fluid d-flex flex-wrap">
    <div class="col-1 col-md" />
    <div class="col-4 col-md">
      <nav
        v-if="(isAuthenticated)"
        class="d-flex justify-content-evenly fs-4"
      >
        <router-link to="/">Home</router-link>
        <router-link to="/edit">Edit</router-link>
      </nav>
    </div>
    <div class="col-7 col-md my-auto p-4">
      <div class="d-flex justify-content-end">
        <button
          v-if="!isAuthenticated"
          class="btn btn-outline-secondary btn-lg"
          @click="toggleAuthModal"
        >Log in</button>
        <button
          v-if="isAuthenticated"
          class="btn btn-outline-secondary btn-lg"
          @click="logout"
        >Log out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAuthenticated: Boolean
  },

  emits: ["toggle-auth-modal", "logout"],

  methods: {
    toggleAuthModal() {
      this.$emit("toggle-auth-modal");
    },

    logout() {
      this.$emit("logout");
    }
  }
}
</script>

<style>
nav a {
  text-decoration: none;
  border: 1px solid;
  padding: 0 .5rem;
}
</style>