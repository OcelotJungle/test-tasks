<template>
  <form @submit.prevent="submit">
    <div class="modal-header">
      <input
        v-model="name"
        class="modal-title form-control fs-5 w-75"
        required
      />
      <slot name="close-button" />
    </div>
    <div class="modal-body">
      <photo-carousel
        :photos="this.photos"
        @remove-photo="removePhoto"
      />
      <label class="btn btn-secondary mt-2">
        Upload photos
        <input
          type="file"
          multiple
          hidden
          @change="uploadPhotos"
        />
      </label>
      <p class="fs-5 mt-2">
        <textarea
          class="form-control"
          v-model="description"
          required
        />
      </p>
      <div class="container d-flex flex-wrap p-0">
        <div class="col-6">
          <select
            v-model="categoryId"
            class="text-capitalize form-select w-75 m-auto"
          >
            <option
              value="-1"
              disabled
            >Select any category</option>
            <option
              v-for="category in categories"
              class=""
              :key="category.id"
              :value="category.id"
            >{{ category.name }}</option>
          </select>
        </div>
        <div class="col-6">
          <h4 class="price">
            <input
              type="number"
              min="1"
              step="0.01"
              class="form-control d-inline ms-2 ps-3 w-50"
              v-model="price"
              required
            />
          </h4>
        </div>
      </div>
    </div>
    <div
      class="modal-footer"
      :class="{ 'justify-content-between': !isCreationMode }"
    >
      <button
        v-if="!isCreationMode"
        type="button"
        class="btn btn-danger btn-lg"
        @click="remove"
      >Delete</button>
      <button
        type="submit"
        class="btn btn-primary btn-lg"
      >
        <template v-if="isCreationMode">Create</template>
        <template v-if="!isCreationMode">Save</template>
      </button>
    </div>
  </form>
</template>

<script>
import PhotoCarousel from "../dish-modal-photo-carousel.vue";
import getAuthorizedHeaders from "@/utils/get-authorized-headers";
import handleRequestError from "@/utils/handle-request-error";

export default {
  components: { PhotoCarousel },
  props: { dish: Object },

  data() {
    return {
      isCreationMode: this.dish.id === -1,
      id: this.dish.id,
      name: this.dish.name,
      description: this.dish.description,
      price: Number(this.dish.price),
      categoryId: this.dish.category.id,
      photos: [...this.dish.photos]
    };
  },
  
  inject: ["dishCategories"],
  
  emits: ["close", "create", "update", "remove"],
  
  computed: {
    categories() {
      return this.dishCategories;
    }
  },

  methods: {
    uploadPhotos(evt) {
      const files = evt.target.files;
      const formData = new FormData();

      for(const file of files) formData.append("images", file);

      this.axios
        .post("/api/upload/images", formData, getAuthorizedHeaders())
        .then(response => this.photos.push(...response.data))
        .catch(handleRequestError);
    },

    removePhoto(index) {
      this.photos.splice(index, 1);
    },

    submit() {
      const dish = {
        name: this.name,
        description: this.description,
        price: this.price,
        categoryId: this.categoryId
      };
      const photos = this.photos;

      if(dish.categoryId === -1) return alert("Please select any category");

      const body = { dish, photos };
      const headers = getAuthorizedHeaders();

      let request;
      if(this.isCreationMode) {
        request = this.axios
          .post("/api/menu", body, headers)
          .then(({ data }) => this.$emit("create", data));
      } else {
        request = this.axios
          .put(`/api/menu/${this.id}`, body, headers)
          .then(({ data }) => this.$emit("update", data));
      }

      request
        .then(() => this.$emit("close"))
        .catch(handleRequestError);
    },

    remove() {
      this.axios
        .delete(`/api/menu/${this.id}`, getAuthorizedHeaders())
        .then(() => this.$emit("remove", this.id))
        .then(() => this.$emit("close"))
        .catch(handleRequestError);
    }
  }
}
</script>