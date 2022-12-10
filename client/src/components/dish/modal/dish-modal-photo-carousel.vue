<template>
  <div
    class="carousel slide no-outline"
    tabindex="-1"
    @keydown.left="previous"
    @keydown.right="next"
  >
    <div
      v-if="hasManyPhotos"
      class="carousel-indicators"
    >
      <button
        v-for="(_, index) in photos"
        class="border border-0 mx-1"
        type="button"
        :key="index"
        :class="{ active: index === current }"
        @click="toggle(index)"
      />
    </div>
    <div class="carousel-inner">
      <div
        v-for="(photo, index) in photos"
        :key="photo"
        class="carousel-item"
        :class="{ active: index === current }"
      >
        <img
          :src="photo.url"
          class="d-block w-100"
          alt=""
        />
        <button
          v-if="isEditMode"
          class="btn btn-danger btn-trash-can position-absolute top-0 end-0 me-4 mt-4 border"
          type="button"
          @click="remove(index)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
    </div>
    <button
      v-if="hasManyPhotos"
      class="carousel-control-prev"
      type="button"
      @click="previous"
    >
      <span class="carousel-control-prev-icon" />
    </button>
    <button
      v-if="hasManyPhotos"
      class="carousel-control-next"
      type="button"
      @click="next"
    >
      <span class="carousel-control-next-icon" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    photos: Array,
    removePhoto: Function
  },

  data() {
    return {
      current: 0
    };
  },

  inject: ["isEditMode"],

  emits: ["remove-photo"],

  computed: {
    count() {
      return this.photos.length;
    },

    hasManyPhotos() {
      return this.count > 1;
    }
  },

  methods: {
    previous() {
      this.toggle(this.current === 0 ? this.count - 1 : this.current - 1);
    },

    next() {
      this.toggle(this.current === this.count - 1 ? 0 : this.current + 1);
    },

    toggle(index) {
      this.current = index;
    },

    remove(index) {
      if(this.count > 1 && index + 1 === this.count) this.toggle(index - 1);
      this.$emit("remove-photo", index);
    }
  }
}
</script>

<style>
.carousel-indicators {
  transform: scale(4);
}

.carousel-indicators * {
  opacity: 0.5;
}

.btn-trash-can {
  transform: scale(1);
  z-index: 3;
}
</style>