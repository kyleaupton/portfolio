<template>
  <div
    class="titlebar flex justify-between items-center bg-neutral-900 mb-8 border px-4 py-4 sm:px-8"
  >
    <a href="/">
      <fa-icon
        class="fa-2x fa-spin"
        style="--fa-animation-duration: 7s"
        :icon="['fa-solid', 'fa-gear']"
      />
    </a>

    <div class="flex justify-center gap-2">
      <template v-for="icon in icons" :key="icon.key[1]">
        <!-- External Link -->
        <a
          v-if="isExternalLinkIcon(icon)"
          :href="icon.link"
          target="_blank"
          @click="handleClick(icon)"
        >
          <Button
            v-tooltip="{
              content: icon.tooltip,
            }"
            variant="outline"
            size="icon"
          >
            <fa-icon class="fa-xl" :icon="icon.key" />
          </Button>
        </a>

        <!-- Internal Link -->
        <NuxtLink
          v-else-if="isInternalLinkIcon(icon)"
          :to="icon.page"
          target="_blank"
        >
          <Button
            v-tooltip="{
              content: icon.tooltip,
            }"
            variant="outline"
            size="icon"
          >
            <fa-icon class="fa-xl" :icon="icon.key" />
          </Button>
        </NuxtLink>

        <!-- Click -->
        <span v-else @click="handleClick(icon)">
          <Button
            v-tooltip="{
              content: icon.tooltip,
            }"
            variant="outline"
            size="icon"
          >
            <fa-icon class="fa-xl" :icon="icon.key" />
          </Button>
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";

type IconBase = {
  key: [string, string];
  tooltip?: string;
};

type IconExternalLink = IconBase & {
  link: string;
};

type IconInternalLink = IconBase & {
  page: string;
};

type IconClick = IconBase & {
  onClick: () => void;
};

type Icon = IconExternalLink | IconInternalLink | IconClick;

export default defineComponent({
  name: "Titlebar",

  computed: {
    icons(): Icon[] {
      return [
        {
          key: ["fas", "id-card"],
          page: "/resume",
          tooltip: "Open Resume",
        },
        {
          key: ["fas", "envelope"],
          onClick: this.copyEmail,
          tooltip: "Copy Email",
        },
        {
          key: ["fab", "linkedin"],
          link: "https://linkedin.com/in/kyle-upton-50bb1a188",
          tooltip: "Open LinkedIn",
        },
        {
          key: ["fab", "github"],
          link: "https://github.com/kyleaupton",
          tooltip: "Open GitHub",
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

    handleClick(icon: Icon) {
      if (this.isClickIcon(icon)) {
        icon.onClick();
      }
    },

    isExternalLinkIcon(icon: Icon): icon is IconExternalLink {
      return (icon as IconExternalLink).link !== undefined;
    },

    isInternalLinkIcon(icon: Icon): icon is IconInternalLink {
      return (icon as IconInternalLink).page !== undefined;
    },

    isClickIcon(icon: Icon): icon is IconClick {
      return (icon as IconClick).onClick !== undefined;
    },

    getComponent(icon: Icon) {
      if (this.isClickIcon(icon)) {
        return "span";
      } else if (this.isExternalLinkIcon(icon)) {
        return "a";
      } else if (this.isInternalLinkIcon(icon)) {
        return "NuxtLink";
      }

      throw new Error("Invalid Icon Type");
    },
  },
});
</script>
