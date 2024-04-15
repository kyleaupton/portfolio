<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from "vaul-vue";
import type { DialogContentEmits, DialogContentProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";
import type { HtmlHTMLAttributes } from "vue";
import DrawerOverlay from "./DrawerOverlay.vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  DialogContentProps & { class?: HtmlHTMLAttributes["class"] }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'drawer-content fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[10px] border bg-background mx-auto select-none',
          props.class
        )
      "
    >
      <div
        class="cursor-pointer mx-auto my-4 shrink-0 h-3 w-[100px] rounded-full bg-muted"
      />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>

<style scoped>
.drawer-content {
  height: calc(100dvh * 0.9);
  max-width: min(1024px, calc(100vw - 24px));
}

.drawer-content:focus-visible {
  outline: none;
}
</style>
