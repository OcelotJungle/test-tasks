<template>
  <div
    class="modal d-block fade show"
    @click.self="close"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <component
          :is="content"
          :dish="dish"
          @close="close"
          @create="create"
          @update="update"
          @remove="remove"
        >
          <template #close-button>
            <button
              type="button"
              class="btn-close"
              @click="close"
            />
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import DishModalContentDefault from "./dish-modal-content/dish-modal-content-default.vue";
import DishModalContentEditable from "./dish-modal-content/dish-modal-content-editable.vue";

export default {
  components: {
    DishModalContentDefault,
    DishModalContentEditable
  },

  inject: ["isEditMode"],

  props: {
    dish: Object
  },

  emits: ["close", "create", "update", "remove"],

  data() {
    return {
      content: this.isEditMode ? "dish-modal-content-editable" : "dish-modal-content-default"
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    create(...data) {
      this.$emit("create", ...data);
    },

    update(...data) {
      this.$emit("update", ...data);
    },

    remove(...data) {
      this.$emit("remove", ...data);
    }
  }
}
</script>