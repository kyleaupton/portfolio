<template>
  <Card
    class="flex flex-col justify-between text-start bg-neutral-900 animate-pulse"
  >
    <CardHeader>
      <CardTitle class="h-6 w-36 bg-neutral-700 rounded"> </CardTitle>
      <CardDescription class="h-5 bg-neutral-700 rounded"></CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between items-center w-full flex-wrap gap-2">
        <div class="flex gap-2">
          <div class="h-[22px] w-16 bg-neutral-700 rounded-full"></div>
          <div class="h-[22px] w-16 bg-neutral-700 rounded-full"></div>
        </div>
        <div class="h-5 w-16 bg-neutral-700 rounded"></div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectCardLoading",
});
</script>

<style scoped></style>
