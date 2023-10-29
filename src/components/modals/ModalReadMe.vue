<template>
  <div class="modal-readme">
    <ProjectReadMe :markdown="project.data.readme" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';

import { useModalStore } from '@/stores/modal';
import { useGitHubStore } from '@/stores/github';
import { t_modal_titlebar_icon } from '@/types/modal';

import ProjectReadMe from '@/components/projects/ProjectReadMe.vue';

export type ModalReadMe = {
  name: 'ModalReadMe';
  titlebarIcons?: t_modal_titlebar_icon[];
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
