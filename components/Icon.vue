<template>
  <component :is="component" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

const C = resolveComponent("C");
const Check = resolveComponent("Check");
const Chevron = resolveComponent("Chevron");
const Electron = resolveComponent("Electron");
const Envelope = resolveComponent("Envelope");
const GitHub = resolveComponent("GitHub");
const JavaScript = resolveComponent("JavaScript");
const LinkedIn = resolveComponent("LinkedIn");
const Node = resolveComponent("Node");
const Npm = resolveComponent("Npm");
const Python = resolveComponent("Python");
const React = resolveComponent("React");
const TypeScript = resolveComponent("TypeScript");
const Vue = resolveComponent("Vue");
const Xmark = resolveComponent("Xmark");

export default defineComponent({
  name: "Icon",

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    component() {
      switch (this.icon) {
        case "c":
          return C;
        case "check":
          return Check;
        case "chevron":
          return Chevron;
        case "electron":
          return Electron;
        case "envelope":
          return Envelope;
        case "github":
          return GitHub;
        case "javascript":
          return JavaScript;
        case "linkedin":
          return LinkedIn;
        case "node":
          return Node;
        case "npm":
          return Npm;
        case "python":
          return Python;
        case "react":
          return React;
        case "typescript":
          return TypeScript;
        case "vue":
          return Vue;
        case "xmark":
          return Xmark;
        default:
          throw Error();
      }
    },
  },
});
</script>
