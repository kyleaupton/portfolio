<script lang="ts" setup>
const {
  array,
  eraseSpeed,
  typeSpeed,
  delay,
  intervals,
  start,
  caret,
  iterations,
} = withDefaults(
  defineProps<{
    array: string[];
    eraseSpeed?: number;
    typeSpeed?: number;
    delay?: number;
    intervals?: number;
    start?: number;
    caret?: string;
    iterations?: number;
  }>(),
  {
    eraseSpeed: 100,
    typeSpeed: 200,
    delay: 2000,
    intervals: 500,
    start: 0,
    caret: "cursor",
    iterations: 0,
  }
);

const emit = defineEmits(["typed"]);

const typeValue = ref("");
const count = ref(0);
const typeStatus = ref(false);
const arrayIndex = ref(0);
const charIndex = ref(0);

const typewriter = () => {
  let loop = 0;
  if (charIndex.value < array[arrayIndex.value].length) {
    if (!typeStatus.value) {
      typeStatus.value = true;
    }

    typeValue.value += array[arrayIndex.value].charAt(charIndex.value);
    charIndex.value += 1;
    setTimeout(typewriter, typeSpeed);
  } else {
    count.value += 1;

    onTyped(array[arrayIndex.value]);

    if (count.value === array.length) {
      loop += 1;
      if (loop === iterations) {
        return (typeStatus.value = false);
      }
    }

    typeStatus.value = false;

    setTimeout(eraser, delay);
  }
};

const eraser = () => {
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value = array[arrayIndex.value].substring(0, charIndex.value - 1);
    charIndex.value -= 1;
    setTimeout(eraser, eraseSpeed);
  } else {
    typeStatus.value = false;
    arrayIndex.value += 1;
    if (arrayIndex.value >= array.length) arrayIndex.value = 0;
    setTimeout(typewriter, typeSpeed + intervals);
  }
};

const onTyped = (typedString: string) => {
  emit("typed", typedString);
};

setTimeout(typewriter, start);
</script>

<template>
  <div class="is-typed">
    <slot />
    <span class="typed">{{ typeValue }}</span>
    <span :class="caret + ' ' + { typing: typeStatus }">&nbsp;</span>
  </div>
</template>
