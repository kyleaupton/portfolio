<template>
  <div class="flex gap-4 justify-center flex-wrap w-full text-center">
    <Card class="graph-card">
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <VisXYContainer
          :data="languages"
          :style="{
            opacity: 0.9,
          }"
        >
          <VisStackedBar
            orientation="horizontal"
            :roundedCorners="8"
            :color="(d: DataRecord) => d.color"
            :x="(d: DataRecord) => d.i"
            :y="(d: DataRecord) => d.percentage"
          />
          <VisAxis
            type="y"
            :tickFormat="formatLanguage"
            tickTextColor="rgb(163, 163, 163)"
            :gridLine="false"
            :tickLine="false"
            :domainLine="false"
          />
          <VisAxis
            type="x"
            :gridLine="false"
            :tickLine="false"
            :domainLine="false"
            :tickValues="[]"
          />
        </VisXYContainer>
      </CardContent>
    </Card>

    <Card class="graph-card">
      <CardHeader>
        <CardTitle>Technologies</CardTitle>
      </CardHeader>
      <CardContent>
        <VisXYContainer
          :data="frameworks"
          :style="{
            opacity: 0.9,
          }"
        >
          <VisStackedBar
            orientation="horizontal"
            :roundedCorners="8"
            :color="(d: DataRecord) => d.color"
            :x="(d: DataRecord) => d.i"
            :y="(d: DataRecord) => d.percentage"
          />
          <VisAxis
            type="y"
            :tickFormat="formatFramework"
            tickTextColor="rgb(163, 163, 163)"
            :gridLine="false"
            :tickLine="false"
            :domainLine="false"
          />
          <VisAxis
            type="x"
            :gridLine="false"
            :tickLine="false"
            :domainLine="false"
            :tickValues="[]"
          />
        </VisXYContainer>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VisXYContainer, VisStackedBar, VisAxis } from "@unovis/vue";

type DataRecord = {
  i: number;
  language: string;
  percentage: number;
  color: string;
};

export default defineComponent({
  name: "LandingLanguages",

  components: {
    VisXYContainer,
    VisStackedBar,
    VisAxis,
  },

  computed: {
    languages(): DataRecord[] {
      return [
        { i: 0, language: "C/C++", percentage: 20, color: "#044F88" },
        { i: 1, language: "Java", percentage: 30, color: "#ED8B00" },
        { i: 2, language: "Python", percentage: 50, color: "#ffde57" },
        { i: 3, language: "Go", percentage: 60, color: "#00ADD8" },
        { i: 4, language: "TypeScript", percentage: 100, color: "#3178c6" },
        { i: 5, language: "JavaScrpt", percentage: 100, color: "#f0db4f" },
      ];
    },

    frameworks(): DataRecord[] {
      return [
        {
          i: 0,
          language: "React",
          percentage: 50,
          color: "#149eca",
        },
        {
          i: 1,
          language: "Express",
          percentage: 50,
          color: "hsl(var(--foreground))",
        },
        {
          i: 2,
          language: "Tailwind",
          percentage: 60,
          color: "#06b6d4",
        },
        {
          i: 3,
          language: "Nuxt",
          percentage: 80,
          color: "#42b883",
        },
        {
          i: 4,
          language: "Fastify",
          percentage: 100,
          color: "hsl(var(--foreground))",
        },
        {
          i: 5,
          language: "Electron",
          percentage: 100,
          color: "hsl(227, 25%, 35%)",
        },
        {
          i: 6,
          language: "Vue",
          percentage: 100,
          color: "#42b883",
        },
      ];
    },
  },

  methods: {
    formatLanguage(value: number) {
      return (
        this.languages.find((d) => d.i === value)?.language ?? String(value)
      );
    },

    formatFramework(value: number) {
      return (
        this.frameworks.find((d) => d.i === value)?.language ?? String(value)
      );
    },
  },
});
</script>

<style scoped>
.graph-card {
  max-width: 532px;
  min-height: 398px;
  width: 100%;
}
</style>
