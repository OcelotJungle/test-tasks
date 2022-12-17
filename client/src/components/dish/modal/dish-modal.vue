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
          @create="$emit('create', $event)"
          @update="$emit('update', $event)"
          @remove="$emit('remove', $event)"
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
import {
  DishModalContentDefault as Default,
  DishModalContentEditable as Editable
} from "./dish-modal-content";

export default {
  components: {
    Default,
    Editable
  },

  inject: ["isEditMode"],

  props: {
    dish: Object
  },

  emits: ["close", "create", "update", "remove"],

  data() {
    return {
      content: this.isEditMode ? "editable" : "default"
    };
  },

  methods: {
    close() {
      this.$emit("close");
    }
  }
}
</script>