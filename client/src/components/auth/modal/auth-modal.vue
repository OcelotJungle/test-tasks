<template>
  <div
    class="modal d-block fade show"
    @click.self="close"
  >
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Authentication</h3>
          <button
            type="button"
            class="btn-close"
            @click="close"
          />
        </div>
        <form
          class="mt-4"
          @submit.prevent="submit"
        >
          <div class="modal-body mb-5">
            <input
              v-model="chefname"
              class="form-control form-control-lg mb-4 w-75 m-auto"
              type="text"
              name="chefname"
              autocomplete="nickname"
              placeholder="Chefname"
            />
            <input
              v-model="password"
              class="form-control form-control-lg w-75 m-auto"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="Password"
            />
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary m-auto"
              type="submit"
            >Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  $emits: ["close-auth-modal", "authenticate"],

  data() {
    return {
      chefname: "",
      password: ""
    };
  },

  methods: {
    submit() {
      const creds = { chefname: this.chefname, password: this.password };

      this.axios
        .post("/api/auth/authenticate", creds)
        .then(({ data }) => this.$emit("authenticate", data))
        .then(() => this.close())
        .catch(error => console.error(error));
    },

    close() {
      this.$emit("close-auth-modal");
    }
  }
}
</script>