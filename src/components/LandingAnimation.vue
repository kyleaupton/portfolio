<template>
  <div class="wrapper">
    <VueWriter
      class="writer-text"
      :array="[message]"
      :iterations="1"
      caret="underscore"
      :type-speed="100"
    />
    <!-- <div ref="template" class="is-typed landing-template">{{ message }}</div> -->
  </div>
</template>

<script lang="ts">
// @ts-ignore
import VueWriter from 'vue-writer';

export default {
  components: {
    VueWriter,
  },

  data() {
    return {
      message: "console.log('Hi, I\\'m Kyle Upton');",
      width: -1,
    };
  },

  mounted() {
    // // @ts-ignore
    // this.width = this.$refs.template.clientWidth
    // console.log(this.width, JSON.parse(JSON.stringify(this.$refs)))
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.writer-text {
  text-align: start;
  width: 602px;
}

.is-typed {
  font-family: 'Monaco';
  font-size: 28px;
}

@media only screen and (max-width: 460px) {
  .is-typed {
    font-size: 14px;
  }

  .writer-text {
    width: 308px;
  }
}

@media only screen and (max-width: 360px) {
  .is-typed {
    font-size: 12px;
  }

  .writer-text {
    width: 266px;
  }
}

.is-typed span.typed {
  /* color: black; */
}

.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  background-color: rgba(255, 255, 255, 0.87);
  animation: blink 1s infinite;
}

.is-typed span.underscore {
  display: inline-flex;
  width: 12px;
  height: 2px;
  align-items: flex-end;
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
