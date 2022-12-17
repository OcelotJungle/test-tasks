<template>
  <div
    class="no-outline"
    tabindex="-1"
    @keydown.esc="closeModal"
  >
    <dish-modal
      v-if="selectedDish"
      :dish="selectedDish"
      @close="closeModal"
      @create="create"
      @update="update"
      @remove="remove"
    />
    <button
      v-if="isEditMode"
      class="btn btn-primary btn-lg"
      @click="openModal(createEmptyDish())"
    >Create new dish</button>
    <div class="container d-flex flex-wrap">
      <dish-list-item
        v-for="dish in dishes"
        :key="dish.name"
        :dish="dish"
        @click="openModal(dish)"
      />
    </div>
  </div>
</template>

<script>
import createEmptyDish from "@/utils/create-empty-dish";
import DishListItem from "./dish-list-item.vue";
import { DishModal } from "../modal";
import { computed } from "vue";

export default {
  components: {
    DishListItem,
    DishModal
  },

  inject: ["isEditMode"],

  provide() {
    return {
      dishCategories: computed(() => this.dishCategories)
    }
  },

  data() {
    return {
      dishCategories: [],
      dishes: [],
      selectedDish: null
    };
  },

  created() {
    if(this.isEditMode) {
      this.axios
        .get("/api/menu/categories")
        .then(({ data }) => this.dishCategories = data)
        .catch(error => console.error(error));
    }

    this.axios
      .get("/api/menu")
      .then(({ data }) => this.dishes = data)
      .catch(error => console.error(error));
  },

  methods: {
    openModal(dish) {
      this.selectedDish = dish;
    },

    closeModal() {
      this.selectedDish = null;
    },

    create(dish) {
      this.dishes.push(dish);
    },

    update(dish) {
      this.dishes = this.dishes.map(d => d.id === dish.id ? dish : d);
    },

    remove(id) {
      this.dishes = this.dishes.filter(d => d.id !== id);
    },

    createEmptyDish() {
      return createEmptyDish();
    }
  }
};
</script>

<style>
.price::before {
  content: '$';
  margin-right: 0.25rem;
}
</style>