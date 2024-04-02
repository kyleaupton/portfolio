<template>
  <component :is="component" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import C from './items/C.vue';
import Check from './items/Check.vue';
import Chevron from './items/Chevron.vue';
import Electron from './items/Electron.vue';
import Envelope from './items/Envelope.vue';
import GitHub from './items/GitHub.vue';
import JavaScript from './items/JavaScript.vue';
import LinkedIn from './items/LinkedIn.vue';
import Node from './items/Node.vue';
import Npm from './items/Npm.vue';
import Python from './items/Python.vue';
import React from './items/React.vue';
import TypeScript from './items/TypeScript.vue';
import Vue from './items/Vue.vue';
import Xmark from './items/Xmark.vue';

export default defineComponent({
  name: 'Icon',

  components: {
    GitHub,
  },

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    component() {
      switch (this.icon) {
        case 'c':
          return C;
        case 'check':
          return Check;
        case 'chevron':
          return Chevron;
        case 'electron':
          return Electron;
        case 'envelope':
          return Envelope;
        case 'github':
          return GitHub;
        case 'javascript':
          return JavaScript;
        case 'linkedin':
          return LinkedIn;
        case 'node':
          return Node;
        case 'npm':
          return Npm;
        case 'python':
          return Python;
        case 'react':
          return React;
        case 'typescript':
          return TypeScript;
        case 'vue':
          return Vue;
        case 'xmark':
          return Xmark;
        default:
          throw Error();
      }
    },
  },
});
</script>
