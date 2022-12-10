<template>
  <div class="modal-header">
    <h3 class="modal-title">{{ dish.name }}</h3>
    <slot name="close-button" />
  </div>
  <div class="modal-body">
    <dish-modal-photo-carousel :photos="dish.photos" />
    <p class="fs-4 mt-3">{{ dish.description }}</p>
    <div class="container d-flex flex-wrap">
      <div class="col-6">
        <h4 class="text-capitalize fw-bold" >{{ dish.category.name }}</h4>
      </div>
      <div class="col-6">
        <h4 class="price fw-bold">{{ Number(dish.price).toFixed(2) }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import DishModalPhotoCarousel from "../dish-modal-photo-carousel.vue";

export default {
  components: {
    DishModalPhotoCarousel
  },

  props: {
    dish: Object
  },

  // Just to disable "extraneous..." warning
  emits: ["close", "create", "update", "remove"],
}
</script>