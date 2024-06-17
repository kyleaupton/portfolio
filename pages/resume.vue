<template>
  <div class="h-screen w-screen">
    <object :data="link" type="application/pdf" width="100%" height="100%">
      <p>
        It appears your web browser doesn't support PDF files.
        <a :href="link">Click here to download the my resume.</a>
      </p>
    </object>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const link =
  "https://upton-public-assets.s3.amazonaws.com/Kyle_Upton_Resume.pdf";
</script>
