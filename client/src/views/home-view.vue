<template>
  <dish-list />
</template>

<script>
import DishList from "@/components/dish/list/dish-list.vue"

export default {
  components: { DishList },
  provide: { isEditMode: false }
}
</script>