<template>
  <div>projects</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Projects",

  async created() {
    const { data } = await useFetch("/api/repos");
    console.log(data);
  },
});
</script>

<style scoped></style>
