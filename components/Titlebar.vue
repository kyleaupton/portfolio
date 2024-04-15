<template>
  <div
    class="flex justify-between items-center bg-neutral-900 py-4 px-8 mb-8 border"
  >
    <fa-icon
      class="fa-2x fa-spin"
      style="--fa-animation-duration: 7s"
      :icon="['fa-solid', 'fa-gear']"
    />

    <div class="flex justify-center gap-2">
      <Button
        v-for="icon in icons"
        :key="icon.key[1]"
        variant="outline"
        size="icon"
      >
        <!-- If it's a link, surround with <a> tag -->
        <template v-if="isLinkIcon(icon)">
          <a :href="icon.link" target="_blank">
            <fa-icon class="fa-xl" :icon="icon.key" />
          </a>
        </template>

        <!-- Otherwise just raw-dog the icon -->
        <template v-else>
          <fa-icon class="fa-xl" :icon="icon.key" @click="icon.onClick" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";

type IconLink = {
  key: [string, string];
  link: string;
};

type IconClick = {
  key: [string, string];
  onClick: () => void;
};

type Icon = IconLink | IconClick;

export default defineComponent({
  name: "Titlebar",

  computed: {
    icons(): Icon[] {
      return [
        {
          key: ["fas", "id-card"],
          link: "https://kyleupton.info/resume",
        },
        {
          key: ["fas", "envelope"],
          onClick: this.copyEmail,
        },
        {
          key: ["fab", "linkedin"],
          link: "https://linkedin.com/in/kyle-upton-50bb1a188",
        },
        {
          key: ["fab", "github"],
          link: "https://github.com/kyleaupton",
        },
      ];
    },
  },

  methods: {
    async copyEmail() {
      const { toast } = useToast();

      try {
        await navigator.clipboard.writeText("kyleaupton@gmail.com");
        toast({ title: "Email Copied to Clipboard" });
      } catch (e) {
        toast({ title: "Failed to Copy Email", variant: "destructive" });
      }
    },

    openLink(link: string) {
      window.open(link);
    },

    isLinkIcon(icon: Icon): icon is IconLink {
      return (icon as IconLink).link !== undefined;
    },

    isClickIcon(icon: Icon): icon is IconClick {
      return (icon as IconClick).onClick !== undefined;
    },
  },
});
</script>

<style scoped>
.titlebar-icon {
  height: 3em;
  width: 3em;
}

.titlebar-icon svg {
  color: var(--surface-0);
}
</style>
