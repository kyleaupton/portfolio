<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useModalStore } from '../../stores/modal';

export default defineComponent({
  name: 'Modal',

  computed: {
    ...mapState(useModalStore, ['item']),
  },
});
</script>

<style scoped></style>
