<template>
  <div class="card-container col-6 col-md-6 col-lg-4 col-xxl-3 p-2 p-md-3 p-xxl-4">
    <div class="card h-100 border border-2">
      <img
        v-if="dish.photos?.length"
        :src="dish.photos[0].url"
        class="card-img-top"
        alt=""
      />
      <div class="card-body d-flex flex-column">
        <h6 v-if="isEditMode">Edit mode</h6>
        <h3>{{ dish.name }}</h3>
        <p>{{ dish.description }}</p>
        <span class="badge bg-secondary align-self-start mt-auto price">
          {{ Number(dish.price).toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dish: {
      type: Object,
      required: true
    }
  },

  inject: ["isEditMode"]
}
</script>

<style scoped>
.card-container {
  cursor: pointer;
}

.card-container > .card {
  transition: transform 200ms;
}

.card-container:hover > .card {
  transform: scale(1.05);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}
</style>