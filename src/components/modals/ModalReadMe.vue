<template>
  <div class="modal-readme">
    <ProjectReadMe :markdown="project.data.readme" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useModalStore } from '../../stores/modal';
import { useGitHubStore } from '../../stores/github';

import ProjectReadMe from '../projects/ProjectReadMe.vue';

export type ModalReadMe = {
  name: 'ModalReadMe';
  data: {
    project: string;
  };
};

export default defineComponent({
  name: 'ModalReadMe',

  components: {
    ProjectReadMe,
  },

  computed: {
    ...mapState(useModalStore, ['item']),
    ...mapState(useGitHubStore, ['repos']),

    _item() {
      if (!this.item) {
        throw Error('No modal item');
      }

      return this.item as ModalReadMe;
    },

    project() {
      return this.repos[this._item.data.project];
    },
  },
});
</script>

<style scoped>
.modal-readme {
  /* height: 100%; */
  overflow: auto;
}
</style>
