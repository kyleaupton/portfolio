<template>
  <div class="wrapper">
    <!-- Actual content -->
    <VueWriter
      class="fit writer-text"
      :style="{ width: `${width}px`, fontSize: `${fontSize}px` }"
      :array="[message]"
      :iterations="1"
      caret="underscore"
      :type-speed="100"
    />

    <!-- Width template -->
    <div
      id="animation-template"
      ref="template"
      class="fit is-typed writer-text landing-template"
    >
      <span class="typed">{{ message }}</span>
      <span class="underscore [object Object]">&nbsp;</span>
    </div>
  </div>
</template>

<script lang="ts">
import fitty, { FittyInstance } from 'fitty';
// @ts-ignore
import VueWriter from 'vue-writer';

export default {
  components: {
    VueWriter,
  },

  data() {
    return {
      fitty: null as null | FittyInstance[],
      message: "console.log('Hi, I\\'m Kyle Upton');",
      width: -1,
      fontSize: -1,
    };
  },

  mounted() {
    // @ts-ignore
    fitty.observeWindowDelay = 0;

    this.fitty = fitty('#animation-template', { minSize: 12, maxSize: 32 });
    this.fitty[0].element.addEventListener('fit', this.eventHandler);
  },

  beforeUnmount() {
    if (this.fitty) {
      this.fitty[0].element.removeEventListener('fit', this.eventHandler);
    }
  },

  methods: {
    eventHandler(e: unknown) {
      // @ts-ignore
      this.width = this.$refs.template.getBoundingClientRect().width;
      // @ts-ignore
      this.fontSize = e.detail.newValue;
    },
  },
};
</script>

<style>
.fit {
  display: inline-block;
  white-space: nowrap;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.writer-text {
  text-align: start;
}

.is-typed {
  font-family: 'Monaco';
  font-size: 28px;
}

.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  background-color: rgba(255, 255, 255, 0.87);
  animation: blink 1s infinite;
}

.is-typed span.underscore {
  display: inline-flex;
  align-items: flex-end;
  width: 4%;
  height: 0.06em;
  background-color: rgba(255, 255, 255, 0.87);
  animation: blink 1s infinite;
}

.is-typed span.cursor.typing {
  animation: none;
}

@keyframes blink {
  49% {
    background-color: rgba(255, 255, 255, 0.87);
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}

.landing-template {
  position: absolute;
  opacity: 0;
}
</style>
