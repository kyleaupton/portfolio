<template>
  <component :is="component" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

const C = resolveComponent("IconsC");
const Check = resolveComponent("IconsCheck");
const Chevron = resolveComponent("IconsChevron");
const Electron = resolveComponent("IconsElectron");
const Envelope = resolveComponent("IconsEnvelope");
const GitHub = resolveComponent("IconsGitHub");
const JavaScript = resolveComponent("IconsJavaScript");
const LinkedIn = resolveComponent("IconsLinkedIn");
const Node = resolveComponent("IconsNode");
const Npm = resolveComponent("IconsNpm");
const Python = resolveComponent("IconsPython");
const React = resolveComponent("IconsReact");
const TypeScript = resolveComponent("IconsTypeScript");
const Vue = resolveComponent("IconsVue");
const Xmark = resolveComponent("IconsXmark");

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
          console.error(`No icon found for ${this.icon}`);
          throw Error();
      }
    },
  },
});
</script>
